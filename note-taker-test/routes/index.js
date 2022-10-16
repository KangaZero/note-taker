const express = require('express');

const noteRouter = require('./note');

const app = express();

app.use('/note', noteRouter);

module.exports = app;