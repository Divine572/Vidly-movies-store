const mongoose = require('mongoose');
const Joi = require('joi');


const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

const Genre = mongoose.model('Genre', genreSchema);



function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string()
        .min(5)
        .max(50)
        .required()
    });
    
    return schema.validate({name: genre});
}

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validate = validateGenre;