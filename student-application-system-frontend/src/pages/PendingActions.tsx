import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import useUserStore from '../store/useUserStore';
import '../styles/pendingactions.css';
import { makeRequest } from './../api/axios';

const PendingActions = () => {
  const { user } = useUserStore();
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    const fetchPendingActions = async () => {
      const makeParams = {
        method: 'get',
        url: `/applications/get-all-pendings/${user?.id}`,
        reqType: 'getallpendings',
      };
      const response = await makeRequest(makeParams);
      setApplications(response);
    };
    fetchPendingActions();
  }, [user?.id]);

  console.log(applications);

  return (
    <Layout>
      <div className="pending-actions">
        <h1>Pending Actions</h1>
        <div className="pending_items">
          {applications?.map((application, index) => (
            <Link
              to={`/admin-application-control/${application?._id}`}
              className="pending_item"
              key={application?._id}
            >
              <span>
                {index + 1}.New Applicaion Recieved From{' '}
                {application?.user?.displayName}{' '}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PendingActions;
