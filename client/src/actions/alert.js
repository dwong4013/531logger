import { SET_ALERT, REMOVE_ALERT, SET_TIMEOUT } from '../actions/types';

export const setAlert = (title, msg, type) => (dispatch) => {

  dispatch({
    type: SET_ALERT,
    payload: { title, msg, type }
  });

  // Timeout id required for clearing timeout in removeAlert
  const timeoutId = setTimeout(() => dispatch({ type: REMOVE_ALERT }), 3500);

  dispatch({
    type: SET_TIMEOUT,
    payload: { timeoutId}
  })
};

export const removeAlert = (timeoutId) => (dispatch) => {
  clearTimeout(timeoutId)

  dispatch({
    type: REMOVE_ALERT
  })
}
