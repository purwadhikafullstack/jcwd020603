const init = {};

function nearestBranchReducer(state = init, action) {
  if (action.type == "nearestBranch") {
    return {
      ...state,
      ...action.payload,
    };
  }
  return state;
}

export default nearestBranchReducer;
