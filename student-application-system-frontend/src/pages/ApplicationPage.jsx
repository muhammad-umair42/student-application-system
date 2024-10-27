import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useUserStore from '../store/useUserStore';
import '../styles/applicationpage.css';
import { makeRequest } from './../api/axios';
import Layout from './../components/layout/Layout';
//Read Only Application page that displays the application details
//it fetches the applicationid from the url
//then it makes a req to backend with userID(for Auth) and applicationID
//then saving those details in state and displaying them
const ApplicationPage = () => {
  const applicationId = useParams().id;
  const { user } = useUserStore();
  const [application, setApplication] = useState({});
  useEffect(() => {
    const fetchApplication = async () => {
      const reqParams = {
        method: 'post',
        reqType: 'getApplication',
        url: '/applications/get-application',
        reqData: { applicationId, id: user?.id },
      };
      const response = await makeRequest(reqParams);
      setApplication(response);
    };
    fetchApplication();
  }, []);
  return (
    <Layout>
      <div className="application_page">
        <h1>Application Page</h1>
        <div>
          <span>Title:</span>
          <p>{application?.title}</p>
          <span>Description:</span>
          <p>{application?.description}</p>
          <span className="application_status">
            Status: <span>{application?.status}</span>
          </span>
          {application?.remarks && <span>Remarks:</span>}
          {application?.remarks && <p>{application?.remarks}</p>}
        </div>
      </div>
    </Layout>
  );
};

export default ApplicationPage;
