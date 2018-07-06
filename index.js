const express = require('express');
const morgan = require('morgan');
const mongoose = require('./db/mongoose');

const usersRouter = require('./routers/users');

const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('combined'));

app.use('/users', usersRouter);

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
