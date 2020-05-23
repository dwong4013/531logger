import {
  GET_VOLUME,
  NO_VOLUME,
  VOLUME_ERROR,
  ADD_VOLUME
} from '../actions/types';

const initialState = {
  volume: null,
  loading: true
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_VOLUME:
    case ADD_VOLUME:
      return {
        ...state,
        volume: payload,
        loading: false
      };
    case VOLUME_ERROR:
      return {
        ...state,
        error: payload,
        volume: null,
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
