export const toggleSidebar = () => {
  return {
    type: 'TOGGLE_SIDEBAR',
  };
};

export const toggleSettingsModal = () => {
  return {
    type: 'TOGGLE_SETTINGS_MODAL',
  };
};

export const toggleAddTransactionModal = () => {
  return {
    type: 'TOGGLE_ADD_MODAL',
  };
};

export const toggleEditTransactionModal = () => {
  return {
    type: 'TOGGLE_EDIT_MODAL',
  };
};

export const toggleDarkMode = () => {
  return {
    type: 'TOGGLE_DARKMODE',
  };
};

export const changeLanguaje = (language) => {
  return {
    type: 'CHANGE_LANGUAGE',
    payload: language,
  };
};

export const addIncome = (income) => {
  return {
    type: 'ADD_INCOME',
    payload: income,
  };
};
