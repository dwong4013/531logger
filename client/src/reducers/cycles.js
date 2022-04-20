import {
  GET_CYCLES,
  NO_CYCLES,
  ADD_CYCLE,
  UPDATE_CYCLE,
  DELETE_CYCLE,
  CYCLE_ERROR,
  CYCLE_ACTION_COMPLETE,
  CYCLE_ACTION_READY
} from '../actions/types';

const initialState = {
  cycles: null,
  currentCycle: null,
  loading: true,
  created: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CYCLES:
      return {
        ...state,
        cycles: payload,
        currentCycle: payload[0],
        loading: false
      };
    case ADD_CYCLE:
      return {
        ...state,
        cycles: state.cycles !== null ? [payload, ...state.cycles] : [payload],
        currentCycle: payload,
        loading: false,
      };
    case UPDATE_CYCLE:
      let removedCycles = state.cycles.filter(cycle => cycle._id !== payload._id)
      return {
        ...state,
        cycles: [payload, ...removedCycles],
        currentCycle: payload,
        loading: false
      }
    case CYCLE_ACTION_COMPLETE:
      return {
        ...state,
        actionCompleted: true
      }
    case CYCLE_ACTION_READY:
      return {
        ...state,
        actionCompleted: false
      }
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
