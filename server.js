const version = require('./package.json').version;
const env = process.env.NODE_ENV || 'development';

const Logger = require('sw-node-logger');
let logger = new Logger([
	new Logger.DRIVERS.CONSOLE(),
	new Logger.DRIVERS.FILEROLLING({ logDirectory: './logs', fileNamePattern: 'server-' + env + '-<DATE>.log' })
]);
global.logger = logger;

const atg = require('ascii-text-generator');
console.log("──────────────────────────────────────────────────────────────────────────────────────");
console.log(atg("MakerHub Studio", "1"));
console.log("                                Version " + version);
console.log("──────────────────────────────────────────────────────────────────────────────────────");

logger.Log("[CONFIG] Loading config..");

// Load config
const config = require('./config.json');
if(config.version === undefined) {
	logger.Log("[CONFIG] Config not found!", Logger.TYPES.ERROR);
	process.exit();
} else {
	logger.Log("[CONFIG] Config Version " + config.version + " loaded!");
	if(version !== config.version) {
		logger.Log("[CONFIG] Config Version " + config.version + " might not be compatible with Server Version " + version, Logger.TYPES.WARN);
	}
}

const express = require('express');
const formidableMiddleware = require('express-formidable');
const session = require('express-session');
const app = express();
const twig = require("twig");

app.set( 'view engine', 'twig' );
app.set("twig options", {
    allow_async: true,
    strict_variables: false
});

// Disable Cache on Dev
if(env === 'development') {
	twig.cache(false);
	app.set('cache', false);
}

// Enable form requests
app.use(formidableMiddleware());
app.use(session({
	secret: 'mhs',
	resave: true,
	saveUninitialized: true
}));

// Setup Database Connection
const db = require('./db');

// Setup Routes
logger.Log("[ROUTES] Loading Static File Routes...");
app.use('/static/', express.static(__dirname + '/src/static', {etag: false}));

logger.Log("[ROUTES] Loading Public Routes...");
app.use('/', require('./routes/public/general'));
app.use('/u/', require('./routes/public/profile'));

logger.Log("[ROUTES] Loading API Routes...");

app.get('/api/', (req, res) => {
	return res.sendStatus(200);
});

app.use('/api/security', require('./routes/api/security'));
app.use('/api/queue', require('./routes/api/queue'));

logger.Log("[ROUTES] Loading Dashboard Routes...");
app.use('/dashboard', require('./routes/dashboard/dashboard'));
app.use('/dashboard', require('./routes/dashboard/security'));

// Error Handling
app.use(function(err, req, res, next) {
	logger.Log(err, Logger.TYPES.ERROR);

	// Return error in JSON format only in development mode
	if(env === 'development') {
		res.status(500);
		res.send(JSON.stringify(err));
	} else {
		res.sendStatus(500);
	}
});

app.listen(config.port, () => {
	logger.Log(`[EXPRESS] Started Server on Port ${config.port}!`);
});