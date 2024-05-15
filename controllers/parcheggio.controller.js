const Parcheggio = require('../models/parcheggio.models');
const Recensione = require('../models/recensione.models');

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
        const parcheggio = await Parcheggio.findById(id).populate('recensioni');
        
        if(!parcheggio){
            return res.status(404).json({message: 'Parcheggio non trovato'});
        }
        
        const recensioni = parcheggio.recensioni;
        res.status(200).json(recensioni);
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
        const {id} = req.params; //id parcheggio
        const parcheggio = await Parcheggio.findById(id);

        if(!parcheggio){
            return res.status(404).json({ message: 'Parcheggio non trovato'})
        }

        //creo una nuova recensione
        const newRecensione = new Recensione({
            descrizione: req.body.descrizione,
            valutazione: req.body.valutazione
        });
        //salvo la recensione
        const recensioneSalvata = await newRecensione.save();
        //aggiungo l'ID all'array di recensioni del park
        parcheggio.recensioni.push(recensioneSalvata.id);
        await parcheggio.save();

        res.stats(201).json({ message: 'Recensione aggiunta con successo'});
    }
    catch(error){
        res.status(500).json({ message: error.message});
    }
};


//export
module.exports = {
    getParcheggi, getParcheggio, getRecensioniParcheggio, getStatParcheggio, addRecensione
}