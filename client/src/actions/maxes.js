import { GET_MAXES, NO_MAXES, ADD_VOLUME } from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';

export const getMaxes = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/maxes');

    dispatch({
      type: GET_MAXES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: NO_MAXES
    });
  }
};

export const createMax = (formData, history) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/maxes', formData, config);

    dispatch({
      type: ADD_VOLUME,
      payload: res.data,
      loading: true
    });

    dispatch(setAlert('Max Created', 'success'));
    history.push('/maxes');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};
