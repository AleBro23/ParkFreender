const express = require('express');
const Parcheggio = require('../models/utente.models');
const router = express.Router();
const { getUtente, addUtente, getVeicoli, addVeicolo, updateVeicolo, deleteVeicolo, addPreferito } = require('../controllers/utente.controller');

//GET
router.get('/:googleId', getUtente);
router.get('/veicoli/:id', getVeicoli);

//POST
router.post('/add/nuovoutente', addUtente);
router.post('/veicoli/:id', addVeicolo);
router.post('/:googleId/preferiti/:parcheggioId', addPreferito);


//PUT
router.put('/veicoli/:id', updateVeicolo);

//DELETE
router.put('/:idU/veicoli/:idV', deleteVeicolo);

module.exports = router;