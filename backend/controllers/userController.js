const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const utils = require('../middleware/utils');
const config = require('../config/config');

const { checkIfAdmin } = require('../middleware/auth/authMiddleware');

/**
 * @desc Log in a user
 * @route POST /users/login
 * @param {*} req.email
 * @param {*} req.password
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: await generateToken(user._id),
        });
    } else {
        return res.status(400).send({ message: 'Invalid credentials' });
        // throw new Error('Invalid credentials');
    }
});

/**
 * @desc Create a new user
 * @route POST /users/
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // check if user exists
    const userExists = await User.findOne({ email: email });
    if (userExists) {
        return res.status(400).send({ error: 'This email adress is already used' });
        // throw new Error('User already exists');
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        isAdmin: false,
    });
    if (user) {
        res.status(201)
            .set('Location', `${config.baseUrl}/users/${user._id}`)
            .json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: await generateToken(user._id),
            });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

/**
 * @desc Retrieve the authenticated user's data
 * @route GET /users/me
 * @access Private
 */
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    const roles = await checkIfAdmin(user);
    res.status(200).set('Location', `${config.baseUrl}/users/${user._id}`).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        roles: roles,
    });
});

/* --- METHODS --- */

/**
 * Generate a JWT token
 *
 * @param {*} id
 */
const generateToken = asyncHandler(async (id) => {
    const payload = {
        userId: id.toString(),
        roles: await checkIfAdmin(id),
    };
    return jwt.sign(payload, config.secretKey, { expiresIn: '0' });
});

module.exports = {
    registerUser,
    loginUser,
    getUser,
};
