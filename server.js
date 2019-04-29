const config = require('./config.json');
const env = process.env.NODE_ENV || 'development';

const atg = require('ascii-text-generator');

const express = require('express');
const app = express();

console.log("──────────────────────────────────────────────────────────────────────────────────────");
console.log(atg("MakerHub Studio", "1"));
console.log("                                Version 0.1.0");
console.log("──────────────────────────────────────────────────────────────────────────────────────");

// Setup Database Connection
const db = require('./db');

// Setup Routes
console.log('[ROUTES] Loading Routes...');

app.get('/', (req, res) => {
	return res.send('API Status: ready!');
});

app.use('/security', require('./routes/security'));
app.use('/queue', require('./routes/queue'));

// Error Handling
app.use(function(err, req, res, next) {
	console.log(err);
	
	if(env === 'development') {
		res.status(500);
		res.send(JSON.stringify(err));
	} else {
		res.sendStatus(500);
	}
});

app.listen(config.port, () => {
	console.log(`[EXPRESS] Started Server on Port ${config.port}!`);
});