import React, { useEffect, useState } from 'react';
import './Header.scss';
import { User } from '../../assets/icons';
import { Search } from '../../assets/icons';
import english from '../../languages/english';
import spanish from '../../languages/spanish';
import { useSelector } from 'react-redux';

const Header = () => {
  const language = useSelector((state) => state.settings.language);
  const [text, setText] = useState('');

  useEffect(() => {
    if (language === 'english') {
      setText(english.header);
    } else if (language === 'spanish') {
      setText(spanish.header);
    }
  }, [language]);

  return (
    <div className='header'>
      <div className='header__input'>
        <input
          type='text'
          className='header__input--search'
          placeholder={text}
        />
        <Search className='header__input--icon' />
      </div>

      <div className='header__user'>
        <User />
        <h3>KG</h3>
      </div>
    </div>
  );
};

export default Header;
