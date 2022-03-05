const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const utils = require('../middleware/utils');
const config = require('../config/config');

const {checkIfAdmin} = require('../middleware/auth/authMiddleware');

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: await generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
})


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    //check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400)
        throw new Error('User already exists');
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        isAdmin: false
    });

    if (user) {
        res.status(201).set('Location', `${config.baseUrl}/users/${user._id}`).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: await generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
})


const getUser = asyncHandler(async (req, res) => {
    res.json({ message: 'Get User data' })
})


/* --- METHODS --- */

/**
 * Generate a JWT token
 * 
 * @param {*} id 
 */
const generateToken = asyncHandler(async (id) => {
    const payload = {
        expiresIn: '30d',
        userId: id.toString(), 
        scope: await checkIfAdmin(id),
    };
    return jwt.sign(payload, config.secretKey);
})

module.exports = {
    registerUser,
    loginUser,
    getUser,
}