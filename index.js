const express = require('express');
const mongoose = require('mongoose');
const app = express();
//models
const Recensione = require('./models/recensione.models');

app.use(express.json()); 


app.get('/', (req, res) => { //richiesta all url '/'
    res.send("Test in notturna");
});


//PROVA ADD DB
app.post('/addrec/api', async (req, res) => {
    try{
        const recensione = await Recensione.create(req.body);
        res.status(200).json(recensione);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
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
