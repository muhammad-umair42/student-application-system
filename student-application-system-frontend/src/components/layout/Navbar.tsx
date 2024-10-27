import { Link } from 'react-router-dom';
import Hamburger from '../../assets/hamburger.png';
import Logo from '../../assets/Portal_logo.png';
import '../../styles/navbar.css';

//navbar consists of 3 parts
//hamburger-> which is used to toggle the sidebar(global state)
//logo-> which is used to navigate to the home page
//logout-> which is used to logout the user
interface NavbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div className="navbar">
      {/* Hamburger */}
      <div className="sidebar_hamburger" onClick={toggleSidebar}>
        {!isSidebarOpen && <img src={Hamburger} alt="" />}
      </div>
      {/* Logo */}
      <Link to="/" className="navbar_logo">
        <img src={Logo} alt="Logo" />
      </Link>
      {/* logout */}
      <div className="navbar__left">
        <Link to="/logout">
          {' '}
          <div className="logout">Logout</div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
