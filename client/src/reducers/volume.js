import { GET_VOLUME, NO_VOLUME } from '../actions/types';

const initialState = {
  volume: null,
  loading: true
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_VOLUME:
      return {
        ...state,
        volume: payload,
        loading: false
      };
    case NO_VOLUME:
      return {
        ...state,
        volume: null,
        loading: false
      };
    default:
      return state;
  }
}
