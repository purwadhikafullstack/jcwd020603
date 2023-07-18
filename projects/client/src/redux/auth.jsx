const init = {
  user_name: "",
  role: "",
  email: "",
  avatar_url: "",
  gender: "",
  birthdate: "",
  phone_number: "",
  verification: "",
};

function userReducer(state = init, action) {
  if (action.type == "login") {
    return {
      user_name: action.payload.user_name,
      role: action.payload.role,
      email: action.payload.email,
      avatar_url: action.payload.avatar_url,
      gender: action.payload.gender,
      birthdate: action.payload.birthdate,
      phone_number: action.payload.phone_number,
      verification: action.payload.verification,
    };
  } else if (action.type == "logout") {
    return init;
  }

  return state;
}

export default userReducer;
