import { setUserSelector } from "./setUserSelector";
import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import userReducer from "./auth";
import addressReducer from "./reducerAddress";
import nearestBranchReducer from "./nearestBranch";

// const { combineReducers } = require("redux");
// const { default: userReducer } = require("./auth");

const rootReducer = combineReducers({
  auth: userReducer,
  search: searchReducer,
  userData: setUserSelector,
  address: addressReducer,
  nearestBranch: nearestBranchReducer,
});

export default rootReducer;
