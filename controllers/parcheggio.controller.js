const Parcheggio = require('../models/parcheggio.models');
const Recensione = require('../models/recensione.models');
const Utente = require('../models/utente.models');
const path = require('path');
const multer = require('multer');

//GET
//restituisce i parcheggi e tutte le loro informazioni
const getParcheggi = async (req, res) => { 
    try {
        const parcheggi = await Parcheggio.find(({}));
        res.status(200).json(parcheggi);
    }
    catch (error) {
        res.status(500).json({ message: error.message});
    }
};

//restituisce un parcheggio
const getParcheggio= async (req, res) =>{
    try{
        const {id} = req.params;
        const parcheggio = await Parcheggio.findById(id);

        if(!parcheggio){
            return res.status(404).json({ message: 'Parcheggio non trovato'})
        }

        res.status(200).json(parcheggio);
    }
    catch (error){
        res.status(500).json({ message: error.message});
    }
};

//restituisce le recensioni di un parcheggio
const getRecensioniParcheggio = async (req, res) =>{
    try{
        const {id} = req.params;
        //oltre agli id ci sono anche i dati di recensioni con la populate (join)
        const parcheggio = await Parcheggio.findById(id).populate('recensioni');

        if(!parcheggio){
            return res.status(404).json({message: 'Parcheggio non trovato'});
        }
        
        const recensioni = parcheggio.recensioni;
        res.status(200).json(recensioni); //ritorno le recensioni
    }
    catch(error){
        res.status(500).json({ message: error.message});
    }
}

//restituisce le statistiche di un parcheggio 
const getStatParcheggio = async (req, res) =>{
    try{
        const {id} = req.params;
        const parcheggio = await Parcheggio.findById(id).populate('stats');

        if(!parcheggio){
            return res.status(404).json({ message: 'Parcheggio non trovato'})
        }

        const stats = parcheggio.stats;
        res.status(200).json(stats);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
};


//POST (add)
//aggiunge una recensione per un determinato parcheggio
const addRecensione = async (req, res) =>{
    try{
        const idParcheggio = req.params.idP;
        const idUtente = req.params.idU;
        const parcheggio = await Parcheggio.findById(idParcheggio);
        const utente = await Utente.findOne({ googleId: idUtente });

        if(!parcheggio || !utente){
            return res.status(404).json({ message: 'Parcheggio o utente non trovato'})
        }

        //creo una nuova recensione
        const newRecensione = new Recensione({
            utente: idUtente,
            descrizione: req.body.descrizione,
            valutazione: req.body.valutazione
        });
        //salvo la recensione
        const recensioneSalvata = await newRecensione.save();
        //aggiungo l'ID all'array di recensioni del park e utente
        parcheggio.recensioni.push(recensioneSalvata.id);
        utente.recensioni.push(recensioneSalvata.id);
        await parcheggio.save();
        await utente.save();

        res.status(201).json({ message: 'Recensione aggiunta con successo'});
    }
    catch(error){
        res.status(500).json({ message: error.message});
    }
};



// Configura multer per il caricamento delle immagini
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/Image/ParkFree/Foto Parcheggi ParkFree'); // directory di destinazione delle immagini
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // nome del file
    }
});
const upload = multer({ storage: storage });

//aggiunge un parcheggio
const addParcheggio = async (req, res) => {
    try {
        const { nome, capacita, disponibilita, descrizione, capacitaCamper, image} = req.body;

        const nuovoParcheggio = new Parcheggio({
            nome,
            capacita,
            disponibilita,
            descrizione,
            capacitaCamper,
            image,
        });

        await nuovoParcheggio.save();

        res.status(201).json({ message: 'Parcheggio aggiunto con successo', parcheggio: nuovoParcheggio });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//PUT (update)
//aggiorna una recensione
const updateRecensione = async (req, res) =>{
    try{
        const idRecensione = req.params.idR;
        const { descrizione, valutazione } = req.body; //input dal front end
        
        const recensioneAggiornata = await Recensione.findByIdAndUpdate(
            idRecensione,
            { descrizione, valutazione },
            { new: true, runValidators: true } //runvalidators a true controlla che i dati rispettino i parametri imposti nello schema
        );

        if (!recensioneAggiornata) {
            return res.status(404).json({ message: 'Recensione non trovata' });
        }

        res.status(200).json({ message: 'Recensione aggiornata', recensione: recensioneAggiornata }); //ritorno recensione aggiornata per aggiornare front end
    }
    catch (error) {
        res.status(500).json({ message: 'Errore del server' });
    }
};


//DELETE
//cancella una recensione
const deleteRecensione = async (req, res) =>{
    try{
        const { idP, idU, idR } = req.params;

        const parcheggio = await Parcheggio.findByIdAndUpdate(
            idP, 
            { $pull: { recensioni: idR} }, //pull elimina la recensione dalla lista
            { new: true} //aggiorna l'array di recensioni del parcheggio
        );
        const utente = await Utente.findByIdAndUpdate(
            idU,
            { $pull: { recensioni: idR } },
            { new: true}
        );

        if (!parcheggio || !utente) {
            return res.status(404).json({ message: 'Parcheggio o utente non trovato' });
        }
        
        const recensione = await Recensione.findByIdAndDelete(idR); //cancella la recensione dal DB
        
        if(!recensione){
            return res.status(404).json({ messege: 'Recensione non trovata'})
        }

        res.status(200).json({ message: 'Recensione eliminata'})
    }
    catch(error){
        res.status(500).json({ message: 'Errore del server'});
    }
};


//export
module.exports = {
    getParcheggi, getParcheggio, getRecensioniParcheggio, getStatParcheggio, addRecensione, addParcheggio, upload, updateRecensione, deleteRecensione, 
}