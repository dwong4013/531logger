import { GET_MAXES, NO_MAXES, ADD_VOLUME } from '../actions/types';

const initialState = {
  maxes: null,
  loading: true
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MAXES:
    case ADD_VOLUME:
      return {
        ...state,
        maxes: payload,
        loading: false
      };
    case NO_MAXES:
      return {
        ...state,
        maxes: null,
        loading: false
      };
    default:
      return state;
  }
}
