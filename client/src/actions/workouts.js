import {
    GET_WORKOUT,
    NO_WORKOUT,
    UPDATE_WORKOUT,
    WORKOUT_ERROR,
    SET_ALERT
  } from './types';
import { updateCycle } from './cycles';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';

export const getWorkout = (cycleId) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        let res = await axios.get(`/api/workouts/${cycleId}`)

        if (res.statusCode === 400) {
            dispatch(setAlert('Error', res.data.error.msg, 'danger'))
            dispatch({type: NO_WORKOUT})
        }

        dispatch({
        type: GET_WORKOUT,
        payload: res.data
        })
        

    } catch (err) {
        console.log(err);
        const error = err.response.data.error

    if (error) {
        dispatch(setAlert('Error', error.msg, 'danger'))
    }
        dispatch({ type: WORKOUT_ERROR });
    }

}

export const createWorkouts = (cycleId) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
    
        const res = await axios.post(`/api/workouts/${cycleId}`, config);
        console.log(new Date(), res.data);

        if (res.statusCode === 400) {
            dispatch(setAlert('Error', res.data.error.msg, 'danger'))
        }

        let cycleData = {
            key: 'workoutsToDo',
            values: res.workouts
        }

        await updateCycle(cycleId, cycleData);
    
      } catch (err) {
          console.log(err)
        const error = err.response.data.error;
    
        if (error) {
          dispatch(setAlert('Error', error.msg, 'danger'))
        }
      }
    
}

export const editWorkout = (workoutId, formData) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
    
        const res = await axios.put(`/api/workouts/${workoutId}`, formData, config);

        if (res.statusCode === 400) {
            dispatch(setAlert('Error', res.data.error.msg, 'danger'))
        }
    
        dispatch({
            type: UPDATE_WORKOUT,
            payload: res.data
        });

      } catch (err) {

        const error = err.response.data.error;
    
        if (error) {
          dispatch(setAlert('Error', error.msg, 'danger'))
        }
      }

}