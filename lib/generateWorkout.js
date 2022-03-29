const workoutTemplate = require('./workouts.json')
const Workout = require('../models/Workout')

    // Create the workout based on the following:
    // Maxes from cycle
    // 3 exercises
    // 3 weeks per exercise
    // Each workout has 3 main sets and 5 volume sets

function createWorkout(user, cycle, exercise, week, max) {

    let newWorkout = {
        cycle,
        user,
        exercise,
        week,
        mainSets: [],
        volumeSets: [],
    }

    let main = workoutTemplate[week].main.map(set => createSet(set, max))
    let volume = workoutTemplate[week].volume.map(set => createSet(set, max))
    
    newWorkout.mainSets = [...main]
    newWorkout.volumeSets = [...volume]

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
    let rawWeight = max * trainingMax * setPercent
    let roundUp = rawWeight + (5 - rawWeight % 5)
    let roundDown = rawWeight - (rawWeight % 5)

    return rawWeight % 5 >= 2.5 ? roundUp : roundDown

}

module.exports = { createWorkout, createSet, calculateWeight }
