const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { getUser, loginUser } = require('./controllers/auth');

// Middleware
const auth = require('../../middleware/auth');
const validationHandler = require('../../middleware/validationHandler')


// @route   GET api/auth
// @desc    Test route
// @access  public

router.get('/', [auth, validationHandler], getUser);

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  public

router.post(
  '/',
  [[
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').exists()
  ],validationHandler],
  loginUser
);

module.exports = router;
