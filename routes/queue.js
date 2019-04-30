const express = require('express');
const nanoid = require('nanoid');
const router = express.Router();
const db = require('../db');

router.route('/add').get(function(req, res, next) {
	let qForUser = parseInt(req.query.forUser);
	let qLevelCode = req.query.levelCode;
	let qLevelTitle = req.query.levelTitle;
	let qLevelCreator = req.query.levelCreator;
	let qRequestedBy = req.query.requestedBy;
	let qComment = req.query.comment;
	let qRequestedTime = new Date().valueOf()/1000;

	if(qForUser !== undefined && qLevelCode !== undefined && qLevelTitle !== undefined && qLevelCreator !== undefined) {
		// Check if queue is open
		db.query("SELECT `queueOpen` FROM `users` WHERE `id` = " + qForUser, function(error, results) {
			if(error) {
				next(error);
			} else {
				if(results[0].queueOpen === 1) {
					// Queue is open
					// Add level to queue
					db.query("INSERT INTO `levelqueue` (`id`, `foruser`, `levelcode`, `leveltitle`, `levelcreator`, `requestedby`, `comment`, `requestedTime`) VALUES (NULL, '" + qForUser + "', '" + qLevelCode + "', '" + qLevelTitle + "', '" + qLevelCreator + "', '" + qRequestedBy + "', '" + qComment + "', '" + qRequestedTime + "');", function (error, results) {
						if (error) {
							next(error);
						} else {
							if(results.affectedRows > 0) {
								res.sendStatus(200);
							} else {
								res.sendStatus(500);
							}
						}
					});
				} else {
					// Queue is closed
					res.sendStatus(403);
				}
			}
		});
	} else {
		res.status(422);
		res.send(JSON.stringify("Required parameter missing! Please consult the docs!"));
	}
});

router.route('/complete').get(function(req, res, next) {
	let securityKey = req.query.key;
	let qLevelID = parseInt(req.query.levelID);
	let qHighscoreTime = parseInt(req.query.highscoreTime);

	if(securityKey !== undefined && qLevelID !== undefined && qHighscoreTime !== undefined) {
		// Todo: Add Query
	} else {
		res.status(422);
		res.send(JSON.stringify("Required parameter missing! Please consult the docs!"));
	}
});

router.route('/toggle').get(function(req, res, next) {
	let securityKey = req.query.key;
	let qNewStatus = req.query.newStatus || false;

	if(securityKey !== undefined && qNewStatus !== undefined) {
		db.query("UPDATE `users` SET `queueOpen` = " + qNewStatus + " WHERE `security_key` = '" + securityKey + "'", function (error) {
			if (error) {
				next(error);
			} else {
				res.status(200);
				res.send(JSON.stringify("Queue toggled successfully!"));
			}
		});
	} else {
		res.status(422);
		res.send(JSON.stringify("Required parameter missing! Please consult the docs!"));
	}
});

router.route('/pending').get(function(req, res, next) {
	let securityKey = req.query.key;

	if(securityKey !== undefined) {
		db.query("SELECT * FROM levelqueue WHERE foruser = (SELECT id FROM users WHERE security_key = '" + securityKey + "');", function (error, results) {
			if (error) {
				next(error);
			} else {
				res.send(JSON.stringify(results));
			}
		});
	} else {
		res.status(422);
		res.send(JSON.stringify("Required parameter missing! Please consult the docs!"));
	}
});

module.exports = router;