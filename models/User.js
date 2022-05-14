const { Schema, model } = require('mongoose');
const validateEmail = require('../utils/validateEmail');
const uniqueValidator = require('mongoose-unique-validator');


const UserSchema = new Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: 'Email is associated with another username!',
            required: 'Email address is required',
            validate: [validateEmail, 'Please enter a valid email address'],
            // match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid email address'], // could use a match statement instead.
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// valdate unique: true; string is passed above as unique: '... username!'
UserSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });

const User = model('User', UserSchema);

module.exports = User;