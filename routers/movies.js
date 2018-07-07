const express = require('express');

const router = express.Router();

const { fetchAllMovies, addMovie } = require('../controllers/movies');

router
	.route('/')
	.get(fetchAllMovies)
	.post(addMovie);

module.exports = router;
