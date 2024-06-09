const mongoose =  require("mongoose");
const Recensione = require('./recensione.models');
const Stat = require('./stat.models');

const ParcheggioSchema = mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
        },
        capacita: {
            type: Number,
            required: true,
            default: 0,
        },
        disponibilita: {
            type: Number,
            required: true,
            default: 0,
        },
        descrizione: {
            type: String,
            required: true,
        },
        capcacitaCamper: {
            type: Number,
            required: false,
            default: 0,
        },
        image: {
            type: String,
            required: false,
        },
        recensioni: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recensione',
            required: false,
        }],
        stats: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Stat',
            required: false,
        }]
    },
    {
        timestamps: true,
    }
);

const Parcheggio = mongoose.model("Parcheggio", ParcheggioSchema);

module.exports = Parcheggio;
