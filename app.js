const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const usersApi = require('./routes/users');
const cardsApi = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(helmet());
app.use(bodyParser.json());

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);

app.use('/users', usersApi);
app.use('/cards', cardsApi);

app.use((req, res) => res.status(404).send({ message: 'Неправильный путь' }));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`); // eslint-disable-line no-console
});
