const express = require('express');
const nanoid = require('nanoid');
const router = express.Router();
const db = require('../db');
const rateLimit = require("express-rate-limit");
const addLimiter = rateLimit({
	windowMs: 5 * 60 * 1000,
	max: 10,
	message: "Entry limit reached, please try again in 5 minutes"
});

router.route('/add').get(addLimiter, function(req, res, next) {
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
	let qCompletedTime = ((req.query.completedTime || false) ? new Date().valueOf()/1000 : false);
	let qHighscoreTime = parseInt(req.query.highscoreTime);

	if(securityKey !== undefined && qLevelID !== undefined && qCompletedTime !== undefined && qHighscoreTime !== undefined) {
		// Get Queue Item
		db.query("SELECT * FROM `levelqueue` WHERE `id` = " + qLevelID + " AND `forUser` = (SELECT `id` FROM `users` WHERE `security_key` = '" + securityKey + "');", function(error, results) {
			if(error) {
				next(error);
			} else {
				if(results.length > 0) {
					let qForUser = results[0].foruser;
					let qLevelCode = results[0].levelcode;
					let qLevelTitle = results[0].leveltitle;
					let qLevelCreator = results[0].levelcreator;
					let qRequestedBy = results[0].requestedby;
					let qComment = results[0].comment;
					let qRequestedTime = results[0].requestedTime;

					// Add to History
					db.query("INSERT INTO `levelhistory` (`id`, `foruser`, `levelcode`, `leveltitle`, `levelcreator`, `requestedby`, `comment`, `requestedTime`, `completedTime`, `highscoreTime`) VALUES (NULL, '" + qForUser + "', '" + qLevelCode + "', '" + qLevelTitle + "', '" + qLevelCreator + "', '" + qRequestedBy + "', '" + qComment + "', " + qRequestedTime + ", " + qCompletedTime + ", " + qHighscoreTime + ");", function(error, results) {
                        if(error) {
                            next(error);
                        } else {
                            db.query("DELETE FROM `levelqueue` WHERE `id` = " + qLevelID, function(error) {
                            	if(error) {
                            		next(error);
								} else {
									res.sendStatus(200);
								}
							});
                        }
                    });
				} else {
					res.sendStatus(404);
				}
			}
		});
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