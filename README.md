# MakerHub Studio
## Application Server
This is the application server for the makerhub.studio app. It is the component between the client and the MySQL server.

### Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

#### Prerequisites
You need a MySQL Server on Version 10 which has the SQL dump imported. For this we recommend XAMPP's MySQL module as it also comes with phpmyadmin for easy administration of the database. The MySQL server can also be on a remote server.

You will also need NodeJS Version 10 and NPM installed on your local machine. We also recommend installing nodemon globally to easily restart the server on every change.

#### Installing
A step by step series of examples that tell you how to get a development env running.

1. Setup your MySQL credentials in the config.json
2. Install dependencies
```
cd makerhub-server
npm install
```
3. Run the server by running ```nodemon .``` or ```node .``` in a terminal.

You can now check out if the API works by navigating to http://localhost:YOURPORT/ on your browser.

### Deployment
For deployment, you can use the same step by step tutorial as above. If you want to run in "production mode" which will hide error messages to the users, just change your node environment to production.

### Authors
* **Andreas Heimann** @thatanimeweirdo

### BuildWith
* NodeJS
* MySQL
* Express
* Nanoid
* AsciiTextGenerator

### License
This project is licensed under the GPLv3 license. See LICENSE.md for details.
