const express = require('express');

const router = express.Router();

const { getMics, getMic, setMic, updateMic, deleteMic, loadMicFromParamsMiddleware } = require('../controllers/micsController');
const { micRequestSchema } = require('../middleware/validations/requestsSchemas');
const { idRequestSchema } = require('../middleware/validations/requestsSchemas');
const { validateRequest } = require('../middleware/validations/requestValidator');
const { authenticate, authorize } = require('../middleware/auth/authMiddleware');

/**
 * @openapi
 * /microphones:
 *   get:
 *    description: Get a list of microphones
 *    summary: List microphones
 *    tags: [Microphones]
 *    responses:
 *     200:
 *      description: An array of microphones
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
 *   description: Get information about a specific microphone
 *   summary: Get microphone info
 *   tags: [Microphones]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: The unique id for the microphone
 *   responses:
 *    200:
 *     description: The microphone information
 *     content:
 *       application/json:
 *        schema:
 *           $ref: '#/components/schemas/Microphone'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 */
router.get('/:id', idRequestSchema, validateRequest, loadMicFromParamsMiddleware, getMic);

/**
 * @openapi
 * /microphones:
 *  post:
 *   description: Create a new microhpone
 *   summary: Add microphone
 *   tags: [Microphones]
 *   security:
 *    - bearerAuth: []
 *   requestBody:
 *    description: The information about the microphone
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Microphone'
 *   responses:
 *    201:
 *     description: The microphone information
 *     content:
 *       application/json:
 *        schema:
 *           $ref: '#/components/schemas/Microphone'
 *    400:
 *           $ref: '#/components/responses/Unauthorized'
 *    401:
 *           $ref: '#/components/responses/BadRequest'
 */
router.post('/', authenticate, micRequestSchema, validateRequest, setMic);

/**
 * @openapi
 * /microphones/{id}:
 *  patch:
 *   description: Update a microhpone
 *   summary: Update microphone
 *   tags: [Microphones]
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: The unique id for the microphone
 *   requestBody:
 *    description: The information about the microphone
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Microphone'
 *   responses:
 *    200:
 *     description: The updated microphone information
 *     content:
 *       application/json:
 *        schema:
 *           $ref: '#/components/schemas/Microphone'
 *    400:
 *           $ref: '#/components/responses/Unauthorized'
 *    401:
 *           $ref: '#/components/responses/BadRequest'
 *    404:
 *     description: User or microphone not found
 *     content:
 *       application/json:
 *        schema:
 *           $ref: '#/components/schemas/Error'
 */
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

/**
 * @openapi
 * /microphones/{id}:
 *  delete:
 *   description: Delete a microhpone
 *   summary: Delete microphone
 *   tags: [Microphones]
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: The unique id for the microphone
 *   responses:
 *    201:
 *     description: The deleted microphone id
 *     content:
 *       application/json:
 *        schema:
 *           id:
 *            type: string
 *    400:
 *           $ref: '#/components/responses/Unauthorized'
 *    401:
 *           $ref: '#/components/responses/BadRequest'
 *    404:
 *     description: User or microphone not found
 *     content:
 *       application/json:
 *        schema:
 *           $ref: '#/components/schemas/Error'
 */
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
