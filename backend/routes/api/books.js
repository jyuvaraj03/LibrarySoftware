const Book = require('../../models').Book;
const middlewares = require('../../middlewares');
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

router.post('/add', middlewares.authJwt.verifyAdmin, function(req, res, next) {
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

router.get('/count', function(req, res, next) {
	Book.count()
		.then(count => {
			res.status(200).json({
				success: true,
				msg: `There are ${count} books`,
				bookCount: count
			});
		})
		.catch(err => {
			console.log('Some error occurred', err);
			res.sendStatus(500);
		});
});

router.get('/list', function(req, res, next) {
	let { offset, limit } = req.query;
	console.log(req.query, req.body);
	console.log('fdsfaaaaaaaaaaaaaa', offset, limit)
	if (offset === undefined || limit === undefined) {
		return res.status(403).json({
			success: false,
			msg: `Offset or limit not given`
		});
	}
	offset = Number(offset);
	limit = Number(limit);
	Book.findAll({ offset, limit })
		.then(books => {
			console.log('books bro', books);
			res.status(200).json({
				success: true,
				msg: `Retrieved books with offset ${offset} and limit ${limit}`,
				books
			});
		})
		.catch(err => {
			console.log('Some error occurred while fetching books', err);
			res.sendStatus(500);
		});
});

router.patch('/:id', function(req, res, next) {
	const id = req.params.id;
	const { name, author, publisher, year } = req.body;
	console.log({name, author, publisher, year});
	Book.update({
		name,
		author,
		publisher,
		year
	}, {
		where: {
			id
		}
	})
		.then(book => {
			console.log(book);
			res.status(200)
				.json({
					success: true
				});
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});

router.get('/:id', function(req, res, next) {
	const id = req.params.id;
	Book.findOne({
		where: {
			id
		}
	})
		.then(book => {
			console.log(book);
			res.status(200)
				.json({
					success: true,
					book
				});
		})
		.catch(err => {
			console.log(err);
			res.status(500)
				.json({
					success: false,
					msg: err.name
				});
		});
});

module.exports = router;