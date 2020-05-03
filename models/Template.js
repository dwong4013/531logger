const mongoose = require('mongoose');

const TemplateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String,
    required: true
  },
  trainingMax: {
    type: Number,
    required: true
  },
  volumeSets: [
    {
      weight: {
        type: Number,
        required: true
      },
      reps: {
        type: Number,
        required: true
      }
    }
  ],
  accessoryReps: {
    push: {
      type: Number,
      required: true
    },
    pull: {
      type: Number,
      required: true
    }
  }
});

module.exports = Template = new mongoose.model('template', TemplateSchema);
