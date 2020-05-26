const Member = require('../../models').Member;
const express = require('express');
const router = express.Router();

router.post('/add', (req, res, next) => {
	console.log(req.body);
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

module.exports = router;