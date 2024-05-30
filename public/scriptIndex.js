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

// Carica i dati dei parcheggi e li mostra
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/parcheggi'); // Chiamata API
        const parcheggi = await response.json();

        // Ordina i parcheggi per valutazione decrescente e prendi i primi 4
        const topParcheggi = parcheggi.sort((a, b) => b.valutazione - a.valutazione).slice(0, 4);

        const parcheggiContainer = document.querySelector('.popular-content');
        parcheggiContainer.innerHTML = '';

        topParcheggi.forEach(parcheggio => {
            const box = document.createElement('div');
            box.className = 'box';

            const img = document.createElement('img');
            // Costruisce l'URL dell'immagine
            img.src = parcheggio.image;
            img.alt = parcheggio.nome;
            box.appendChild(img);

            const capacity = document.createElement('h6');
            capacity.textContent = `${parcheggio.disponibilita}/${parcheggio.capacita}`;
            box.appendChild(capacity);

            const name = document.createElement('h4');
            name.textContent = parcheggio.nome;
            box.appendChild(name);

            parcheggiContainer.appendChild(box);
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
