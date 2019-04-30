const version = require('./package.json').version;
const env = process.env.NODE_ENV || 'development';

const Logger = require('sw-node-logger');
let logger = new Logger([
    new Logger.DRIVERS.CONSOLE(),
    new Logger.DRIVERS.FILEROLLING({ logDirectory: './logs', fileNamePattern: 'setup-' + env + '-<DATE>.log' })
]);
global.logger = logger;

const atg = require('ascii-text-generator');
console.log("──────────────────────────────────────────────────────────────────────────────────────");
console.log(atg("MakerHub Studio", "1"));
console.log("                                Version " + version);
console.log("──────────────────────────────────────────────────────────────────────────────────────");

const fs = require('fs');
const inquirer = require('inquirer');

inquirer.prompt([
        {
            type: 'input',
            name: 'port',
            message: "Server Port",
            default: () => { return 1337; }
        },
        {
            type: 'input',
            name: 'mysql_host',
            message: "MySQL Server Host",
            default: () => { return "localhost"; }
        },
        {
            type: 'input',
            name: 'mysql_user',
            message: "MySQL Server Username"
        },
        {
            type: 'input',
            name: 'mysql_pass',
            message: "MySQL Server Password"
        },
        {
            type: 'input',
            name: 'mysql_db',
            message: "MySQL Server Database"
        },
    ]).then(answers => {
        answers.version = version;

        fs.writeFileSync('config.json', JSON.stringify(answers));

        inquirer.prompt({
            type: 'list',
            name: 'mysql_setup',
            message: "Do you want me to import all neccesary MySQL tables to your database?",
            choices: ["Yes, please!", "No, thank you!"]
        }).then(answers => {
            console.log("──────────────────────────────────────────────────────────────────────────────────────");
            if(answers.mysql_setup === "Yes, please!") {
                // Connecting to the MySQL Server
                const config = require('./config.json');
                const mysql = require('mysql');
                const db = mysql.createConnection({
                    host: config.mysql_host,
                    user: config.mysql_user,
                    password: config.mysql_pass,
                    database: config.mysql_db,
                    multipleStatements: true
                });

                global.logger.Log('[DB] Initializing Database...');
                db.connect();

                logger.Log("[SETUP] Loading setup.sql...");
                let setupSQL = fs.readFileSync("./setup.sql", "utf-8");

                logger.Log("[SETUP] Importing tables...");
                db.query(setupSQL, function(error,results) {
                    if(error) {
                        logger.Log(error, Logger.TYPES.ERROR);
                        process.exit();
                    }

                    logger.Log("[SETUP] We're done! You can now run 'npm run start' to start the server!");
                    process.exit();
                });
            } else {
                logger.Log("[SETUP] We're done! You can now run 'npm run start' to start the server!");
                process.exit();
            }
        });
    });