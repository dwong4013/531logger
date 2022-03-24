const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const { getUser, loginUser } = require('./controllers/auth');


// @route   GET api/auth
// @desc    Test route
// @access  public

router.get('/', auth, getUser);

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  public

router.post(
  '/',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').exists()
  ],
  loginUser
);

module.exports = router;
