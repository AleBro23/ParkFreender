const mongoose = require('mongoose');

const RecensioneSchema = mongoose.Schema(
    {
        utente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Utente',
            required: true,
        },
        parcheggio: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Parcheggio',
            required: true,
        },
        descrizione: {
            type: String,
            required: true,
        },
        valutazione: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Recensione = mongoose.model('Recensione', RecensioneSchema);

module.exports = Recensione;
