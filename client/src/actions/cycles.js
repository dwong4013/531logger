import { GET_CYCLES, NO_CYCLES, ADD_CYCLE } from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';

export const getCycles = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/cycles');

    dispatch({
      type: GET_CYCLES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: NO_CYCLES
    });
  }
};

export const createCycle = (formData, history) => async (dispatch) => {
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

    dispatch({
      type: ADD_CYCLE,
      payload: res.data,
      loading: true
    });

    dispatch(setAlert('Max Created', 'success'));
    history.push('/cycles');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};
