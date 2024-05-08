const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//MID
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts'); //definisco l'endpoint

app.use('/api/posts', posts); //re-indirizza le richieste all'endpoint posts.js


const port = process.env.PORT || 5000; //localhost

app.listen(port, () => console.log(`Server startato sulla porta ${port}`));