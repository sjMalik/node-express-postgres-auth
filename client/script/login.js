$(()=> {
    $('form').submit(async (event)=> {
        // the default action that belongs to the event will not occur, like submit form
        event.preventDefault();
        try{
            const user = getUserFromForm();
            const response = await login(user);
            localStorage.user_id = response.id;
            redirectIfLoggedin();
        }catch(e){
            showErrorMessage(e.responseJSON.message)
        }
    })
})

function login(user) {
    return $.post(AUTH_URL + '/login', user);
}