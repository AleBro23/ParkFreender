function signIn() {
    let oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
    let form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', oauth2Endpoint);

    let params = {
        "client_id": "991545223863-9l6nujmo3l2eqkm9buek2frvvadu7ujd.apps.googleusercontent.com",
        "redirect_uri": "http://localhost:3000/profile_ParkFreender.html",
        "response_type": "token",
        "scope": "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/youtube.readonly", // Aggiunto scope email
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

async function checkOrAddUser(profile) { //controlla se l'utente si è già loggato o no
    try {
        // Verifica se l'utente esiste
        let response = await fetch(`/utente/${profile.sub}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 404) {
            // Se l'utente non esiste, aggiungilo
            response = await fetch('/utente/add/nuovoutente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: profile.name,
                    email: profile.email,
                    password: '', // Gestisci la password in modo sicuro
                    recensioni: [],
                    veicoli: []
                })
            });

            if (response.status === 201) {
                console.log('Utente creato con successo');
            } else {
                console.error('Errore durante la creazione dell\'utente');
            }
        } else if (response.status === 200) {
            console.log('Utente trovato nel database');
        } else {
            console.error('Errore durante la verifica dell\'utente');
        }
    } catch (error) {
        console.error('Errore:', error);
    }
}

window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.hash.replace('#', '?'));
    const accessToken = urlParams.get('access_token');

    if (accessToken) {
        const profile = await fetchProfileInfo(accessToken);
        await checkOrAddUser(profile);

        // Reindirizza l'utente alla sua area personale
        window.location.href = '/profile_ParkFreender.html';
    }
};
