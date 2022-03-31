import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import cycles from './cycles';

export default combineReducers({
  alert,
  auth,
  cycles
});
