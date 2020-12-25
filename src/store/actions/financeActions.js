export const syncData = (finance) => {
  return {
    type: 'SYNC_DATA',
    payload: finance,
  };
};

export const addIncome = (income) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;
    const profile = getState().firebase.profile;
    const newIncomes = [...profile.finance.incomes, income];

    firestore
      .collection('users')
      .doc(uid)
      .set({
        ...profile,
        finance: {
          ...profile.finance,
          incomes: newIncomes,
        },
      })
      .then((res) => {
        console.log('income added');
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addExpense = (expense) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;
    const profile = getState().firebase.profile;
    const newExpenses = [...profile.finance.expenses, expense];

    firestore
      .collection('users')
      .doc(uid)
      .set({
        ...profile,
        finance: {
          ...profile.finance,
          expenses: newExpenses,
        },
      })
      .then(() => {
        console.log('expense added');
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const removeIncome = (income) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;
    const profile = getState().firebase.profile;
    const newIncomes = [
      ...profile.finance.incomes.filter((inc) => inc.id !== income.id),
    ];

    firestore
      .collection('users')
      .doc(uid)
      .set({
        ...profile,
        finance: {
          ...profile.finance,
          incomes: newIncomes,
        },
      })
      .then(() => {
        console.log('income removed');
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const removeExpense = (expense) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;
    const profile = getState().firebase.profile;
    const newExpenses = [
      ...profile.finance.expenses.filter((exp) => exp.id !== expense.id),
    ];

    firestore
      .collection('users')
      .doc(uid)
      .set({
        ...profile,
        finance: {
          ...profile.finance,
          expenses: newExpenses,
        },
      })
      .then(() => {
        console.log('expense removed');
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const editIncome = (editedIncome) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;
    const profile = getState().firebase.profile;
    const editedIncIndex = profile.finance.incomes.findIndex(
      (inc) => inc.id === editedIncome.id
    );
    const newIncomes = [...profile.finance.incomes];
    newIncomes[editedIncIndex] = editedIncome;

    firestore
      .collection('users')
      .doc(uid)
      .set({
        ...profile,
        finance: {
          ...profile.finance,
          incomes: newIncomes,
        },
      })
      .then(() => {
        console.log('income added');
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const editExpense = (editedExpense) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;
    const profile = getState().firebase.profile;
    const editedExpIndex = profile.finance.expenses.findIndex(
      (exp) => exp.id === editedExpense.id
    );
    const newExpenses = [...profile.finance.expenses];
    newExpenses[editedExpIndex] = editedExpense;

    firestore
      .collection('users')
      .doc(uid)
      .set({
        ...profile,
        finance: {
          ...profile.finance,
          expenses: newExpenses,
        },
      })
      .then(() => {
        console.log('expense added');
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addDebt = (debt) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;
    const profile = getState().firebase.profile;
    const newDebts = [...profile.finance.debts, debt];

    firestore
      .collection('users')
      .doc(uid)
      .set({
        ...profile,
        finance: {
          ...profile.finance,
          debts: newDebts,
        },
      })
      .then((res) => {
        console.log('debt added');
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
