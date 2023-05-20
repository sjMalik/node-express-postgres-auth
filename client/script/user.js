$(()=> {
    const id = parseQuery();
    getUser(id).then(res=> {
        $('#show-email').text(res.user.email)
    }).catch(err=> {
        console.log(err)
        window.location = '/login.html'
    });

    $('#logout').click(()=> {
        alert('logout')
        logout();
        window.location = 'login.html'
    })
});

// ?id=12
function parseQuery(){
    const pasrsedParts = window.location.search.split('=');
    return pasrsedParts[1];
}

function getUser(id) {
    return $.get(`${API_URL}/users/${id}`);
}