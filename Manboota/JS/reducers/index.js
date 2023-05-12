import { combineReducers } from "redux";
import { userReducers } from "./userreducer";
import { plantreducers } from "./plantreducer";

export const rootReducer = combineReducers({
  userR: userReducers,
  plantR: plantreducers,
});
