const { combineReducers } = require("redux");
const { default: userReducer } = require("./auth");

const rootReducer = combineReducers({
  auth: userReducer,
});

export default rootReducer;
