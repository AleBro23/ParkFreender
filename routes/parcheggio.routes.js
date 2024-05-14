const express = require('express');
const Parcheggio = require('../models/parcheggio.models');
const router = express.Router();
const {getParcheggi, getParcheggio} = require('../controllers/parcheggio.controller');

//GET
router.get('/', getParcheggi);
router.get('/:id', getParcheggio);






module.export = router;