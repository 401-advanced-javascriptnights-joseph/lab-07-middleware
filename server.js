'use strict';

const express = require('express');

const routes = require('./routes.js');

const app = express();

const PORT = process.env.PORT || 8080;


const errorHandler = (err, req, res, next) => {
  res.status(500);
  res.send('ERROR');
  next();
};

const notFound = (req, res, next) => {
  res.status(200);
  res.send('Not Found');
  next();
};

const requestTime = (req, res, next) => {
  res.status(200);
  req.timeStamp = new Date();
  next();
};

const logger = (req, res, next) => {
  res.status(200);
  console.log(req.method, req.path, req.timeStamp);
  next();
};

const squared = (number) => (req, res, next) => {
  req.number = number * number;
};

app.use(requestTime);
app.use(logger);
app.use(routes);

app.get('/a', (req,res) => {
  res.status(200).send('Route A');
});

app.get('/b', squared(6), (req,res) => {
  res.status(200).send(`Route B ${req.number}`);
});


app.get('*', notFound, (req, res) => {
  res.status(500).send('Not Found');
});


app.listen(PORT, () => console.log(`Listening on ${PORT}`));

