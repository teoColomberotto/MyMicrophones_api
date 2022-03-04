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
    year: Number,
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
        frequencyRange: {
            low: Number,
            high: Number
        },
        maxSpl: Number,
        sNRatio: Number,
        sensitivity: Number,
        distortion: {
            type: Number,
            min: 0,
            max: 1
        },
        polarPatterns: {
            omnidirectional: {
                type: Boolean,
                default: null 
            },
            cardioid: {
                type: Boolean,
                default: null 
            },
            superCardioid: {
                type: Boolean,
                default: null 
            },
            hyperCardioid: {
                type: Boolean,
                default: null 
            },
            figure8: {
                type: Boolean,
                default: null 
            },
            shotgun: {
                type: Boolean,
                default: null 
            }
        }
    },
    image: {
        type: String,
        default: "https://toppng.com/uploads/preview/mic-icon-11553430296usfhy8bwwf.png"
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} must be an integer'
        },
        default: null
    },


}, {
    timestamps: true
})

module.exports = mongoose.model('Mic', micSchema)