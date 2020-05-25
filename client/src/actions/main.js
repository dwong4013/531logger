import { GET_MAIN, MAIN_ERROR } from './types';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';

export const getMain = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/workingsets');

    dispatch({
      type: GET_MAIN,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: MAIN_ERROR
    });
  }
};
