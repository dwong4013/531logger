import {
  GET_WORKOUT,
  NO_WORKOUT,
  UPDATE_WORKOUT,
  WORKOUT_ERROR,
} from "./types";
import { updateCycle } from "./cycles";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";

export const getWorkout =
  (cycleId, workoutId = null) =>
  async (dispatch) => {
    // Add token to headers
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      let res = await axios.get(`/api/workouts/${cycleId}`);
      let targetWorkout;

      if (workoutId) {
        targetWorkout = res.data.find((exercise) => exercise._id === workoutId);
      } else {
        // latest workout
        targetWorkout = res.data.find((exercise) => !exercise.completed);
      }

      // Update state with workout data
      // always returns latest workout unless workoutId is specified
      dispatch({
        type: GET_WORKOUT,
        payload: targetWorkout,
      });
    } catch (err) {
      const statusCode = err.response.status;
      const error = err.response.data.error;

      // Update state with alert message and remove workout data
      switch (statusCode) {
        case 400:
          dispatch(setAlert("Error", error.msg, "danger"));
          dispatch({ type: NO_WORKOUT });
          break;
        case 500:
          dispatch(setAlert("Error", error.msg, "danger"));
          dispatch({ type: WORKOUT_ERROR });
          break;
        default:
          break;
      }
    }
  };

export const createWorkouts = (cycleId) => async (dispatch) => {
  // Add token to headers
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(`/api/workouts/${cycleId}`, config);

    // Update state with alert
    if (res.statusCode === 400) {
      dispatch(setAlert("Error", res.data.error.msg, "danger"));
    }

    let cycleData = {
      key: "workoutsToDo",
      values: res.data.workouts,
    };

    // Update cycle with new workouts
    dispatch(updateCycle(cycleId, cycleData));
  } catch (err) {
    const error = err.response.data.error;

    // Update state with alert
    if (error) {
      dispatch(setAlert("Error", error.msg, "danger"));
    }
  }
};

export const editWorkout = (workoutId, formData) => async (dispatch) => {
  // Add token to headers
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put(`/api/workouts/${workoutId}`, formData, config);

    // Update state with new workout data
    dispatch({
      type: UPDATE_WORKOUT,
      payload: res.data.workout,
    });
  } catch (err) {
    const statusCode = err.response.status;
    const error = err.response.data.error;

    // Update state with alert message and remove workout data
    switch (statusCode) {
      case 400:
        dispatch(setAlert("Error", error.msg, "danger"));
        dispatch({ type: NO_WORKOUT });
        break;
      case 500:
        dispatch(setAlert("Error", error.msg, "danger"));
        dispatch({ type: WORKOUT_ERROR });
        break;
      default:
        break;
    }
  }
};
