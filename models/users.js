const mongoose = require('mongoose');

//create user schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
        max: 80
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        max: 80
    },
    password: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        max: 80
    },
    resetLink: {
        type: String,
        default: ""
    }
}, { timestamps: true })

module.exports = mongoose.model('users', userSchema)