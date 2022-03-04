const asyncHandler = require('express-async-handler')
const Mic = require('../models/micModel')

// @desc Get Mics list
// @route GET /microphones
// @access Private
const getMics =  asyncHandler(async (req, res) => {
    const mics = await Mic.find();
    res.status(200).json(mics);
})

// @desc Get Mic from ID
// @route GET /microphones/:id
// @access Private
const getMic = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Get microphone: ${req.params.id}`});
})

// @desc Create a new Mic
// @route POST /microphones
// @access Private
const setMic = asyncHandler( 
    async (req, res) => {

    const mic = await Mic.create({
        name: req.body.name,
        manufactor: req.body.manufactor,
        year: req.body.year,
        technology: req.body.technology,
        preamp: req.body.preamp,
        specs: {
            frequencyRange: {
                low: req.body.specs.frequencyRange.low,
                high: req.body.specs.frequencyRange.high,
            },
            maxSpl: req.body.specs.maxSpl,
            sNRatio: req.body.specs.sNRatio,
            sensitivity: req.body.specs.sensitivity,
            distortion: req.body.specs.distortion,
            polarPatterns: {
                omnidirectional: req.body.specs.polarPatterns.omnidirectional,
                cardioid: req.body.specs.polarPatterns.cardioid,
                superCardioid: req.body.specs.polarPatterns.superCardioid,
                hyperCardioid: req.body.specs.polarPatterns.hyperCardioid,
                figure8: req.body.specs.polarPatterns.figure8,
                shotgun: req.body.specs.polarPatterns.shotgun
            }
        },
        image: req.body.image,
        rating: req.body.rating,
    })
    res.status(200).json(mic);
})

// @desc Update Mic from ID
// @route PATCH /microphones/:id
// @access Private
const updateMic = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Updated microphone: ${req.params.id}`});
})

// @desc Delete mic from ID
// @route DELETE /microphones/:id
// @access Private
const deleteMic = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Deleted microphone ${req.params.id}`});
})



module.exports = {
    getMics,
    getMic,
    setMic,
    updateMic,
    deleteMic
}