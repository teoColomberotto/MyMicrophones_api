const { links } = require('express/lib/response')
const mongoose = require('mongoose')

const micSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    manufactor: {
        type: String,
        required: true
    },
    year: Date,
    technology: {
        type: String,
        enum: ['dynamic', 'condenser', 'ribbon', 'other'],
        required: true
    },
    preamp: {
        type: String,
        enum: ['transistor', 'tube', 'other'],
        required: true
    },
    specs: {
        FrequencyRange: {
            low: Number,
            high: Number
        },
        MaxSpl: Number,
        SNRatio: Number,
        Sensitivity: Number,
        Distortion: Number,
        PolarPatterns: {
            Omidirectional: Boolean,
            Cardioid: Boolean,
            SuperCardioid: Boolean,
            HyperCardioid: Boolean,
            Figure8: Boolean,
            Shotgun: Boolean
        }
    },
    image: String,
    rating: Number,


}, {
    timestamps: true
})

module.exports = mongoose.model('Mic', micSchema)