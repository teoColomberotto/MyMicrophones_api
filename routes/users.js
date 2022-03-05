const { Router } = require('express');
var express = require('express');
var router = express.Router();

const { registerUser, loginUser, getUser } = require('../controllers/userController')
const { userRequestSchema } = require('../middleware/validators/requestsSchemas');
const { idRequestSchema } = require('../middleware/validators/requestsSchemas');
const {validateRequest} = require('../middleware/validators/requestValidator')
const {authenticate} = require('../middleware/auth/authMiddleware')

router.get('/me', authenticate, getUser)

router.post('/',userRequestSchema, validateRequest, registerUser)

router.post('/login', loginUser)

module.exports = router;
