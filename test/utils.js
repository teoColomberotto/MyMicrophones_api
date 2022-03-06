const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const _ = require('lodash');
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

const generateExpiredJwt = asyncHandler(async (user) => {
    const payload = {
        iat: Math.floor(Date.now() / 1000) - 30000000,
        userId: user.id.toString(),
        roles: 'user',
    };
    return new Promise((resolve, reject) => {
        jwt.sign(payload, config.secretKey, { expiresIn: '0' }, function (err, token) {
            if (err) {
                return reject(err);
            }
            resolve(token);
        });
    });
});

const generateMicList = asyncHandler(async (nr, userId) => {
    const mics = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i <= nr; i++) {
        mics.push(
            Mic.create({
                name: `TestMic${i}`,
                manufactor: 'TestManufactor',
                year: 1900,
                technology: 'condenser',
                preamp: 'tube',
                specs: {
                    frequencyRange: {
                        low: 20,
                        high: 20000,
                    },
                    maxSpl: 126,
                    sNRatio: 140,
                    sensitivity: 1.23,
                    distortion: 0.04,
                    polarPatterns: {
                        omnidirectional: false,
                        cardioid: true,
                        supercardioid: false,
                        hypercardioid: false,
                        figure8: false,
                        shotgun: false,
                    },
                },
                image: 'www.imagetesturl.com',
                rating: 3,
                user: userId,
                _id: `5f932d1662eb942088076f3${i}`,
            }),
        );
    }

    return Promise.all(mics).then((list) => {
        if (list.length === 1) {
            return list[0];
        }
        // console.log(list);
        return list;
    });
});

const generateMicBodyRequest = asyncHandler(async () => {
    const list = await generateMicList(0, '594ced02ed345b2b049222c5');
    // eslint-disable-next-line no-useless-computed-key
    const mic = _.pick(list, ['name', 'manufactor', 'year', 'technology', 'preamp', 'specs', 'image', 'rating', 'user']);
    mic.user.toString();
    await Mic.deleteOne({ _id: list._id.toString() });
    return mic;
});

module.exports = {
    // cleanUpDB,
    generateAdminValidJwt,
    generateUserValidJwt,
    generateExpiredJwt,
    generateMicList,
    generateMicBodyRequest,
};
