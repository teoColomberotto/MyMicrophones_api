var express = require('express');
var router = express.Router();

const {getMics, getMic, setMic, updateMic, deleteMic} = require('../controllers/micsController');
const { micRequestSchema } = require('../middleware/validators/requestsSchemas');
const {validateRequest} = require('../middleware/validators/requestValidator')


// router.route('/').get(getMics).post(setMic)
// router.route('/:id').get(getMic).patch(updateMic).delete(deleteMic)

router.get('/', getMics)

router.get('/:id', getMic) 

router.post('/', micRequestSchema, validateRequest, setMic) 

router.patch('/:id', updateMic) 

router.delete('/:id', deleteMic)

module.exports = router;
