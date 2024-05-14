const Parcheggio = require('../models/parcheggio.models');

//GET
//restituisce i parcheggi e tutte le loro informazioni
const getParcheggi = async (req, res) => { //GET
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
        res.status(200).json(parcheggio);
    }
    catch (error){
        res.status(500).json({ message: error.message});
    }
};






//export
module.exports = {
    getParcheggi,
}