import React, { useEffect, useState } from 'react';
import './Header.scss';
import { User } from '../../assets/icons';
import { Search } from '../../assets/icons';
import english from '../../languages/english';
import spanish from '../../languages/spanish';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const language = useSelector((state) => state.settings.language);
  const auth = useSelector((state) => state.firebase.auth);
  const profile = useSelector((state) => state.firebase.profile);
  const [text, setText] = useState('');

  useEffect(() => {
    if (language === 'english') {
      setText(english.header);
    } else if (language === 'spanish') {
      setText(spanish.header);
    }
  }, [language]);

  const initials = () => {
    const first = profile?.firstName?.slice(0, 1);
    const last = profile?.lastName?.slice(0, 1);
    return first + last;
  };

  return (
    <div className={auth.uid ? 'header' : 'hidden'}>
      <div className='header__input'>
        <input
          type='text'
          className='header__input--search'
          placeholder={text}
        />
        <Search className='header__input--icon' />
      </div>

      <Link className='header__user' to='/user'>
        <User />
        <h3>{initials()}</h3>
      </Link>
    </div>
  );
};

export default Header;
