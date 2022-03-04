const asyncHandler = require('express-async-handler')

const Mic = require('../models/micModel')

// @desc Get Mics list
// @route GET /microphones
// @access Private
const getMics =  asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Get microphones list'});
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
const setMic = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Add a text field')
    }
    res.status(200).json({message: 'Set microphone'});
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