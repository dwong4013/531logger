import { GET_MAIN, MAIN_ERROR } from '../actions/types';

const initialState = {
  main: null,
  loading: true
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MAIN:
      return {
        ...state,
        main: payload,
        loading: false
      };
    case MAIN_ERROR:
      return {
        ...state,
        main: null,
        loading: false
      };
    default:
      return state;
  }
}
