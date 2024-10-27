import useUserStore from '../store/useUserStore';
//here we can handle the data that we get from the server
export const dataHandler = ({ data, reqType }) => {
  const { setUser } = useUserStore.getState();
  let resData = null;
  switch (reqType) {
    case 'logout':
      return (resData = true);
    case 'update-user-details':
      const updatedUser = { id: data?.user?._id, ...data?.user };
      setUser(updatedUser);
      return (resData = 'Success');

      break;
    case 'create-application':
      return { resData: 'Success' };
      break;
    case 'application-list':
      return { resData: data?.applications };

      break;
    case 'getApplication':
      return { resData: data?.application };
      break;
    case 'draft-application':
      return { resData: 'Success' };

      break;
    case 'getUserApplication':
      return { resData: data?.application };

      break;
    case 'updateApplicationStatus':
      return { resData: 'Success' };
      break;
    case 'getallpendings':
      return { resData: data?.applications };

      break;
    case 'verifyEmail':
      return { resData: 'Success' };

      break;
    case 'verifyToken':
      console.log(data);

      setUser({
        id: data?.user?._id,
        email: data?.user?.email,
        role: data?.user?.role,
        isVerified: data?.user?.isEmailVerified,
        displayName: data?.user?.displayName,
        phone: data?.user?.phone || '',
        address: data?.user?.address || '',
        department: data?.user?.department || '',
      });
      return { resData: 'Success' };
  }
};
