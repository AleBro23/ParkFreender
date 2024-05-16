const express = require('express');
const Parcheggio = require('../models/parcheggio.models');
const router = express.Router();
const {getParcheggi, getParcheggio, getStatParcheggio, addRecensione, getRecensioniParcheggio, updateRecensione, addParcheggio, deleteRecensione} = require('../controllers/parcheggio.controller');

//GET
router.get('/', getParcheggi);
router.get('/:id', getParcheggio);
router.get('/:id/recensioni', getRecensioniParcheggio);
router.get('/:id/stats', getStatParcheggio);

//POST
router.post('/:idP/recensioni/utente/:idU', addRecensione);
router.post('/add/nuovopark', addParcheggio);

//PUT
router.put('/recensioni/:idR', updateRecensione);

//DELETE
router.delete('/:idP/utente/:idU/recensioni/:idR', deleteRecensione);


module.exports = router;