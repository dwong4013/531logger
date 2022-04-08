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
          .json({ error: { msg: 'There are no workouts available.' }});
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
            .json({ error: { msg: 'Failed to generate cycle.' }});
        }

        let exercises = [ 'squat', 'bench', 'deadlift', 'press']
        let { maxes } = cycle
        let newWorkouts = [];


        // Creates a workout for each exercise and week for a total of 12 workouts
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < exercises.length; j++) {
                // Create new workouts
                newWorkouts.push(generateWorkout(req.user.id, cycle_id, exercises[j], i, maxes[exercises[j]]))
            }
        }

        // Get workout IDs
        let workoutIds = newWorkouts.map(workout => workout._id)
        console.log(workoutIds);
        let {result: { n }} = await Workout.insertMany(newWorkouts, {rawResult: true})
        // query by workout id, user id, and either main or volume set field 
        // where the id of the set within the array matches the requested set id
        const query = {
            _id: cycle_id,
            user: req.user.id,
        }

        // set the fields to the requested values
        const updateOperator = {
            "$set": {
                "workouts.todo": workoutIds
            }
        }
        const result = await Cycle.updateOne(query, updateOperator);
        console.log('result: ', result);
        if (result.ok === 1) {
            return res.status(200).json({
                msg: `${n} workouts created!`
            });
        } else {
            return res.status(400).json({
                msg: 'Error creating workouts'
            });
        }
        
    } catch (err) {
        console.log('err: ', err);
        return res.status(500).send('Server Error');
    }
}

const editWorkout = async (req, res) => {
  const { workout_id } = req.params;
  const { type, values } = req.body;

  try {
    //   handle updates that only edits the notes, time, and completed fields
    if (type === 'edit') {
        const {setType, id, notes, time, completed} = values;
        
        // query by workout id, user id, and either main or volume set field 
        // where the id of the set within the array matches the requested set id
        const query = {
            _id: workout_id,
            user: req.user.id,
            [setType]: {
                $elemMatch: {
                    _id: id
                }
            }
        }

        // set the fields to the requested values
        const updateOperator = {
            "$set": {
                [`${setType}.$.notes`]:notes,
                [`${setType}.$.time`]:time,
                [`${setType}.$.completed`]:completed,
            }
        }

        const result = await Workout.updateOne(
            query,
            updateOperator,
        );
    
        // Check if update operation was successful
        if (result.ok === 1) {
            return res
            .status(200)
            .json({msg: 'Set updated.'})
            
        } else {
            return res
            .status(400)
            .json({ error: { msg: 'Failed to make changes.' }});
        }

    // handles updates to the status of the workout document
    } if (type === 'status') {
        const {completed} = values;

        const query = {
            _id: workout_id,
            user: req.user.id
        }
        const updateOperator = {
            $set: {
                completed
            }
        }

        const result = await Workout.updateOne(
            query,
            updateOperator,
        );
    
        if (result.ok === 1) {
            return res
            .status(200)
            .json({msg: 'Workout completed!.'})
            
        } else {
            return res
            .status(400)
            .json({ error: { msg: 'Failed to update workout.' }});
        }

    }

} catch (err) {
    if (err.kind && err.kind === undefined) {
      return res.status(400).json({error: { msg: 'Invalid cycle.' }})
    }

    return res.status(500).send('Server Error');
  }
}




module.exports = {
    getWorkouts,
    createWorkouts,
    editWorkout
}