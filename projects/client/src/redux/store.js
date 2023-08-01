import { setUserSelector } from "./setUserSelector";
import searchReducer from "./searchReducer";
import { combineReducers } from "redux";
import userReducer from "./auth";
import addressReducer from "./reducerAddress";

// const { combineReducers } = require("redux");
// const { default: userReducer } = require("./auth");

const rootReducer = combineReducers({
  auth: userReducer,
  search: searchReducer,
  userData: setUserSelector,
  address: addressReducer,
});

export default rootReducer;
