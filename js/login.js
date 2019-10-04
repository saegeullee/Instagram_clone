console.log("hi");

const idInputEl = document.getElementById('id-input');
const pwInputEl = document.getElementById('password-input');
const btn = document.getElementById('login-form-button');

let hasId = false;
let hasPw = false;

const btnIdentifier = () => {
    if (hasId && hasPw) {
        btn.classList.add('login-form-btn-active');
    } else {
        btn.classList.remove('login-form-btn-active');
    }
}

idInputEl.addEventListener('keyup', () => {
    if (idInputEl.value !== '') {
        hasId = true;
    } else {
        hasId = false;
    }
    btnIdentifier();
})

pwInputEl.addEventListener('keyup', (event) => {
    console.log(event.keyCode);
    if (event.target.value !== '') {
        hasPw = true;
    } else {
        hasPw = false;
    }
    btnIdentifier();
})
