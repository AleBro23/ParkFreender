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
            required: false,
        },
        recensioni: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recensione',
            required: false,
        }],
        veicoli: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Veicolo',
            required: false
        }],
    },
    {
        timestamps: true,
    }
);

const Utente = mongoose.model('Utente', UtenteSchema);

module.exports = Utente;