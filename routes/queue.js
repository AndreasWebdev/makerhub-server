const express = require('express');
const nanoid = require('nanoid');
const router = express.Router();
const db = require('../db');

router.route('/add').get(function(req, res, next) {
	let qForUser = req.query.forUser;
	let qLevelCode = req.query.levelCode;
	let qLevelTitle = req.query.levelTitle;
	let qLevelCreator = req.query.levelCreator;
	let qRequestedBy = req.query.requestedBy;
	let qComment = req.query.comment;
	let qRequestedTime = Date.now();
	
	// Todo: Add Query
});

router.route('/complete').get(function(req, res, next) {
	let securityKey = req.query.key;
	let qLevelID = req.query.levelID;
	let qHighscoreTime = req.query.highscoreTime;
	
	// Todo: Add Query
});

router.route('/toggle').get(function(req, res, next) {
	let securityKey = req.query.key;
	let qNewStatus = req.query.newStatus || false;
	
	db.query("UPDATE `users` SET `queueOpen` = " + qNewStatus + " WHERE `security_key` = '" + securityKey + "'", function(error) {
		if(error) {
			next(error);
		} else {
			res.status(200);
			res.send(JSON.stringify("Queue toggled successfully!"));
		}
	});
});

router.route('/pending').get(function(req, res, next) {
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