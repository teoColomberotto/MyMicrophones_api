/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const supertest = require('supertest');
const _ = require('lodash');
const {
    generateAdminValidJwt,
    generateUserValidJwt,
    generateExpiredJwt,
    generateMicList,
    generateMicBodyRequest,
} = require('./utils');
const app = require('../../app');
const User = require('../models/userModel');
const DBManager = require('./testDBHelper');

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

describe('POST /users/', async () => {
    before(async () => dbman.start());
    after(async () => dbman.stop());
    afterEach(async () => dbman.cleanup());
    beforeEach(async () => {});

    it('should create a new user', async () => {
        const userBody = {
            name: 'test user 1',
            password: 'Oilime3figli_',
            email: 'testmail@gmail.com',
        };
        const res = await supertest(app).post('/users/').send(userBody);

        // Check that the status and headers of the response are correct
        expect(res.status, 'res-status').to.equal(201);
        expect(res.get('Content-type'), 'res.headers.Content-Type').to.have.string('application/json');
        expect(res.get('Location'), 'res.headers.Location').to.have.string(`/users/${res.body._id}`);

        // Check that the response body is an array.
        const { body } = res;
        expect(body, 'res.body').to.be.an('object');

        // check for required fields in res
        expect(body, 'res.body').to.include.all.keys('_id', 'name', 'email', 'token');
    });

    it('should not create a user with an invalid password', async () => {
        const userBody = {
            name: 'test user 1',
            password: 'oilime3figli',
            email: 'testmail@gmail.com',
        };
        const res = await supertest(app).post('/users/').send(userBody);

        // Check that the status and headers of the response are correct
        expect(res.status, 'res-status').to.equal(400);
        expect(res.get('Content-type'), 'res.headers.Content-Type').to.have.string('application/json');
    });

    it('should not create a user with an invalid mail', async () => {
        const userBody = {
            name: 'test user 1',
            password: 'oilime3figli_',
            email: 'testmailgmail.com',
        };
        const res = await supertest(app).post('/users/').send(userBody);

        // Check that the status and headers of the response are correct
        expect(res.status, 'res-status').to.equal(400);
        expect(res.get('Content-type'), 'res.headers.Content-Type').to.have.string('application/json');
    });

    it('should not create a user with an existing email', async () => {
        const existingUser = new User(user);
        existingUser.isNew = true;
        await existingUser.save();
        const userBody = {
            name: 'test user',
            password: 'Oilime3figli_1',
            email: 'testmail@gmail.com',
        };
        const res = await supertest(app).post('/users/').send(userBody);

        // Check that the status and headers of the response are correct
        expect(res.status, 'res-status').to.equal(400);
        expect(res.get('Content-type'), 'res.headers.Content-Type').to.have.string('application/json');
    });
});

describe('POST /users/login', async () => {
    before(async () => dbman.start());
    after(async () => dbman.stop());
    afterEach(async () => dbman.cleanup());
    beforeEach(async () => {});

    it('should log in an existing user', async () => {
        const existingUser = new User(user);
        existingUser.isNew = true;
        const salt = await bcrypt.genSalt(10);
        existingUser.password = await bcrypt.hash(existingUser.password, salt);
        await existingUser.save();
        const userBody = {
            password: 'Oilime3figli_1',
            email: 'testmail@gmail.com',
        };
        const res = await supertest(app).post('/users/login').send(userBody);

        // Check that the status and headers of the response are correct
        expect(res.status, 'res-status').to.equal(200);
        expect(res.get('Content-type'), 'res.headers.Content-Type').to.have.string('application/json');

        // check that the body is an object
        const { body } = res;
        expect(body, 'res.body').to.be.an('object');

        // check for required fields
        expect(body, 'res.body').to.include.all.keys('_id', 'name', 'email', 'token');

        expect(body.name, 'res.body.name').to.be.a('string');
        expect(body.email, 'res.body.email').to.be.equal(userBody.email);
        expect(body.token, 'res.body.token').to.be.a('string');
    });

    it('should not log in a non registered user', async () => {
        const userBody = {
            password: 'Oilime3figli_1',
            email: 'testmail@gmail.com',
        };
        const res = await supertest(app).post('/users/login').send(userBody);

        // Check that the status and headers of the response are correct
        expect(res.status, 'res-status').to.equal(400);
        expect(res.get('Content-type'), 'res.headers.Content-Type').to.have.string('application/json');
    });

    it('should not log in a user with an invalid password', async () => {
        const existingUser = new User(user);
        existingUser.isNew = true;
        const salt = await bcrypt.genSalt(10);
        existingUser.password = await bcrypt.hash(existingUser.password, salt);
        await existingUser.save();
        const userBody = {
            password: 'Oilime3figli',
            email: 'testmail@gmail.com',
        };
        const res = await supertest(app).post('/users/login').send(userBody);

        // Check that the status and headers of the response are correct
        expect(res.status, 'res-status').to.equal(400);
        expect(res.get('Content-type'), 'res.headers.Content-Type').to.have.string('application/json');
    });
});

describe('GET /users/me', async () => {
    before(async () => dbman.start());
    after(async () => dbman.stop());
    afterEach(async () => dbman.cleanup());
    beforeEach(async () => {
        const existingUser = new User(user);
        existingUser.isNew = true;
        await existingUser.save();
    });

    it("should retrieve the user's data", async () => {
        const token = await generateUserValidJwt(user);
        const res = await supertest(app).get('/users/me').set('Authorization', `Bearer ${token}`);

        // Check that the status and headers of the response are correct
        expect(res.status, 'res-status').to.equal(200);
        expect(res.get('Content-type'), 'res.headers.Content-Type').to.have.string('application/json');

        // check that the body is an object
        const { body } = res;
        expect(body, 'res.body').to.be.an('object');

        // check for required fields
        expect(body, 'res.body').to.include.all.keys('_id', 'name', 'email', 'roles');

        expect(body.name, 'res.body.name').to.be.a('string');
        expect(body._id, 'res.body._id').to.be.a('string');
        expect(body.email, 'res.body.email').to.be.equal(user.email);
        expect(body.roles, 'res.body.roles').to.be.a('string');
    });

    it('should not authorize a non logged user to views his data', async () => {
        const res = await supertest(app).get('/users/me');

        // Check that the status and headers of the response are correct
        expect(res.status, 'res-status').to.equal(401);
        expect(res.get('Content-type'), 'res.headers.Content-Type').to.have.string('text/html');
    });

    it('should not accept a request whit an invalid token', async () => {
        let token = await generateUserValidJwt(user);
        token += 'invalid';
        const res = await supertest(app).get('/users/me').set('Authorization', `Bearer ${token}`);
        // Check that the status and headers of the response are correct
        expect(res.status, 'res-status').to.equal(401);
        expect(res.get('Content-type'), 'res.headers.Content-Type').to.have.string('text/html');
    });

    it('should not accept a request whit a non Barer token', async () => {
        const token = await generateUserValidJwt(user);
        const res = await supertest(app).get('/users/me').set('Authorization', `Beareeer ${token}`);
        // Check that the status and headers of the response are correct
        expect(res.status, 'res-status').to.equal(401);
        expect(res.get('Content-type'), 'res.headers.Content-Type').to.have.string('text/html');
    });

    it('should not accept a request whit an expired token', async () => {
        const token = await generateExpiredJwt(user);
        const res = await supertest(app).get('/users/me').set('Authorization', `Bearer ${token}`);
        // Check that the status and headers of the response are correct
        expect(res.status, 'res-status').to.equal(401);
        expect(res.get('Content-type'), 'res.headers.Content-Type').to.have.string('text/html');
    });
});
