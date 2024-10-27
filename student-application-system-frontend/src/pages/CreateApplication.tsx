import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Layout from '../components/layout/Layout';
import SuccessPrompt from '../components/SuccessPrompt';
import useUserStore from '../store/useUserStore';
import '../styles/createapplication.css';
import { makeRequest } from './../api/axios';

//Page for creating a new application
//application can be saved as draft or sent for review
//after successfully submitting an application, a success prompt is displayed
//then reloading the page

const applicationSchema = z.object({
  title: z.string().nonempty('Title is required'),
  description: z.string().nonempty('Description is required'),
});

const CreateApplication = () => {
  const [successPrompt, setSuccessPrompt] = useState(false);
  const { user } = useUserStore();
  // Initialize form with React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit = async (data: any, status: string) => {
    console.log(status);

    const formData = {
      ...data,
      status,
    };

    const reqParams = {
      method: 'post',
      url: '/applications/create-application',
      reqData: {
        ...formData,
        id: user?.id,
      },
      reqType: 'create-application',
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
            setSuccessPrompt={setSuccessPrompt}
          />
        )}
        <h1>Create Application</h1>
        <form
          onSubmit={e => {
            e.preventDefault();
            const target = (e.nativeEvent as SubmitEvent)
              .submitter as HTMLButtonElement;

            const status = target?.name === 'saveDraft' ? 'draft' : 'pending';
            handleSubmit(data => onSubmit(data, status))(e);
          }}
        >
          <div className="create-form_item">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" {...register('title')} />
            {errors.title && (
              <div className="error">{errors.title.message}</div>
            )}
          </div>

          <div className="create-form_item">
            <label htmlFor="description">Description</label>
            <textarea id="description" rows={10} {...register('description')} />
            {errors.description && (
              <div className="error">{errors.description.message}</div>
            )}
          </div>

          <div className="form_btns">
            <button type="submit" name="saveDraft">
              Save Draft
            </button>
            <button type="submit" name="send">
              Send
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateApplication;
