const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const usersApi = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use('/users', usersApi);

app.listen(PORT, () => {
  console.log('Hi');
});
