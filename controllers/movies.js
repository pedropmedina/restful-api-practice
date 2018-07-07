const { Movie, validateMovie } = require('../models/movie');

const fetchAllMovies = async (req, res) => {
	try {
		const movies = await Movie.find({});
		res.status(200).send(movies);
	} catch (error) {
		console.log('error', error);
	}
};

const addMovie = async (req, res) => {
	const { title, director, actors } = req.body;

	const body = { title, director, actors };

	const { error } = validateMovie(body);
	if (error) return res.status(400).send(error.details[0].message);

	const movie = new Movie(body);

	await movie.save();

	res.status(200).send(movie);
};

module.exports = { fetchAllMovies, addMovie };
