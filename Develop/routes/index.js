const express = require('express');

const noteRouter = require('./noteRoute');

const app = express();

app.use('/notes', noteRouter);


module.exports = app;