import {
  GET_MAXES,
  NO_MAXES,
  ADD_VOLUME,
  DELETE_MAX,
  MAX_ERROR
} from '../actions/types';

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
    case MAX_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case DELETE_MAX:
      return {
        ...state,
        maxes: state.maxes.filter((max) => max._id !== payload),
        loading: false
      };
    default:
      return state;
  }
}
