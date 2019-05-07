const express = require('express');
const router = express.Router();
const db = require('../../db');
const mhsApi = require('../makerhubserver-api.js');

router.route('/').get(function(req, res, next) {
	let sessionKey = req.session.key;

	mhsApi.ping(sessionKey).then(apiRes => {
		if(apiRes) {
			res.sendStatus(200);
		} else {
			res.redirect("/dashboard/login");
		}
	});
});

module.exports = router;
