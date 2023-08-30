const init = { total: 0 };

function cartReducer(state = init, action) {
  if (action.type == "cart") {
    return {
      ...state,
      ...action.payload,
    };
  }
  return state;
}

export default cartReducer;
