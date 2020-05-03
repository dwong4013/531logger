const mongoose = require('mongoose');

const CycleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  week5s: [
    {
      exercise: {
        type: String,
        required: true
      },
      workingSets: [
        {
          set: {
            type: String,
            required: true
          },
          weight: {
            type: Number,
            required: true
          },
          reps: {
            type: Number,
            required: true
          },
          completed: {
            type: Boolean,
            default: false
          }
        }
      ],
      volumeSets: [
        {
          set: {
            type: String,
            required: true
          },
          weight: {
            type: Number,
            required: true
          },
          reps: {
            type: Number,
            required: true
          },
          completed: {
            type: Boolean,
            default: false
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
        },
        completed: {
          type: Boolean,
          default: false
        }
      },
      complete: {
        type: Boolean,
        default: false
      }
    }
  ],
  week3s: [
    {
      exercise: {
        type: String,
        required: true
      },
      workingSets: [
        {
          set: {
            type: String,
            required: true
          },
          weight: {
            type: Number,
            required: true
          },
          reps: {
            type: Number,
            required: true
          },
          completed: {
            type: Boolean,
            default: false
          }
        }
      ],
      volumeSets: [
        {
          set: {
            type: String,
            required: true
          },
          weight: {
            type: Number,
            required: true
          },
          reps: {
            type: Number,
            required: true
          },
          completed: {
            type: Boolean,
            default: false
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
        },
        completed: {
          type: Boolean,
          default: false
        }
      },
      complete: {
        type: Boolean,
        default: false
      }
    }
  ],
  week531: [
    {
      exercise: {
        type: String,
        required: true
      },
      workingSets: [
        {
          set: {
            type: String,
            required: true
          },
          weight: {
            type: Number,
            required: true
          },
          reps: {
            type: Number,
            required: true
          },
          completed: {
            type: Boolean,
            default: false
          }
        }
      ],
      volumeSets: [
        {
          set: {
            type: String,
            required: true
          },
          weight: {
            type: Number,
            required: true
          },
          reps: {
            type: Number,
            required: true
          },
          completed: {
            type: Boolean,
            default: false
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
        },
        completed: {
          type: Boolean,
          default: false
        }
      },
      complete: {
        type: Boolean,
        default: false
      }
    }
  ]
});

module.exports = Cycle = new mongoose.model('cycle', CycleSchema);
