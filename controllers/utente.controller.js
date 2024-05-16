const Utente = require('../models/utente.models');

//GET
//restituisce i dati di un utente
const getUtente = async (req, res) =>{
    try{
        const {id} = req.params; //id utente
        const utente = await Utente.findById(id);

        if(!utente){
            return res.status(404).json({ message: 'Utente non trovato'});
        }

        res.status(200).json(utente);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
};


//POST (add)
//aggiunge un utente
const addUtente = async (req, res) =>{
    try{
        const { username, email, password, recensioni, veicoli} = req.body;
        //creo un nuovo utente
        const nuovoUtente = new Utente({
            username,
            email,
            password,
            recensioni,
            veicoli
        });
        //salvo nel DB
        await nuovoUtente.save();
        
        res.status(201).json({ message: 'utente creato con successo'});
    }
    catch(error){
        res.status(500).json({ message: error.message});
    }
};








//export
module.exports = {
    getUtente, addUtente,
}