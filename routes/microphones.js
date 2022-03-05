var express = require('express');
var router = express.Router();

const {getMics, getMic, setMic, updateMic, deleteMic, loadMicFromParamsMiddleware} = require('../controllers/micsController');
const { micRequestSchema } = require('../middleware/validators/requestsSchemas');
const { idRequestSchema } = require('../middleware/validators/requestsSchemas');
const {validateRequest} = require('../middleware/validators/requestValidator');
const {authenticate, authorize} = require('../middleware/auth/authMiddleware');


router.get('/', getMics)

router.get('/:id', idRequestSchema, validateRequest, loadMicFromParamsMiddleware, getMic) 

router.post('/', authenticate, micRequestSchema, validateRequest, setMic) 

router.patch('/:id', authenticate, idRequestSchema, micRequestSchema, validateRequest, loadMicFromParamsMiddleware, updateMic) 

router.delete('/:id', authenticate, idRequestSchema, validateRequest, loadMicFromParamsMiddleware, deleteMic)

module.exports = router;
