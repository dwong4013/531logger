import { setAlert } from '../alert';
import '@testing-library/jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { REMOVE_ALERT, SET_ALERT } from '../types';

describe('Alert Action Creators', () => {
  const middlewares = [thunk]
  const mockStore = configureStore(middlewares);
  
  describe('setAlert', () => {
    test('dispatches alert values and removes after timeout', () => {
      jest.useFakeTimers();
      const title = 'Success'
      const msg = 'User has been created'
      const type = 'success'
      const expectedActions = {
        set: {
          type: SET_ALERT,
          payload: {
            title,
            msg,
            type
          }
        },
        remove: {
          type: REMOVE_ALERT,
        }
      }
      
      const store = mockStore({})
      store.dispatch(setAlert(title, msg, type))
      jest.runAllTimers();

      let actions = store.getActions();

      expect(actions[0]).toEqual(expectedActions.set)
      expect(actions[1]).toEqual(expectedActions.remove)
    })
  })
})