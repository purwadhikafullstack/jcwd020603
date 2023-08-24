const init = {};

function nearestBranchReducer(state = init, action) {
  if (action.type == "nearestBranch") {
    console.log("action", action.payload);
    return {
      ...state,
      ...action.payload,
    };
  }
  return state;
}

export default nearestBranchReducer;
