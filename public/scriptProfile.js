function updateContent(type, data) {
    const reservationsList = document.getElementById('reservations-list');
    let newContent = '';

    switch(type) {
        case 'favourite-parks':
            data.forEach(park => {
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
            data.forEach(review => {
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
                fetchUserProfile();
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
                fetchUserProfile();
            } else {
                console.error('Errore nel rimuovere la recensione');
            }
        } catch (error) {
            console.error('Errore:', error);
        }
    }
}
