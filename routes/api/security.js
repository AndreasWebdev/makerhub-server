const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const nanoid = require('nanoid');
const router = express.Router();
const db = require('../../db');
const rateLimit = require("express-rate-limit");
const loginLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 5,
	skipSuccessfulRequests: true,
	message: "Too many failed login attempts, please try again in 15 minutes"
});
const registerLimiter = rateLimit({
	windowMs: 60 * 60 * 1000,
	max: 5,
	message: "Too many accounts created, please try again in 60 minutes"
});

router.route('/login').post(loginLimiter, function(req, res, next) {
	let username = req.fields.username;
	let password = req.fields.password;

	if(username !== undefined && password !== undefined) {
		// Check if user exists
		db.query("SELECT id,password FROM users WHERE username = ?", [username], function (error, results) {
			if (error) {
				next(error);
			} else {
				if (results.length > 0) {
					// check password
					if(bcrypt.compareSync(password, results[0].password)) {
						let userID = results[0].id;
						let newKey = nanoid();

						// Set new SecKey
						db.query("UPDATE `users` SET `security_key` = ? WHERE `id` = ?", [newKey, userID]);

						// Return SecKey
						res.status(200);
						res.send(JSON.stringify({key: newKey}));
					} else {
						res.sendStatus(403);
					}
				} else {
					// No user found
					res.sendStatus(404);
				}
			}
		});
	} else {
		res.status(422);
		res.send(JSON.stringify("Required parameter missing! Please consult the docs!"));
	}
}).get(function(req, res) { res.sendStatus(405)});

router.route('/logout').post(function(req, res, next) {
	let securityKey = req.fields.key;

	if(securityKey !== undefined) {
		// Check if Security Key is valid
		db.query("SELECT * FROM users WHERE security_key = ?", [securityKey], function (error, results) {
			if (error) {
				next(error);
			} else {
				if (results.length > 0) {
					// Renew Security Key and tell nobody!
					db.query("UPDATE `users` SET `security_key` = ? WHERE `security_key` = ?", [nanoid(), securityKey], function (error) {
						if (error) {
							next(error);
						} else {
							res.status(200);
							res.send(JSON.stringify("Logged out successfully!"));
						}
					});
				} else {
					res.sendStatus(403);
				}
			}
		});
	} else {
		res.status(422);
		res.send(JSON.stringify("Required parameter missing! Please consult the docs!"));
	}
}).get(function(req, res) { res.sendStatus(405)});

router.route('/ping').post(function(req, res, next) {
	let securityKey = req.fields.key;

	if(securityKey !== undefined) {
		db.query("SELECT * FROM users WHERE security_key = ?", [securityKey], function (error, results) {
			if (error) {
				next(error);
			} else {
				if (results.length > 0) {
					res.sendStatus(200);
				} else {
					res.sendStatus(403);
				}
			}
		});
	} else {
		res.status(422);
		res.send(JSON.stringify("Required parameter missing! Please consult the docs!"));
	}
}).get(function(req, res) { res.sendStatus(405)});

router.route('/register').post(registerLimiter, function(req, res, next) {
	let qUsername = req.fields.username;
	let qPassword = req.fields.password;
	let qEmail = req.fields.email;

	if(qUsername !== undefined && qPassword !== undefined && qEmail !== undefined) {
		// Check if username or password is already in use
		db.query("SELECT * FROM `users` WHERE `username` = ? OR `email` = ?", [qUsername, qEmail], function (error, results) {
			if (error) {
				next(error);
			} else {
				if(results.length > 0) {
					// Username or email are in use
					res.status(409);
					res.send("Username or email is already used!");
				} else {
					// Username and email are unused

					// Generate security key for immediate login
					let securityKey = nanoid();

					// Insert new user
					db.query("INSERT INTO `users` (`id`, `username`, `password`, `email`, `security_key`) VALUES (NULL, ?, ?, ?, ?);", [qUsername, bcrypt.hashSync(qPassword), qEmail, securityKey], function(error) {
						if(error) {
							next(error);
						} else {
							res.status(200);
							res.send(JSON.stringify({key: securityKey}));
						}
					});
				}
			}
		});
	} else {
		res.status(422);
		res.send(JSON.stringify("Required parameter missing! Please consult the docs!"));
	}
}).get(function(req, res) { res.sendStatus(405)});

router.route('/me').post(function(req, res, next) {
	let securityKey = req.fields.key;

	if(securityKey !== undefined) {
		db.query("SELECT * FROM users WHERE security_key = ?", [securityKey], function (error, results) {
			if (error) {
				next(error);
			} else {
				if(results[0]) {
					// undefine password for security reasons
					results[0].password = undefined;

					res.send(JSON.stringify(results));
				} else {
					res.sendStatus(404);
				}
			}
		});
	} else {
		res.status(422);
		res.send(JSON.stringify("Required parameter missing! Please consult the docs!"));
	}
}).get(function(req, res) { res.sendStatus(405)});

module.exports = router;
