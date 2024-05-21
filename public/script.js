const header = document.querySelector("header");

window.addEventListener("scroll", function() { 
    header.classList.toggle("sticky", window.scrollY > 60)
});

let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');


menu.onclick = () => {
    menu.classList.toggle('bx-x'); 
    navbar.classList.toggle('open');
}


/* FORM SUBMIT RECENSIONE */
// Aggiungi un event listener per il submit del form
document.querySelector('.review-form').addEventListener('submit', function(event) {
    // Verifica se almeno una stella è stata selezionata
    const ratingInputs = document.querySelectorAll('.rating input[type="radio"]');
    let ratingSelected = false;
    ratingInputs.forEach(function(input) {
      if (input.checked) {
        ratingSelected = true;
      }
    });
  
    // Se nessuna stella è stata selezionata, interrompi l'invio del form
    if (!ratingSelected) {
      event.preventDefault();
      alert('Please select a rating.');
    }
  
    // Verifica la lunghezza del contenuto della recensione
    const reviewContent = document.getElementById('reviewContent').value;
    if (reviewContent.length > 400) {
      event.preventDefault();
      alert('Review Content must be maximum 400 characters.');
    }
  });
