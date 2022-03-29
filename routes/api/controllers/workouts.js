const Workout = require('../../../models/Workout');
const { generateWorkout } = require('../../../lib/generateWorkout');
const Cycle = require('../../../models/Cycle');

const getWorkouts = async (req, res) => {
    try {
      const workouts = await Workout.find({
        user: req.user.id,
        cycle: req.params.cycle_id
      });
  
      if (!workouts) {
        return res
          .status(400)
          .json({ msg: 'There are no workouts available.' });
      }
      return res.json(workouts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
}

const createWorkouts = async (req, res) => {

    const { cycle_id } = req.params;
    
    try {
        // Find the cycle to get the maxes
        let cycle = await Cycle.findById(cycle_id)
        
        if (!cycle) {
            return res
            .status(400)
            .json({ msg: 'Failed to generate cycle.' });
        }

        let exercises = [ 'squat', 'bench', 'deadlift', 'press']
        let { maxes } = cycle
        let newWorkouts = [];

        // Creates a workout for each exercise and week for a total of 12 workouts
        for (let i = 0; i < exercises.length; i++) {
            for (let j = 0; j < 3; j++) {
                newWorkouts.push(generateWorkout(req.user.id, cycle_id, exercises[i], j, maxes[exercises[i]]))
            }
        }
        
        let {result: { n }} = await Workout.insertMany(newWorkouts, {rawResult: true})

        return res.status(200).json({
            msg: `${n} workouts created!`
        });
    } catch (err) {
        return res.status(500).send('Server Error');
    }
}

const editWorkout = async (req, res) => {
  const { cycle_id } = req.params;
  const { key, value } = req.body;

  try {
    const cycle = await Cycle.findById({
      _id: cycle_id,
      user: req.user.id
    });

    cycle[key] = value;

    await cycle.save();

    const cycles = await Cycle.find({
      user: req.user.id
    }).sort({ dateCreated: 'desc' });

    return res.json(cycles);
  } catch (err) {
    if (err.kind && err.kind === undefined) {
      return res.status(400).json({msg: 'Invalid cycle.'})
    }

    return res.status(500).send('Server Error');
  }
}


module.exports = {
    getWorkouts,
    createWorkouts
}