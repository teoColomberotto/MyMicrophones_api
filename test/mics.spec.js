/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const mongoose = require('mongoose');
const supertest = require('supertest');
const {
    cleanUpDatabase,
    generateAdminValidJwt,
    generateUserValidJwt,
} = require('./utils');
const app = require('../app');
const Mic = require('../models/micModel');
const User = require('../models/userModel');
const DBManager = require('./testDBHelper');
const { db } = require('../models/userModel');

const dbman = new DBManager();
const user = new User({
    name: 'test',
    password: 'Oilime3figli_1',
    email: 'testmail@gmail.com',
});

beforeEach(async () => {
    dbman.start();
});

after(async () => {
    dbman.stop();
});

describe('...', () => {
    it('...', async () => {
        const Test = mongoose.model(
            'Test',
            new mongoose.Schema({ name: String }),
        );
        const cnt = await Test.count();
        expect(cnt).to.equal(0);
    });
});
