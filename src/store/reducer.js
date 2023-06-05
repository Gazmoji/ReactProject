const initialState = {
  isAuthenticated: false,
  username: null,
};

const reducer = (state = initialState, action) => {
  if (action.type == "ON_LOGIN") {
    return {
      ...state,
      isAuthenticated: action.payload != null,
      username: action.payload.username,
    };
  } else if (action.type == "ON_LOGOUT") {
    return {
      ...state,
      isAuthenticated: false,
    };
  }

  return state;
};

export default reducer;
