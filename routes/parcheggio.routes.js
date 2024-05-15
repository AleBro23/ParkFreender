const express = require('express');
const Parcheggio = require('../models/parcheggio.models');
const router = express.Router();
const {getParcheggi, getParcheggio, getStatParcheggio, addRecensione, getRecensioniParcheggio, updateRecensione, addParcheggio} = require('../controllers/parcheggio.controller');

//GET
router.get('/', getParcheggi);
router.get('/:id', getParcheggio);
router.get('/:id/recensioni', getRecensioniParcheggio);
router.get(':id/stats', getStatParcheggio);





module.exports = router;