![](docs/readme-logo.png)

## MakerHub Studio Application Server
This is the application server for the makerhub.studio app. It is the component between the client and the MySQL server.

---

### Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

#### Prerequisites
You need a MySQL Server on Version 10 which has the SQL dump imported. For this we recommend XAMPP's MySQL module as it also comes with phpmyadmin for easy administration of the database. The MySQL server can also be on a remote server.

You will also need NodeJS Version 10 and NPM installed on your local machine. We also recommend installing nodemon globally to easily restart the server on every change.

#### Installation
First, download the latest release and extract the files in a folder. After that, run the following commands to get your server up and running.

```
cd makerhub-server
npm install
```

After the installation was successful, the configuration setup should begin automatically. If this is not the case or if you want to run the setup at a later point, just run `npm run setup` and follow the instructions.

**Run the server**

Just run `npm run start` in a terminal.

If the server starts successfully, you will be able to check out if the API works by navigating to <http://localhost:YOURPORT/> on your browser. It should return with "OK" and an HTTP status code of 200.

---

### Deployment
For deployment, you can use the same step by step tutorial as above. If you want to run in "production mode" which will hide error messages to the users, just change your node environment to production.

---

### Documentation

You can find the API documentation [here](docs/API.md)!

---

### Authors
* **Andreas Heimann** @thatanimeweirdo

---

### BuildWith
* NodeJS + NPM
* MySQL
* Express
* nanoid
* ascii-text-generator
* bcrypt-nodejs
* express-rate-limit
* sw-node-logger
* express-formidable
---

### License
This project is licensed under the GPLv3 license. See [LICENSE.md](LICENSE.md) for details.
