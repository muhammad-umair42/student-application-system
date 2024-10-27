import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { User } from '../store/useUserStore';
import '../styles/profile.css';
//type error as we are importing fn from js file
//could be resolved by changing the file extension to ts
import { useNavigate } from 'react-router-dom';
import { makeRequest } from './../api/axios';
//Profile page is used to display/edit user details.
//it is created dynamically as is used by admin to view/edit other user details
// Define the Zod schema for validation
const userSchema = z.object({
  displayName: z.string().nonempty('Display Name is required'),
  phone: z.string().optional(),
  address: z.string().optional(),
  department: z.string().optional(),
});

//Type define of props
interface ProfileProps {
  id: string | null | undefined;
  user: User | null;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [profileEditMode, setProfileEditMode] = useState(false);
  const navigate = useNavigate();
  // Initializing form with React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      displayName: user?.displayName || '',
      phone: user?.phone || '',
      address: user?.address || '',
      department: user?.department || '',
    },
  });

  //function to update user details
  //req params are setted up
  //data will be handled in datahandler
  const onSubmit = async (data: any) => {
    console.log('Form values:', data);
    const reqParams = {
      method: 'put',
      url: 'user/update-details',
      reqData: {
        id: user?.id,
        displayName: data?.displayName,
        phone: data?.phone,
        address: data?.address,
        department: data?.department,
      },
      reqType: 'update-user-details',
    };

    const response = await makeRequest(reqParams);
    return true;
  };

  return (
    <div className="profile">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Profile Item */}
        <div className="profile_item">
          <span>Name:</span>
          <div className="input_div">
            <input
              className={`${profileEditMode ? '' : 'profile_input-readOnly'}`}
              type="text"
              readOnly={!profileEditMode}
              {...register('displayName')}
            />
            {errors.displayName && (
              <div className="error">{errors.displayName.message}</div>
            )}
          </div>
        </div>
        {/* Profile Item */}

        <div className="profile_item">
          <span>Email:</span>
          <div className="input_div">
            <input
              type="text"
              readOnly
              value={user?.email || ''}
              className="profile_input-readOnly"
            />
          </div>
        </div>
        {/* Profile Item */}

        <div className="profile_item">
          <span>Phone:</span>
          <div className="input_div">
            <input
              className={`${profileEditMode ? '' : 'profile_input-readOnly'}`}
              type="text"
              readOnly={!profileEditMode}
              {...register('phone')}
            />
          </div>
        </div>
        {/* Profile Item */}

        <div className="profile_item">
          <span>Address:</span>
          <div className="input_div">
            <textarea
              className={`${profileEditMode ? '' : 'profile_input-readOnly'}`}
              readOnly={!profileEditMode}
              rows={4}
              {...register('address')}
            />
          </div>
        </div>
        {/* Profile Item */}

        <div className="profile_item">
          <span>Department:</span>
          <div className="input_div">
            <input
              className={`${profileEditMode ? '' : 'profile_input-readOnly'}`}
              type="text"
              readOnly={!profileEditMode}
              {...register('department')}
            />
          </div>
        </div>
        {/* Profile BUttons */}

        {profileEditMode ? (
          <button type="submit" className="profile_save-btn">
            Save Profile
          </button>
        ) : (
          <div
            className="profile_edit-btn"
            onClick={() => {
              if (user?.isVerified) {
                setProfileEditMode(true);
              } else {
                navigate('/verifyemail');
              }
            }}
          >
            Edit Profile
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;
