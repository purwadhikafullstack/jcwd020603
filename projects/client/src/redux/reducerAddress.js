const init = {};

function addressReducer(state = init, action) {
  if (action.type == "address") {
    console.log(action.payload);
    return {
      ...state,
      ...action.payload,
    };
  }
  return state;
}

export default addressReducer;
