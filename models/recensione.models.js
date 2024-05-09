const mongoose = require('mongoose');

const RecensioneSchema = mongoose.Schema(
    {
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