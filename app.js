// declarando as constantes a serem utilizadas

const usernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const confirmPasswordEl = document.querySelector('#confirm-password');
const form = document.querySelector('#signup');
const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;

form.addEventListener('submit', e => {

    // previne que o formulário fique recarregando
    e.preventDefault();
    // validation

    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isPasswordStrong = checkConfirmPassword();
    
    let isFormValid = isUsernameValid && isEmailValid && isPasswordStrong && isPasswordValid;

    if (isFormValid){

    }

});


const isEmailValid = (email) => {

    // função para testar se email é válido

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPasswordValid = (password) => {

        // função para testar se a senha é válida

    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const isPasswordStrong = (password) => {

         // função para testar se a senha é forte o suficiente

    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const showError = (input, message) => {

    // get the form-field element
    const formField = input.parentElement;

    // add the error class

    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message

    const error = formField.querySelector('small');
    error.textContent = message;

};

const showSuccess = input => {
    
    // get the form-field element
    const formField = input.parentElement;
    // remove the error class
    formField.classList.remove('error');
        // add the error class
    formField.classList.add('success');

    const error = formField.querySelector('small');
    error.textContent = 'Valid';

}   

const checkUsername = () => {
    
    let valid = false;
    const min = 3,
           max= 25;
           
    const username = usernameEl.value.trim();

    if (!isRequired(username)){
        showError(usernameEl, 'Username cannot be blank');

    } else if (!isBetween(username.length, min, max)) {

        showError(usernameEl, `Username must be between ${min} and ${max} characters.`)

    } else {

        showSuccess(usernameEl);
        valid = true;
    }   
    return valid;
};

const checkEmail = () => {

    let valid = false;
    const email = emailEl.value.trim();

    if (!isRequired(email)){
         
        showError(emailEl, 'Email cannot be blank');
        
    } else if (!isEmailValid(email)){

        showError(emailEl, 'Email is not valid.');
    } else {
        showSuccess(emailEl);
        valid = true;
    }

    return valid;

};

const checkPassword = () => {

    let valid = false;
    const password = passwordEl.value.trim();

    if (!isRequired(password)){
        showError(passwordEl, 'Password cannot be blank.');
    } else if (!isPasswordValid(password)){
        showError(passwordEl, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
    } else {
        showSuccess(passwordEl);
        valid= true;
    }
    return valid;
};

const checkConfirmPassword = () => {

    let valid = false;
    const confirmPassword = confirmPasswordEl.value.trim();
    const password = passwordEl.value.trim();

    if (!isRequired(confirmPassword)){
        showError(confirmPasswordEl, 'Please enter the password again');

    } else if (password !== confirmPassword){
        showError(confirmPasswordEl, 'Passwords do not match.');
    } else {
        showSuccess(confirmPasswordEl);
        valid=true;
    }
    return valid;

};

// REAL TIME FEEDBACK

form.addEventListener('input', e => {
    switch(e.target.id){
        case 'username':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword;
            break;
        case 'confirmPasswordEl': 
            checkConfirmPassword();
            break;
    }
});

const debounce = (fn, delay = 500) => {

    let timeoutId;

    return (...args) => {
        // cancela o tempo anterior
        if (timeoutId){
            clearTimeout(timeoutId);
        }
        // estabelece um novo prazo

        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};