import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import maxes from './maxes';

export default combineReducers({
  alert,
  auth,
  maxes
});
