import React, { useEffect, useState } from 'react';
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
import { english, spanish } from '../../languages';

const Sidebar = () => {
  const isSidebarOpen = useSelector((state) => state.settings.isSidebarOpen);
  const language = useSelector((state) => state.settings.language);
  const [content, setContent] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (language === 'english') {
      setContent({ ...english.sidebar });
    } else if (language === 'spanish') {
      setContent({ ...spanish.sidebar });
    }
    console.log(content);
  }, [language]);

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
        {sidebarLinks.map((link, i) => (
          <SidebarLink
            key={link.id}
            {...link}
            text={content && content[i]}
            isSidebarOpen={isSidebarOpen}
          />
        ))}
        <li onClick={() => dispatch(toggleModal())}>
          <div className='sidebar-link btn'>
            <Settings />
            {isSidebarOpen && (
              <p>{language === 'english' ? 'Settings' : 'Ajustes'}</p>
            )}
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
