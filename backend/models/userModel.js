const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;
const { Schema } = mongoose;

/**
 * @openapi
 * components:
 *  schemas:
 *   User:
 *    type: object
 *    required:
 *     - name
 *     - email
 *     - password
 *    properties:
 *     name:
 *      type: string
 *      description: the user's name
 *      example: John Doe
 *     password:
 *      type: string
 *      description: the user's password
 *      example: MyPassword1_
 *     email:
 *      type: string
 *      description: the user's email adress
 *      example: testmail@gmail.com
 *     isAdmin:
 *      type: boolean
 *      description: an admin role identifier
 *      default: false
 */
const userSchema = new Schema(
    {
        name: {
            type: String,
            maxLenght: 50,
            required: true,
            unique: true,
            validate:
                // Manually validate uniqueness to send a "pretty" validation error
                // rather than a MongoDB duplicate key error
                [
                    {
                        validator: validateUserNameUniqueness,
                        message: 'Person: {VALUE} already exists',
                    },
                ],
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

/**
 * Given a username, calls the callback function with true if no user exists with that name
 * (or the only user that exists is the same as the person being validated).
 */
function validateUserNameUniqueness(value) {
    return this.constructor
        .findOne()
        .where('name')
        .equals(value)
        .exec()
        .then((existingUser) => {
            return !existingUser || existingUser._id.equals(this._id);
        });
}

/**
 * Removes extra MongoDb properties from serialized faq
 *
 * @param {*} doc
 * @param {*} json
 * @param {*} options
 */
function transformJsonUser(doc, json, options) {
    // remove MongoDb _v & _id
    delete json._id;
    delete json._v;

    if (!(json.userId instanceof ObjectId)) {
        // if the item was populated, include it in the serialisation
        json.user = doc.userId.toJSON();
        json.userId = doc.userId._id;
    }

    return json;
}

module.exports = mongoose.model('User', userSchema);
