import Modal from '../UI/Modal/Modal';
import ToggleBtn from '../UI/ToggleBtn/ToggleBtn';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../../store/actions/settingsActions';

const Settingsform = () => {
  const isModalOpen = useSelector((state) => state.settings.isModalOpen);
  const dispatch = useDispatch();

  const saveSettingsHandler = (e) => {
    e.preventDefault();
    dispatch(toggleModal());
  };

  const handleLanguage = () => {};

  return (
    <Modal show={isModalOpen}>
      <div className='modal__title'>
        <h2>Settings</h2>
        <span onClick={() => dispatch(toggleModal())}>X</span>
      </div>
      <form onSubmit={saveSettingsHandler} className='modal__info'>
        <div className='modal__info--setting'>
          <label>Language</label>
          <select onChange={handleLanguage}>
            <option value='english'>English</option>
            <option value='spanish'>Español</option>
          </select>
        </div>
        <div className='modal__info--setting'>
          <label>Dark Mode</label>
          <ToggleBtn />
        </div>
        <div className='modal__info--setting'>
          <p>Contact:</p>
          <span>kurtguardia@gmail.com</span>
        </div>
        <button className='modal__info--btn'>Save</button>
      </form>
    </Modal>
  );
};

export default Settingsform;
