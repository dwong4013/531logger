import { 
    GET_WORKOUTS,
    NO_WORKOUTS,
    UPDATE_WORKOUT,
    WORKOUT_ERROR }
    from '../actions/types';

const initialState = {
    workouts: null,
    loading: true,
}

export default function (state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case GET_WORKOUTS:
            return {
                ...state,
                workouts: payload,
                loading: false
            }
        case UPDATE_WORKOUT: 
            return {
                ...state,
                workouts: payload,
                loading: false
            }
        case NO_WORKOUTS:
        case WORKOUT_ERROR:
            return {
                ...state,
                workouts: null,
                loading: false
            }
        default:
            return state;
    }

}
