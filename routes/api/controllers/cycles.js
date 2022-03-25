const { validationResult } = require('express-validator');

const WorkingSet = require('../../../models/WorkingSet');
const Template = require('../../../models/Template');
const Cycle = require('../../../models/Cycle');
const Max = require('../../../models/Max');
const User = require('../../../models/User');

const getCycles = async (req, res) => {
    try {
      const cycles = await Cycle.find({
        user: req.user.id
      }).sort({ date: 'desc' });
  
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
}

const getCycleById = async (req, res) => {
    try {
        const cycle = await Cycle.findOne({
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
}

const createCycle = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { maxId, mainId, volumeId } = req.body;

    const mainTemplate = await WorkingSet.findById(mainId);
    const volumeTemplate = await Template.findById(volumeId);
    const maxes = await Max.findById(maxId);

    const round5 = (x) => {
      return x % 5 >= 2.5 ? parseInt(x / 5) * 5 + 5 : parseInt(x / 5) * 5;
    };

    // Generates the workouts for the week (each exercise has a workout)
    const generateWeek = (main, volume) => {
      const exercises = ['squat', 'bench', 'deadlift', 'press'];

      let week = [];
      for (e = 0; e < exercises.length; e++) {
        let exerciseMax = maxes[exercises[e]];

        // Build workout object
        let workout = {
          exercise: exercises[e],
          accessoryReps: {
            push: volumeTemplate.accessoryReps.push,
            pull: volumeTemplate.accessoryReps.pull
          }
        };

        // Build main sets array
        mainSetsArray = [];
        main.map((set) =>
          mainSetsArray.push({
            weight: round5(
              exerciseMax * volumeTemplate.trainingMax * set.weight
            ),
            reps: set.reps
          })
        );

        // Build volume sets array
        volumeSetsArray = [];
        volume.map((set) =>
          volumeSetsArray.push({
            weight: round5(
              exerciseMax * volumeTemplate.trainingMax * set.weight
            ),
            reps: set.reps
          })
        );

        // Put the newly construced arrays into the workout object
        workout.workingSets = mainSetsArray;
        workout.volumeSets = volumeSetsArray;
        week.push(workout);
      }
      return week;
    };

    // Generate each weeks workouts
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

    try {
      const cycle = new Cycle(newCycle);
      await cycle.save();
      return res.json(cycle);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
}

const editCycle = async (req, res) => {
    const { cycle_id, week, workout, set_type, set } = req.body;
  
    try {
      const cycle = await Cycle.findById({
        _id: cycle_id,
        user: req.user.id
      });
  
      if (set_type === 'accessoryReps') {
        cycle[week][workout][set_type].completed = !cycle[week][workout][set_type]
          .completed;
      } else {
        cycle[week][workout][set_type][set].completed = !cycle[week][workout][
          set_type
        ][set].completed;
      }
  
      await cycle.save();
  
      const cycles = await Cycle.find({
        user: req.user.id
      }).sort({ date: 'desc' });
  
      return res.json(cycles);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
}

const deleteCycle = async (req, res) => {
    try {
      const cycle = await Cycle.findById({
        _id: req.params.cycle_id
      });
  
      if (!req.params.cycle_id.match(/^[0-9a-fA-F]{24}$/) || !cycle) {
        return res.status(404).json({ msg: 'Cycle not found' });
      }
  
      await cycle.remove();
  
      res.json({ msg: 'Cycle removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
}

module.exports = {
    getCycles,
    getCycleById,
    createCycle,
    editCycle,
    deleteCycle
}