const express = require('express');

// require router instance
const router = express.Router();

// middlewares
const auth = require('../middlewares/auth');

// require controllers
const { signup, findMe } = require('../controllers/users');

router.post('/signup', signup);
router.get('/me', auth, findMe);

module.exports = router;
