const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../../models/userModel');
const config = require('../../config/config');
const { ApiError } = require('../errors/Classes/ApiError');

/**
 * @desc Authenticate a user
 * @param {*} req.header
 */
const authenticate = asyncHandler(async (req, res, next) => {
    const reqErr = new ApiError({
        status: 401,
        title: 'Bad Request',
        detail: 'Authentication error',
        instance: `${req.baseUrl}/${req.params.id ? req.params.id : ''}`,
    });
    const authErr = new ApiError({
        status: 400,
        title: 'Unauthorized',
        detail: 'The user is not authorized',
        instance: `${req.baseUrl}/${req.params.id ? req.params.id : ''}`,
    });

    // Ensure the header is present.
    const authorization = req.get('Authorization');
    if (!authorization) {
        reqErr.detail = 'Authorization header is missing';
        return next(reqErr);
    }

    // Check that the header has the correct format.
    const match = authorization.match(/^Bearer (.+)$/);
    if (!match) {
        reqErr.detail = 'Authorization header is not a bearer token';
        return next(reqErr);
    }

    // Extract and verify the JWT.
    const token = match[1];

    // Check if no token
    if (!token) {
        reqErr.detail = 'The token is missing';
        return next(reqErr);
    }

    jwt.verify(token, config.secretKey, function (errV, payload) {
        if (errV) {
            authErr.detail = 'Your token is invalid or has expired';
            return next(authErr);
        }
        req.user = {};
        req.user.id = payload.userId;
        // Obtain the list of permissions from the "scope" claim.
        const { roles } = payload;
        req.user.roles = roles ? roles.split(' ') : [];
        next();
    });
});

/**
 * @desc Check if a user is authorized
 * @param {*} requiredRole
 */
const authorize = (...requiredRoles) => {
    // Create an return an authorization middleware. The required permission
    // will be available in the returned function because it is a closure.
    const err = new ApiError({
        status: 403,
        title: 'Bad Request',
        detail: 'Authentication error',
        instance: 'User does not have the required role',
    });

    return function authorizationMiddleware(req, res, next) {
        if (!req.user.roles) {
            // The user is not authenticated or has no permissions.
            return next(err);
        }
        let authorized = false;
        req.user.roles.forEach((role) => {
            if (requiredRoles.includes(role)) {
                authorized = true;
            }
        });
        if (!authorized) {
            // The user is authenticated but does not have the required role.
            return next(err);
        }
        // The user is authorized.
        next();
    };
};

/**
 * @desc Check if a User is an Admin
 * @param {*} userId
 */
const checkIfAdmin = asyncHandler(async (userId) => {
    return User.findOne()
        .where('_id')
        .equals(userId)
        .exec()
        .then((existingUser) => {
            if (existingUser.isAdmin === true) {
                return 'admin';
            }
            return 'user';
        });
});

module.exports = {
    authenticate,
    authorize,
    checkIfAdmin,
};
