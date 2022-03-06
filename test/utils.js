const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Mic = require('../models/micModel');
const config = require('../config/config');

const generateAdminValidJwt = asyncHandler(async (user) => {
    const payload = {
        expiresIn: '30d',
        userId: user.id.toString(),
        roles: 'admin',
    };
    return new Promise((resolve, reject) => {
        jwt.sign(payload, config.secretKey, function (err, token) {
            if (err) {
                return reject(err);
            }
            resolve(token);
        });
    });
});

const generateUserValidJwt = asyncHandler(async (user) => {
    const payload = {
        expiresIn: '30d',
        userId: user.id.toString(),
        roles: 'user',
    };
    return new Promise((resolve, reject) => {
        jwt.sign(payload, config.secretKey, function (err, token) {
            if (err) {
                return reject(err);
            }
            resolve(token);
        });
    });
});

module.exports = [
    // cleanUpDB,
    generateAdminValidJwt,
    generateUserValidJwt,
];
