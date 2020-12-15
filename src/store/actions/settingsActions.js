export const toggleSidebar = () => {
  return {
    type: 'TOGGLE_SIDEBAR',
  };
};

export const toggleModal = () => {
  return {
    type: 'TOGGLE_MODAL',
  };
};

export const changeLanguaje = (language) => {
  return {
    type: 'CHANGE_LANGUAGE',
    payload: language,
  };
};
