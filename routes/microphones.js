var express = require('express');
var router = express.Router();

const {getMics, getMic, setMic, updateMic, deleteMic, loadMicFromParamsMiddleware} = require('../controllers/micsController');
const { micRequestSchema } = require('../middleware/validators/requestsSchemas');
const { idRequestSchema } = require('../middleware/validators/requestsSchemas');
const {validateRequest} = require('../middleware/validators/requestValidator')


// router.route('/').get(getMics).post(setMic)
// router.route('/:id').get(getMic).patch(updateMic).delete(deleteMic)

router.get('/', getMics)

router.get('/:id', idRequestSchema, validateRequest, loadMicFromParamsMiddleware, getMic) 

router.post('/', micRequestSchema, validateRequest, setMic) 

router.patch('/:id', idRequestSchema, micRequestSchema, validateRequest, loadMicFromParamsMiddleware, updateMic) 

router.delete('/:id', idRequestSchema, validateRequest, loadMicFromParamsMiddleware, deleteMic)

module.exports = router;
