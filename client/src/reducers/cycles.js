import { GET_CYCLES, NO_CYCLES, ADD_CYCLE } from '../actions/types';

const initialState = {
  cycles: null,
  loading: true
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CYCLES:
    case ADD_CYCLE:
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
    default:
      return state;
  }
}
