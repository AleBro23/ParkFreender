async function fetchUserData(googleId) {
    try {
        const response = await fetch(`/utente/${googleId}`);
        if (!response.ok) {
            throw new Error('Errore nel recuperare i dati dell\'utente');
        }
        return await response.json();
    } catch (error) {
        console.error('Errore nel fetchUserData:', error);
        return null;
    }
}

async function updateContent(type) {
    const info = JSON.parse(localStorage.getItem('authInfo'));
    if (!info || !info['sub']) {
        console.error('Utente non autenticato');
        return;
    }

    const googleId = info['sub'];
    const userData = await fetchUserData(googleId);
    if (!userData) {
        return;
    }

    const reservationsList = document.getElementById('reservations-list');
    const contentTitle = document.getElementById('content-title');
    let newContent = '';

    switch(type) {
        case 'favourite-parks':
            contentTitle.textContent = 'Favourite Parks';
            userData.preferiti.forEach(park => {
                newContent += `
                    <li>
                        <span class="date">${new Date(park.createdAt).toLocaleDateString()}</span>
                        <span class="park">${park.nome}</span>
                        <span class="reservation-status">${park.stato}</span>
                        <span class="price">${park.prezzo}</span>
                        <button onclick="removeFavourite('${park._id}')">Rimuovi</button>
                    </li>`;
            });
            break;
        case 'my-feedbacks':
            contentTitle.textContent = 'My Feedbacks';
            userData.recensioni.forEach(review => {
                newContent += `
                    <li>
                        <span class="date">${new Date(review.createdAt).toLocaleDateString()}</span>
                        <span class="park">${review.parcheggio.nome}</span>
                        <span class="reservation-status">${review.stato}</span>
                        <span class="price">${review.prezzo}</span>
                        <button onclick="removeReview('${review._id}', '${review.parcheggio._id}')">Rimuovi</button>
                    </li>`;
            });
            break;
        case 'my-transactions':
            contentTitle.textContent = 'My Transactions';
            // Se hai i dati delle transazioni, aggiungi il codice per visualizzarli
            break;
    }

    reservationsList.innerHTML = newContent;
}

async function removeFavourite(parkId) {
    const info = JSON.parse(localStorage.getItem('authInfo'));
    if (info && info['sub']) {
        const googleId = info['sub'];
        try {
            const response = await fetch(`/utente/${googleId}/rmpreferiti/${parkId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                updateContent('favourite-parks');
            } else {
                console.error('Errore nel rimuovere il parcheggio preferito');
            }
        } catch (error) {
            console.error('Errore:', error);
        }
    }
}

async function removeReview(reviewId, parkId) {
    const info = JSON.parse(localStorage.getItem('authInfo'));
    if (info && info['sub']) {
        const googleId = info['sub'];
        try {
            const response = await fetch(`/utente/${googleId}/rmrecensioni/${parkId}/park/${reviewId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                updateContent('my-feedbacks');
            } else {
                console.error('Errore nel rimuovere la recensione');
            }
        } catch (error) {
            console.error('Errore:', error);
        }
    }
}

async function fetchProfileInfo(accessToken) {
    try {
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Errore nel recuperare il profilo utente');
        }

        return await response.json();
    } catch (error) {
        console.error('Errore in fetchProfileInfo:', error);
        return null;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    updateContent('favourite-parks'); // Carica i parcheggi preferiti per default
});
