const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv').config();
const micsRouter = require('./backend/routes/microphones');
const usersRouter = require('./backend/routes/users');
const { swaggerDocs } = require('./backend/documentation/swagger');
const { errorHandler } = require('./backend/middleware/errors/errorHandler');

const port = process.env.PORT || 5000;

const connectDB = require('./backend/config/db');

connectDB();
const app = express();

// view engine setup
app.set('views', path.join(__dirname, './backend/views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/microphones', micsRouter);
app.use('/users', usersRouter);
swaggerDocs(app, process.env.PORT);
// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });

// error handler
app.use(errorHandler);

module.exports = app;
