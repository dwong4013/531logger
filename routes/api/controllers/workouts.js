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


module.exports = {
    getWorkouts,
}