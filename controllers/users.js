const { User, validateUser } = require('../models/user');
const bcrypt = require('bcryptjs');

// singup new users
const signup = async (req, res, next) => {
	let { email, password } = req.body;

	const { error } = validateUser({ email, password });
	if (error) return res.status(422).send(error.details[0].message);

	try {
		let user = await User.findOne({ email });
		if (user) return res.status(422).send({ error: 'Email is in use' });

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		user = new User({ email, password: hash });

		await user.save();

		const token = user.generateAuthToken();

		res.header('x-auth-token', token).send(user);
	} catch (error) {
		console.log('error: ', error);
	}
};

// find current user
const findMe = async (req, res, next) => {
	const { _id } = req.user;

	try {
		const user = await User.findById(_id).select('-password');
		res.status(200).send(user);
	} catch (error) {
		console.log('error', error);
	}
};

module.exports = { signup, findMe };
