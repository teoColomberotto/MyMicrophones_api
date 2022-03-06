/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const mongoose = require('mongoose');
const supertest = require('supertest');
const _ = require('lodash');
const {
    generateAdminValidJwt,
    generateUserValidJwt,
    generateExpiredJwt,
    generateMicList,
    generateMicBodyRequest,
} = require('./utils');
const app = require('../app');
const Mic = require('../models/micModel');
const User = require('../models/userModel');
const DBManager = require('./testDBHelper');
const { db } = require('../models/userModel');
const { updateMic } = require('../controllers/micsController');
const { userRequestSchema } = require('../middleware/validations/requestsSchemas');

const dbman = new DBManager();
const user = new User({
    _id: '594ced02ed345b2b049222c5',
    name: 'test user',
    password: 'Oilime3figli_1',
    email: 'testmail@gmail.com',
});

const user2 = new User({
    _id: '594ced02ed345b2b049222c6',
    name: 'test user 2',
    password: 'Oilime3figli_2',
    email: 'testmail2@gmail.com',
});

const admin = new User({
    _id: '594ced02ed345b2b049222c4',
    name: 'test admin',
    password: 'Oilime3figli_3',
    email: 'testmailadmin@gmail.com',
    isAdmin: true,
});

describe('GET /microphones/', async () => {
    before(async () => dbman.start());
    after(async () => dbman.stop());
    afterEach(async () => dbman.cleanup());
    beforeEach(async () => {
        await generateMicList(1, user._id);
    });

    it('should retrieve the list of microphones', async () => {
        const res = await supertest(app).get('/microphones/');

        // Check that the status and headers of the response are correct
        expect(res.status, 'res-status').to.equal(200);
        expect(res.get('Content-type'), 'res.headers.Content-Type').to.have.string('application/json');

        // Check that the response body is an array.
        const { body } = res;
        expect(body, 'res.body').to.be.an('array');

        // Check that the list is the correct length.
        expect(body).to.have.lengthOf(2);

        // eslint-disable-next-line no-plusplus
        for (let i = 0; i <= body.length - 1; i++) {
            //check for required fields
            expect(body[i], 'res.body[i]').to.include.all.keys(
                '__v',
                '_id',
                'name',
                'manufactor',
                'year',
                'technology',
                'preamp',
                'user',
                'createdAt',
                'updatedAt',
            );
            expect(body[i].name, 'res.body[i].name').to.be.a('string');
            expect(body[i].manufactor, 'res.body[i].manufactor').to.be.a('string');
            expect(body[i].year, 'res.body[i].year').to.be.a('number');
            expect(body[i].technology, 'res.body[i].technology').to.be.a('string');
            expect(body[i].preamp, 'res.body[i].preamp').to.be.a('string');
            expect(body[i].specs, 'res.body[i].specs').to.be.a('object');
            expect(body[i].specs.frequencyRange, 'res.body[i].specs.frequencyRange').to.be.a('object');
            expect(body[i].specs.frequencyRange.low, 'res.body[i].specs.frequencyRange.low').to.be.a('number');
            expect(body[i].specs.frequencyRange.high, 'res.body[i].specs.frequencyRange.high').to.be.a('number');
            expect(body[i].specs.maxSpl, 'res.body[i].specs.maxSpl').to.be.a('number');
            expect(body[i].specs.sNRatio, 'res.body[i].specs.sNRatio').to.be.a('number');
            expect(body[i].specs.sensitivity, 'res.body[i].specs.sensitivity').to.be.a('number');
            expect(body[i].specs.distortion, 'res.body[i].specs.distortion').to.be.a('number');
            expect(body[i].specs.distortion, 'res.body[i].specs.distortion').to.be.above(0);
            expect(body[i].specs.distortion, 'res.body[i].specs.distortion').to.be.below(1);
            expect(body[i].image, 'res.body[i].image').to.be.a('string');
            expect(body[i].rating, 'res.body[i].rating').to.be.a('number');
            expect(body[i].rating, 'res.body[i].rating').to.be.above(0);
            expect(body[i].rating, 'res.body[i].rating').to.be.below(5);
            expect(body[i].user, 'res.body[i].user').to.be.a('string');
        }
    });
});

