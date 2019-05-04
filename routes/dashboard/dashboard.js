const express = require('express');
const router = express.Router();
const db = require('../../db');

router.route('/').get(function(req, res, next) {
	res.sendStatus(200);
});

module.exports = router;