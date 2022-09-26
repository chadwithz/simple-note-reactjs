import { combineReducers } from "redux";
import AppState from "./AppState";
import Notes from "./Notes";

const appReducer = combineReducers({
  AppState,
  Notes,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
