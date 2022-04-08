const mongoose = require('mongoose');

const CycleSchema = new mongoose.Schema({
  dateCreated: {
    type: Date,
    default: Date.now
  },
  startDate: Date,
  endDate: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  maxes: {
    squat: Number,
    bench: Number, 
    deadlift: Number,
    press: Number
  },
  workoutsToDo: [{
    ref: 'workout',
    type: mongoose.Schema.Types.ObjectId
  }],
  workoutsCompleted: [{
    ref: 'workout',
    type: mongoose.Schema.Types.ObjectId
  }],
  completed: {
    type: Boolean,
    default: false,
    required: true
  }
});

module.exports = Cycle = new mongoose.model('cycle', CycleSchema);
