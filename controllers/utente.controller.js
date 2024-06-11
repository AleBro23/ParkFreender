const Utente = require('../models/utente.models');
const Veicolo = require('../models/veicolo.models');
const Parcheggio = require('../models/parcheggio.models');
const Recensione = require('../models/recensione.models');

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

//restituisce le recnesioni di un utente
const getRecensioniUtente = async (req, res) => {
    try {
        const utente = await Utente.findOne({ googleId: req.params.googleId }).populate('recensioni');
        if (!utente) {
            return res.status(404).json({ message: 'Utente non trovato' });
        }
        return res.status(200).json(utente.recensioni);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

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

//aggiunge una recensione all'utente e al parcheggio
const addRecensione = async (req, res) => {
    try {
        const { googleId, parcheggioId } = req.params;
        const { descrizione, valutazione } = req.body;

        // Trova l'utente per googleId
        const utente = await Utente.findOne({ googleId: googleId });
        if (!utente) {
            return res.status(404).json({ message: 'Utente non trovato' });
        }

        // Trova il parcheggio per parcheggioId
        const parcheggio = await Parcheggio.findById(parcheggioId);
        if (!parcheggio) {
            return res.status(404).json({ message: 'Parcheggio non trovato' });
        }

        // Crea una nuova recensione
        const nuovaRecensione = new Recensione({
            utente: utente._id,
            parcheggio: parcheggio._id,
            descrizione: descrizione,
            valutazione: valutazione
        });

        // Salva la recensione
        await nuovaRecensione.save();

        // Aggiungi la recensione all'utente e al parcheggio
        utente.recensioni.push(nuovaRecensione._id);
        parcheggio.recensioni.push(nuovaRecensione._id);
        await utente.save();
        await parcheggio.save();

        return res.status(200).json({ message: 'Recensione aggiunta con successo' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
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

//aggiorna dati recensione
const updateRecensione = async (req, res) => {
    try {
        const recensioneId = req.params.recensioneId;
        const { descrizione, valutazione } = req.body;

        const recensione = await Recensione.findById(recensioneId);
        if (!recensione) {
            return res.status(404).json({ message: 'Recensione non trovata' });
        }

        // Aggiorna i campi
        recensione.descrizione = descrizione;
        recensione.valutazione = valutazione;

        await recensione.save();

        return res.status(200).json({ message: 'Recensione aggiornata con successo', recensione });
    } catch (error) {
        return res.status(500).json({ message: error.message });
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

//rimuove un parcheggio dai preferiti
const removePreferito = async (req, res) =>{
    try{
        const idParcheggio = req.params.parcheggioId;
        const utente = await Utente.findOne({ googleId : req.params.googleId });

        if(!utente){
            res.status(404).json({ message: 'utente non trovato'});
        }

        if (utente.preferiti.includes(idParcheggio)) {
            utente.preferiti.pull(idParcheggio); //toglie l'utente dall'array
            await utente.save();
        }

        res.status(200).json({ message: 'Parcheggio rimosso dai preferiti' });
    }
    catch (error){
        res.status(500).json({ message: error.message});
    }
};

//rimuove una recensione da un utente e il parcheggio e la cancella dal DB
const removeRecensione = async (req, res) => {
    try {
        const { googleId, recensioneId, parcheggioId } = req.params;

        // Trova l'utente per googleId
        const utente = await Utente.findOne({ googleId: googleId });
        if (!utente) {
            return res.status(404).json({ message: 'Utente non trovato' });
        }

        // Trova il parcheggio per parcheggioId
        const parcheggio = await Parcheggio.findById(parcheggioId);
        if (!parcheggio) {
            return res.status(404).json({ message: 'Parcheggio non trovato' });
        }

        // Trova e rimuove la recensione dall'array recensioni dell'utente
        utente.recensioni = utente.recensioni.filter(id => id.toString() !== recensioneId);
        await utente.save();

        // Trova e rimuove la recensione dall'array recensioni del parcheggio
        parcheggio.recensioni = parcheggio.recensioni.filter(id => id.toString() !== recensioneId);
        await parcheggio.save();

        // Rimuovo la recensione dal database
        const recensione = await Recensione.findByIdAndDelete(recensioneId);
        if (!recensione) {
            return res.status(404).json({ message: 'Recensione non trovata' });
        }

        return res.status(200).json({ message: 'Recensione rimossa con successo' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


//export
module.exports = {
    getUtente, addUtente, getVeicoli, addVeicolo, updateVeicolo, deleteVeicolo, addPreferito, removePreferito, addRecensione, removeRecensione, getRecensioniUtente, updateRecensione, 
};