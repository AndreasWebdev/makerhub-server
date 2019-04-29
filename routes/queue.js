const express = require('express');
const nanoid = require('nanoid');
const router = express.Router();
const db = require('../db');

router.route('/add').get(function(req, res, next) {
	let qForUser = req.query.forUser;
	let qLevelCode = req.query.levelCode;
	
	/*
	db.query("SELECT id FROM users WHERE username = '" + username + "' AND password = '" + password + "'", function(error, results) {
		if(error) {
			next(error);
		} else {
			if(results.length > 0) {
				let userID = results[0].id;
				let newKey = nanoid();
				
				// Set new SecKey
				db.query("UPDATE `users` SET `security_key` = '" + newKey + "' WHERE `id` = " + userID);
				
				// Return SecKey
				res.status(200);
				res.send(JSON.stringify({key: newKey}));
			} else {
				// No user found
				res.sendStatus(403);
			}
		}
	}); */
});

router.route('/my').get(function(req, res, next) {
	let securityKey = req.query.key;
	
	db.query("SELECT * FROM levelqueue WHERE foruser = (SELECT id FROM users WHERE security_key = '" + securityKey + "');", function(error, results) {
		if(error) {
			next(error);
		} else {
			res.send(JSON.stringify(results));
		}
	});
});

module.exports = router;