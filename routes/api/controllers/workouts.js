const Workout = require('../../../models/Workout');

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
    // Find the cycle to get the maxes

    // Create the workout based on the following:
    // Maxes from cycle
    // 3 exercises
    // 3 weeks per exercise
    // Each workout has 3 main sets and 5 volume sets

    try {
        let cycle = Cycle.findById(cycle_id)

        if (!cycle) {
            return res
            .status(400)
            .json({ msg: 'Failed to generate cycle.' });
        }

        let exercises = [ 'squat', 'bench', 'deadlift', 'press']
        let { maxes: {squatMax, benchMax, deadliftMax, pressMax } } = cycle
        let newWorkouts = [];

        
        Workout.insertMany()

        return res.status(200).json({
            msg: 'A new cycle has been created!'
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
}