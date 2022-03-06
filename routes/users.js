const { Router } = require('express');
const express = require('express');

const router = express.Router();

const {
    registerUser,
    loginUser,
    getUser,
} = require('../controllers/userController');
const {
    userRequestSchema,
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

router.get('/me', authenticate, authorize('user', 'admin'), getUser);

router.post('/', userRequestSchema, validateRequest, registerUser);

router.post('/login', loginUser);

module.exports = router;
