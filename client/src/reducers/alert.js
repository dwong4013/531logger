import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = {
  type: null,
  title: null,
  msg: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return {...state, ...payload};
    case REMOVE_ALERT:
      return {...state, type: null, title: null, msg: null};
    default:
      return state;
  }
}
