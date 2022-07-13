import {
  GET_CYCLES,
  NO_CYCLES,
  ADD_CYCLE,
  UPDATE_CYCLE,
  DELETE_CYCLE,
  CYCLE_ERROR,
  CYCLE_ACTION_COMPLETE,
  CYCLE_ACTION_READY
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';

export const getCycles = () => async (dispatch) => {
  // Add token to headers
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/cycles');

    // Update state to add cycles data
    dispatch({
      type: GET_CYCLES,
      payload: res.data
    });
  } catch (err) { 
    const statusCode = err.response.status
    const error = err.response.data.error

    // Update state with error message and remove cycles data
    switch(statusCode) {
      case 400:
        dispatch(setAlert('Error', error.msg, 'danger'));
        dispatch({type: NO_CYCLES});
        break
      case 500:
        dispatch(setAlert('Error', error.msg, 'danger'))
        dispatch({ type: CYCLE_ERROR });
        break
      default:
        break;
    }
  }
};

export const createCycle = (formData) => async (dispatch) => {
  // Add token to headers
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // Create cycle and get back cycle data
    const createCycleRes = await axios.post('/api/cycles', formData, config);

    const cycleId = createCycleRes.data.cycle._id

    // Create workouts with new cycle ID
    const createWorkoutsRes = await axios.post(`/api/workouts/${cycleId}`, config);

    let cycleData = {
      key: 'workoutsToDo',
      values: createWorkoutsRes.data.workouts
    }
    // Edit cycle to add new workout IDs
    const editCycleRes = await axios.put(`/api/cycles/${cycleId}`, cycleData, config)

    // Update state with new cycles data
    dispatch({
      type: ADD_CYCLE,
      payload: editCycleRes.data
    });

    // Set delay on creating another cycle
    dispatch({type: CYCLE_ACTION_COMPLETE})
    setTimeout(() => dispatch({type: CYCLE_ACTION_READY}), 1000)

    // Update state to add alert message
    dispatch(setAlert('Success', createCycleRes.data.msg, 'success'));
  } catch (err) {
    const error = err.response.data.error;

    // Update state to add alert message
    if (error) {
      dispatch(setAlert('Error', error.msg, 'danger'))
    }
  }
};

export const updateCycle = (cycleId, cycleData) => async (dispatch) => {
  // Add token to headers
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put(`/api/cycles/${cycleId}`, cycleData, config);

    // Update state with new cycle data
    dispatch({
      type: UPDATE_CYCLE,
      payload: res.data,
    });
  } catch (err) {
    const error = err.response.data.error;

    // Update state with alert message
    if (error) {
      dispatch(setAlert('Error', error.msg, 'danger'));
    }
  }
};

export const deleteCycle = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/cycles/${id}`);

    // Update state with new cycles data
    dispatch({
      type: DELETE_CYCLE,
      payload: id,
      loading: true
    });
    
    // Update state with alert message
    dispatch(setAlert('Success', res.data.msg, 'success'));
  } catch (err) {
    dispatch({
      type: CYCLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
