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
        googleId: {
            type: String,
            unique: true,
            required: true,
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
        preferiti: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Parcheggio',
        }],
    },
    {
        timestamps: true,
    }
);

const Utente = mongoose.model('Utente', UtenteSchema);

module.exports = Utente;