import { getWorkout, createWorkouts, editWorkout } from '../workouts';
import '@testing-library/jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import axios from 'axios';
import { 
    GET_WORKOUT,
    NO_WORKOUT,
    UPDATE_WORKOUT,
    WORKOUT_ERROR,
    SET_ALERT,
    SET_TIMEOUT
 }
    from '../types';

describe('Workouts Action Creators', () => {
  const middlewares = [thunk]
  const mockStore = configureStore(middlewares);

  beforeEach(() => jest.restoreAllMocks())
  afterEach(() => jest.restoreAllMocks())

  describe('getWorkout', () => {
    test('dispatches GET_WORKOUT with latest workout on successful get request', async () => {
        const res = {
            getWorkout: {
                data: [
                    {_id: '1l2j3l1231', cycle: ' aslfjl1j2312',exercise: 'squat', week: 1},
                    {_id: '1l2j3l1641', cycle: ' aslfjl1j2312',exercise: 'squat', week: 2},
                    {_id: '1l2j3l1241', cycle: ' aslfjl1j2312',exercise: 'squat', week: 3},
                    {_id: '1l2j3l1271', cycle: ' aslfjl1j2312',exercise: 'bench', week: 1},
                ]
            }
        }
        const cycleId = 'aslfjl1j2312'
        axios.get = jest.fn()
        .mockImplementationOnce(() => Promise.resolve(res.getWorkout))

        
        const store = mockStore({})
        await store.dispatch(getWorkout(cycleId))
        
        let actions = store.getActions();
        const expectedActions = {
            getWorkout: {
                type: GET_WORKOUT,
                payload: res.getWorkout.data[0]
            },
        }
        
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(actions[0]).toEqual(expectedActions.getWorkout)
    })
    test('dispatches GET_WORKOUT with targeted workout Id on successful get request', async () => {
        const res = {
            getWorkout: {
                data: [
                    {_id: '1l2j3l1231', cycle: ' aslfjl1j2312',exercise: 'squat', week: 1},
                    {_id: '1l2j3l1641', cycle: ' aslfjl1j2312',exercise: 'squat', week: 2},
                    {_id: '1l2j3l1241', cycle: ' aslfjl1j2312',exercise: 'squat', week: 3},
                    {_id: '1l2j3l1271', cycle: ' aslfjl1j2312',exercise: 'bench', week: 1},
                ]
            }
        }
        const cycleId = 'aslfjl1j2312'
        const target = res.getWorkout.data[3]._id
        axios.get = jest.fn()
        .mockImplementationOnce(() => Promise.resolve(res.getWorkout))

        
        const store = mockStore({})
        await store.dispatch(getWorkout(cycleId, target))
        
        let actions = store.getActions();
        const expectedActions = {
            getWorkout: {
                type: GET_WORKOUT,
                payload: res.getWorkout.data[3]
            },
        }
        
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(actions[0]).toEqual(expectedActions.getWorkout)
    })
    test('dispatches WORKOUT_ERROR on get request fail', async () => {
        const res = {
            getWorkout: {
                response: {
                    status: 500,
                    data: {
                        error: {
                            msg: 'Server Error'
                        }
                    }
                }
            }
          }
        axios.get = jest.fn()
        .mockImplementationOnce(() => Promise.reject(res.getWorkout))

        
        const store = mockStore({})
        await store.dispatch(getWorkout())
        
        let actions = store.getActions();
        let [firstAction, secondAction, thirdAction] = actions
        const expectedActions = {
            getWorkoutError: {
                type: WORKOUT_ERROR,
            },
            setAlert: {
                type: SET_ALERT,
                payload: {
                    title: 'Error',
                    msg: res.getWorkout.response.data.error.msg,
                    type: 'danger',
                }
            }
        }
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(firstAction).toEqual(expectedActions.setAlert)
        expect(secondAction.type).toEqual(SET_TIMEOUT)
        expect(thirdAction).toEqual(expectedActions.getWorkoutError)
    })
    test('dispatches NO_WORKOUT on get request fail', async () => {
        const res = {
            getWorkout: {
                response: {
                    status: 400,
                    data: {
                        error: {
                            msg: 'No workouts found'
                        }
                    }
                }
            }
          }
        axios.get = jest.fn()
        .mockImplementationOnce(() => Promise.reject(res.getWorkout))

        
        const store = mockStore({})
        await store.dispatch(getWorkout())
        
        let actions = store.getActions();
        let [firstAction, secondAction, thirdAction] = actions
        const expectedActions = {
            getWorkoutError: {
                type: NO_WORKOUT,
            },
            setAlert: {
                type: SET_ALERT,
                payload: {
                    title: 'Error',
                    msg: res.getWorkout.response.data.error.msg,
                    type: 'danger',
                }
            }
        }
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(firstAction).toEqual(expectedActions.setAlert)
        expect(secondAction.type).toEqual(SET_TIMEOUT)
        expect(thirdAction).toEqual(expectedActions.getWorkoutError)
    })
  })
    describe('createWorkouts', () => {
    test('calls updateCycle on successful post request', async () => {
        const cycleId = 'aslfjl1j2312'
        const res = {
            createWorkout: {
                data: {
                    msg: '12 workouts created',
                }
            }
          }
        axios.post = jest.fn()
        .mockImplementationOnce(() => Promise.resolve(res.createWorkout))
        
        const store = mockStore({})
        await store.dispatch(createWorkouts(cycleId))
        
        let actions = store.getActions();
        
        expect(axios.post).toHaveBeenCalledTimes(1);
    })
    test('dispatches SET_ALERT on when cycle isn\'t found', async () => {
        const cycleId = 'aslfjl1j2312'
        const res = {
            createWorkout: {
                statusCode: 400,
                data: {
                    error: {
                        msg: 'Failed to generate cycle',
                    }
                }
            }
          }
        axios.post = jest.fn()
        .mockImplementationOnce(() => Promise.resolve(res.createWorkout))

        
        const store = mockStore({})
        await store.dispatch(createWorkouts(cycleId))
        
        let actions = store.getActions();
        const expectedActions = {
            setAlert: {
                type: SET_ALERT,
                payload: {
                    title: 'Error',
                    msg: res.createWorkout.data.error.msg,
                    type: 'danger',
                },
            }   
        }
        
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(actions[0]).toEqual(expectedActions.setAlert)
        expect(actions[1].type).toEqual(SET_TIMEOUT)
    })
    test('dispatches SET_ALERT on when post request fails', async () => {
        const cycleId = 'aslfjl1j2312'
        const res = {
            createWorkout: {
                response: {
                    data: {
                        error: {
                            msg: 'Server error'
                        }
                    }
                }
            }
        }
        axios.post = jest.fn()
        .mockImplementationOnce(() => Promise.reject(res.createWorkout))

        
        const store = mockStore({})
        await store.dispatch(createWorkouts(cycleId))
        
        let actions = store.getActions();
        const expectedActions = {
            setAlert: {
                type: SET_ALERT,
                payload: {
                    title: 'Error',
                    msg: res.createWorkout.response.data.error.msg,
                    type: 'danger',
                },
            }   
        }
        
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(actions[0]).toEqual(expectedActions.setAlert)
        expect(actions[1].type).toEqual(SET_TIMEOUT)
    })

  })


  describe('editWorkout', () => {
    test('dispatches UPDATE_WORKOUT on successful put request', async () => {
        const workoutId = 'aslfjl1j2312'
        const formData = {
            type: "edit",
            values: {
                id: "62434fdc25825c04bfb50566",
                setType: "mainSets",
                notes: "it was easy",
                time: "1:04am",
                completed: true,
            }
        }

        const res = {
            updateWorkout: {
                data: {
                    workout: {
                        _id: 'alskjd0fsadfjl',
                        exercise: 'squat',
                        week: '1',
                    }
                }
            }
          }
        axios.put = jest.fn()
        .mockImplementationOnce(() => Promise.resolve(res.updateWorkout))

        
        const store = mockStore({})
        await store.dispatch(editWorkout(workoutId, formData))
        
        let actions = store.getActions();
        const expectedActions = {
            editWorkout: {
                type: UPDATE_WORKOUT,
                payload: res.updateWorkout.data.workout
            },
        }
        
        expect(axios.put).toHaveBeenCalledTimes(1);
        expect(actions[0]).toEqual(expectedActions.editWorkout)
    })
    test('dispatches SET_ALERT on when workout isn\'t found', async () => {
        const workoutId = 'aslfjl1j2312'
        const formData = {
            type: "edit",
            values: {
                id: "62434fdc25825c04bfb50566",
                setType: "mainSets",
                notes: "it was easy",
                time: "1:04am",
                completed: true
            }
        }
        const res = {
            editWorkout: {
                response: {
                    status: 400,
                    data: {
                        error: {
                            msg: 'Failed to make changes',
                        }
                    }
                }
            }
          }
        axios.put = jest.fn()
        .mockImplementationOnce(() => Promise.reject(res.editWorkout))

        
        const store = mockStore({})
        await store.dispatch(editWorkout(workoutId))
        
        let actions = store.getActions();
        const expectedActions = {
            setAlert: {
                type: SET_ALERT,
                payload: {
                    title: 'Error',
                    msg: res.editWorkout.response.data.error.msg,
                    type: 'danger',
                },
            }   
        }
        
        expect(axios.put).toHaveBeenCalledTimes(1);
        expect(actions[0]).toEqual(expectedActions.setAlert)
        expect(actions[1].type).toEqual(SET_TIMEOUT)
    })
    test('dispatches SET_ALERT on when put request fails', async () => {
        const workoutId = 'aslfjl1j2312'
        const res = {
            editWorkout: {
                response: {
                    status: 500,
                    data: {
                        error: {
                            msg: 'Server error'
                        }
                    }
                }
            }
        }
        axios.put = jest.fn()
        .mockImplementationOnce(() => Promise.reject(res.editWorkout))

        
        const store = mockStore({})
        await store.dispatch(editWorkout(workoutId))
        
        let actions = store.getActions();
        const expectedActions = {
            setAlert: {
                type: SET_ALERT,
                payload: {
                    title: 'Error',
                    msg: res.editWorkout.response.data.error.msg,
                    type: 'danger',
                },
            }   
        }
        
        expect(axios.put).toHaveBeenCalledTimes(1);
        expect(actions[0]).toEqual(expectedActions.setAlert)
        expect(actions[1].type).toEqual(SET_TIMEOUT)
    })
  })
})