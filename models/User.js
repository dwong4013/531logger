cost mongoose = require('mongoose');

cost UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  theoreticalMaxes: {
    squat:{
      type: Number,
      required: true
    },
    bench:{
      type: Number,
      required: true
    },
    deadlift:{
      type: Number,
      required: true
    },
    press:{
      type: Number,
      required: true
    }
  }
})

module.exports = User = mongoose.Model('user', UserSchema);