const express = require('express');
const app = express();
const dateRoutes = require('./api/routes/dates');

app.use('/',dateRoutes);

module.exports = app;