const asyncHandler = require('express-async-handler')
const Mic = require('../models/micModel')
const User = require('../models/userModel');
const utils = require('../middleware/utils');
const config = require('../config/config');
const mongoose = require('mongoose');
const { response } = require('../app');
const { checkIfAdmin } = require('../middleware/auth/authMiddleware');
const ObjectId = mongoose.Types.ObjectId;



/**
 * @desc Return a list of microphones
 * @route GET /microphones
 * @param A list of query params
 * @access Public
 */
const getMics = asyncHandler(async (req, res) => {
    const countQuery = queryMics(req);
    countQuery.countDocuments(function (err, total) {
        if (err) {
            return next(err);
        }

        //prepare the initial database query from URL query parameters
        let query = queryMics(req);
        //parse pagination parameters from URL query parameters
        const { page, pageSize } = utils.getPaginationParameters(req);

        //apply pagination to query
        query = query.skip((page - 1) * pageSize).limit(pageSize);

        //add the link header to the response
        utils.addLinkHeader('microphones', page, pageSize, total, res);

        //execute the query
        query.sort({ question: 1 }).exec(function (err, mics) {
            if (err) {
                return next(err);
            }
            res.status(200)
                .send(mics);
        });
    });

})

/**
 * @desc Return a microphone
 * @route GET /microphones/:id
 * @param {*} id 
 * @access Public
 */
const getMic = asyncHandler(async (req, res, next) => {
    res.status(200).send(req.mic)
})

/**
 * @desc Create a new microphone
 * @route POST /microphones
 * @access Private
 */
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
            user: req.user.id,
        })
        res
            .status(200)
            .set('Location', `${config.baseUrl}/microphones/${mic._id}`)
            .send(mic);
    })

/**
 * @desc Update a microphone
 * @route PATCH /microphones/:id
 * @param {*} id 
 * @access Private
 */
const updateMic = asyncHandler(async (req, res, next) => {
    const mic = await Mic.findById(req.params.id);
    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(401).send('User not found')
    }

    if (mic.user.toString() != user.id && checkIfAdmin(user) !== 'admin') {
        return res.status(401).send('User not authorized')
    }

    // try {
    const updatedMic = await Mic.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).set('Location', `${config.baseUrl}/microphones/${updatedMic._id}`).send(updatedMic);
    // } catch (error) {
    //     console.log(error)
    // }

})

/**
 * @desc Delete a microphone
 * @route DELETE /microphones/:id
 * @param {*} id 
 * @access Private
 */
const deleteMic = asyncHandler(async (req, res, next) => {
    const mic = await Mic.findById(req.params.id);
    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(401).send('User not found')
    }

    if (mic.user.toString() != user.id && checkIfAdmin(user) !== 'admin') {
        return res.status(401).send('User not authorized')
    }

    try {
        await mic.remove()
        res.status(200).json({ id: req.params.id })
    } catch (error) {
        console.log(error)
    }
})


/* --- METHODS --- */

/**
 * Responds with 404 Not Found and a message indicating that the microphone with the specified ID was not found.
 */
function micNotFound(res, micId) {
    return res.status(404).type('text').send(`No mic found with ID ${micId}`);
}


/**
 * Returns a mongoose query that will retrieve microphones filtered with the URL query parameters
 * 
 * @param {*} req 
 */
function queryMics(req) {
    let query = Mic.find();

    if (req.query.manufactor) {
        query = query.where('manufactor').equals(req.query.manufactor);
    }

    if (req.query.year) {
        query = query.where('year').equals(req.query.year);
    }

    if (Array.isArray(req.query.technology)) {
        const technology = req.query.technology;
        query = query.where('technology').in(technology);
    } else if (req.query.technology) {
        query = query.where('technology').equals(req.query.technology);
    }

    if (Array.isArray(req.query.preamp)) {
        const preamp = req.query.preamp;
        query = query.where('preamp').in(preamp);
    } else if (req.query.preamp) {
        query = query.where('preamp').equals(req.query.preamp);
    }

    if (!isNaN(req.query.fRangeMin) && !isNaN(req.query.fRangeMax)) {
        query = query.where('specs.frequencyRange.max').lt(fRangeMax).where('specs.frequencyRange.min').gt(fRangeMin)
    }

    if (!isNaN(req.query.maxSpl)) {
        query = query.where('specs.maxSpl').lt(req.query.maxSpl);
    }

    if (!isNaN(req.query.sNRatio)) {
        query = query.where('specs.sNRatio').lt(req.query.sNRatio);
    }

    if (!isNaN(req.query.sensitivity)) {
        query = query.where('specs.sensitivity').lt(req.query.sensitivity);
    }

    if (!isNaN(req.query.distortion)) {
        query = query.where('specs.distortion').lt(req.query.distortion);
    }

    //to test for possibles bugs with null values
    if (Array.isArray(req.query.polarPatterns)) {
        const patterns = req.query.polarPatterns;
        patterns.forEach(pattern => {
            query = query.where(`specs.polarPatterns.${pattern}`).equals(true);
        });
    } else if (req.query.polarPatterns) {
        query = query.where(`specs.polarPatterns.${req.query.polarPatterns}`).equals(true);
    }

    if (!isNaN(req.query.rating)) {
        query = query.where('rating').lt(req.query.rating + 1);
    }
    return query;
};

/**
 * Middleware that loads the microphone correspondig to the ID in the URL path
 * Respond with a 404 if the ID is not valid or the microphone doesn't exist
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const loadMicFromParamsMiddleware = (req, res, next) => {
    const micId = req.params.id;
    if (!ObjectId.isValid(micId)) {
        return micNotFound(res, micId);
    }

    let query = Mic.findById(micId);

    //execute the query
    query.exec(function (err, mic) {
        if (err) {
            return next(err);
        } else if (!mic) {
            return micNotFound(res, micId);
        }

        req.mic = mic;
        next();
    });
}




module.exports = {
    getMics,
    getMic,
    setMic,
    updateMic,
    deleteMic,
    loadMicFromParamsMiddleware
}