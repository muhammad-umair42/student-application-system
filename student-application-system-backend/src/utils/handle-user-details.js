import { User } from '../models/user-model.js';
//1.if email or displayName is not present in account object
//then fetching them from ms graph
//2.checking if user is existing or new/creating new user if new
//3.returning encoded user details
export const handlingUserDetails = async (accessToken, account) => {
  try {
    let email = account?.username;
    let displayName = account?.name;

    //1.if email or displayName is not present in account object
    //then fetching them from ms graph
    if (!displayName || !email) {
      const response = await getUserDetailsFromMsGraph(accessToken);
      email = response?.userPrincipalName;
      displayName = response?.displayName;
    }

    //2.checking if user is existing or new/creating new user if new
    //finding user in db
    let user = await User.findOne({ email });

    if (!user) {
      //creating new user
      user = await User.create({ email, displayName });
    }

    console.log('User details Aquired:', user);

    //3.returning encoded user details
    email = encodeURIComponent(user?.email);
    displayName = encodeURIComponent(user?.displayName);
    let role = encodeURIComponent(user?.role);
    let isVerified = encodeURIComponent(user?.isEmailVerified);
    let id = encodeURIComponent(user?._id);
    let address = encodeURIComponent(user?.address || '#example');
    let department = encodeURIComponent(user?.department || '#example');
    let phone = encodeURIComponent(user?.phone || '#example');

    return {
      id,
      email,
      displayName,
      role,
      isVerified,
      address,
      department,
      phone,
    };
  } catch (error) {
    console.error('Error handling user details:', error);
    return res.status(500).json({ message: 'Error handling user details' });
  }
};
