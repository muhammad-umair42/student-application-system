import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { makeRequest } from '../api/axios';
import Layout from '../components/layout/Layout';
import SuccessPrompt from '../components/SuccessPrompt';
import useUserStore from '../store/useUserStore';
import '../styles/draftapplication.css';

//this page fetches the applicationid from url
//fetches the application data from the backend
//populates the form with the fetched data
//updates the application data when the user submits the form

const applicationSchema = z.object({
  title: z.string().nonempty('Title is required'),
  description: z.string().nonempty('Description is required'),
});

const DraftApplication = () => {
  const [application, setApplication] = useState<any>(null);
  const applicationId = useParams().id;
  const [successPrompt, setSuccessPrompt] = useState(false);
  const { user } = useUserStore();

  // Initialize form with React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Add reset method to update form values
  } = useForm({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

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
      // Reset form values with the fetched application data
      reset({
        title: response?.title || '',
        description: response?.description || '',
      });
    };
    fetchApplication();
  }, [applicationId, user?.id, reset]); // Include reset in the dependency array

  const onSubmit = async (data: any) => {
    const formData = {
      ...data,
      id: user?.id,
      applicationId: applicationId, // Include user ID in the request data
    };

    const reqParams = {
      method: 'post',
      url: '/applications/update-draft',
      reqData: formData,
      reqType: 'draft-application',
    };
    const resData = await makeRequest(reqParams);
    console.log('Response:', resData);

    if (resData) {
      setSuccessPrompt(true);
    }
  };

  return (
    <Layout>
      <div className="create-application">
        {successPrompt && (
          <SuccessPrompt
            message={'Your application has been successfully submitted.'}
            url={'/'}
            setSuccessPrompt={setSuccessPrompt}
          />
        )}
        <h1>Update Application</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="create-form_item">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" {...register('title')} />
            {errors.title && (
              <div className="error">{errors.title?.message as string}</div>
            )}
          </div>

          <div className="create-form_item">
            <label htmlFor="description">Description</label>
            <textarea id="description" rows={10} {...register('description')} />
            {errors.description && (
              <div className="error">
                {errors.description?.message as string}
              </div>
            )}
          </div>

          <div className="form_btns">
            <button type="submit" name="send">
              Send
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default DraftApplication;
