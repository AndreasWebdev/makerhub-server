const express = require('express');
const nanoid = require('nanoid');
const router = express.Router();
const db = require('../db');

router.route('/login').get(function(req, res, next) {
	let username = req.query.username;
	let password = req.query.password;
	
	// Check if user exists
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
	});
})

router.route('/logout').get(function(req, res, next) {
	let securityKey = req.query.key;
	
	db.query("UPDATE `users` SET `security_key` = '" + nanoid() + "' WHERE `security_key` = '" + securityKey + "'", function(error) {
		if(error) {
			next(error);
		} else {
			res.status(200);
			res.send(JSON.stringify("Logged out successfully!"));
		}
	});
});

router.route('/ping').get(function(req, res, next) {
	let securityKey = req.query.key;
	
	db.query("SELECT * FROM users WHERE security_key = '" + securityKey + "'", function(error, results) {
		if(error) {
			next(error);
		} else {
			if(results.length > 0) {
				res.sendStatus(200);
			} else {
				res.sendStatus(403);
			}
		}
	});
});

router.route('/me').get(function(req, res, next) {
	let securityKey = req.query.key;
	
	db.query("SELECT * FROM users WHERE security_key = '" + securityKey + "'", function(error, results) {
		if(error) {
			next(error);
		} else {
			res.send(JSON.stringify(results));
		}
	});
});

module.exports = router;