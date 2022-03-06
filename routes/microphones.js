const express = require('express');

const router = express.Router();

const {
    getMics,
    getMic,
    setMic,
    updateMic,
    deleteMic,
    loadMicFromParamsMiddleware,
} = require('../controllers/micsController');
const {
    micRequestSchema,
} = require('../middleware/validations/requestsSchemas');
const {
    idRequestSchema,
} = require('../middleware/validations/requestsSchemas');
const {
    validateRequest,
} = require('../middleware/validations/requestValidator');
const {
    authenticate,
    authorize,
} = require('../middleware/auth/authMiddleware');

router.get('/', getMics);

router.get(
    '/:id',
    idRequestSchema,
    validateRequest,
    loadMicFromParamsMiddleware,
    getMic,
);

router.post('/', authenticate, micRequestSchema, validateRequest, setMic);

router.patch(
    '/:id',
    authenticate,
    authorize('user', 'admin'),
    idRequestSchema,
    micRequestSchema,
    validateRequest,
    loadMicFromParamsMiddleware,
    updateMic,
);

router.delete(
    '/:id',
    authenticate,
    authorize('user', 'admin'),
    idRequestSchema,
    validateRequest,
    loadMicFromParamsMiddleware,
    deleteMic,
);

module.exports = router;
