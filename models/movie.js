const mongoose = require('mongoose');
const { Schema } = mongoose;
const Joi = require('joi');

const validateMovie = movie => {
	const schema = Joi.object().keys({
		title: Joi.string().required(),
		director: Joi.string().required(),
		actors: Joi.array(),
	});
	return Joi.validate(movie, schema);
};

const movieSchema = new Schema({
	title: { type: String, required: true },
	year: { type: Date, default: new Date().getFullYear() },
	director: { type: String, required: true },
	actors: [String],
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = { Movie, validateMovie };
