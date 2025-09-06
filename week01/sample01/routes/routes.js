const routes = require('express').Router(); 
const sample01Controller = require('../controllers/sample01');

routes.get('/', (req, res) => {
    res.send('Hello World!');
});

routes.get('/emily', sample01Controller.emilyRoute);
routes.get('/john', sample01Controller.johnRoute);

module.exports = routes;    