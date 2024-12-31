const close = document.getElementById('cls-btn');
const messbox = document.getElementById('mess-box');
const formgroup = document.getElementById('form-group');



close.addEventListener("click", ()=>{
  messbox.style.display = 'none';
  formgroup.style.display = 'block';
});

const nameInput = document.getElementById('name');
const login = document.getElementById('login-btn');

login.addEventListener("click", function(){
    const userName = nameInput.value;
    console.log(`storing username: ${userName}`);
    localStorage.setItem('userName', userName);
    document.querySelector("form").submit();
});

