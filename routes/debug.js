const express = require('express');
const router = express.Router();

router.route('/').get(function(req, res) {
	res.send("Debug: Sup?");
});

module.exports = router;