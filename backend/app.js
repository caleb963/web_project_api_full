const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const {
  updateUser, updateUserAvatar, login, createUser, getCurrentUser,
} = require('./controllers/userController');
const { likeCard, dislikeCard } = require('./controllers/cardController');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const userValidation = require('./middlewares/validation');
const { requestLogger } = require('./middlewares/loggers');
const errorLogger = require('./utils/logger');

require('dotenv').config(); // load environment variables

const app = express();

// config CORS
const corsOptions = { origin: ['http://localhost:3000', 'http://localhost:3001', 'https://aroundabai.jumpingcrab.com', 'https://www.aroundabai.jumpingcrab.com'] };
app.use(cors(corsOptions));

// middleware for parsing JSON
app.use(bodyParser.json());

// connect to MONGODB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// import models
require('./models/user');
require('./models/card');

// apply request logger
app.use(requestLogger);

// Crash test route
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

// read and data from JSON file
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

// new routes
app.post('/signin', userValidation.login, login);
app.post('/signup', userValidation.createUser, createUser);

// use the routers
app.use(auth); // Apply the auth middleware to all routes below

// route to get the current user
app.get('/users/me', getCurrentUser);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// other routes

app.patch('/users/me', userValidation.updateUser, updateUser);
app.patch(
  '/users/me/avatar',
  userValidation.updateUserAvatar,
  updateUserAvatar,
);
app.put('/cards/:cardId/likes', likeCard);
app.delete('/cards/:cardId/likes', dislikeCard);

// manage non-existing routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res) => {
  res.status(500).send({ message: 'Ha ocurrido un error en el servidor', error: err, e: err.message });
});

// use the error logger middleware

//  use the error handler middleware
app.use(errors());
app.use(errorHandler);

// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  errorLogger.info(`Server is running on http://localhost:${PORT}`);
});
