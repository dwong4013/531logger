import { GET_VOLUME, NO_VOLUME } from './types';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';

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
