import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './types';
import setAuthToken from '../utils/setAuthToken';

//Login User
export const loginUser = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/auth', formData, config);

    // Update state with user data
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });


  } catch (err) {
    const error = err.response.data.error;

    // Update state with alert
    if (error) {
      dispatch(setAlert('Error', error.msg, 'danger'));
    }

    // Update state to remove user data
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

//Load user
export const loadUser = () => async (dispatch) => {
  // Add token to headers
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    // Update state with user data
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });

  } catch (err) {
    const error = err.response.data.error;

    // Update state with alert
    if (error) {
      dispatch(setAlert('Error', error.msg, 'danger'));
    }

    // Update state to remove user data
    dispatch({
      type: AUTH_ERROR
    });
  }
};

//Register User
export const registerUser = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/users', formData, config);

    // Update state with user data
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const error = err.response.data.error;

    // Update state to add alert
    if (error) {
      dispatch(setAlert('Error', error.msg, 'danger'));
    }

    // Update state to remove user data
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const logout = () => (dispatch) => {
  // Update state to remove user data
  dispatch({
    type: LOGOUT
  });
};
