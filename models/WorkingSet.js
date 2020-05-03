const mongoose = require('mongoose');

const WorkingSetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  week5s: {
    set1: {
      weight: {
        type: Number,
        default: 0.65
      },
      reps: {
        type: Number
      }
    },
    set2: {
      weight: {
        type: Number,
        default: 0.75
      },
      reps: {
        type: Number
      }
    },
    set3: {
      weight: {
        type: Number,
        default: 0.85
      },
      reps: {
        type: Number
      }
    }
  },
  week3s: {
    set1: {
      weight: {
        type: Number,
        default: 0.7
      },
      reps: {
        type: Number
      }
    },
    set2: {
      weight: {
        type: Number,
        default: 0.8
      },
      reps: {
        type: Number
      }
    },
    set3: {
      weight: {
        type: Number,
        default: 0.9
      },
      reps: {
        type: Number
      }
    }
  },
  week531: {
    set1: {
      weight: {
        type: Number,
        default: 0.75
      },
      reps: {
        type: Number
      }
    },
    set2: {
      weight: {
        type: Number,
        default: 0.85
      },
      reps: {
        type: Number
      }
    },
    set3: {
      weight: {
        type: Number,
        default: 0.95
      },
      reps: {
        type: Number
      }
    }
  }
});

module.exports = WorkingSet = new mongoose.model(
  'workingset',
  WorkingSetSchema
);
