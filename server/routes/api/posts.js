const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Post
router.get('/', (req, res) => {    //prende le richieste mandate a /api/posts/ e risponde
    res.send('ciao questa è una prova');
});

//Add Post


//Delete Post



module.exports = router;