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

$.ajaxSetup({
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    }
});