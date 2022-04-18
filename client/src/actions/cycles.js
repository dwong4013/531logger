import {
  GET_CYCLES,
  NO_CYCLES,
  ADD_CYCLE,
  UPDATE_CYCLE,
  DELETE_CYCLE,
  CYCLE_ERROR
} from './types';
import { createWorkouts } from './workouts';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';

export const getCycles = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/cycles');

    if (res.statusCode === 400) {
      dispatch(setAlert('Error', res.data.error.msg, 'danger'))
      dispatch({type: NO_CYCLES})
  }

    dispatch({
      type: GET_CYCLES,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    const error = err.response.data.error

if (error) {
    dispatch(setAlert('Error', error.msg, 'danger'))
}
    dispatch({ type: CYCLE_ERROR });
}
};

export const createCycle = (formData) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/cycles', formData, config);

    createWorkouts(res.data.cycle._id)

    dispatch({
      type: ADD_CYCLE,
      payload: res.data.cycle
    });

    dispatch(setAlert('Success', res.data.msg, 'success'));
  } catch (err) {
    const error = err.response.data.error;

    if (error) {
      dispatch(setAlert('Error', error.msg, 'danger'))
    }
  }
};

export const updateCycle = (cycleId, cycleData) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put(`/api/cycles/:${cycleId}`, cycleData, config);

    dispatch({
      type: UPDATE_CYCLE,
      payload: res.data,
    });
  } catch (err) {
    const error = err.response.data.error;

    if (error) {
      dispatch(setAlert('Error', error.msg, 'danger'));
    }
  }
};

export const deleteCycle = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/cycles/${id}`);

    dispatch({
      type: DELETE_CYCLE,
      payload: id,
      loading: true
    });

    dispatch(setAlert('Success', res.data.msg, 'success'));
  } catch (err) {
    dispatch({
      type: CYCLE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
