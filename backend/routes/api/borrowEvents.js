const models = require('../../models');
const Book = models.Book;
const Member = models.Member;
const BorrowEvent = models.BorrowEvent;
const CompletedBorrowEvent = models.CompletedBorrowEvent;
const middlewares = require('../../middlewares');
const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const { 
	Op,
	ForeignKeyConstraintError,
	UniqueConstraintError
} = require('sequelize');
const moment = require('moment');

router.post('/new', middlewares.authJwt.verifyAdmin, function(req, res, next) {
	const { MemberId, BookId } = req.body;
	const now = moment();
	const dueDate = moment().add(15, 'days');
	BorrowEvent.create({
		MemberId,
		BookId,
		borrowedDate: now.format(),
		dueDate: dueDate.format()
	})
		.then(borrowEvent => {
			console.log('Created borrowEvent with id', borrowEvent.id);
			res.status(200).json({
				success: true,
				msg: `Created borrowEvent with id ${borrowEvent.id}`,
				id: borrowEvent.id
			});
		})
		.catch(err => {
			console.log(err);
			if (err instanceof ForeignKeyConstraintError) {
				return res.status(406)
					.json({
						success: false,
						err: err.name,
						fields: err.fields
					});
			} else if (err instanceof UniqueConstraintError) {
				return res.status(406)
					.json({
						success: false,
						err: err.name,
						fields: err.fields
					});
			}
			res.sendStatus(500);
		});
});

router.post('/return', middlewares.authJwt.verifyAdmin, function(req, res, next) {
	const { MemberId, BookId } = req.body;
	const now = moment();

	BorrowEvent.findOne({
		where: {
			MemberId,
			BookId
		}
	})
		.then(async borrowEvent => {
    		const { MemberId, BookId, borrowedDate } = borrowEvent;

    		await borrowEvent.destroy();

			CompletedBorrowEvent.create({
				MemberId,
				BookId,
				borrowedDate,
				returnedDate: now.format()
			})
				.then((completedBorrowEvent) => {
					res.status(200).json({
						success: true,
						completedBorrowEvent
					});
				})
				.catch(err => {
					console.log(err);
					res.sendStatus(500);
				});
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});

router.get('/list', middlewares.authJwt.verifyAdmin, function(req, res, next) {
	let { offset, limit } = req.query;
	offset = Number(offset) || 0;
	limit = Number(limit) || null;
	console.log('reqeru', req.query, offset, limit);
	BorrowEvent.findAll({ offset, limit })
		.then(borrowEvents => {
			console.log('all borrows', borrowEvents);
			res.status(200).json({
				success: true,
				borrowEvents
			});
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(200);
		});
});

module.exports = router;