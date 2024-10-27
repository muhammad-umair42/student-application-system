import { NavLink } from 'react-router-dom';
import Close from '../../assets/close.png';
import useUserStore from '../../store/useUserStore';
import '../../styles/Sidebar.css';
//here is our navigation exists
//links are shown based on the role of the user
//if user's email is not verified then
//every link will redirect to the veriy email page
interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const { user } = useUserStore();
  return (
    <div
      className={`sidebar ${isSidebarOpen ? 'sidebar_open' : 'sidebar_close'}`}
    >
      <div
        className="sidebar__close-icon"
        onClick={e => {
          e.preventDefault();
          toggleSidebar();
        }}
      >
        <img src={Close} alt="close" />
      </div>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? 'sidebar__item side_active' : 'sidebar__item'
        }
        onClick={toggleSidebar}
      >
        Home
      </NavLink>

      {user?.role == 'user' && (
        <NavLink
          to="/create-application"
          className={({ isActive }) =>
            isActive ? 'sidebar__item side_active' : 'sidebar__item'
          }
          onClick={toggleSidebar}
        >
          Create Application
        </NavLink>
      )}
      {user?.role == 'admin' && (
        <NavLink
          to="/pending-actions"
          className={({ isActive }) =>
            isActive ? 'sidebar__item side_active' : 'sidebar__item'
          }
          onClick={toggleSidebar}
        >
          Pending Actions
        </NavLink>
      )}
      {user?.role == 'user' && (
        <NavLink
          to="/application/draft"
          className={({ isActive }) =>
            isActive ? 'sidebar__item side_active' : 'sidebar__item'
          }
          onClick={toggleSidebar}
        >
          Draft Applications
        </NavLink>
      )}
      {user?.role == 'user' && (
        <NavLink
          to="/application/pending"
          className={({ isActive }) =>
            isActive ? 'sidebar__item side_active' : 'sidebar__item'
          }
          onClick={toggleSidebar}
        >
          Pending Applications
        </NavLink>
      )}
      {user?.role == 'user' && (
        <NavLink
          to="/application/accepted"
          className={({ isActive }) =>
            isActive ? 'sidebar__item side_active' : 'sidebar__item'
          }
          onClick={toggleSidebar}
        >
          Accepted Applications
        </NavLink>
      )}
      {user?.role == 'user' && (
        <NavLink
          to="/application/rejected"
          className={({ isActive }) =>
            isActive ? 'sidebar__item side_active' : 'sidebar__item'
          }
          onClick={toggleSidebar}
        >
          Rejected Applications
        </NavLink>
      )}
    </div>
  );
};

export default Sidebar;
