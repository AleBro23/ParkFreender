const mongoose = require('mongoose');
const Veicolo = require('./veicolo.models');

const UtenteSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        veicoli: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Veicolo'
        }],
    },
    {
        timestamps: true,
    }
);

const Utente = mongoose.model('Utente', UtenteSchema);

module.exports = Utente;