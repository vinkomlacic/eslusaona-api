/**
 * Entry point for the server.
 * @author vmlacic
 */

const express = require('express');
app = express();
port = process.env.PORT || 3000;

// Middleware
const bodyParser = require('body-parser');

// Database configuration
const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'eslusaona',
});


// Connect to database
db.connect();

// Listen on port 3000
app.listen(port);

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Import and register routes
const routes = require('./routes/appRoutes');
routes(app);


console.log('eslusaona-api server started on: ' + port);