process.env.NODE_ENV = 'test';
const { MongoMemoryServer } = require('mongodb-memory-server');
const { expect } = require('chai');
const { cleanUpDatabase, generateAdminValidJwt, generateUserValidJwt } = require('./utils');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Mic = require('../models/micModel');
const User = require('../models/userModel');
const DBManager = require('./testDBHelper');
const { db } = require('../models/userModel');
const dbman = new DBManager();
const user = new User({
    name: "test",
    password: "Oilime3figli_1",
    email: "testmail@gmail.com",
});

// beforeEach(async () => {
//     console.log("start")
//     dbman.start();
// });
// afterEach(async () => {
//     dbman.stop()
// });



// describe('GET /microphones', function() {


// })

let mongoServer;
const opts = { }

before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, opts);
});

after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('...', () => {
    it('...', async () => {
        const Test = mongoose.model('Test', new mongoose.Schema({ name: String }));
        const cnt = await Test.count();
        expect(cnt).to.equal(0);
    });
});