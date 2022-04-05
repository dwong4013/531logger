import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

export const setAlert = (title, msg, type) => (dispatch) => {

  dispatch({
    type: SET_ALERT,
    payload: { title, msg, type }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT }), 3500);
};
