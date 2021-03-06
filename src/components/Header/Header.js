import React, { useEffect, useState } from 'react';
import './Header.scss';
import { User } from '../../assets/icons';
import { Search } from '../../assets/icons';
import english from '../../languages/english';
import spanish from '../../languages/spanish';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

const Header = ({ getSearchTerm }) => {
  const language = useSelector((state) => state.settings.language);
  const auth = useSelector((state) => state.firebase.auth);
  const profile = useSelector((state) => state.firebase.profile);
  const [text, setText] = useState('');
  const [displaySearch, setDisplaySearch] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (language === 'english') {
      setText(english.header);
    } else if (language === 'spanish') {
      setText(spanish.header);
    }
  }, [language]);

  useEffect(() => {
    if (history.location.pathname === '/') {
      setDisplaySearch(false);
    }
  }, [history]);

  useEffect(() => {
    getSearchTerm(searchTerm);
  }, [searchTerm, getSearchTerm]);

  const initials = () => {
    const first = profile?.firstName?.slice(0, 1);
    const last = profile?.lastName?.slice(0, 1);
    return (first + last).toString();
  };

  return (
    <div
      className={
        auth.uid ? (!displaySearch ? 'header nop' : 'header') : 'hidden'
      }
    >
      <div className='header__input'>
        {displaySearch ? (
          <>
            <input
              type='text'
              className='header__input--search'
              placeholder={text}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className='header__input--icon' />
          </>
        ) : null}
      </div>

      <Link className='header__user' to='/user'>
        <User />
        <h3>{initials()}</h3>
      </Link>
    </div>
  );
};

export default Header;
