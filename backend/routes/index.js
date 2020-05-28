var express = require('express');
var router = express.Router();
var middlewares = require('../middlewares');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/mydetails', middlewares.authJwt.verifyToken, function(req, res, next) {
	res.json({
		userId: req.userId
	});
});

module.exports = router;
