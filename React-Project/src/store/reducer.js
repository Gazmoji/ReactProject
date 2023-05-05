const initialState = {
  isAuthenticated: false,
};

const reducer = (state = initialState, action) => {
  if (action.type == "ON_LOGIN") {
    return {
      ...state,
      isAuthenticated: action.payload != null,
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
