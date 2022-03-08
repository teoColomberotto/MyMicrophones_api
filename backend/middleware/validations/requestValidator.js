const { validationResult } = require('express-validator');
const { ApiError } = require('../errors/Classes/ApiError');
const { ApiErrorExtension } = require('../errors/Classes/ApiErrorExtension');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errExt = new ApiErrorExtension({ errors: errors.array() });
        const err = new ApiError(
            { status: 400, title: 'Bad Request', detail: 'Your request body or params are invalid', instance: req.baseUrl },
            errExt,
        );
        return res.status(400).json(err);
    }

    next();
};

module.exports = {
    validateRequest,
};
