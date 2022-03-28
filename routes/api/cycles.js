const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check } = require('express-validator');
const { getCycles, getCycleById, createCycle, editCycle, deleteCycle } = require('./controllers/cycles');
const validationHandler = require('../../middleware/validationHandler')

// @route   GET api/cycles
// @desc    Get cycles by user
// @access  Private

router.get('/', auth, getCycles);

// @route   GET api/cycle/:cycle_id
// @desc    Get cycle by user and id
// @access  Private

router.get('/:cycle_id', auth, getCycleById);

// @route   POST api/cycles
// @desc    Create a cycle
// @access  Private

router.post(
  '/',
  [
    auth,
    [
      check('squat', 'Please select a Main Template').isNumeric(),
      check('bench', 'Please select a Volume Template').isNumeric(),
      check('deadlift', 'Please select a Volume Template').isNumeric(),
      check('press', 'Please select a Volume Template').isNumeric()
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

// @route   GET api/cycle/:cycle_id
// @desc    Get cycle by user and id
// @access  Private

router.delete('/:cycle_id', auth, deleteCycle);

module.exports = router;
