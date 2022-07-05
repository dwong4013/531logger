const workoutTemplate = require('./workouts.json')
const Workout = require('../models/Workout')

    // Create the workout based on the following:
    // Maxes from cycle
    // 3 exercises
    // 3 weeks per exercise
    // Each workout has 3 main sets and 5 volume sets

function generateWorkout(user, cycle, exercise, week, max) {

    let newWorkout = {
        cycle,
        user,
        exercise,
        week: week + 1,
        mainSets: [],
        volumeSets: [],
    }
    // Arrays of main and volume sets returned from createSet
    let main = workoutTemplate[week].main.map(set => createSet(set, max))
    let volume = workoutTemplate[week].volume.map(set => createSet(set, max))
    
    // Add new sets to newWorkout object
    newWorkout.mainSets = [...main]
    newWorkout.volumeSets = [...volume]

    // New mongo document
    let workoutDocument = new Workout(newWorkout);

    return workoutDocument;
}

function createSet( { setPercent, reps }, max ) {
    return {
        weight: calculateWeight(setPercent, max),
        reps
    }
}

function calculateWeight (setPercent, max, trainingMax = 0.9) {
    // weight in lbs calculated from percentages
    let rawWeight = max * trainingMax * setPercent
    // weight rounded up to 5
    let roundUp = rawWeight + (5 - rawWeight % 5)
    // weight rounded down to 5
    let roundDown = rawWeight - (rawWeight % 5)

    // use weight rounded to nearest 5
    return rawWeight % 5 >= 2.5 ? roundUp : roundDown

}

module.exports = { generateWorkout, createSet, calculateWeight }