describe('GET /microphones/:id', async () => {
    before(async () => dbman.start());
    after(async () => dbman.stop());
    afterEach(async () => dbman.cleanup());
    beforeEach(async () => {
        await generateMicList(1, user._id);
    });

    it('should retireve a specific microphones', async () => {
        const res = await supertest(app).get('/microphones/5f932d1662eb942088076f30');

        // Check that the status and headers of the response are correct
        expect(res.status, 'res-status').to.equal(200);
        expect(res.get('Content-type'), 'res.headers.Content-Type').to.have.string('application/json');

        // Check that the response body is an array.
        const { body } = res;
        expect(body, 'res.body').to.be.an('object');

        // check for required fields
        expect(body, 'res.body').to.include.all.keys(
            '__v',
            '_id',
            'name',
            'manufactor',
            'year',
            'technology',
            'preamp',
            'user',
            'createdAt',
            'updatedAt',
        );
        expect(body.name, 'res.body.name').to.be.a('string');
        expect(body.manufactor, 'res.body.manufactor').to.be.a('string');
        expect(body.year, 'res.body.year').to.be.a('number');
        expect(body.technology, 'res.body.technology').to.be.a('string');
        expect(body.preamp, 'res.body.preamp').to.be.a('string');
        expect(body.specs, 'res.body.specs').to.be.a('object');
        expect(body.specs.frequencyRange, 'res.body.specs.frequencyRange').to.be.a('object');
        expect(body.specs.frequencyRange.low, 'res.bod].specs.frequencyRange.low').to.be.a('number');
        expect(body.specs.frequencyRange.high, 'res.bod].specs.frequencyRange.high').to.be.a('number');
        expect(body.specs.maxSpl, 'res.body.specs.maxSpl').to.be.a('number');
        expect(body.specs.sNRatio, 'res.body.specs.sNRatio').to.be.a('number');
        expect(body.specs.sensitivity, 'res.body.specs.sensitivity').to.be.a('number');
        expect(body.specs.distortion, 'res.body.specs.distortion').to.be.a('number');
        expect(body.specs.distortion, 'res.body.specs.distortion').to.be.above(0);
        expect(body.specs.distortion, 'res.body.specs.distortion').to.be.below(1);
        expect(body.image, 'res.body.image').to.be.a('string');
        expect(body.rating, 'res.body.rating').to.be.a('number');
        expect(body.rating, 'res.body.rating').to.be.above(0);
        expect(body.rating, 'res.body.rating').to.be.below(5);
        expect(body.user, 'res.body.user').to.be.a('string');
    });
});

