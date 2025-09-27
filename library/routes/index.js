const express = require('express');
const router = express.Router();
const passport = require('passport');
const auth = require('../middleware/authenticate');

router.use('/', require('./swagger'));

router.use('/books', require('./books'));
router.use('/customers', require('./customers'));

router.get('/login', passport.authenticate('github'), (req, res) => {});
router.get('/logout', (req, res) => {
    try {
        req.logout((err) => {
            if (err) {
                throw err;
            }
            res.redirect('/');
        })}
     catch (err) {
        return next(err);
    };
});

router.get('/', auth.isAuthenticated, (req, res) => {
    //#swagger.tags = ['Welcome to the Library API']
    try {
        res.send('<h1>Welcome to the Library API</h1><p>Use the /books endpoint to manage books collection.</p><p>Use the /customers endpoint to manage customers collection.</p>');
        res.status(200);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
       
});

module.exports = router;