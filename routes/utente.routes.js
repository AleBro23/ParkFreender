const express = require('express');
const Parcheggio = require('../models/utente.models');
const router = express.Router();
const { getUtente, addUtente, getVeicoli, addVeicolo, updateVeicolo, deleteVeicolo, addPreferito, removePreferito, addRecensione, removeRecensione, getRecensioniUtente, updateRecensione,  } = require('../controllers/utente.controller');

//GET
router.get('/:googleId', getUtente);
router.get('/veicoli/:id', getVeicoli);
router.get('/:googleId/recensioni', getRecensioniUtente);


//POST
router.post('/add/nuovoutente', addUtente);
router.post('/veicoli/:id', addVeicolo);
router.post('/:googleId/preferiti/:parcheggioId', addPreferito);
router.post('/:googleId/recensioni/:parcheggioId', addRecensione);


//PUT
router.put('/veicoli/:id', updateVeicolo);
router.put('/recensioni/:recensioneId', updateRecensione);

//DELETE
router.delete('/:idU/veicoli/:idV', deleteVeicolo);
router.delete('/:googleId/rmpreferiti/:parcheggioId', removePreferito);
router.delete('/:googleId/rmrecensioni/:parcheggioId/park/:recensioneId', removeRecensione);

module.exports = router;