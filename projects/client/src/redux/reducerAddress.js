const init = {};

function addressReducer(state = init, action) {
  if (action.type == "address") {
    return {
      ...state,
      ...action.payload,
    };
  }
  return state;
}

export default addressReducer;
