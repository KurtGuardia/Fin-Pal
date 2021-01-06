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
    type: 'TOGGLE_ADD_TR_MODAL',
  };
};

export const toggleEditTransactionModal = (item) => {
  return {
    type: 'TOGGLE_EDIT_TR_MODAL',
    payload: item,
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

export const toggleAddDebtModal = () => {
  return {
    type: 'TOGGLE_ADD_DEBT_MODAL',
  };
};

export const toggleEditDebtModal = (item) => {
  return {
    type: 'TOGGLE_EDIT_DEBT_MODAL',
    payload: item,
  };
};

export const toggleAddItemModal = () => {
  return {
    type: 'TOGGLE_ADD_ITEM_MODAL',
  };
};

export const toggleEditItemModal = (item) => {
  return {
    type: 'TOGGLE_EDIT_ITEM_MODAL',
    payload: item,
  };
};

export const toggleLockAccountModal = () => {
  return {
    type: 'TOGGLE_LOCK_ACCOUNT_MODAL',
  };
};
