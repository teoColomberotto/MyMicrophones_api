const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../../models/userModel')
const utils = require('../utils');
const config = require('../../config/config');

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
            req.user = payload.userId;
            // Obtain the list of permissions from the "scope" claim.
            const scope = payload.scope;
            req.userRoles = scope ? scope.split(' ') : [];

            next(); 
        }
    });

    //Check if no token
    if (!token) {
        return res.status(401).send('The token is missing');        
    }
})

const authorize = asyncHandler(async (requiredRole) => {
    // Create an return an authorization middleware. The required permission
    // will be available in the returned function because it is a closure.
    return function authorizationMiddleware(req, res, next) {
        console.log(req.userRoles); //print role
        if (!req.userRoles) {
            // The user is not authenticated or has no permissions.
            return res.sendStatus(403);
        }
        const authorized = req.userRoles.includes(requiredRole);
        if (!authorized) {
            // The user is authenticated but does not have the required role.
            return res.sendStatus(403);
        }
        // The user is authorized.
        next();
    };
})

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