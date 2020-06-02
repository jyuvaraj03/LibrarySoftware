const Book = require('../../models').Book;
const middlewares = require('../../middlewares');
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

router.post('/add', middlewares.authJwt.verifyToken, function(req, res, next) {
	const { name, author, publisher, year } = req.body;
	Book.create({
		name,
		author,
		publisher,
		year
	})
		.then(book => {
			console.log('Created book id', book.id);
			res.status(200).json({
				success: true,
				msg: `Created a new book with id ${book.id}`,
				id: book.id
			});
		})
		.catch(err => {
			// TODO: Build error handling correctly
			console.log('error while creating book', err);
			res.status(500).json({
				success: false,
				msg: `Could not create new book`,
				error: err.name
			});
		});
});

module.exports = router;