const initState = {
  modals: {
    isSettingsOpen: false,
    isAddTransactionOpen: false,
    editTransaction: {
      isOpen: false,
      item: {},
    },
    isAddDebtOpen: false,
    editDebt: {
      isOpen: false,
      item: {},
    },
    isAddItemOpen: false,
    editItem: {
      isOpen: false,
      item: {},
    },
    isLockAccountOpen: false,
  },
  isSidebarOpen: false,
  isDarkMode: false,
  language: 'english',
};

export const settingsReducer = (state = initState, action) => {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    case 'TOGGLE_SETTINGS_MODAL':
      return {
        ...state,
        modals: {
          ...state.modals,
          isSettingsOpen: !state.modals.isSettingsOpen,
        },
      };
    case 'TOGGLE_ADD_TR_MODAL':
      return {
        ...state,
        modals: {
          ...state.modals,
          isAddTransactionOpen: !state.modals.isAddTransactionOpen,
        },
      };
    case 'TOGGLE_EDIT_TR_MODAL':
      return {
        ...state,
        modals: {
          ...state.modals,
          editTransaction: {
            isOpen: !state.modals.editTransaction.isOpen,
            item: action.payload,
          },
        },
      };
    case 'TOGGLE_DARKMODE':
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };
    case 'CHANGE_LANGUAGE':
      return {
        ...state,
        language: action.payload,
      };
    case 'TOGGLE_ADD_DEBT_MODAL':
      return {
        ...state,
        modals: {
          ...state.modals,
          isAddDebtOpen: !state.modals.isAddDebtOpen,
        },
      };
    case 'TOGGLE_EDIT_DEBT_MODAL':
      return {
        ...state,
        modals: {
          ...state.modals,
          editDebt: {
            isOpen: !state.modals.editDebt.isOpen,
            item: action.payload,
          },
        },
      };
    case 'TOGGLE_ADD_ITEM_MODAL':
      return {
        ...state,
        modals: {
          ...state.modals,
          isAddItemOpen: !state.modals.isAddItemOpen,
        },
      };
    case 'TOGGLE_EDIT_ITEM_MODAL':
      return {
        ...state,
        modals: {
          ...state.modals,
          editItem: {
            isOpen: !state.modals.editItem.isOpen,
            item: action.payload,
          },
        },
      };
    case 'TOGGLE_LOCK_ACCOUNT_MODAL':
      return {
        ...state,
        modals: {
          ...state.modals,
          isLockAccountOpen: !state.modals.isLockAccountOpen,
        },
      };
    default:
      return state;
  }
};
