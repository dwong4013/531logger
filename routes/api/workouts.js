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

router.post(
  '/',
  [
    auth,
    [
      check('squat', 'Please enter a squat max.').isNumeric().not().isEmpty(),
      check('bench', 'Please enter a bench max.').isNumeric().not().isEmpty(),
      check('deadlift', 'Please enter a deadlift max.').isNumeric().not().isEmpty(),
      check('press', 'Please enter a press max.').isNumeric().not().isEmpty()
    ],
    validationHandler
  ],
  createCycle
);

// @route   Edit api/cycle/:cycle_id
// @desc    Edit cycle id
// @access  Private

router.put('/:cycle_id', auth, editCycle);


module.exports = router;
