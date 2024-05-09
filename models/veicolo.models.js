const mongoose = require('mongoose');

const VeicoloSchema = mongoose.Schema(
    {
        targa: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const Veicolo = mongoose.model('Veicolo', VeicoloSchema);

module.exports = Veicolo;