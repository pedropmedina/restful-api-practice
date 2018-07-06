const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
	const token = req.header('x-auth-token');

	if (!token) return res.status(401).send('Access denied. No token provided');

	jwt.verify(token, 'secret', (err, decoded) => {
		if (err) return res.status(400).send('Unauthorized request');
		req.user = decoded;
		next();
	});
};

module.exports = auth;
