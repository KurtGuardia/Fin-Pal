const initState = {
  incomes: [],
  expenses: [],
  debts: [],
  stock: [],
};

export const financeReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SYNC_DATA':
      return {
        ...state,
        incomes: action.payload.incomes,
        expenses: action.payload.expenses,
        debts: action.payload.debts,
        stock: action.payload.stock,
      };
    default:
      return state;
  }
};
