var models = require('../models');
var express = require('express');
var router = express.Router();
var { Op } = require('sequelize');

router.get('/id/:searchTerm', function(req, res, next) {
	models.Book.findAll({
		where: {
			id: Number(req.params.searchTerm)
		}
	})
		.then(result => {
			res.json(result);
		})
		.catch(err => {
			res.status(500).json({success: false, msg: `Something went wrong ${err}`});
		});
});

router.get('/name/:searchTerm', function(req, res, next) {
	models.Book.findAll({
		where: {
			name: {
				[Op.substring]: req.params.searchTerm
			}
		}
	})
		.then(result => {
			res.json(result);
		})
		.catch(err => {
			res.status(500).json({success: false, msg: `Something went wrong ${err}`});
		});
});

router.get('/author/:searchTerm', function(req, res, next) {
	models.Book.findAll({
		where: {
			author: {
				[Op.substring]: req.params.searchTerm
			}
		}
	})
		.then(result => {
			res.json(result);
		})
		.catch(err => {
			res.status(500).json({success: false, msg: `Something went wrong ${err}`});
		});
});

router.get('/publisher/:searchTerm', function(req, res, next) {
	models.Book.findAll({
		where: {
			publisher: {
				[Op.substring]: req.params.searchTerm
			}
		}
	})
		.then(result => {
			res.json(result);
		})
		.catch(err => {
			res.status(500).json({success: false, msg: `Something went wrong ${err}`});
		});
});

router.get('/year/:searchTerm', function(req, res, next) {
	models.Book.findAll({
		where: {
			year: req.params.searchTerm
		}
	})
		.then(result => {
			res.json(result);
		})
		.catch(err => {
			res.status(500).json({success: false, msg: `Something went wrong ${err}`});
		});
});

router.get('/all/:searchTerm', function(req, res, next) {
	models.Book.findAll({
		where: {
			[Op.or]: [
				{
					name: {
						[Op.substring]: req.params.searchTerm
					}
				},
				{
					author: {
						[Op.substring]: req.params.searchTerm
					}
				},
				{
					publisher: {
						[Op.substring]: req.params.searchTerm
					}
				},
			]
		}
	})
		.then(result => {
			res.json(result);
		})
		.catch(err => {
			res.status(500).json({success: false, msg: `Something went wrong ${err}`});
		});
});

module.exports = router;
