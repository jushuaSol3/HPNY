
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.velocity = { x: (Math.random() - 0.5) * 8, y: (Math.random() - 0.5) * 8 };
    this.alpha = 1;
    this.friction = 0.99;
  }

  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.01;
  }
}

class Firework {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.velocity = {x: 0, y: Math.random() * -2.5 - 0.5};
    this.particles = [];
    this.lifespan = 180;
    this.hasExploded = false;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  explode() {
    for (let i = 0; i < 50; i++) {
      this.particles.push(new Particle(this.x, this.y, this.color));
    }
  }

  update() {
    this.lifespan--;
    if (this.lifespan <= 0 && !this.hasExploded) {
      this.explode();
      this.velocity = {x: 0, y: 0};
      this.hasExploded = true;
    } else if (this.lifespan > 0) {
      this.y += this.velocity.y;
    }
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      this.particles[i].draw();
    }
  }
}

let fireworks = [];



function animateGreetings(name) {
  
  console.log(`received: ${name}`);
  ctx.font = '30px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.fillText(`Happy New Year, ${name}!`, canvas.width / 2, canvas.height / 2);
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  fireworks.forEach((firework, index) => {
    firework.update();
    firework.draw();
    if (firework.lifespan <= 0 && firework.particles.every(p => p.alpha <= 0)) {
      fireworks.splice(index, 1);
    }
  });
  if (Math.random() < 0.015) {
    const x = Math.random() * canvas.width;
    const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    fireworks.push(new Firework(x, canvas.height, color));
  }
 // const userName = localStorage.getItem('userName');
 const urlParams = new URLSearchParams(window.location.search);
  const userName = urlParams.get('name');
  
  animateGreetings(userName);
}

animate();