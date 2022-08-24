import "@testing-library/jest-dom/extend-expect";
import reducer from "../workouts";
import {
  GET_WORKOUT,
  NO_WORKOUT,
  UPDATE_WORKOUT,
  WORKOUT_ERROR,
} from "../../actions/types";

describe("Workouts reducer", () => {
  const actions = {
    noWorkouts: {
      type: NO_WORKOUT,
    },
    getWorkoutError: {
      type: WORKOUT_ERROR,
    },
    loadOneWorkout: {
      type: GET_WORKOUT,
      payload: {
        _id: "ajslk1122",
        exercise: "squat",
        week: 2,
      },
    },
    updateWorkout: {
      type: UPDATE_WORKOUT,
      payload: {
        _id: "ajslk1122",
        exercise: "squat",
        week: 1,
      },
    },
  };

  test("Manages workout lifecycle state", () => {
    // No workouts to load
    let state = reducer(undefined, actions.noWorkouts);
    expect(state.workout).toEqual(null);

    // Workout error
    state = reducer(state, actions.getWorkoutError);
    expect(state.workout).toEqual(null);

    // Load workout action
    state = reducer(state, actions.loadOneWorkout);
    expect(state.workout).toEqual(actions.loadOneWorkout.payload);

    // Update workout action
    state = reducer(state, actions.updateWorkout);
    expect(state.workout).toEqual(actions.updateWorkout.payload);
  });
});
