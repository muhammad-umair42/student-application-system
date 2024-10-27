import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import useUserStore from '../store/useUserStore';
import '../styles/handletokenverify.css';
import { makeRequest } from './../api/axios';
const HandleTokenVerify = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const token = params.get('token');
  const navigate = useNavigate();
  const { user } = useUserStore();
  useEffect(() => {
    const verifyingToken = async () => {
      const reqParams = {
        method: 'post',
        reqType: 'verifyToken',
        url: '/user/verify-user-gmail-token',
        reqData: {
          token: token,
          id: user?.id,
        },
      };
      try {
        const response = await makeRequest(reqParams);
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 3000);
      } catch (error) {
        navigate('/logout', { replace: true });
      }
    };

    verifyingToken();
  }, []);

  return (
    <Layout>
      <div className="handleverify">
        <div className="handleverify-box">
          <h1>Verifying Token</h1>
          <p>Verifying your token please wait...</p>
          <div className="loader"></div>
        </div>
      </div>
    </Layout>
  );
};

export default HandleTokenVerify;
