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
		required: true,
	},
	password: {
		type: String,
		minlength: 5,
		required: true,
	},
});

// mongoose custom methods
userSchema.methods.generateAuthToken = function() {
	const user = this;

	const token = jwt.sign({ _id: user._id, isAdmin: false }, 'secret');
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
