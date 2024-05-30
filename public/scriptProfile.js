function updateContent(type) {
    const reservationsList = document.getElementById('reservations-list');
    let newContent = '';

    switch(type) {
        case 'favourite-parks':
            newContent = `
                <li>
                    <span class="date">29 Sep</span>
                    <span class="park">San Severino</span>
                    <span class="reservation-status payment">Payment</span>
                    <span class="price">3€/h</span>
                </li>
                <li>
                    <span class="date">15 Oct</span>
                    <span class="park">San Bartolino</span>
                    <span class="reservation-status timedisk">Time disk</span>
                    <span class="price">2h</span>
                </li>
                <li>
                    <span class="date">11 Nov</span>
                    <span class="park">Ex Zuffo</span>
                    <span class="reservation-status free">Free</span>
                    <span class="price">free</span>
                </li>
                <li>
                    <span class="date">13 Apr</span>
                    <span class="park">Lidl Via Brennero</span>
                    <span class="reservation-status free">Free</span>
                    <span class="price">free</span>
                </li>
                <li>
                    <span class="date">24 Feb</span>
                    <span class="park">Cimitero Comunale</span>
                    <span class="reservation-status timedisk">Time disk</span>
                    <span class="price">2€/h</span>
                </li>`;
            break;
        case 'my-feedbacks':
            newContent = `
                <li>
                    <span class="date">10 Jan</span>
                    <span class="park">Feedback 1</span>
                    <span class="reservation-status free">Done</span>
                    <span class="price">-</span>
                </li>
                <li>
                    <span class="date">20 Feb</span>
                    <span class="park">Feedback 2</span>
                    <span class="reservation-status free">Done</span>
                    <span class="price">-</span>
                </li>`;
            break;
        case 'my-transactions':
            newContent = `
                <li>
                    <span class="date">05 Mar</span>
                    <span class="park">Transaction 1</span>
                    <span class="reservation-status free">Done</span>
                    <span class="price">$100</span>
                </li>
                <li>
                    <span class="date">15 Apr</span>
                    <span class="park">Transaction 2</span>
                    <span class="reservation-status free">Done</span>
                    <span class="price">$200</span>
                </li>`;
            break;
    }

    reservationsList.innerHTML = newContent;
}
