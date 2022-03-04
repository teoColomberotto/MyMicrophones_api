process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const { cleanUpDatabase } = require('./utils');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

beforeEach(cleanUpDatabase);


after(mongoose.disconnect);