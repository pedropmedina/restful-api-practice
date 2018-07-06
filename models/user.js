const mongoose = require('mongoose');
const { Schema } = mongoose;
const Joi = require('joi');
const jwt = require('jsonwebtoken');

// mongoose schema
const userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		minlength: 5,
	},
});

// mongoose custom methods
userSchema.methods.generateAuthToken = function() {
	const user = this;

	const timestamp = new Date().getTime();

	const token = jwt.sign({ _id: user._id, iat: timestamp }, 'secret');
	return token;
};

// mongoose model
const User = mongoose.model('User', userSchema);

// Joi schema to validate req.body
const validateUser = user => {
	const schema = Joi.object().keys({
		email: Joi.string()
			.email()
			.required(),
		password: Joi.string()
			.min(5)
			.required(),
	});

	return Joi.validate(user, schema);
};

module.exports = { User, validateUser };
