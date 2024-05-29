const header = document.querySelector("header");
window.addEventListener("scroll", function() {
    header.classList.toggle("sticky", window.scrollY > 60);
});

// Menu toggle
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open');
};

//carica i dati dei parcheggi e li mostra 
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/parcheggi'); //chiamata API
        const parcheggi = await response.json();

        const parcheggiContainer = document.getElementById('parcheggi-container');
        parcheggiContainer.innerHTML = '';

        parcheggi.forEach(parcheggio => {
            const card = document.createElement('div');
            card.className = 'card';

            const cardCorner = document.createElement('div');
            cardCorner.className = 'card__corner';
            card.appendChild(cardCorner);

            const cardImg = document.createElement('div');
            cardImg.className = 'card__img';
            const img = document.createElement('img');
            img.src = parcheggio.image; // Assumendo che l'API restituisca l'URL dell'immagine
            img.alt = parcheggio.nome;
            cardImg.appendChild(img);
            card.appendChild(cardImg);

            const cardInt = document.createElement('div');
            cardInt.className = 'card-int';

            const cardTitle = document.createElement('p');
            cardTitle.className = 'card-int__title';
            cardTitle.textContent = parcheggio.nome;
            cardInt.appendChild(cardTitle);

            const cardDescription = document.createElement('p');
            cardDescription.className = 'excerpt';
            cardDescription.innerHTML = `
                <strong>Descrizione:</strong> ${parcheggio.descrizione || 'N/A'}<br>
                <strong>Capacità:</strong> ${parcheggio.capacita}<br>
                <strong>Disponibilità:</strong> ${parcheggio.disponibilita}<br>
                <strong>Posizione:</strong> ${parcheggio.posizione || 'N/A'}<br>
                <strong>Tipologia:</strong> ${parcheggio.tipologia || 'N/A'}<br>
                <strong>Sosta:</strong> ${parcheggio.sosta || 'N/A'}<br>
                <strong>Capacità Camper:</strong> ${parcheggio.capacitaCamper || 'N/A'}<br>
                <strong>Valutazione:</strong> ${parcheggio.valutazione || 'N/A'}/5
            `;
            cardInt.appendChild(cardDescription);

            const cardButton = document.createElement('button');
            cardButton.className = 'card-int__button';
            cardButton.textContent = 'Show';
            cardButton.onclick = () => {
                // Event handler per il pulsante Show
                window.location.href = `parkDetail.html?id=${parcheggio._id}`;
            };
            cardInt.appendChild(cardButton);

            card.appendChild(cardInt);
            parcheggiContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Errore nel recuperare i parcheggi:', error);
    }
});

// Form recensione
document.querySelector('.review-form').addEventListener('submit', function(event) {
    const ratingInputs = document.querySelectorAll('.rating input[type="radio"]');
    let ratingSelected = false;
    ratingInputs.forEach(function(input) {
        if (input.checked) {
            ratingSelected = true;
        }
    });

    if (!ratingSelected) {
        event.preventDefault();
        alert('Please select a rating.');
    }

    const reviewContent = document.getElementById('reviewContent').value;
    if (reviewContent.length > 400) {
        event.preventDefault();
        alert('Review Content must be maximum 400 characters.');
    }
});