describe('POST /microphones/', async () => {
    before(async () => dbman.start());
    after(async () => dbman.stop());
    afterEach(async () => dbman.cleanup());
    beforeEach(async () => {});

    it('should create a new microphone', async () => {
        const mic = await generateMicBodyRequest();
        const token = await generateUserValidJwt(user);
        const res = await supertest(app).post('/microphones/').send(mic).set('Authorization', `Bearer ${token}`);

        // Check that the status and headers of the response are correct
        expect(res.status, 'res-status').to.equal(201);
        expect(res.get('Content-type'), 'res.headers.Content-Type').to.have.string('application/json');

        // Check that the response body is an array.
        const { body } = res;
        expect(body, 'res.body').to.be.an('object');

        // check for required fields
        expect(body, 'res.body').to.include.all.keys(
            '__v',
            '_id',
            'name',
            'manufactor',
            'year',
            'technology',
            'preamp',
            'user',
            'createdAt',
            'updatedAt',
        );
        expect(body.name, 'res.body.name').to.be.a('string');
        expect(body.manufactor, 'res.body.manufactor').to.be.a('string');
        expect(body.year, 'res.body.year').to.be.a('number');
        expect(body.technology, 'res.body.technology').to.be.a('string');
        expect(body.preamp, 'res.body.preamp').to.be.a('string');
        expect(body.specs, 'res.body.specs').to.be.a('object');
        expect(body.specs.frequencyRange, 'res.body.specs.frequencyRange').to.be.a('object');
        expect(body.specs.frequencyRange.low, 'res.bod].specs.frequencyRange.low').to.be.a('number');
        expect(body.specs.frequencyRange.high, 'res.bod].specs.frequencyRange.high').to.be.a('number');
        expect(body.specs.maxSpl, 'res.body.specs.maxSpl').to.be.a('number');
        expect(body.specs.sNRatio, 'res.body.specs.sNRatio').to.be.a('number');
        expect(body.specs.sensitivity, 'res.body.specs.sensitivity').to.be.a('number');
        expect(body.specs.distortion, 'res.body.specs.distortion').to.be.a('number');
        expect(body.specs.distortion, 'res.body.specs.distortion').to.be.above(0);
        expect(body.specs.distortion, 'res.body.specs.distortion').to.be.below(1);
        expect(body.image, 'res.body.image').to.be.a('string');
        expect(body.rating, 'res.body.rating').to.be.a('number');
        expect(body.rating, 'res.body.rating').to.be.above(0);
        expect(body.rating, 'res.body.rating').to.be.below(5);
        expect(body.user, 'res.body.user').to.be.a('string');
    });

    it('should not accept a request whitout auth token', async () => {
        const mic = await generateMicBodyRequest();
        const res = await supertest(app).post('/microphones/').send(mic);

        // Check that the status and headers of the response are correct
        expect(res.status, 'res-status').to.equal(401);
        expect(res.get('Content-type'), 'res.headers.Content-Type').to.have.string('text/html');
    });
    it('should not accept a request whit an invalid token', async () => {
        let token = await generateUserValidJwt(user);
        token += 'invalid';
        const mic = await generateMicBodyRequest();
        const res = await supertest(app).post('/microphones/').send(mic).set('Authorization', `Bearer ${token}`);

        // Check that the status and headers of the response are correct
        expect(res.status, 'res-status').to.equal(401);
        expect(res.get('Content-type'), 'res.headers.Content-Type').to.have.string('text/html');
    });

    it('should not accept a request whit a non Barer token', async () => {
        const token = await generateUserValidJwt(user);
        const mic = await generateMicBodyRequest();
        const res = await supertest(app).post('/microphones/').send(mic).set('Authorization', `Barerrr ${token}`);

        // Check that the status and headers of the response are correct
        expect(res.status, 'res-status').to.equal(401);
        expect(res.get('Content-type'), 'res.headers.Content-Type').to.have.string('text/html');
    });

    it('should not accept a request whit an expired token', async () => {
        const token = await generateExpiredJwt(user);
        const mic = await generateMicBodyRequest();
        const res = await supertest(app).post('/microphones/').send(mic).set('Authorization', `Bearer ${token}`);

        // Check that the status and headers of the response are correct
        expect(res.status, 'res-status').to.equal(401);
        expect(res.get('Content-type'), 'res.headers.Content-Type').to.have.string('text/html');
    });
});

