$(()=> {
    $('form').submit(async (event)=> {
        // the default action that belongs to the event will not occur, like submit form
        event.preventDefault();
        try{
            const user = getUserFromForm();
            await login(user);
            window.location = 'index.html'
        }catch(e){
            showErrorMessage(e.responseJSON.message)
        }
    })
})

function login(user) {
    return $.post(AUTH_URL + '/login', user);
}