// import { configureStore } from "@reduxjs/toolkit";
// import searchReducer from "./searchReducer";
// const rootReducer = {
//   search: searchReducer,
// };

// const store = configureStore({
//   reducer: rootReducer,
// });

// export default store;

import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import userReducer from "./auth";

const rootReducer = combineReducers({
  search: searchReducer,
  auth: userReducer,
});

export default rootReducer;
