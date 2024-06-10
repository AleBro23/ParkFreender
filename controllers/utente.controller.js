const Utente = require('../models/utente.models');
const Veicolo = require('../models/veicolo.models');
const Parcheggio = require('../models/parcheggio.models');

//GET
//restituisce i dati di un utente
const getUtente = async (req, res) => {
    try {
        const utente = await Utente.findOne({ googleId: req.params.googleId });
        if (!utente) {
            return res.status(404).send('Utente non trovato');
        }
        res.status(200).json(utente);
    } catch (error) {
        res.status(500).send('Errore del server');
    }
};


//restituisce i veicoli di un utente
const getVeicoli = async (req, res) =>{
    try{
        const {id} = req.params;
        const utente = await Utente.findById(id).populate('veicoli');

        if(!utente){
            return res.status(404).json({ message: 'Utente non trovato'});
        }

        const veicoli = utente.veicoli;
        res.status(200).json(veicoli);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}


//POST (add)
//aggiunge un utente
const addUtente = async (req, res) => {
    try {
        const { username, email, googleId, recensioni, veicoli } = req.body;
        const nuovoUtente = new Utente({
            username,
            email,
            googleId,
            recensioni,
            veicoli
        });
        await nuovoUtente.save();
        res.status(201).json({ message: 'utente creato con successo' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//aggiunge un veicolo all'utente
const addVeicolo = async (req, res) =>{
    try{
        const idUtente = req.params.idU;
        const utente = await Utente.findById(idUtente);

        if(!utente){
            return res.status(404).json({ message: 'Utente non trovato'});
        }
        //creo un nuovo veicolo
        const newVeicolo = new Veicolo({
            nome: req.body.nome,
            targa: req.body.targa
        });
        //salvo il veicolo
        const veicoloSalvato = await newVeicolo.save();
        //aggiungo l'ID all'array di utente e salvo l'utente aggiornato
        utente.veicoli.push(veicoloSalvato.id);
        await utente.save();

        res.status(201).json({ message: 'Veicolo aggiunto con successo'});
    }
    catch (error){
        res.status(500).json({ message: error.message});
    }
};

//POST 
//aggiungo parcheggio preferito
const addPreferito = async (req, res) => {
    try {
        const idParcheggio = req.params.parcheggioId;
        const utente = await Utente.findOne({ googleId : req.params.googleId });

        if (!utente) {
            return res.status(404).json({ message: 'Utente non trovato' });
        }

        if (!utente.preferiti.includes(idParcheggio)) {
            utente.preferiti.push(idParcheggio);
            await utente.save();
        }

        res.status(200).json({ message: 'Parcheggio aggiunto ai preferiti' });
    } catch (error) {
        console.error('Errore durante l\'aggiunta ai preferiti:', error);
        res.status(500).json({ message: 'Errore durante l\'aggiunta ai preferiti', error: error.message });
    }
};




//PUT
//aggiorna dati veicolo
const updateVeicolo = async (req, res) =>{
    try{
        const idVeicolo = req.params.idV;
        const { nome, targa } = req.body;
        
        const veicoloAggiornato = await Veicolo.findByIdAndUpdate(
            idVeicolo,
            { nome, targa },
            { new: true, runValidators: true } //!!!
        );

        if(!veicoloAggiornato){
            return res.status(404).json({ message: 'Veicolo non trovato'});
        }

        res.status(200).json({ message: 'Veicolo aggiornato', veicolo: veicoloAggiornato});
    }
    catch (error){
        res.status(500).json({ message: error.message});
    }
};



//DELETE
//cancella un veicolo
const deleteVeicolo = async (req, res) =>{
    try{
        const { idU, idV } = req.params;

        const utente = await Utente.findByIdAndUpdate(
            idU,
            { $pull: { veicoli: idV}}, //toglie veicolo da lista veicoli dell'utente
            { new: true} //aggiorna l'array
        );

        if(!utente){
            return res.status(404).json({ message: 'Utente non trovato'});
        }

        const veicolo = await Veicolo.findByIdAndDelete(idV); //elimina veicolo dal DB

        if(!veicolo){
            return res.status(404).json({ message: 'Veicolo non trovato'});
        }

        res.status(200).json({ messsage: 'Veicolo eliminato'});
    }
    catch (error){
        res.status(500).json({ message: error.message});
    }
};






//export
module.exports = {
    getUtente, addUtente, getVeicoli, addVeicolo, updateVeicolo, deleteVeicolo, addPreferito,
};