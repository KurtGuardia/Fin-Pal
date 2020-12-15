import './SidebarLink.scss';
import { NavLink } from 'react-router-dom';

const SidebarLink = ({ id, url, text, icon, isSidebarOpen }) => {
  return (
    <li>
      <NavLink
        exact
        to={url}
        className={
          text === 'Home' || 'Inicio'
            ? 'sidebar-link dashboard-icon'
            : 'sidebar-link'
        }
      >
        <div className='sidebar-link__icon'>{icon}</div>
        {isSidebarOpen && <p className='sidebar-link__text'>{text}</p>}
      </NavLink>
    </li>
  );
};

export default SidebarLink;
