const path = require('path');
const express = require('express');
const router = express.Router();

router.route('/').get(function(req, res, next) {
	res.render(path.join(__dirname, '../../src/views/public/index.twig'));
});

router.route('/legal').get(function(req, res, next) {
	res.render(path.join(__dirname, '../../src/views/public/legal.twig'));
});

router.route('/privacy').get(function(req, res, next) {
	res.render(path.join(__dirname, '../../src/views/public/privacy.twig'));
});

module.exports = router;