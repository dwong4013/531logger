const mongoose = require('mongoose');

const WorkingSetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  week5s: [
    {
      weight: {
        type: Number,
        default: 0.65
      },
      reps: {
        type: Number
      }
    }
  ],
  week3s: [
    {
      weight: {
        type: Number,
        default: 0.65
      },
      reps: {
        type: Number
      }
    }
  ],
  week531: [
    {
      weight: {
        type: Number,
        default: 0.65
      },
      reps: {
        type: Number
      }
    }
  ]
});

module.exports = WorkingSet = new mongoose.model(
  'workingset',
  WorkingSetSchema
);
