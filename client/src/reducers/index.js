import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import maxes from './maxes';
import volume from './volume';

export default combineReducers({
  alert,
  auth,
  maxes,
  volume
});
