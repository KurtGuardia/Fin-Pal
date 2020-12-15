import React from 'react';
import { useSelector } from 'react-redux';
import './Modal.scss';

const Modal = ({ show, children }) => {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);

  return (
    <div
      className={
        show ? (isDarkMode ? 'modal show dark' : 'modal show') : 'modal'
      }
    >
      {children}
    </div>
  );
};

export default Modal;
