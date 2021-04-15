const express = require('express');
const morgan = require('morgan');
const app = express();
const routes = require('./api/router');
const cors = require('cors');
//connessione a mongo

app.use(cors());
// body parser

app.use(morgan('tiny'));
app.use('/api', routes);

// error handling

module.exports = app;
