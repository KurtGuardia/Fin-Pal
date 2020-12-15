import Modal from '../UI/Modal/Modal';
import ToggleBtn from '../UI/ToggleBtn/ToggleBtn';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeLanguaje,
  toggleModal,
} from '../../store/actions/settingsActions';
import { english, spanish } from '../../languages';

const Settingsform = () => {
  const isModalOpen = useSelector((state) => state.settings.isModalOpen);
  const dispatch = useDispatch();
  const language = useSelector((state) => state.settings.language);
  const [content, setContent] = useState({});

  useEffect(() => {
    if (language === 'english') {
      setContent({ ...english.settings });
    } else if (language === 'spanish') {
      setContent({ ...spanish.settings });
    }
  }, [language]);

  const saveSettingsHandler = (e) => {
    e.preventDefault();
    dispatch(toggleModal());
  };

  const handleLanguage = (e) => {
    dispatch(changeLanguaje(e.target.value));
  };

  return (
    <Modal show={isModalOpen}>
      <div className='modal__title'>
        <h2>{content.title}</h2>
        <span onClick={() => dispatch(toggleModal())}>X</span>
      </div>
      <form onSubmit={saveSettingsHandler} className='modal__info'>
        <div className='modal__info--setting'>
          <label>{content.language}</label>
          <select onChange={handleLanguage}>
            <option value='english'>English</option>
            <option value='spanish'>Español</option>
          </select>
        </div>
        <div className='modal__info--setting'>
          <label>{content.darkMode}</label>
          <ToggleBtn />
        </div>
        <div className='modal__info--setting'>
          <p>{content.contact}:</p>
          <span>kurtguardia@gmail.com</span>
        </div>
        <button className='modal__info--btn'>{content.saveBtn}</button>
      </form>
    </Modal>
  );
};

export default Settingsform;
