const { Router } = require('express');
const express = require('express');

const router = express.Router();

const { registerUser, loginUser, getUser } = require('../controllers/userController');
const { userRequestSchema } = require('../middleware/validations/requestsSchemas');
const { idRequestSchema } = require('../middleware/validations/requestsSchemas');
const { validateRequest } = require('../middleware/validations/requestValidator');
const { authenticate, authorize } = require('../middleware/auth/authMiddleware');

/**
 * @openapi
 * /users/me:
 *  get:
 *   description: Get information about the logged user
 *   summary: Get user info
 *   tags: [Users]
 *   security:
 *    - bearerAuth: []
 *   responses:
 *    200:
 *     description: The logged user information
 *     content:
 *       application/json:
 *        schema:
 *           $ref: '#/components/schemas/Microphone'
 *    404:
 *     $ref: '#/components/responses/NotFound'
 */
router.get('/me', authenticate, authorize('user', 'admin'), getUser);

/**
 * @openapi
 * /users:
 *  get:
 *   description: Create a new user
 *   summary: Add user
 *   tags: [Users]
 *   requestBody:
 *    description: The information about the user
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/UserRequestBody'
 *   responses:
 *    201:
 *     description: The user information
 *     content:
 *       application/json:
 *        schema:
 *           $ref: '#/components/schemas/User'
 *    400:
 *           $ref: '#/components/responses/Unauthorized'
 */
router.post('/', userRequestSchema, validateRequest, registerUser);

/**
 * @openapi
 * /users/login:
 *  post:
 *   description: Log in a user
 *   summary: Login user
 *   tags: [Users]
 *   requestBody:
 *    description: The information about the user
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/UserLoginRequestBody'
 *   responses:
 *    200:
 *     description: The logged user information
 *     content:
 *       application/json:
 *        schema:
 *           $ref: '#/components/schemas/CreateUserResponse'
 *    401:
 *           $ref: '#/components/responses/BadRequest'
 */
router.post('/login', loginUser);

module.exports = router;
