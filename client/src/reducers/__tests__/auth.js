import reducer from '../auth';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from '../../actions/types';
import '@testing-library/jest-dom/extend-expect'

describe('Auth Reducer', () => {
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0ZGU5ZmE2OTI2YTUwNTFkMGNmOWIwIn0sImlhdCI6MTY0OTY4OTc0NywiZXhwIjoxNjQ5NzI1NzQ3fQ.21QSaoGEDilPAYVl3LSl8jYPcorBiak3oSRvDIidImM'
    let actions = {
    loadUser: {
        type: USER_LOADED, 
        payload: {
            _id: '624de9fa6926a5051d0cf9b0',
            name: 'john user',
            email: 'john@mail.com',
            date: '2022-04-06T19:28:58.504Z',
            cyclesCompleted: 0,
        }
    },
    registerSuccess: {
        type: REGISTER_SUCCESS, 
        payload: {
            token
      } 
    },
    loginSuccess: {
        type: LOGIN_SUCCESS, 
        payload: {
            token  
        }  
    },
    registerFail: {
        type: REGISTER_FAIL, 
    },
    authError: {
        type: AUTH_ERROR, 
    },
    loginFail: {
        type: LOGIN_FAIL, 
    },
    logout: {
        type: LOGOUT, 
    },
  }

  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
  }

  afterEach(() => {
      jest.clearAllMocks();
  })
  
  test('sets token and isAuthenticated values in state', () => {
    // Fail auth action
    localStorage.getItem = jest.fn().mockReturnValueOnce(null);
    let state = reducer(undefined, actions.authError);

    expect(state.token).toEqual(null)
    expect(state.isAuthenticated).toEqual(false)

    // Fail login action
    localStorage.getItem = jest.fn().mockReturnValueOnce(null);
    state = reducer(state, actions.loginFail);

    expect(state.token).toEqual(null)
    expect(state.isAuthenticated).toEqual(false)

    // Fail register action
    localStorage.getItem = jest.fn().mockReturnValueOnce(null);
    state = reducer(state, actions.registerFail);

    expect(state.token).toEqual(null)
    expect(state.isAuthenticated).toEqual(false)

    // Register action
    localStorage.getItem = jest.fn()
    .mockReturnValueOnce(null)
    .mockReturnValueOnce(token)
    state = reducer(state, actions.registerSuccess);

    expect(state.token).toEqual(token);
    expect(state.isAuthenticated).toEqual(true);

    // Log in action
    localStorage.getItem = jest.fn().mockReturnValueOnce(token)
    state = reducer(state, actions.loginSuccess);

    expect(state.token).toEqual(token);
    expect(state.isAuthenticated).toEqual(true);

    // Load user action
    localStorage.getItem = jest.fn().mockReturnValueOnce(token)
    state = reducer(state, actions.loadUser);

    expect(state.token).toEqual(token);
    expect(state.isAuthenticated).toEqual(true);
    expect(state.user).toEqual(actions.loadUser.payload);
    
    // Logout user action
    localStorage.getItem = jest.fn().mockReturnValueOnce(null);
    state = reducer(state, actions.logout);

    expect(state.token).toEqual(null)
    expect(state.isAuthenticated).toEqual(false)
  })
})