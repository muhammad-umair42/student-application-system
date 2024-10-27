import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeRequest } from '../api/axios.js';
import Logo from '../assets/Portal_logo.png';
import useUserStore from '../store/useUserStore.js';
import '../styles/logoutPage.css';
//this pages uses useeffect to logout and clear all the cookies
//after that it clears zustands state
//and redirects to the signin page
const LogoutPage = () => {
  const clearUser = useUserStore(state => state.clearUser);
  const navigate = useNavigate();
  useEffect(() => {
    const logout = async () => {
      const reqParams = {
        method: 'get',
        url: '/auth/logout',
        reqType: 'logout',
      };
      await makeRequest(reqParams);
      clearUser();
      setTimeout(() => {
        navigate('/signin');
      }, 2000);
    };
    logout();
  }, [clearUser, navigate]);
  return (
    <div className="logout_page">
      <div className="logout_page-box">
        <div className="logout_page-logo">
          <img src={Logo} alt="Logo" />
        </div>
        <span>Signing out</span>
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default LogoutPage;
