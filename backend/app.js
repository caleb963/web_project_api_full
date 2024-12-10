const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {updateUser, updateUserAvatar, login, createUser, getCurrentUser } = require('./controllers/userController');
const { likeCard, dislikeCard, deleteCard } = require('./controllers/cardController');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { errors } = require('celebrate');
const userValidation = require('./middlewares/validation');

const app = express();



// middleware for parsing JSON
app.use(bodyParser.json());

// connect to MONGODB
mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// import models
require('./models/user');
require('./models/card');


// read and data from JSON file
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

// new routes
app.post('/signin', login);
app.post('/signup', createUser);

// use the routers
app.use(auth); // Apply the auth middleware to all routes below

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);

// route to get the current user
app.get('/users/me', auth, getCurrentUser);


// other routes

app.patch('/users/me', updateUser);
app.patch('/users/me/avatar', updateUserAvatar);
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
