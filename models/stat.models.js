const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const StatSchema = mongoose.Schema(
    {
        capacita: {
            type: Number,
            required: true,
        },
        data: {
            type: Date,
            required: true,
        },
    },
    {
        timestamp: true,
    }
);

const Stat = mongoose.model('Stat', StatSchema);

module.exports = Stat;