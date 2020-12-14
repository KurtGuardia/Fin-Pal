import React from 'react';
import { sidebarLinks } from './components/data/data';
import './Sidebar.scss';
import { Link } from 'react-router-dom';
import { Settings, Arrow } from '../../assets/icons';
import { FinpalLight } from '../../assets/images';
import SidebarLink from './components/SidebarLink/SidebarLink';
import {
  toggleModal,
  toggleSidebar,
} from '../../store/actions/settingsActions';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../UI/Modal/Modal';

const Sidebar = () => {
  const isSidebarOpen = useSelector((state) => state.settings.isSidebarOpen);
  const dispatch = useDispatch();

  return (
    <nav className={isSidebarOpen ? 'sidebar open' : 'sidebar'}>
      <Modal />
      <div className='sidebar__logo'>
        <Link to='/'>
          <FinpalLight />
          {isSidebarOpen && <h1>FinPal</h1>}
        </Link>
      </div>

      <ul className='sidebar__menu'>
        {sidebarLinks.map((link) => (
          <SidebarLink key={link.id} {...link} isSidebarOpen={isSidebarOpen} />
        ))}
        <li onClick={() => dispatch(toggleModal())}>
          <div className='sidebar-link btn'>
            <Settings />
            {isSidebarOpen && <p>Settings</p>}
          </div>
        </li>
      </ul>

      <div className='sidebar__btn' onClick={() => dispatch(toggleSidebar())}>
        <Arrow className={isSidebarOpen ? 'arrow open' : 'arrow'} />
      </div>
    </nav>
  );
};

export default Sidebar;
