const express = require('express');
const router = express.Router();
const campaigns = require('./campaign-db');


router.get('/', (req, res) => {
  return res.send(campaigns);
});

//make it available to be used in index.js
module.exports = router;

