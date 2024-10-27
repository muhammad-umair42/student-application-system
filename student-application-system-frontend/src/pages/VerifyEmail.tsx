import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import useUserStore from '../store/useUserStore';
import '../styles/verifyemail.css';
import { makeRequest } from './../api/axios';
const VerifyEmail = () => {
  const { user } = useUserStore();
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.isVerified) {
      navigate('/', { replace: true });
    }
  });
  const handleEmail = async () => {
    const reqparams = {
      method: 'post',
      reqType: 'verifyEmail',
      reqData: {
        id: user?.id,
      },
      url: '/user/sendemailverification',
    };

    const response = await makeRequest(reqparams);
    setEmailSent(true);
  };
  return (
    <Layout>
      <div className="verify_email">
        <div className="verify_email-box">
          <h2>Verify Email</h2>
          <p>
            {emailSent
              ? 'Email has been sent to your email address. Please check your email and verify your email address.'
              : ' Click The Button Below to Verify your email'}
            <strong>{user?.email}</strong>{' '}
          </p>
          <div
            className={`${emailSent ? 'btn-sent' : 'btn'}`}
            onClick={() => {
              if (emailSent) {
                navigate('/');
              } else {
                handleEmail();
              }
            }}
          >
            {emailSent ? 'Check Your Inbox' : 'Send Email'}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VerifyEmail;
