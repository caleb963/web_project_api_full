const express = require('express');
const router = express.Router();

// controllers for the authentification routes
const { signup, signin } = require('../controllers/authController');


// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/signin');
    }
}

// router for the user register and authorization
router.post('/signup', signup);

// router for the user authorization 
router.post('/signin', signin);

// Apply the middleware to the router 
router.use(isAuthenticated);

// Export the router
module.exports = router;

