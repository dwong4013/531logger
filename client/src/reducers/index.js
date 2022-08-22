import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import cycles from "./cycles";
import workouts from "./workouts";

export default combineReducers({
  alert,
  auth,
  cycles,
  workouts,
});
