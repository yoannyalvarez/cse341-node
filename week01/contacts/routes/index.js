const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/contacts', require('./contacts'));
router.get('/', (req, res) => {
    res.send('<h1>Welcome to the Contacts API</h1><p>Use the /contacts endpoint to manage contacts.</p>');
});

module.exports = router;