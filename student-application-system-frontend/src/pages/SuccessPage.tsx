import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Portal_logo.png';
import TickImage from '../assets/tick.png';
import '../styles/successPage.css';
import useUserStore from './../store/useUserStore';
const SuccessPage = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  useEffect(() => {
    const url = new URL(window.location.href);

    // Retrieve parameters from the URL
    const id = url.searchParams.get('id');
    const address = url.searchParams.get('address');
    const phone = url.searchParams.get('department');
    const department = url.searchParams.get('phone');
    const email = url.searchParams.get('email');
    const displayName = url.searchParams.get('displayName');
    const role = url.searchParams.get('role');
    const isVerifiedString = url.searchParams.get('isVerified');
    const isVerified = isVerifiedString === 'true';
    // Check for missing parameters and navigate to sign-in if any are missing
    if (
      !id ||
      !email ||
      !displayName ||
      !role ||
      !isVerifiedString ||
      !address ||
      !phone ||
      !department
    ) {
      return navigate('/signin');
    }

    console.log(
      id,
      email,
      displayName,
      role,
      isVerified,
      address,
      phone,
      department,
    );

    // Create user data object
    const userData = {
      id,
      email,
      displayName,
      role,
      isVerified,
      address,
      phone,
      department,
    };

    setUser(userData);
    const timer = setTimeout(() => {
      navigate('/'); // Navigate to homepage
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate, setUser]);
  return (
    <div className="success_page">
      <div className="success_page-box">
        <div className="success_page-logo_container">
          <img src={Logo} alt="" />
        </div>
        <div className="success_page-img_container">
          <img src={TickImage} alt="Tick" />
        </div>
        <span>You have been Successfully Logged in.</span>
      </div>
    </div>
  );
};

export default SuccessPage;
