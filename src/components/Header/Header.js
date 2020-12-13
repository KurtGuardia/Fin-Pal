import React from 'react';
import './Header.scss';
import { User } from '../../assets/icons';
import { Search } from '../../assets/icons';

const Header = () => {
  return (
    <div className='header'>
      <div className='header__input'>
        <input
          type='text'
          className='header__input--search'
          placeholder='Search'
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
