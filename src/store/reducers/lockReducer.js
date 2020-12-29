const initState = {
  isAccountLocked: false,
};

export const lockReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOCK_STATE':
      return {
        ...state,
        isAccountLocked: action.payload,
      };
    default:
      return state;
  }
};
