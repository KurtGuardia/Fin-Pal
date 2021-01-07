const english = {
  settings: {
    title: 'Settings',
    language: 'Language',
    darkMode: 'Dark Mode',
    contact: 'Contact',
    saveBtn: 'Save',
  },
  sidebar: ['Home', 'Balance', 'Debts', 'Stock'],
  header: 'Search (case sensitive)',
  dashboard: {
    banner: {
      title: 'Welcome',
      today: 'Today',
      text:
        'FinPal the best app to manage your buisness finances, control your incomes, expenses, debts and stock in one place. And Block your account whenever you need',
    },
    main: {
      incomes: 'Incomes this month',
      expenses: 'Expenses this month',
      debts: 'Debts',
    },
    recentMovements: 'Recent Movements',
  },
  balance: {
    incomes: 'incomes',
    expenses: 'expenses',
    btnText: 'Add Transaction',
  },
  addTransaction: {
    title: 'Add Transaction',
    type: 'Type',
    types: ['Income', 'Expense'],
    name: 'Name',
    description: 'Description',
    amount: 'Amount',
    btn: 'ADD',
    date: 'Date',
  },
  editTransaction: {
    title: 'Edit Transaction',
    name: 'Name',
    description: 'Description',
    amount: 'Amount',
    btn: 'Edit',
    date: 'Date',
  },
  authentication: {
    name: 'Name',
    lastName: 'Last Name',
    email: 'Email',
    password: 'Password',
    repeatPassword: 'Repeat Password',
    login: 'Login',
    signup: 'Sign Up',
    pin: 'Pin 4 digits (numeric)',
    errorMsg: {
      firstName: 'First Name must have at least 3 characters',
      lastName: 'Last Name must have at least 3 characters',
      email: 'Please enter a valid email',
      password: 'Password must be at least 6 characters',
      password2: 'Please check passwords fields are the same',
      pin: 'Please set a numeric 4 digits pin ',
    },
  },
  user: {
    firstName: 'First Name',
    lastName: 'Last Name',
    password: 'Password',
    logOut: 'Log Out',
    contact: 'Contact',
  },
  debts: {
    debts: 'Debts',
    amount: 'Amount',
    concept: 'Concept',
    dueDate: 'Due date',
    liqTime: 'Liquidation time',
    years: 'Years',
    months: 'Months',
    days: 'Days',
    expired: 'TIME EXPIRED!',
    btnText: 'Add Debt',
  },
  addDebts: {
    title: 'Add Debt',
    amount: 'Amount',
    name: 'Name',
    description: 'Description',
    date: 'Liquidation Date',
    btnText: 'Add',
  },
  editDebts: {
    title: 'Edit Debt',
    name: 'Name',
    description: 'Description',
    amount: 'Amount',
    btn: 'Edit',
    date: 'Liquidation Date',
  },
  stock: {
    stock: 'Stock',
    item: 'Item',
    quantity: 'Quantity',
    unitCost: 'Unit Cost',
    totalCost: 'Total Cost',
    dueDate: 'Due Date',
    btnText: 'Add Item',
  },
  addItem: {
    title: 'Add Item',
    totalCost: 'Total Cost',
    name: 'Name',
    description: 'Description',
    date: 'Expiring Date',
    btnText: 'Add',
    quantity: 'Quantity',
  },
  editItem: {
    title: 'Edit Item',
    name: 'Name',
    description: 'Description',
    quantity: 'Quantity',
    totalCost: 'Total Cost',
    btn: 'Edit',
    date: 'Expiring Date',
  },
  lockAccount: {
    incorrectPin: 'Incorrect Pin',
    enter: 'Enter your PIN to ',
    block: 'Block',
    unblock: 'Unblock',
    end: 'your account',
  },
};

export default english;
