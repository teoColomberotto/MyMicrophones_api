const express = require('express');

const router = express.Router();

const { getMics, getMic, setMic, updateMic, deleteMic, loadMicFromParamsMiddleware } = require('../controllers/micsController');
const { micRequestSchema } = require('../middleware/validations/requestsSchemas');
const { idRequestSchema } = require('../middleware/validations/requestsSchemas');
const { validateRequest } = require('../middleware/validations/requestValidator');
const { authenticate, authorize } = require('../middleware/auth/authMiddleware');

/**
 * @openapi
 * tags:
 *  name: Microphones
 *  description: Microphones managing API
 */

/**
 * @openapi
 * /microphones:
 *   get:
 *    description: Returns a list of microphones
 *    summary: Returns a list of microphones
 *    tags: [Microphones]
 *    responses:
 *     200:
 *      description: Returns a list of microphones based on queryParamas
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: '#/components/schemas/Microphone'
 */
router.get('/', getMics);
/**
 * @openapi
 * /microphones/{id}:
 *  get:
 *   description: Get the microphone by id
 *   summary: Get the microphone by id
 *   tags: [Microphones]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: the microphone id
 *   responses:
 *    200:
 *     description: Return the microphone data
 *     content:
 *       application/json:
 *        schema:
 *           $ref: '#/components/schemas/Microphone'
 *    404:
 *     description: The book is not found
 */
router.get('/:id', idRequestSchema, validateRequest, loadMicFromParamsMiddleware, getMic);

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
