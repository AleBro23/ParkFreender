const express = require('express');
const Parcheggio = require('../models/parcheggio.models');
const router = express.Router();
const {getParcheggi, getParcheggio, getStatParcheggio,  getRecensioniParcheggio,  addParcheggio, upload, } = require('../controllers/parcheggio.controller');

//GET
router.get('/', getParcheggi);
router.get('/:id', getParcheggio);
router.get('/:parcheggioId/recensioni', getRecensioniParcheggio);
router.get('/:id/stats', getStatParcheggio);

//POST
router.post('/add/nuovopark', upload.single('image'), addParcheggio);

//PUT


//DELETE



module.exports = router;