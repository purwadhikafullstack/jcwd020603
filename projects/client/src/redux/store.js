import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchReducer"; // Update the path to your searchReducer.js file

const rootReducer = {
  search: searchReducer, // Assuming 'searchReducer' is the reducer for the 'search' state slice
  // Add other reducers here if needed
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
