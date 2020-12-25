const initState = {
  authError: null,
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      return {
        ...state,
        authError: action.err.message,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        autError: null,
      };
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        autError: null,
      };
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        autError: null,
      };
    case 'SIGNUP_ERROR':
      return {
        ...state,
        autError: action.err.message,
      };
    default:
      return state;
  }
};
