/* import packages */
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

/* create an express application */
const app = express();

/* import config for routes */
const router = require('./router');

/* connect to database */
mongoose.connect('mongodb://localhost:auth/auth');

/* mount middleware */
app.use(morgan('combined')); // logger
app.use(bodyParser.json({ type: '*/*' })); // parse requests as json
router(app); // use routes

/* create server and listen on port */
const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
