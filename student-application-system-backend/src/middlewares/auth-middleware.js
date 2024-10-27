import { User } from './../models/user-model.js';
export const isUserAuthenticated = async (req, res, next) => {
  try {
    const success = await validateToken(req, res);
    if (success) {
      next();
    } else {
      res.status(401).json({
        message: 'Unauthorized',
      });
    }
  } catch (error) {
    res.status(401).json({
      message: 'Unauthorized',
    });
  }
};

//getting the token from the request
//validating the token is present
//validating the token
//returning true if token is valid and base on user role

const validateToken = async (req, res) => {
  // get token from request
  const accessToken = req?.cookies?.authToken;
  // check if token is valid
  try {
    if (!accessToken) {
      return false;
    }
    //     // get user details
    const response = await fetch('https://graph.microsoft.com/v1.0/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    // get user details
    const newResponse = await response.json();
    if (req?.params?.id) {
      const user = await User.findOne({
        email: newResponse?.userPrincipalName,
      });
      //       // check if user is admin and is updating his own details
      if (user?.role == 'admin' && req?.params?.id == user?._id) {
        return true;
      } else {
        return false;
      }
    } else {
      const user = await User.findOne({
        email: newResponse?.userPrincipalName,
      });

      if (user?._id == req?.body?.id) {
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {}
};
