import { loginUser, registerUser, loadUser, logout  } from '../auth';
import '@testing-library/jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import axios from 'axios';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_ALERT
  } from '../types';

describe('Auth Action Creators', () => {
  const middlewares = [thunk]
  const mockStore = configureStore(middlewares);

  beforeEach(() => jest.restoreAllMocks())
  afterEach(() => jest.restoreAllMocks())
  
  describe('loginUser', () => {
    test('dispatches LOGIN_SUCCESS on successful post request', async () => {
        const res = {
            postAuth: {
              data: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0ZGU5ZmE2OTI2YTUwNTFkMGNmOWIwIn0sImlhdCI6MTY0OTg2MTM4MywiZXhwIjoxNjQ5ODk3MzgzfQ.9-vkbtfr_PQRj7u0X126ebgA-lZXuQNCnd-1cw-VFFc'
            }
          }
        axios.post = jest.fn()
        .mockImplementationOnce(() => Promise.resolve(res.postAuth))

        
        const store = mockStore({})
        await store.dispatch(loginUser())
        
        let actions = store.getActions();
        const expectedActions = {
            loginSuccess: {
                type: LOGIN_SUCCESS,
                payload: res.postAuth.data
            },
        }
        
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(actions[0]).toEqual(expectedActions.loginSuccess)
    })
    test('dispatches LOGIN_FAIL on post request fail', async () => {
        const res = {
            postAuth: {
                response: {
                    data: {
                        error: {
                            msg: 'Invalid Credentials'
                        }
                    }
                }
            }
          }
        axios.post = jest.fn()
        .mockImplementationOnce(() => Promise.reject(res.postAuth))

        
        const store = mockStore({})
        await store.dispatch(loginUser())
        
        let actions = store.getActions();
        let [firstAction, secondAction] = actions
        const expectedActions = {
            loginFail: {
                type: LOGIN_FAIL,
            },
            setAlert: {
                type: SET_ALERT,
                payload: {
                    title: 'Error',
                    msg: res.postAuth.response.data.error.msg,
                    type: 'danger',
                }
            }
        }
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(firstAction).toEqual(expectedActions.setAlert)
        expect(secondAction).toEqual(expectedActions.loginFail)
    })
  })
  describe('registerUser', () => {
    test('dispatches REGISTER_SUCCESS on successful post request', async () => {
        const res = {
            postAuth: {
              data: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0ZGU5ZmE2OTI2YTUwNTFkMGNmOWIwIn0sImlhdCI6MTY0OTg2MTM4MywiZXhwIjoxNjQ5ODk3MzgzfQ.9-vkbtfr_PQRj7u0X126ebgA-lZXuQNCnd-1cw-VFFc'
            }
          }
        axios.post = jest.fn()
        .mockImplementationOnce(() => Promise.resolve(res.postAuth))

        
        const store = mockStore({})
        await store.dispatch(registerUser())
        
        let actions = store.getActions();
        const expectedActions = {
            registerSuccess: {
                type: REGISTER_SUCCESS,
                payload: res.postAuth.data
            },
        }
        
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(actions[0]).toEqual(expectedActions.registerSuccess)
    })
    test('dispatches REGISTER_FAIL on post request fail', async () => {
        const res = {
            postAuth: {
                response: {
                    data: {
                        error: {
                            msg: 'User Exists'
                        }
                    }
                }
            }
          }
        axios.post = jest.fn()
        .mockImplementationOnce(() => Promise.reject(res.postAuth))

        
        const store = mockStore({})
        await store.dispatch(registerUser())
        
        let actions = store.getActions();
        let [firstAction, secondAction] = actions
        const expectedActions = {
            registerFail: {
                type: REGISTER_FAIL,
            },
            setAlert: {
                type: SET_ALERT,
                payload: {
                    title: 'Error',
                    msg: res.postAuth.response.data.error.msg,
                    type: 'danger',
                }
            }
        }
        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(firstAction).toEqual(expectedActions.setAlert)
        expect(secondAction).toEqual(expectedActions.registerFail)
    })
  })
  describe('loadUser', () => {
    test('dispatches USER_LOADED on successful get request', async () => {
        const res = {
            getUser: {
                data: {
                    _id: 'alskjd0fsadfjl',
                    name: 'john name',
                    email: 'john@mail.com',
                    cyclesCompleted: 0
                }
            }
          }
        axios.get = jest.fn()
        .mockImplementationOnce(() => Promise.resolve(res.getUser))

        
        const store = mockStore({})
        await store.dispatch(loadUser())
        
        let actions = store.getActions();
        const expectedActions = {
            loadSuccess: {
                type: USER_LOADED,
                payload: res.getUser.data
            },
        }
        
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(actions[0]).toEqual(expectedActions.loadSuccess)
    })
    test('dispatches AUTH_ERROR on get request fail', async () => {
        const res = {
            authError: {
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
        .mockImplementationOnce(() => Promise.reject(res.authError))

        const store = mockStore({})
        await store.dispatch(loadUser())
        
        let actions = store.getActions();
        let [firstAction, secondAction] = actions;
        const expectedActions = {
            setAlert: {
                type: SET_ALERT,
                payload: {
                    title: 'Error', 
                    msg: res.authError.response.data.error.msg, 
                    type: 'danger'
                }
            },
            loadFail: {
                type: AUTH_ERROR,
            }
        }
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(firstAction).toEqual(expectedActions.setAlert)
        expect(secondAction).toEqual(expectedActions.loadFail)
    })
  })
  describe('logout', () => {
    test('dispatches LOGOUT', () => {
        const store = mockStore({})
        store.dispatch(logout())
        
        let actions = store.getActions();
        const expectedActions = {
            logout: {
                type: LOGOUT,
            },
        }
        
        expect(actions[0]).toEqual(expectedActions.logout)
    })
  })
})