describe('PATCH /microphones/:id', async () => {
    before(async () => dbman.start());
    after(async () => {
        await dbman.stop();
    });
    afterEach(async () => {
        await dbman.cleanup();
    });
    beforeEach(async () => {
        const newUser = new User(user);
        newUser.isNew = true;
        newUser.save();
    });

    it('should update an existing microphone', async () => {
        const micBody = await generateMicBodyRequest();
        const mic = await generateMicList(0, user._id);
        const micId = mic._id.toString();
        const updatedMic = micBody;
        updatedMic.name = 'updatedMic';
        const token = await generateUserValidJwt(user);
        const res = await supertest(app).patch(`/microphones/${micId}`).send(updatedMic).set('Authorization', `Bearer ${token}`);

        // Check that the status and headers of the response are correct
        expect(res.status, 'res-status').to.equal(200);
        expect(res.get('Content-type'), 'res.headers.Content-Type').to.have.string('application/json');

        // Check that the response body is an array.
        const { body } = res;
        expect(body, 'res.body').to.be.an('object');

        // check for required fields
        expect(body, 'res.body').to.include.all.keys(
            '__v',
            '_id',
            'name',
            'manufactor',
            'year',
            'technology',
            'preamp',
            'user',
            'createdAt',
            'updatedAt',
        );
        expect(body.name, 'res.body.name').to.be.a('string');
        expect(body.name, 'res.body.name').to.be.equal(updatedMic.name);
        expect(body.manufactor, 'res.body.manufactor').to.be.a('string');
        expect(body.year, 'res.body.year').to.be.a('number');
        expect(body.technology, 'res.body.technology').to.be.a('string');
        expect(body.preamp, 'res.body.preamp').to.be.a('string');
        expect(body.specs, 'res.body.specs').to.be.a('object');
        expect(body.specs.frequencyRange, 'res.body.specs.frequencyRange').to.be.a('object');
        expect(body.specs.frequencyRange.low, 'res.bod].specs.frequencyRange.low').to.be.a('number');
        expect(body.specs.frequencyRange.high, 'res.bod].specs.frequencyRange.high').to.be.a('number');
        expect(body.specs.maxSpl, 'res.body.specs.maxSpl').to.be.a('number');
        expect(body.specs.sNRatio, 'res.body.specs.sNRatio').to.be.a('number');
        expect(body.specs.sensitivity, 'res.body.specs.sensitivity').to.be.a('number');
        expect(body.specs.distortion, 'res.body.specs.distortion').to.be.a('number');
        expect(body.specs.distortion, 'res.body.specs.distortion').to.be.above(0);
        expect(body.specs.distortion, 'res.body.specs.distortion').to.be.below(1);
        expect(body.image, 'res.body.image').to.be.a('string');
        expect(body.rating, 'res.body.rating').to.be.a('number');
        expect(body.rating, 'res.body.rating').to.be.above(0);
        expect(body.rating, 'res.body.rating').to.be.below(5);
        expect(body.user, 'res.body.user').to.be.a('string');
    });

    it('should not authorize to update a document from another user', async () => {
        const newUser2 = new User(user2);
        newUser2.isNew = true;
        newUser2.save();
        const micBody = await generateMicBodyRequest();
        const mic = await generateMicList(0, user._id);
        const micId = mic._id.toString();
        const token = await generateUserValidJwt(user2);
        const res = await supertest(app).patch(`/microphones/${micId}`).send(micBody).set('Authorization', `Bearer ${token}`);
        //Check that the status and headers of the response are correct
        expect(res.status, 'res-status').to.equal(401);
        expect(res.get('Content-type'), 'res.headers.Content-Type').to.have.string('text/html');
    });

    it('should authorize an admin to update a document from another user', async () => {
        const newAdmin = new User(admin);
        newAdmin.isNew = true;
        newAdmin.save();
        const micBody = await generateMicBodyRequest();
        const mic = await generateMicList(0, user._id);
        const micId = mic._id.toString();
        const updatedMic = micBody;
        updatedMic.name = 'updatedMic';
        const token = await generateAdminValidJwt(admin);
        const res = await supertest(app).patch(`/microphones/${micId}`).send(updatedMic).set('Authorization', `Bearer ${token}`);
        // Check that the status and headers of the response are correct
        expect(res.status, 'res-status').to.equal(200);
        expect(res.get('Content-type'), 'res.headers.Content-Type').to.have.string('application/json');

        // Check that the response body is an array.
        const { body } = res;
        expect(body, 'res.body').to.be.an('object');

        // check for required fields
        expect(body, 'res.body').to.include.all.keys(
            '__v',
            '_id',
            'name',
            'manufactor',
            'year',
            'technology',
            'preamp',
            'user',
            'createdAt',
            'updatedAt',
        );
        expect(body.name, 'res.body.name').to.be.a('string');
        expect(body.name, 'res.body.name').to.be.equal(updatedMic.name);
        expect(body.manufactor, 'res.body.manufactor').to.be.a('string');
        expect(body.year, 'res.body.year').to.be.a('number');
        expect(body.technology, 'res.body.technology').to.be.a('string');
        expect(body.preamp, 'res.body.preamp').to.be.a('string');
        expect(body.specs, 'res.body.specs').to.be.a('object');
        expect(body.specs.frequencyRange, 'res.body.specs.frequencyRange').to.be.a('object');
        expect(body.specs.frequencyRange.low, 'res.bod].specs.frequencyRange.low').to.be.a('number');
        expect(body.specs.frequencyRange.high, 'res.bod].specs.frequencyRange.high').to.be.a('number');
        expect(body.specs.maxSpl, 'res.body.specs.maxSpl').to.be.a('number');
        expect(body.specs.sNRatio, 'res.body.specs.sNRatio').to.be.a('number');
        expect(body.specs.sensitivity, 'res.body.specs.sensitivity').to.be.a('number');
        expect(body.specs.distortion, 'res.body.specs.distortion').to.be.a('number');
        expect(body.specs.distortion, 'res.body.specs.distortion').to.be.above(0);
        expect(body.specs.distortion, 'res.body.specs.distortion').to.be.below(1);
        expect(body.image, 'res.body.image').to.be.a('string');
        expect(body.rating, 'res.body.rating').to.be.a('number');
        expect(body.rating, 'res.body.rating').to.be.above(0);
        expect(body.rating, 'res.body.rating').to.be.below(5);
        expect(body.user, 'res.body.user').to.be.a('string');
    });

    it('should not accept a request whitout auth token', async () => {
        const micBody = await generateMicBodyRequest();
        const mic = await generateMicList(0, user._id);
        const micId = mic._id.toString();
        const updatedMic = micBody;
        updatedMic.name = 'updatedMic';
        const res = await supertest(app).patch(`/microphones/${micId}`).send(micBody);
        //Check that the status and headers of the response are correct
        expect(res.status, 'res-status').to.equal(401);
        expect(res.get('Content-type'), 'res.headers.Content-Type').to.have.string('text/html');
    });

    it('should not accept a request whit an invalid token', async () => {
        const micBody = await generateMicBodyRequest();
        const mic = await generateMicList(0, user._id);
        const micId = mic._id.toString();
        const updatedMic = micBody;
        updatedMic.name = 'updatedMic';
        let token = await generateUserValidJwt(user);
        token += 'invalid';
        const res = await supertest(app).patch(`/microphones/${micId}`).send(micBody).set('Authorization', `Bearer ${token}`);
        //Check that the status and headers of the response are correct
        expect(res.status, 'res-status').to.equal(401);
        expect(res.get('Content-type'), 'res.headers.Content-Type').to.have.string('text/html');
    });

    it('should not accept a request whit a non Barer token', async () => {
        const micBody = await generateMicBodyRequest();
        const mic = await generateMicList(0, user._id);
        const micId = mic._id.toString();
        const updatedMic = micBody;
        updatedMic.name = 'updatedMic';
        const token = await generateUserValidJwt(user);
        const res = await supertest(app).patch(`/microphones/${micId}`).send(micBody).set('Authorization', `Beareeer ${token}`);
        //Check that the status and headers of the response are correct
        expect(res.status, 'res-status').to.equal(401);
        expect(res.get('Content-type'), 'res.headers.Content-Type').to.have.string('text/html');
    });

    it('should not accept a request whit an expired token', async () => {
        const micBody = await generateMicBodyRequest();
        const mic = await generateMicList(0, user._id);
        const micId = mic._id.toString();
        const token = await generateExpiredJwt(user);
        const res = await supertest(app).patch(`/microphones/${micId}`).send(micBody).set('Authorization', `Bearer ${token}`);
        //Check that the status and headers of the response are correct
        expect(res.status, 'res-status').to.equal(401);
        expect(res.get('Content-type'), 'res.headers.Content-Type').to.have.string('text/html');
    });
});

