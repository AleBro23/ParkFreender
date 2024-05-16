const express = require('express');
const Parcheggio = require('../models/utente.models');
const router = express.Router();
const {getUtente, addUtente} = require('../controllers/utente.controller');

//GET
router.get('/:id', getUtente);

//POST
router.post('/add/nuovoutente', addUtente);


module.exports = router;