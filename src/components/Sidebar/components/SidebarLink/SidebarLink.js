import './SidebarLink.scss';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SidebarLink = ({ id, url, text, icon, isSidebarOpen }) => {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);

  return (
    <li>
      <NavLink
        exact
        to={url}
        className={
          id === 1
            ? isDarkMode
              ? 'sidebar-link dashboard-icon dark'
              : 'sidebar-link dashboard-icon'
            : isDarkMode
            ? 'sidebar-link dark'
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