describe('DELETE /microphones/:id', async () => {
    before(async () => dbman.start());
    after(async () => {
        await dbman.stop();
    });
    afterEach(async () => {
        await dbman.cleanup();
    });
    beforeEach(async () => {
        const newUser = new User(user);
        newUser.isNew = true;
        newUser.save();
    });

    it('should delete an existing microphone', async () => {
        const mic = await generateMicList(0, user._id);
        const micId = mic._id.toString();
        const token = await generateUserValidJwt(user);
        const res = await supertest(app).delete(`/microphones/${micId}`).set('Authorization', `Bearer ${token}`);

        // Check that the status and headers of the response are correct
        expect(res.status, 'res-status').to.equal(200);
        expect(res.get('Content-type'), 'res.headers.Content-Type').to.have.string('application/json');
    });

    it('should not authorize to delete a document from another user', async () => {
        const newUser2 = new User(user2);
        newUser2.isNew = true;
        newUser2.save();
        const mic = await generateMicList(0, user._id);
        const micId = mic._id.toString();
        const token = await generateUserValidJwt(user2);
        const res = await supertest(app).delete(`/microphones/${micId}`).set('Authorization', `Bearer ${token}`);
        //Check that the status and headers of the response are correct
        expect(res.status, 'res-status').to.equal(401);
        expect(res.get('Content-type'), 'res.headers.Content-Type').to.have.string('text/html');
    });

    it('should authorize an admin to update a document from another user', async () => {
        const newAdmin = new User(admin);
        newAdmin.isNew = true;
        newAdmin.save();
        const mic = await generateMicList(0, user._id);
        const micId = mic._id.toString();
        const token = await generateAdminValidJwt(admin);
        const res = await supertest(app).delete(`/microphones/${micId}`).set('Authorization', `Bearer ${token}`);
        // Check that the status and headers of the response are correct
        expect(res.status, 'res-status').to.equal(200);
        expect(res.get('Content-type'), 'res.headers.Content-Type').to.have.string('application/json');
    });

    it('should not accept a request whitout auth token', async () => {
        const mic = await generateMicList(0, user._id);
        const micId = mic._id.toString();
        const res = await supertest(app).delete(`/microphones/${micId}`);
        //Check that the status and headers of the response are correct
        expect(res.status, 'res-status').to.equal(401);
        expect(res.get('Content-type'), 'res.headers.Content-Type').to.have.string('text/html');
    });

    it('should not accept a request whit an invalid token', async () => {
        const mic = await generateMicList(0, user._id);
        const micId = mic._id.toString();
        let token = await generateUserValidJwt(user);
        token += 'invalid';
        const res = await supertest(app).delete(`/microphones/${micId}`).set('Authorization', `Bearer ${token}`);
        //Check that the status and headers of the response are correct
        expect(res.status, 'res-status').to.equal(401);
        expect(res.get('Content-type'), 'res.headers.Content-Type').to.have.string('text/html');
    });

    it('should not accept a request whit a non Barer token', async () => {
        const mic = await generateMicList(0, user._id);
        const micId = mic._id.toString();
        const token = await generateUserValidJwt(user);
        const res = await supertest(app).delete(`/microphones/${micId}`).set('Authorization', `Beareeer ${token}`);
        //Check that the status and headers of the response are correct
        expect(res.status, 'res-status').to.equal(401);
        expect(res.get('Content-type'), 'res.headers.Content-Type').to.have.string('text/html');
    });

    it('should not accept a request whit an expired token', async () => {
        const mic = await generateMicList(0, user._id);
        const micId = mic._id.toString();
        const token = await generateExpiredJwt(user);
        const res = await supertest(app).delete(`/microphones/${micId}`).set('Authorization', `Bearer ${token}`);
        //Check that the status and headers of the response are correct
        expect(res.status, 'res-status').to.equal(401);
        expect(res.get('Content-type'), 'res.headers.Content-Type').to.have.string('text/html');
    });
});
