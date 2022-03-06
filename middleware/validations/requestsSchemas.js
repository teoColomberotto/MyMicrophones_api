const { check, body, param } = require('express-validator');

exports.micRequestSchema = [
    // check if required fields exists
    body('name').exists().withMessage('A name is required'),
    body('manufactor').exists().withMessage('A manufactor is required'),
    body('year').exists().withMessage('A year is required'),
    body('technology').exists().withMessage('A technology is required'),
    body('preamp').exists().withMessage('A preamp is required'),

    // check for correct  format
    body('name').isString().withMessage('The name must be a string'),
    body('manufactor').isString().withMessage('The name must be a string'),
    body('year').isNumeric().withMessage('The year must be a number'),

    // check for enums
    body('technology').isIn(['dynamic', 'condenser', 'ribbon', 'other']),
    body('preamp').isIn(['transistor', 'tube', 'other']),

    // check for request params
];

exports.idRequestSchema = [
    param('id').isMongoId().withMessage('The id must be a MongoDB id'),
];

exports.userRequestSchema = [
    // check if required fields exists
    body('name').exists().withMessage('A name is required'),
    body('email').exists().withMessage('A email is required'),
    body('password').exists().withMessage('A password is required'),

    // check for correct  format
    body('name').isString().withMessage('The name must be a string'),
    body('email')
        .isEmail()
        .withMessage('The email must be a valid email adress'),
    body('password')
        .isString()
        .isStrongPassword()
        .withMessage(
            'The password must be at least 8 characters long and contain min 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol',
        ),

    // check for admin value
    check('isAdmin')
        .if(body('isAdmin').exists())
        .isBoolean()
        .withMessage('The admin value must be a boolean'),
    check('isAdmin')
        .if(body('isAdmin').exists())
        .custom((value, { req }) => value === false)
        .withMessage('The admin value must be false'),
];
