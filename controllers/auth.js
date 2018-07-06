const bcrypt = require('bcryptjs');
const { validateUser, User } = require('../models/user');

const login = async (req, res, next) => {
	const { email, password } = req.body;

	const { error } = validateUser({ email, password });
	if (error) return res.status(400).send(error.details[0].message);

	try {
		const user = await User.findOne({ email });
		if (!user) return res.status(404).send('Not user found with credentials.');

		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword)
			return res.status(400).send('Invalid email or password.');

		const token = user.generateAuthToken();

		res.status(200).send(token);
	} catch (error) {
		console.log('error ', error);
	}
};

module.exports = { login };
