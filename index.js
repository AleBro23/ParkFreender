const express = require('express');
const mongoose = require('mongoose');
const app = express();

//routes
const parcheggioRoute = require('./routes/parcheggio.routes');
const utenteRoute = require('./routes/utente.routes');
//models
const Parcheggio = require("./models/parcheggio.models");
const Utente = require('./routes/utente.routes');
const Recensione = require('./models/recensione.models');

app.use(express.json()); 


//routes
app.use('/parcheggi', parcheggioRoute);
app.use('/utente', utenteRoute);

app.get('/', (req, res) => { //richiesta all url '/'
    res.send("Test in notturna");
});


mongoose.
connect(
    'mongodb+srv://alebrogna02:mfke3Lcwgb7EPAzF@backendparkfreender.hxqjtbp.mongodb.net/?retryWrites=true&w=majority&appName=BackEndParkFreender'
)
.then(() => {
    console.log("Connesso al database");
    //ora connetto al server
    app.listen(3000, () =>{ //in ascolto sulla porta 3000
        console.log('Server is running on port 3000');
    });
})
.catch(() => {
    console.log("Connessione fallita DB");
});
