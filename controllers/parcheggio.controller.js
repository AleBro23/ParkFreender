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
        const parcheggio = await Parcheggio.findById(id).populate('recensioni');

        if(!parcheggio){
            return res.status(404).json({ message: 'Parcheggio non trovato'});
        }

        res.status(200).json(parcheggio);
    }
    catch (error){
        res.status(500).json({ message: error.message});
    }
};

//restituisce le recensioni di un parcheggio
const getRecensioniParcheggio = async (req, res) => {
    try {
        const parcheggio = await Parcheggio.findById(req.params.parcheggioId)
            .populate({
                path: 'recensioni',
                populate: {
                    path: 'utente',
                    select: 'username' // Popola solo il campo 'username' dell'utente per il display della recensione
                }
            });
        
        if (!parcheggio) {
            return res.status(404).json({ message: 'Parcheggio non trovato' });
        }

        const recensioniValide = parcheggio.recensioni.filter(recensione => recensione.utente);

        
        return res.status(200).json(recensioniValide);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


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





//export
module.exports = {
    getParcheggi, getParcheggio, getRecensioniParcheggio, getStatParcheggio, addParcheggio, upload,  
}