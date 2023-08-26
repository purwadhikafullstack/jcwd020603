const init = {};

function cartReducer(state = init, action) {
  if (action.type == "cart") {
    console.log("countAll", action.payload);
    return {
      ...state,
      ...action.payload,
    };
  }
  return state;
}

export default cartReducer;
