const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/books', require('./books'));
router.use('/customers', require('./customers'));
router.get('/', (req, res) => {
    //#swagger.tags = ['Welcome to the Library API']
    res.send('<h1>Welcome to the Library API</h1><p>Use the /books endpoint to manage books collection.</p><p>Use the /customers endpoint to manage customers collection.</p>');
});

module.exports = router;