// scriptLoginGoogle.js
function signIn() {
    let oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
    let form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', oauth2Endpoint);

    let params = {
        "client_id": "991545223863-9l6nujmo3l2eqkm9buek2frvvadu7ujd.apps.googleusercontent.com",
        "redirect_uri": "https://parkfreender.onrender.com/profile_ParkFreender.html",  // Modificato qui
        "response_type": "token",
        "scope": "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
        "include_granted_scopes": 'true',
        'state': 'pass-through-value'
    };

    for (var p in params) {
        let input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', params[p]);
        form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
}

async function fetchProfileInfo(token) {
    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return await response.json();
}

window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.hash.replace('#', '?'));
    const accessToken = urlParams.get('access_token');

    if (accessToken) {
        const profile = await fetchProfileInfo(accessToken);
        console.log(profile);

        localStorage.setItem('authInfo', JSON.stringify({
            access_token: accessToken,
            sub: profile.sub,
            email: profile.email,
            name: profile.name // Assicurati che il nome sia presente
        }));

        window.location.href = '/profile_ParkFreender.html';
    }
};
