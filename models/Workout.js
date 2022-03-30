const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  cycle: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  exercise: {
      type: String,
      required: true
  },
  week: {
      type: Number,
      required: true
  },
  mainSets: [
        {   weight: Number,
            reps: Number,
            time: String,
            notes: String,
            missed: {
                type: Boolean,
                default: false
            },
            completed: {
                type: Boolean,
                default: false
            },
        }
    ],
    volumeSets: [
        {   weight: Number,
            reps: Number,
            time: String,
            notes: String,
            missed: {
                type: Boolean,
                default: false
            },
            completed: {
                type: Boolean,
                default: false
            },
        }
    ],
    completed: {
        type: Boolean,
        default: false
    }


});

module.exports = Cycle = new mongoose.model('workout', WorkoutSchema);
