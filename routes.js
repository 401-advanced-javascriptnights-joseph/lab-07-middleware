'use strict';

const express = require('express');

const router = express.Router();

const dError = ((req, res, next) => {
  res.status(500);
  res.send('Error');
  next();
});

router.get('/c', (req,res) => {
  res.status(200).send('Route C');
});

router.get('/d', dError, (req,res) => {
  res.status(200).send('Route D');
});

module.exports = router;
