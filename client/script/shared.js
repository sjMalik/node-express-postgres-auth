const API_URL = 'http://localhost:3000';
const AUTH_URL = API_URL+ '/auth';


function getUserFromForm() {
    const email = $('#email').val();
    const password = $('#password').val();
    console.log(email, password)

    const user = {
        email, password
    };
    return user;
}

function showErrorMessage(message) {
    const $errorMsg = $('#errorMessage');

    $errorMsg.text(message);
    $errorMsg.show();
}

function redirectIfLoggedin() {
    if(localStorage.user_id) {
        window.location = 'user.html?id=' + localStorage.user_id
    }
}

async function logout() {
    localStorage.removeItem('user_id');
    await $.get(`${AUTH_URL}/logout`);
    window.location = 'login.html'
}

$.ajaxSetup({
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    }
});