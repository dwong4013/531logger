const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check } = require('express-validator');
const { createWorkouts, getWorkouts, editWorkout } = require('./controllers/workouts');
const validationHandler = require('../../middleware/validationHandler')

// @route   GET api/cycles
// @desc    Get cycles by user
// @access  Private

router.get('/:cycle_id', auth, getWorkouts);

// @route   POST api/cycles
// @desc    Create a cycle
// @access  Private

router.post('/:cycle_id', auth, createWorkouts);

// @route   Edit api/cycle/:cycle_id
// @desc    Edit cycle id
// @access  Private

router.put('/:workout_id', auth, editWorkout);


module.exports = router;
