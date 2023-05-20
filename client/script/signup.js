redirectIfLoggedin();

$(()=> {
    $('form').submit(async (event)=> {
        event.preventDefault();
        const user = getUserFromForm();
        try{
            const response = await $.post(`${AUTH_URL}/signup`, user);
            window.location = 'user.html?id='+ response.id
        }catch(e){
            showErrorMessage(e.responseJSON.message)
        }
    })
})