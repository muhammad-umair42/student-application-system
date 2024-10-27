import { ConfidentialClientApplication } from '@azure/msal-node';

import { handlingUserDetails } from '../utils/handle-user-details.js';
import { getUserDetailsFromMsGraph } from './../utils/user-details-msgraph.js';

//LOGIN FUNCTIONS--------------------
//1.setting req params
//2.sending request to get authURL
//3.redirecting user to microsoft login page

export const generatingAuthUrl = async (req, res) => {
  //1.setting req params
  const authUrlParams = {
    scopes: ['user.read'],
    redirectUri: process.env.AZURE_REDIRECT_URI,
  };

  try {
    const msalConfig = {
      auth: {
        clientId: `${process.env.AZURE_CLIENT_ID}`,
        authority: `https://login.microsoftonline.com/common/7fa84815-8fcd-41fa-8542-5f8cb10487a7`,
        clientSecret: `${process.env.AZURE_CLIENT_SECRET}`,
        redirectUri: `${process.env.AZURE_REDIRECT_URI}`,
      },
    };
    const cca = new ConfidentialClientApplication(msalConfig);
    //2.sending request to get authURL
    const authURL = await cca.getAuthCodeUrl(authUrlParams);

    //3.redirecting user to microsoft login page
    console.log('Redirecting to AUTH URL');
    return res.redirect(authURL);
  } catch (error) {
    return res.status(500).json({ message: 'Error generating AUTH URL' });
  }
};

//1.Acquiring token and user details(in account object)
//2.handling user details
//3.setting cookie
//4.redirecting user to success page with user details
export const OAuthCallback = async (req, res) => {
  const tokenRequest = {
    code: req.query.code,
    scopes: ['user.read'],
    redirectUri: process.env.AZURE_REDIRECT_URI,
  };
  try {
    const msalConfig = {
      auth: {
        clientId: `${process.env.AZURE_CLIENT_ID}`,
        authority: `${process.env.AZURE_AUTHORITY}`,
        clientSecret: `${process.env.AZURE_CLIENT_SECRET}`,
        redirectUri: `${process.env.AZURE_REDIRECT_URI}`,
      },
    };
    const cca = new ConfidentialClientApplication(msalConfig);
    //1.Acquiring token and user details(in account object)
    const response = await cca.acquireTokenByCode(tokenRequest);
    console.log('Token acquired:');

    const { accessToken, expiresOn, account } = response;
    //2.handling user details
    //Generally creates/get the user that signed in a
    //returns url encoded string of user details
    //function returns saved user from database
    const {
      id,
      email,
      displayName,
      role,
      isVerified,
      address,
      department,
      phone,
    } = await handlingUserDetails(accessToken, account);

    //3.setting cookie
    //setting cookie expiry in such a way that it expires when token expires
    const expiryDuration = new Date(expiresOn).getTime() - Date.now();

    res.cookie('authToken', accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: expiryDuration,
    });
    console.log('Cookie set');
    //4.redirecting user to success page with user details
    return res.redirect(
      `http://localhost:5173/success?id=${id}&email=${email}&displayName=${displayName}&role=${role}&isVerified=${isVerified}&address=${address}&department=${department}&phone=${phone}`,
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error acquiring token',
      error: error?.message,
    });
  }
};

//LOGOUT FUNCTION--------------------
export const logout = async (req, res) => {
  try {
    // Clear the authentication cookie
    res.clearCookie('authToken', {
      httpOnly: true,
      secure: false, // Set to true if using HTTPS in production
      sameSite: 'Strict', // Prevents CSRF attacks
    });
    console.log('Cookie cleared');
    return res.status(200).json({ success: true, message: 'User logged out' });
  } catch (error) {
    console.error('Error during logout:', error);
    return res.status(500).json({
      success: false,
      message: 'Error during logout',
      error: error?.message,
    });
  }
};
