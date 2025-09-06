const express = require('express');
const router = express.Router();

router.get('/contacts', require('./contacts'));

module.exports = router;    