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
    const newRecentMovementItem = { info: income, type: 'added' };
    const recentMovements = [...profile.recentMovements];

    recentMovements.unshift(newRecentMovementItem);
    const newRecentMovements = recentMovements;

    if (newRecentMovements.length > 8) {
      newRecentMovements.pop();
    }
    console.log(profile);
    firestore
      .collection('users')
      .doc(uid)
      .set({
        ...profile,
        finance: {
          ...profile.finance,
          incomes: newIncomes,
        },
        recentMovements: newRecentMovements,
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
    const newRecentMovementItem = { info: expense, type: 'added' };
    const recentMovements = [...profile.recentMovements];

    recentMovements.unshift(newRecentMovementItem);
    const newRecentMovements = recentMovements;

    if (newRecentMovements.length > 8) {
      newRecentMovements.pop();
    }

    firestore
      .collection('users')
      .doc(uid)
      .set({
        ...profile,
        finance: {
          ...profile.finance,
          expenses: newExpenses,
        },
        recentMovements: newRecentMovements,
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
    const newRecentMovements = profile.recentMovements.map(
      (recentMovementItem) => {
        if (recentMovementItem.info.id === income.id) {
          return { ...recentMovementItem, type: 'removed' };
        } else {
          return recentMovementItem;
        }
      }
    );

    if (newRecentMovements.length > 8) {
      newRecentMovements.pop();
    }

    firestore
      .collection('users')
      .doc(uid)
      .set({
        ...profile,
        finance: {
          ...profile.finance,
          incomes: newIncomes,
        },
        recentMovements: newRecentMovements,
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
    const newRecentMovements = profile.recentMovements.map(
      (recentMovementItem) => {
        if (recentMovementItem.info.id === expense.id) {
          return { ...recentMovementItem, type: 'removed' };
        } else {
          return recentMovementItem;
        }
      }
    );

    if (newRecentMovements.length > 8) {
      newRecentMovements.pop();
    }

    firestore
      .collection('users')
      .doc(uid)
      .set({
        ...profile,
        finance: {
          ...profile.finance,
          expenses: newExpenses,
        },
        recentMovements: newRecentMovements,
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
    const newRecentMovements = profile.recentMovements.map(
      (recentMovementItem) => {
        if (recentMovementItem.info.id === editedIncome.id) {
          return {
            ...recentMovementItem,
            info: { ...editedIncome },
            type: 'edited',
          };
        } else {
          return recentMovementItem;
        }
      }
    );

    if (newRecentMovements.length > 8) {
      newRecentMovements.pop();
    }

    firestore
      .collection('users')
      .doc(uid)
      .set({
        ...profile,
        finance: {
          ...profile.finance,
          incomes: newIncomes,
        },
        recentMovements: newRecentMovements,
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
    const newRecentMovements = profile.recentMovements.map(
      (recentMovementItem) => {
        if (recentMovementItem.info.id === editedExpense.id) {
          return {
            ...recentMovementItem,
            info: { ...editedExpense },
            type: 'edited',
          };
        } else {
          return recentMovementItem;
        }
      }
    );

    if (newRecentMovements.length > 8) {
      newRecentMovements.pop();
    }

    firestore
      .collection('users')
      .doc(uid)
      .set({
        ...profile,
        finance: {
          ...profile.finance,
          expenses: newExpenses,
        },
        recentMovements: newRecentMovements,
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
    const newRecentMovementItem = { info: debt, type: 'added' };
    const recentMovements = [...profile.recentMovements];

    recentMovements.unshift(newRecentMovementItem);
    const newRecentMovements = recentMovements;

    if (newRecentMovements.length > 8) {
      newRecentMovements.pop();
    }

    firestore
      .collection('users')
      .doc(uid)
      .set({
        ...profile,
        finance: {
          ...profile.finance,
          debts: newDebts,
        },
        recentMovements: newRecentMovements,
      })
      .then((res) => {
        console.log('debt added');
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const removeDebt = (debt) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;
    const profile = getState().firebase.profile;
    const newDebts = [
      ...profile.finance.debts.filter((deb) => deb.id !== debt.id),
    ];
    const newRecentMovements = profile.recentMovements.map(
      (recentMovementItem) => {
        if (recentMovementItem.info.id === debt.id) {
          return { ...recentMovementItem, type: 'removed' };
        } else {
          return recentMovementItem;
        }
      }
    );

    if (newRecentMovements.length > 8) {
      newRecentMovements.pop();
    }

    firestore
      .collection('users')
      .doc(uid)
      .set({
        ...profile,
        finance: {
          ...profile.finance,
          debts: newDebts,
        },
        recentMovements: newRecentMovements,
      })
      .then(() => {
        console.log('debt removed');
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const editDebt = (editedDebt) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;
    const profile = getState().firebase.profile;
    const editedDebtIndex = profile.finance.debts.findIndex(
      (debt) => debt.id === editedDebt.id
    );
    const newDebts = [...profile.finance.debts];
    newDebts[editedDebtIndex] = editedDebt;
    const newRecentMovements = profile.recentMovements.map(
      (recentMovementItem) => {
        if (recentMovementItem.info.id === editedDebt.id) {
          return {
            ...recentMovementItem,
            info: { ...editedDebt },
            type: 'edited',
          };
        } else {
          return recentMovementItem;
        }
      }
    );

    if (newRecentMovements.length > 8) {
      newRecentMovements.pop();
    }

    firestore
      .collection('users')
      .doc(uid)
      .set({
        ...profile,
        finance: {
          ...profile.finance,
          debts: newDebts,
        },
        recentMovements: newRecentMovements,
      })
      .then(() => {
        console.log('debt added');
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addItem = (item) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;
    const profile = getState().firebase.profile;
    const newStock = [...profile.finance.stock, item];
    const newRecentMovementItem = { info: item, type: 'added' };
    const recentMovements = [...profile.recentMovements];

    recentMovements.unshift(newRecentMovementItem);
    const newRecentMovements = recentMovements;

    if (newRecentMovements.length > 8) {
      newRecentMovements.pop();
    }

    firestore
      .collection('users')
      .doc(uid)
      .set({
        ...profile,
        finance: {
          ...profile.finance,
          stock: newStock,
        },
        recentMovements: newRecentMovements,
      })
      .then((res) => {
        console.log('item added');
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const removeItem = (item) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;
    const profile = getState().firebase.profile;
    const newStock = [
      ...profile.finance.stock.filter((art) => art.id !== item.id),
    ];
    const newRecentMovements = profile.recentMovements.map(
      (recentMovementItem) => {
        if (recentMovementItem.info.id === item.id) {
          return { ...recentMovementItem, type: 'removed' };
        } else {
          return recentMovementItem;
        }
      }
    );

    if (newRecentMovements.length > 8) {
      newRecentMovements.pop();
    }

    firestore
      .collection('users')
      .doc(uid)
      .set({
        ...profile,
        finance: {
          ...profile.finance,
          stock: newStock,
        },
        recentMovements: newRecentMovements,
      })
      .then(() => {
        console.log('item removed');
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const editItem = (editedItem) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;
    const profile = getState().firebase.profile;
    const editedItemIndex = profile.finance.stock.findIndex(
      (item) => item.id === editedItem.id
    );
    const newStock = [...profile.finance.stock];
    newStock[editedItemIndex] = editedItem;
    const newRecentMovements = profile.recentMovements.map(
      (recentMovementItem) => {
        if (recentMovementItem.info.id === editedItem.id) {
          return {
            ...recentMovementItem,
            info: { ...editedItem },
            type: 'edited',
          };
        } else {
          return recentMovementItem;
        }
      }
    );

    if (newRecentMovements.length > 8) {
      newRecentMovements.pop();
    }

    firestore
      .collection('users')
      .doc(uid)
      .set({
        ...profile,
        finance: {
          ...profile.finance,
          stock: newStock,
        },
        recentMovements: newRecentMovements,
      })
      .then(() => {
        console.log('item added');
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
