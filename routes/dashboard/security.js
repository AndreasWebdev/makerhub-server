const path = require('path');
const express = require('express');
const router = express.Router();
const mhsApi = require('../makerhubserver-api.js');

router.route('/login').get(function(req, res, next) {
	let sessionKey = req.session.key;

	if(sessionKey) {
		mhsApi.ping(sessionKey).then(apiRes => {
			if(apiRes) {
				res.redirect('/dashboard');
			} else {
				res.render(path.join(__dirname, '../../src/views/dashboard/login.twig'));
			}
		});
	} else {
		res.render(path.join(__dirname, '../../src/views/dashboard/login.twig'));
	}
}).post(function(req, res, next) {
	let vars = [];

	let username = req.fields.login_username;
	let password = req.fields.login_password;

	mhsApi.login(username, password).then(apiRes => {
		if(apiRes.status === 200) {
			// Set Session
			req.session.key = apiRes.data.key;

			// Redirect
			res.redirect('/dashboard');
		} else if(apiRes.status === 403 || apiRes.status === 404) {
			vars["error"] = "The username and password you entered did not match our records. Please double-check and try again";
			res.render(path.join(__dirname, '../../src/views/dashboard/login.twig'), {vars: vars});
		} else if(apiRes.status === 429) {
			vars["error"] = "Too many failed login attempts! Please try again in 5 minutes!";
			res.render(path.join(__dirname, '../../src/views/dashboard/login.twig'), {vars: vars});
		} else {
			vars["error"] = "Unknown Server Error. Please try again later!";
			res.render(path.join(__dirname, '../../src/views/dashboard/login.twig'), {vars: vars});
		}
	});
});

router.route('/register').get(function(req, res, next) {
	res.render(path.join(__dirname, '../../src/views/dashboard/register.twig'));
});

router.route('/logout').get(function(req, res, next) {
	let sessionKey = req.session.key;

	if(sessionKey) {
		// Logout from API
		mhsApi.logout(req.session.key).then(apiRes => {
			// Remove Session
			req.session.key = "";

			// Redirect to Login
			res.redirect('/dashboard/login');
		});
	} else {
		res.redirect('/dashboard/login');
	}
});

module.exports = router;