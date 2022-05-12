const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { registerUser, editUser } = require('./controllers/users');
const auth = require('../../middleware/auth')
const validationHandler = require('../../middleware/validationHandler')


// @route   POST api/users
// @desc    Register User
// @access  public

router.post(
  '/',
  [[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ], validationHandler],
  registerUser
);

// @route   Put api/users
// @desc    Edit User's cyclesCompleted field
// @access  public

router.put(
  '/',
  auth,
  editUser
);

module.exports = router;
