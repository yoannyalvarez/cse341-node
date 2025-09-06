const express = require('express');
const app = express();
const sample01Controller = require('./controllers/sample01');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/emily', sample01Controller.emilyRoute);

app.get('/john', sample01Controller.johnRoute);

const port = 3000;

app.listen(process.env.port || port);
console.log('Web Server is listening at port ' + (process.env.port || port));