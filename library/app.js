const express = require('express');
const app = express();
const pkg = require('body-parser');
const mongodb = require ('./data/database');
const { json } = pkg;
const router = require('./routes');
const port = process.env.PORT || 8080;

app.use(json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization');
    next();
});
app.use('/', router);

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDatabase()
  .then(() => {
    app.listen(port, () => console.log(`Listening on port ${port}...`));
  })
  .catch((err) => {
    console.error('Failed to connect to DB', err);
  });