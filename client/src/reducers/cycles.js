import {
  GET_CYCLES,
  NO_CYCLES,
  ADD_CYCLE,
  UPDATE_CYCLE,
  DELETE_CYCLE,
  CYCLE_ERROR
} from '../actions/types';

const initialState = {
  cycles: null,
  loading: true
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CYCLES:
    case ADD_CYCLE:
    case UPDATE_CYCLE:
      return {
        ...state,
        cycles: payload,
        loading: false
      };
    case NO_CYCLES:
      return {
        ...state,
        cycles: null,
        loading: false
      };
    case CYCLE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case DELETE_CYCLE:
      return {
        ...state,
        cycles: state.cycles.filter((cycle) => cycle._id !== payload),
        loading: false
      };
    default:
      return state;
  }
}
