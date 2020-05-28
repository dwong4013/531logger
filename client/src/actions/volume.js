import {
  GET_VOLUME,
  NO_VOLUME,
  ADD_VOLUME,
  DELETE_VOLUME,
  VOLUME_ERROR
} from './types';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';
import { setAlert } from './alert';

export const createVolume = (formData, history) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/templates', formData, config);

    dispatch({
      type: ADD_VOLUME,
      payload: res.data
    });

    dispatch(setAlert('Max Created', 'success'));
    history.push('/volume-templates');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: VOLUME_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getVolume = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/templates');

    dispatch({
      type: GET_VOLUME,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: NO_VOLUME
    });
  }
};

export const deleteVolume = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/templates/${id}`);

    dispatch({
      type: DELETE_VOLUME,
      payload: id,
      loading: true
    });

    dispatch(setAlert('Volume Template Removed', 'success'));
  } catch (err) {
    console.log('err response', err);
    dispatch({
      type: VOLUME_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
