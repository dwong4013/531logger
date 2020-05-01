const mongoose = require('mongoose');

const MaxSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  date: {
    type: Date,
    default: Date.now
  },
  squat: {
    type: Number,
    required: true
  },
  bench: {
    type: Number,
    required: true
  },
  deadlift: {
    type: Number,
    required: true
  },
  press: {
    type: Number,
    required: true
  }
});

module.exports = Max = mongoose.model('max', MaxSchema);
