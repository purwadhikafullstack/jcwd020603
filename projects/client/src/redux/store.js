import { setUserSelector } from "./setUserSelector";
import searchReducer from "./searchReducer";
import { combineReducers } from "redux";
import userReducer from "./auth";

// const { combineReducers } = require("redux");
// const { default: userReducer } = require("./auth");

const rootReducer = combineReducers({
  auth: userReducer,
  search: searchReducer,
  userData: setUserSelector,
});

export default rootReducer;
