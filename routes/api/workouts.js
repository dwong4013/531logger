const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check } = require('express-validator');
const {  } = require('./controllers/workouts');
const validationHandler = require('../../middleware/validationHandler')

// @route   GET api/cycles
// @desc    Get cycles by user
// @access  Private

router.get('/', auth, getCycles);

// @route   POST api/cycles
// @desc    Create a cycle
// @access  Private



module.exports = router;
