const initState = {
  incomes: [
    {
      id: 1,
      name: 'Transaccion',
      amount: 20,
      description: 'blablabla',
      date: '10/12/20',
      type: 'income',
    },
    {
      id: 2,
      name: 'Transaccion',
      amount: 20,
      description: 'blablabla',
      date: '10/12/20',
      type: 'income',
    },
  ],
  expenses: [
    {
      id: 1,
      name: 'Transaccion',
      amount: 20,
      description: 'blablabla',
      date: '10/12/20',
      type: 'expense',
    },
    {
      id: 2,
      name: 'Transaccion',
      amount: 20,
      description: 'blablabla',
      date: '10/12/20',
      type: 'expense',
    },
  ],
  debts: [],
};

export const financeReducer = (state = initState, action) => {
  let newIncomes, newExpenses;
  switch (action.type) {
    case 'ADD_INCOME':
      return { ...state, incomes: [...state.incomes, action.payload] };
    case 'ADD_EXPENSES':
      return { ...state, expenses: [...state.expenses, action.payload] };
    case 'REMOVE_INCOME':
      newIncomes = state.incomes.filter(
        (income) => income.id !== action.payload.id
      );
      return { ...state, incomes: newIncomes };
    case 'REMOVE_EXPENSE':
      newExpenses = state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      );
      return { ...state, expenses: newExpenses };

    default:
      return state;
  }
};
