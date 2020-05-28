import {
  GET_VOLUME,
  NO_VOLUME,
  VOLUME_ERROR,
  ADD_VOLUME,
  DELETE_VOLUME
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
        loading: false
      };
    case NO_VOLUME:
      return {
        ...state,
        volume: null,
        loading: false
      };
    case DELETE_VOLUME:
      return {
        ...state,
        volume: state.volume.filter((item) => item._id !== payload),
        loading: false
      };
    default:
      return state;
  }
}
