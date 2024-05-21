const Parcheggio = require('./models/parcheggio.models');
const mongoose = require('mongoose');

//generatore num casuale
function generaNumCasuale(min, max){
    return Math.floor(Math.random() * (max - min +1)) + min;
}

//funzione per aggiornare tutti i parcheggi
async function aggiornaDispParcheggi(){
    try{
        const parcheggi = await Parcheggio.find(); //contiene tutti i parcheggi
        //ciclo for per aggiornarli tutti
        parcheggi.forEach(async (parcheggio) =>{
            
            const newDisp = generaNumCasuale(0, parcheggio.capacita);
            parcheggio.disponibilita = newDisp;

            await parcheggio.save(); //salvo il dato aggiornato nel DB
        });

        console.log('disponibilità parcheggi aggiornata');
    }
    catch(error){
        console.log('errore nel aggiornare la disponibilità dei parcheggi');
    }
}

const intervalloAggiornamento = 1 * 60 * 1000; //intervallo in millisecondi (5 min)

function avvioAggiornamentoPeriodico(){
    aggiornaDispParcheggi(); //funzione aggiornamento

    //richiama la funzione ogni t = intervalloAggiornamento
    setInterval(aggiornaDispParcheggi, intervalloAggiornamento);
}


//connessione al db
mongoose.connect(
    'mongodb+srv://alebrogna02:mfke3Lcwgb7EPAzF@backendparkfreender.hxqjtbp.mongodb.net/?retryWrites=true&w=majority&appName=BackEndParkFreender'
)
.then(() => {
    console.log('Connessione al DB effettuata');
})
.catch((error) => {
    console.log('Errore di connessione al DB');
});

avvioAggiornamentoPeriodico(); //starto la funzione