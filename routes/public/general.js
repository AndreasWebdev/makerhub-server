const express = require('express');
const router = express.Router();

router.route('/').get(function(req, res, next) {
	res.sendStatus(200);
});

router.route('/legal').get(function(req, res, next) {
	res.sendStatus(200);
});

router.route('/privacy').get(function(req, res, next) {
	res.sendStatus(200);
});

module.exports = router;