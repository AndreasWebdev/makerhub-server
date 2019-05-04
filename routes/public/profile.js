const express = require('express');
const router = express.Router();
const db = require('../db');

router.route('/').get(function(req, res, next) {
	res.sendStatus(404);
});

router.route('/:username').get(function(req, res, next) {
	res.status(200);
	res.send("Profile of " + req.param(username));
});

router.route('/:username/submit').get(function(req, res, next) {
	res.status(200);
	res.send("Submit new level for " + req.param(username));
});

module.exports = router;