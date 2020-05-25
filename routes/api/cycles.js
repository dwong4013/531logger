const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const WorkingSet = require('../../models/WorkingSet');
const Template = require('../../models/Template');
const Cycle = require('../../models/Cycle');
const Max = require('../../models/Max');

// @route   GET api/cycles
// @desc    Get cycles by user
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    const cycles = await Cycle.find({
      user: req.user.id
    });

    if (!cycles) {
      return res
        .status(400)
        .json({ msg: 'There are no templates, please create one' });
    }
    return res.json(cycles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/cycle/:cycle_id
// @desc    Get cycle by user and id
// @access  Private

router.get('/:cycle_id', auth, async (req, res) => {
  try {
    const cycle = await Template.findOne({
      _id: req.params.cycle_id,
      user: req.user.id
    });

    if (!cycle) {
      return res
        .status(400)
        .json({ msg: 'There are no templates, please create one' });
    }
    return res.json(cycle);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/cycles
// @desc    Create a cycle
// @access  Private

router.post('/', auth, async (req, res) => {
  const { maxId, mainId, volumeId } = req.body;

  const mainTemplate = await WorkingSet.findById(mainId);
  const volumeTemplate = await Template.findById(volumeId);
  const maxes = await Max.findById(maxId);

  const generateWeek = (main, volume) => {
    const exercises = ['squat', 'bench', 'deadlift', 'press'];

    let week = [];
    for (e = 0; e < exercises.length; e++) {
      let exerciseMax = maxes[exercises[e]];
      let workout = {
        exercise: exercises[e],
        accessoryReps: {
          push: volumeTemplate.accessoryReps.push,
          pull: volumeTemplate.accessoryReps.pull
        }
      };
      mainSetsArray = [];
      main.map((set, index) =>
        mainSetsArray.push({
          weight: exerciseMax * volumeTemplate.trainingMax * set.weight,
          reps: set.reps
        })
      );

      volumeSetsArray = [];
      volume.map((set, index) =>
        volumeSetsArray.push({
          weight: exerciseMax * volumeTemplate.trainingMax * set.weight,
          reps: set.reps
        })
      );

      workout.workingSets = mainSetsArray;
      workout.volumeSets = volumeSetsArray;
      week.push(workout);
    }
    return week;
  };

  let week5s = generateWeek(mainTemplate.week5s, volumeTemplate.week5s);

  let week3s = generateWeek(mainTemplate.week3s, volumeTemplate.week3s);

  let week531 = generateWeek(mainTemplate.week531, volumeTemplate.week531);

  const newCycle = {
    user: req.user.id,
    main: mainTemplate.name,
    volume: volumeTemplate.name,
    week5s,
    week3s,
    week531
  };

  // const newCycle = {
  //   user: req.user.id,
  //   main: mainTemplate.name,
  //   volume: volumeTemplate.name,
  //   week5s: [],
  //   week3s: [],
  //   week531: []
  // };

  // const exercises = ['squat', 'bench', 'deadlift', 'press'];
  // const weeks = ['week5s', 'week3s', 'week531'];

  // // Build week5s
  // for (w = 0; w < weeks.length; w++) {
  //   for (i = 0; i < exercises.length; i++) {
  //     let workingSets = [];
  //     let volumeSets = [];

  //     for (f = 0; f < mainTemplate.week5s.length; f++) {
  //       workingSets.push({
  //         weight:
  //           maxes[i] *
  //           volumeTemplate.trainingMax *
  //           mainTemplate.week5s[f].weight,
  //         reps: week5s[f].reps
  //       });
  //     }

  //     for (v = 0; v < volumeTemplate.week5s.length; v++) {
  //       volumeSets.push({
  //         weight:
  //           maxes[i] *
  //           volumeTemplate.trainingMax *
  //           volumeTemplate.week5s[v].weight,
  //         reps: week5s[v].reps
  //       });
  //     }
  //     week5s.push({
  //       exercise: exercises[i],
  //       workingSets,
  //       volumeSets,
  //       accessoryReps: {
  //         push: volumeTemplate.push,
  //         pull: volumeTemplate.pull
  //       }
  //     });
  //   }
  // }
  // // Build week3s
  // for (w = 0; w < weeks.length; w++) {
  //   for (i = 0; i < exercises.length; i++) {
  //     let workingSets = [];
  //     let volumeSets = [];

  //     for (f = 0; f < mainTemplate.week3s.length; f++) {
  //       workingSets.push({
  //         weight:
  //           maxes[i] *
  //           volumeTemplate.trainingMax *
  //           mainTemplate.week3s[f].weight,
  //         reps: week3s[f].reps
  //       });
  //     }

  //     for (v = 0; v < volumeTemplate.week3s.length; v++) {
  //       volumeSets.push({
  //         weight:
  //           maxes[i] *
  //           volumeTemplate.trainingMax *
  //           volumeTemplate.week3s[v].weight,
  //         reps: week3s[v].reps
  //       });
  //     }
  //     week3s.push({
  //       exercise: exercises[i],
  //       workingSets,
  //       volumeSets,
  //       accessoryReps: {
  //         push: volumeTemplate.push,
  //         pull: volumeTemplate.pull
  //       }
  //     });
  //   }
  // }
  // // Build week531
  // for (w = 0; w < weeks.length; w++) {
  //   for (i = 0; i < exercises.length; i++) {
  //     let workingSets = [];
  //     let volumeSets = [];

  //     for (f = 0; f < mainTemplate.week531.length; f++) {
  //       workingSets.push({
  //         weight:
  //           maxes[i] *
  //           volumeTemplate.trainingMax *
  //           mainTemplate.week531[f].weight,
  //         reps: week531[f].reps
  //       });
  //     }

  //     for (v = 0; v < volumeTemplate.week531.length; v++) {
  //       volumeSets.push({
  //         weight:
  //           maxes[i] *
  //           volumeTemplate.trainingMax *
  //           volumeTemplate.week531[v].weight,
  //         reps: week531[v].reps
  //       });
  //     }
  //     week531.push({
  //       exercise: exercises[i],
  //       workingSets,
  //       volumeSets,
  //       accessoryReps: {
  //         push: volumeTemplate.push,
  //         pull: volumeTemplate.pull
  //       }
  //     });
  //   }
  // }

  try {
    const cycle = new Cycle(newCycle);
    await cycle.save();
    return res.json(cycle);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
