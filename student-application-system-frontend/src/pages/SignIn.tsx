import PortalLogo from '../assets/Portal_logo.png';
import MicrosoftLogo from '../assets/microsoft.png';
import '../styles/signin.css';
const SignIn = () => {
  //Handle Sign in
  const handleSignIn = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    // Redirect to the Microsoft login page
    //not using axios because it does not allow redirects to external urls from server
    window.location.href = 'http://localhost:3000/auth/microsoft';
  };
  return (
    <>
      <div className="signin__page">
        {/* box */}
        <div className="signin__box">
          {/* logo */}
          <div className="signin__box-image_container">
            <img src={PortalLogo} alt="Logo.png" />
          </div>
          <span className="signin__box-welcome">Welcome</span>
          <p>
            {' '}
            Sign in to Student E-Portal to continue your process with
            applications.
          </p>
          {/* sign in button */}
          <div className="signin_btn" onClick={handleSignIn}>
            <img src={MicrosoftLogo} alt="" />
            <span>Sign in with Microsoft</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
