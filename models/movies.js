const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genres');





const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        trim: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }, 
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    genre: {
        type: genreSchema,
        required: true
    }

});

const Movie = mongoose.model('Movies', movieSchema);


function validate(movie) {
    const schema = Joi.object({
        title: Joi.string().required().min(5).max(255),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    });

    return schema.validate(movie);
}


exports.Movie = Movie;
exports.validate = validate;