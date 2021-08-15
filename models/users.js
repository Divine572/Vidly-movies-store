const mongoose = require('mongoose');
const Joi = require('joi');



const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
}));

function validate(user) {
    const schema = Joi.object({
        name: Joi.string().required().min(5).max(50),
        email: Joi.string().required().min(5).max(50).email(),
        password: Joi.string().required().min(5).max(1024)
    });

    return schema.validate(user);
}


exports.User = User;
exports.validate = validate;