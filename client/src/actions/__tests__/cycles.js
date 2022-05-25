import { getCycles, createCycle, updateCycle, deleteCycle } from '../cycles';
import '@testing-library/jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import axios from 'axios';
import { 
    GET_CYCLES,
    NO_CYCLES,
    ADD_CYCLE,
    UPDATE_CYCLE,
    DELETE_CYCLE,
    CYCLE_ERROR,
    SET_ALERT,
    SET_TIMEOUT,
    CYCLE_ACTION_COMPLETE,
    CYCLE_ACTION_READY,
 }
    from '../types';

describe('Cycles Action Creators', () => {
  const middlewares = [thunk]
  const mockStore = configureStore(middlewares);

  beforeEach(() => jest.restoreAllMocks())
  afterEach(() => jest.restoreAllMocks())

  describe('getCycles', () => {
    test('dispatches GET_CYCLES on successful get request', async () => {
        const res = {
            getCycles: {
                data: [
                    {_id: '1l2j3l1231', user: ' aslfjl1j2312', maxes: {squat: 200, bench: 150, deadlift: 200, press: 100}},
                    {_id: '1l2j3l1331', user: ' aslfjl1j2312', maxes: {squat: 200, bench: 150, deadlift: 200, press: 100}},
                    {_id: '1l2j3l1431', user: ' aslfjl1j2312', maxes: {squat: 200, bench: 150, deadlift: 200, press: 100}},
                    {_id: '1l2j3l1531', user: ' aslfjl1j2312', maxes: {squat: 200, bench: 150, deadlift: 200, press: 100}},
                ]
            }
          }
        axios.get = jest.fn()
        .mockImplementationOnce(() => Promise.resolve(res.getCycles))

        
        const store = mockStore({})
        await store.dispatch(getCycles())
        
        let actions = store.getActions();
        const expectedActions = {
            getCycles: {
                type: GET_CYCLES,
                payload: res.getCycles.data
            },
        }
        
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(actions[0]).toEqual(expectedActions.getCycles)
    })
    test('dispatches CYCLES_ERROR on get request fail', async () => {
        const res = {
            getCycles: {
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
        .mockImplementationOnce(() => Promise.reject(res.getCycles))
        
        const store = mockStore({})
        await store.dispatch(getCycles())

        let actions = store.getActions();
        let [firstAction, secondAction, thirdAction] = actions
        const expectedActions = {
            getCyclesError: {
                type: CYCLE_ERROR,
            },
            setAlert: {
                type: SET_ALERT,
                payload: {
                    title: 'Error',
                    msg: res.getCycles.response.data.error.msg,
                    type: 'danger',
                }
            },
        }
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(firstAction).toEqual(expectedActions.setAlert)
        expect(secondAction.type).toEqual(SET_TIMEOUT)
        expect(thirdAction).toEqual(expectedActions.getCyclesError);
    })
    test('dispatches NO_CYCLES on get request fail', async () => {
        const res = {
            getCycles: {
                response: {
                    status: 400,
                    data: {
                        error: {
                            msg: 'No cycles found'
                        }
                    }
                }
            }
          }
        axios.get = jest.fn()
        .mockImplementationOnce(() => Promise.reject(res.getCycles))

        
        const store = mockStore({})
        await store.dispatch(getCycles())
        
        let actions = store.getActions();
        let [firstAction, secondAction, thirdAction] = actions
        const expectedActions = {
            getCyclesError: {
                type: NO_CYCLES,
            },
            setAlert: {
                type: SET_ALERT,
                payload: {
                    title: 'Error',
                    msg: res.getCycles.response.data.error.msg,
                    type: 'danger',
                }
            }
        }
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(firstAction).toEqual(expectedActions.setAlert)
        expect(secondAction.type).toEqual(SET_TIMEOUT)
        expect(thirdAction).toEqual(expectedActions.getCyclesError)
    })
  })
    describe('createCycle', () => {
    test('dispatches ADD_CYCLE on successful post request', async () => {
        jest.useFakeTimers();
        const res = {
            createCycle: {
                data: {
                    msg: 'A new cycle has been created!',
                    cycle: {
                        _id: 'saf098dfsa0',
                        user: 'asjfsdf89098',
                        workoutsToDo: []
                    }
                }
            },
            createWorkouts : {
                data: {
                    workouts: ['1','2','3','4','5']
                }
            },
            editCycle: {
                data: {
                    _id: 'saf098dfsa0',
                    user: 'asjfsdf89098',
                    workoutsToDo: ['1','2','3','4','5']
                }
            }
          }
        const formData = {
            squat: 200,
            bench: 150,
            deadlift: 200,
            press: 100
        }
        axios.post = jest.fn()
        .mockImplementationOnce(() => Promise.resolve(res.createCycle))
        .mockImplementationOnce(() => Promise.resolve(res.createWorkouts))

        axios.put = jest.fn()
        .mockImplementationOnce(() => Promise.resolve(res.editCycle))
        
        const store = mockStore({})
        await store.dispatch(createCycle(formData))
        jest.runAllTimers();
        
        let actions = store.getActions();
        const [firstAction, secondAction, thirdAction, fourthAction, fifthAction ] = actions
        const expectedActions = {
            setAlert: {
                type: SET_ALERT,
                payload: {
                    title: 'Success',
                    msg: res.createCycle.data.msg,
                    type: 'success',
                },
            },
            createCycle: {
                type: ADD_CYCLE,
                payload: res.editCycle.data
            },
            actionComplete: {
                type: CYCLE_ACTION_COMPLETE
            },
            actionReady: {
                type: CYCLE_ACTION_READY
            }
        }
        
        expect(axios.post).toHaveBeenCalledTimes(2);
        expect(axios.put).toHaveBeenCalledTimes(1)
        expect(firstAction).toEqual(expectedActions.createCycle)
        expect(secondAction).toEqual(expectedActions.actionComplete)
        expect(thirdAction).toEqual(expectedActions.setAlert)
        expect(fourthAction.type).toEqual(SET_TIMEOUT)
        expect(fifthAction).toEqual(expectedActions.actionReady)
    })
    test('dispatches SET_ALERT on when post request fails', async () => {
        const res = {
            createCycle: {
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
        .mockImplementationOnce(() => Promise.reject(res.createCycle))

        
        const store = mockStore({})
        await store.dispatch(createCycle())
        
        let actions = store.getActions();
        const expectedActions = {
            setAlert: {
                type: SET_ALERT,
                payload: {
                    title: 'Error',
                    msg: res.createCycle.response.data.error.msg,
                    type: 'danger',
                },
            }   
        }
        
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(actions[0]).toEqual(expectedActions.setAlert)
        expect(actions[1].type).toEqual(SET_TIMEOUT)
    })
  })
  describe('updateCycle', () => {
    test('dispatches UPDATE_CYCLE on successful put request', async () => {
        const cycleId = 'aslfjl1j2312'
        const cycleData = {
            key: "workoutsToDo",
            values: [
                '1','2','3','4','5'
            ]
        }

        const res = {
            updateCycle: {
                data: {
                    _id: 'alskjd0fsadfjl',
                    user: 'lj123l123asdf',
                    workoutsToDo: cycleData.values,
                }
            }
          }
        axios.put = jest.fn()
        .mockImplementationOnce(() => Promise.resolve(res.updateCycle))

        
        const store = mockStore({})
        await store.dispatch(updateCycle(cycleId, cycleData))
        
        let actions = store.getActions();
        const expectedActions = {
            updateCycle: {
                type: UPDATE_CYCLE,
                payload: res.updateCycle.data
            },
        }
        
        expect(axios.put).toHaveBeenCalledTimes(1);
        expect(actions[0]).toEqual(expectedActions.updateCycle)
    })
    test('dispatches SET_ALERT on when put request fails', async () => {
        const cycleId = 'aslfjl1j2312'
        const cycleData = {
            key: "workoutsToDo",
            values: [
                '1','2','3','4','5'
            ]
        }
        const res = {
            updateCycle: {
                response: {
                    data: {
                        error: {
                            msg: 'Server Error',
                        }
                    }
                }
            }
        }
        axios.put = jest.fn()
        .mockImplementationOnce(() => Promise.reject(res.updateCycle))

        
        const store = mockStore({})
        await store.dispatch(updateCycle(cycleId, cycleData))
        
        let actions = store.getActions();
        const expectedActions = {
            setAlert: {
                type: SET_ALERT,
                payload: {
                    title: 'Error',
                    msg: res.updateCycle.response.data.error.msg,
                    type: 'danger',
                },
            }   
        }
        
        expect(axios.put).toHaveBeenCalledTimes(1);
        expect(actions[0]).toEqual(expectedActions.setAlert)
    })
  })
})