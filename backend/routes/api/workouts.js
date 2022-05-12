const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check } = require('express-validator');
const { createWorkouts, getWorkouts, editWorkout, deleteWorkouts } = require('./controllers/workouts');
const validationHandler = require('../../middleware/validationHandler')

// @route   GET api/workouts
// @desc    Get workouts by cycle id
// @access  Private

router.get('/:cycle_id', auth, getWorkouts);

// @route   POST api/workouts
// @desc    Create workouts
// @access  Private

router.post('/:cycle_id', auth, createWorkouts);

// @route   Edit api/workouts/:workout_id
// @desc    Edit workout by id
// @access  Private

router.put('/:workout_id', auth, editWorkout);

// @route   Delete api/workouts/:cycle_id
// @desc    Delete workout by cycle id
// @access  Private

router.delete('/:cycle_id', auth, deleteWorkouts);

module.exports = router;
