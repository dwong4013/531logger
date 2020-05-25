import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import maxes from './maxes';
import volume from './volume';
import cycles from './cycles';
import main from './main';

export default combineReducers({
  alert,
  auth,
  main,
  maxes,
  volume,
  cycles
});
