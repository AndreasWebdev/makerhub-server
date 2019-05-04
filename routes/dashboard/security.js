const path = require('path');
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

router.route('/login').get(function(req, res, next) {
	res.render(path.join(__dirname, '../../src/views/dashboard/login.twig'));
});
router.route('/login').post(function(req, res, next) {
	// Try to login
	
	res.render(path.join(__dirname, '../../src/views/dashboard/login.twig'));
});

router.route('/register').get(function(req, res, next) {
	res.render(path.join(__dirname, '../../src/views/dashboard/register.twig'));
});
router.route('/register').post(function(req, res, next) {
	// Try to Register
	
	res.render(path.join(__dirname, '../../src/views/dashboard/register.twig'));
});

router.route('/logout').get(function(req, res, next) {
	// Logout
	
	// Redirect to Index
	res.redirect('./');
});

module.exports = router;