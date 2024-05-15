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











//export
module.exports = {

}