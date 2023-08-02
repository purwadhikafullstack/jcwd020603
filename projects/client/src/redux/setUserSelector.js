export const setUserSelector = (userData) => {
  return {
    type: "set_user_selector",
    payload: userData,
  };
};
