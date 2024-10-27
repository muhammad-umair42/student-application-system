import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import useUserStore from '../store/useUserStore';
import '../styles/applicationlist.css';
import { makeRequest } from './../api/axios';
//this page fetches the list of applications based on the status/draft applications are dealt in DraftApplications.tsx as it is not readOnly
const ApplicationList = () => {
  const { status } = useParams();
  const { user } = useUserStore();
  interface Application {
    _id: string;
    title: string;
    // Add other properties if needed
  }

  const [applications, setApplications] = useState<Application[]>([]);
  //fetching the applications based on the status
  //status is either 'submitted' or 'approved' or 'rejected'
  //then saving all the applications in the applications state
  useEffect(() => {
    const fetchApplications = async () => {
      const reqParams = {
        method: 'post',
        url: `/applications/list/${status}`,
        reqType: 'application-list',
        reqData: {
          id: user?.id,
        },
      };
      const resApplications = await makeRequest(reqParams);
      setApplications(resApplications);
    };
    fetchApplications();
  }, [status, user?.id]);
  return (
    <Layout>
      <div className="application-list">
        <h1>{status} Applications</h1>
        {applications?.length > 0 ? (
          <div className="application-list_wrapper">
            {applications?.map((item, index) => (
              <Link
                to={
                  user?.role === 'admin'
                    ? `/admin-application-control/${item?._id}`
                    : status === 'draft'
                    ? `/applications/draft/${item?._id}`
                    : `/applications/application/${item?._id}`
                }
                className="application-list_item"
                key={item?._id || index}
              >
                <span>{item?.title}</span>
              </Link>
            ))}
          </div>
        ) : (
          <h2 style={{ color: 'grey' }}>No {status} applications found</h2>
        )}
      </div>
    </Layout>
  );
};

export default ApplicationList;
