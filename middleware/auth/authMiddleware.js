const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../../models/userModel')
const utils = require('../utils');
const config = require('../../config/config');


/**
 * @desc Authenticate a user
 * @param {*} req.header
 */
const authenticate = asyncHandler(async (req, res, next) => {
    // Ensure the header is present.
    const authorization = req.get('Authorization');
    if (!authorization) {
        return res.status(401).send('Authorization header is missing');
    }

    // Check that the header has the correct format.
    const match = authorization.match(/^Bearer (.+)$/);
    if (!match) {
        return res.status(401).send('Authorization header is not a bearer token');
    }

    // Extract and verify the JWT.
    const token = match[1];
    jwt.verify(token, config.secretKey, function (err, payload) {
        if (err) {
            return res.status(401).send('Your token is invalid or has expired');
        } else {
            req.user = {};
            req.user.id = payload.userId;
            // Obtain the list of permissions from the "scope" claim.
            const roles = payload.roles;
            req.user.roles = roles ? roles.split(' ') : [];

            next(); 
        }
    });

    //Check if no token
    if (!token) {
        return res.status(401).send('The token is missing');        
    }
})

/**
 * @desc Check if a user is authorized
 * @param {*} requiredRole
 */
const authorize = (...requiredRoles) => {
    // Create an return an authorization middleware. The required permission
    // will be available in the returned function because it is a closure.
    return function authorizationMiddleware(req, res, next) {
        if (!req.user.roles) {
            // The user is not authenticated or has no permissions.
            return res.status(403).send('User not authenticated')
        }
        let authorized = false;
        req.user.roles.forEach(role => {
            if (requiredRoles.includes(role)) {
                authorized = true;
            }
        });
        if (!authorized) {
            // The user is authenticated but does not have the required role.
            return res.status(403).send('User does not have the required role')
        }
        // The user is authorized.
        next();
    };
}


/**
 * @desc Check if a User is an Admin
 * @param {*} userId
 */
const checkIfAdmin = asyncHandler(async (userId) => {
    return User.findOne().where('_id').equals(userId).exec().then((existingUser) => {
        if (existingUser.isAdmin === true) {
            return 'admin';
        }
        return 'user';
    });
})

module.exports = {
    authenticate,
    authorize,
    checkIfAdmin,
}