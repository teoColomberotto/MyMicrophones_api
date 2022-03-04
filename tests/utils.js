import Mic from '../models/micModel'

exports.cleanUpDB = async function () {
    await Promise.all([
        Mic.deleteMany(),
    ]);
};