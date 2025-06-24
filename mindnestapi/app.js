const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// middlewares
app.use(cors());
app.use(bodyParser.json());

// routes
app.use('/api/utilisateur', require('./routes/utilisateur'));
app.use('/api/register', require('./routes/register'));
app.use('/api/login', require('./routes/login'));
app.use('/api/fiche', require('./routes/fiche'));
app.use('/api/progression', require('./routes/progression'));

module.exports = app;
