const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const {updateUser, updateUserAvatar, login, createUser, getCurrentUser } = require('./controllers/userController');
const { likeCard, dislikeCard, deleteCard } = require('./controllers/cardController');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { errors } = require('celebrate');
const userValidation = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/loggers');

const app = express();

// habilitate CORS
app.use(cors());
app.options('*', cors());

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
})


// read and data from JSON file
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

// new routes
app.post('/signin', userValidation.login, login);
app.post('/signup', userValidation.createUser , createUser);

// use the routers
app.use(auth); // Apply the auth middleware to all routes below

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// route to get the current user
app.get('/users/me', getCurrentUser);


// other routes

app.patch('/users/me', userValidation.updateUser, updateUser);
app.patch('/users/me/avatar', userValidation.updateUserAvatar, updateUserAvatar);
app.put('/cards/:cardId/likes', likeCard);
app.delete('/cards/:cardId/likes', dislikeCard);


// manage non-existing routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

//  use the error handler middleware
app.use(errors());
app.use(errorHandler);

 const PORT =  process.env.PORT || 3000;
app.listen( PORT , () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
