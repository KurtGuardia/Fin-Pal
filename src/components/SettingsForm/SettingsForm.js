import { Modal, Btn } from '../UI';
import { ToggleBtn } from '../UI';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeLanguaje,
  toggleDarkMode,
  toggleSettingsModal,
} from '../../store/actions/settingsActions';
import { english, spanish } from '../../languages';

const SettingsForm = () => {
  const isSettingsOpen = useSelector(
    (state) => state.settings.modals.isSettingsOpen
  );
  const language = useSelector((state) => state.settings.language);
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const dispatch = useDispatch();
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
    dispatch(toggleSettingsModal());
  };

  const handleLanguage = (e) => {
    dispatch(changeLanguaje(e.target.value));
  };

  const darkModeHandler = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <Modal show={isSettingsOpen}>
      <div className='modal__title'>
        <h2>{content.title}</h2>
        <span onClick={() => dispatch(toggleSettingsModal())}>X</span>
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
          <ToggleBtn isToggleOn={isDarkMode} changeToggle={darkModeHandler} />
        </div>
        <div className='modal__info--setting'>
          <p>{content.contact}:</p>
          <span>kurtguardia@gmail.com</span>
        </div>
        <div className='modal__info--btn'>
          <Btn text={content.saveBtn} symbol='✓' />
        </div>
      </form>
    </Modal>
  );
};

export default SettingsForm;
