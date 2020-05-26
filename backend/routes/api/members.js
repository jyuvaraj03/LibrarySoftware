const Member = require('../../models').Member;
const authConfig = require('../../config/auth_config.json');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

router.post('/add', (req, res, next) => {
	// console.log(req.body);
	Member.create(req.body)
		.then(member => {
			console.log('created member id', member.id);
			res.status(200).json({
				success: true,
				msg: `Created a new user with id ${member.id}`,
				id: member.id
			});
		})
		.catch(err => {
			// TODO: Build error handling correctly
			console.log('error while creating member', err);
			if (err.name)
			res.status(500).json({
				success: false,
				msg: `Could not create new user`,
				error: err.name
			});
		});
});

router.post('/authenticate', (req, res, next) => {
	// console.log(req.body);
	const { email, password } = req.body;
	Member.findOne({
		where: {
			email: email
		}
	})
		.then(member => {
			if (member === null) {
				res.status(401)
					.json({
						success: false,
						error: 'Invalid email oor password'
					});
			} else if (member) {
				member.isCorrectPassword(password, (err, result) => {
					if (err) {
						res.status(500)
							.json({
								success: false,
								msg: 'Internal error',
								error: err
							});
					} else if (!result) {
						res.status(401)
							.json({
								success: false,
								error: 'Invalid email or password'
							});
					} else if (result) {
						const payload = { member_id: member.id };
						const token = jwt.sign(payload, authConfig.jwt_secret);
						res.cookie('member_token', token, { httpOnly: true })
							.sendStatus(200);
					}
				})
			}
		})
		.catch(err => {
			// TODO: Better error handling
			res.status(500)
				.json({
					success: false,
					msg: err.name,
					error: err
				});
		});
})

module.exports = router;