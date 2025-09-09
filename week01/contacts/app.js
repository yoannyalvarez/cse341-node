const express = require('express');
const app = express();
const pkg = require('body-parser');
const mongodb = require ('./data/database');
const { json } = pkg;

const port = process.env.PORT || 3000;
app.use(json());
app.use('/', require('./routes').router);

mongodb.initDatabase()
  .then(() => {
    app.listen(port, () => console.log(`Listening on port ${port}...`));
  })
  .catch((err) => {
    console.error('Failed to connect to DB', err);
  });