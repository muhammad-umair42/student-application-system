import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import Layout from '../components/layout/Layout';
import useUserStore from '../store/useUserStore';
import '../styles/adminapplicationcontrol.css';
import { makeRequest } from './../api/axios';

const applicationSchema = z.object({
  remarks: z.string().nonempty('Remarks is required'),
});
// Initialize form with React Hook Form

const AdminApplicationControl = () => {
  //states
  const { user } = useUserStore();
  const navigate = useNavigate();
  const applicationId = useParams().id;
  //applicationtype
  interface ApplicationDetails {
    title: string;
    description: string;

    user: {
      displayName: string;
      email: string;
      department: string;
    };
    // Add other properties as needed
  }
  //application saving statae when fetched from the server
  const [applicationDetails, setApplicationDetails] =
    useState<ApplicationDetails | null>(null);
  useEffect(() => {
    //fetch application details
    //fetch application,user details

    const fetchApplication = async () => {
      const reqParams = {
        method: 'post',
        reqType: 'getUserApplication',
        url: `/applications/get-userapplication/${user?.id}`,
        reqData: { applicationId },
      };
      //data is handled here as we dont need to store it in the store
      const response = await makeRequest(reqParams);

      setApplicationDetails(response);
    };
    fetchApplication();
  }, []);
  useEffect(() => {
    // Log applicationDetails when it updates

    if (applicationDetails) {
      console.log('Updated applicationDetails:', applicationDetails);
    }
  }, [applicationDetails]);

  //form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      remarks: '',
    },
  });
  //on submit it will renavigate to the pending actions page
  const onSubmit = async (data: any, status: string) => {
    const reqParams = {
      method: 'post',
      reqType: 'updateApplicationStatus',
      url: `/applications/update-application-status/${user?.id}`,
      reqData: { applicationId, status, ...data },
    };
    const response = await makeRequest(reqParams);
    return navigate('/pending-actions');
  };
  return (
    <Layout>
      <div className="admin-control">
        <h2>Responding to Application</h2>
        <div className="admin-control-details">
          {/* User Details */}
          <div className="control-user_details">
            <h3>User Details</h3>
            <p>Name: {applicationDetails?.user?.displayName}</p>
            <p>Email: {applicationDetails?.user?.email}</p>
            <p>Department:{applicationDetails?.user.department}</p>
          </div>
          {/* Application details */}
          <div className="control-application_details">
            <h3>Application Details</h3>
            <span>Title:</span>
            <p>{applicationDetails?.title}</p>
            <span>Description:</span>
            <p>{applicationDetails?.description}</p>
          </div>
        </div>
        {/* Remarks Form which accepts the targeted status of application by tracking name of submit butn which do same work */}
        <form
          onSubmit={e => {
            e.preventDefault();
            const target = (e.nativeEvent as SubmitEvent)
              .submitter as HTMLButtonElement;

            const status =
              target?.name === 'accepted' ? 'accepted' : 'rejected';
            handleSubmit(data => onSubmit(data, status))(e);
          }}
        >
          <div className="control-form-item">
            <label htmlFor="remarks">Remarks</label>
            <textarea rows={5} id="remarks" {...register('remarks')} />
            {errors.remarks && (
              <div className="error">{errors.remarks.message}</div>
            )}
          </div>

          <div className="form_btns">
            <button type="submit" name="accepted">
              Accept Application
            </button>
            <button type="submit" name="rejected">
              Reject Application
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AdminApplicationControl;
