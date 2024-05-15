const express = require('express');
const Parcheggio = require('../models/parcheggio.models');
const router = express.Router();
const {getParcheggi, getParcheggio, getStatParcheggio, addRecensione, getRecensioniParcheggio, updateRecensione, addParcheggio} = require('../controllers/parcheggio.controller');

//GET
router.get('/', getParcheggi);
router.get('/:id', getParcheggio);
router.get('/:id/recensioni', getRecensioniParcheggio);
router.get(':id/stats', getStatParcheggio);

//POST
router.post('/:id/recensioni', addRecensione);
router.post('/add/nuovopark', addParcheggio);

//PUT
router.put(':id/recensioni/:id', updateRecensione);


module.exports = router;