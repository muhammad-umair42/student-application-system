import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { User } from '../models/user-model.js';
//Extracts the id
//validates the id
//finds the user with the id
//returns the user
export const getUserDetails = async (req, res) => {
  //getting id from req
  const { id } = req.body;
  try {
    //validating id
    if (!id) {
      return res.status(400).json({ message: 'All Fields are required' });
    }
    //finding user
    const user = await User.findById(id);
    //if user not found
    if (!user) {
      return res
        .status(404)
        .json({ message: 'User Not Found! Try Logging Again' });
    }
    //returning user
    return res
      .status(200)
      .json({ message: 'User details fetched successfully', user });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching user details' });
  }
};

//get all the fields from the request
//validates all the fields
//finds the user with the id
//updates the user with the new details
//returns the updated user
export const updateUserDetails = async (req, res) => {
  //getting user details
  const { id, displayName, address, phone, department } = req.body;

  //validating all fields
  try {
    if (!id || !displayName || !address || !phone || !department) {
      return res.status(400).json({ message: 'All Fields are required' });
    }

    //finding user then updating
    const user = await User.findByIdAndUpdate(
      id,
      {
        displayName,
        address,
        phone,
        department,
      },
      { new: true },
    );

    //if user not found
    if (!user) {
      return res
        .status(404)
        .json({ message: 'User Not Found! Try Logging Again' });
    }

    //returning updated user
    return res
      .status(200)
      .json({ message: 'User details updated successfully', user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error updating user details' });
  }
};

//get the id from the request
//validates the id
//finds the user with the id
//creates a token with the user email
//configs the node mailer and email options
//sends the email verification link
export const sendEmailVerification = async (req, res) => {
  try {
    //getting id from req
    const { id } = req.body;
    //validating id
    if (!id) {
      return res.status(400).json({ message: 'All Fields are required' });
    }
    //finding user
    const user = await User.findById(id);
    //if user not found
    if (!user) {
      return res
        .status(404)
        .json({ message: 'User Not Found! Try Logging Again' });
    }
    //creating token
    const token = jwt.sign({ email: user?.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    //configuring nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      secure: true,
      auth: {
        user: `${process.env.EMAIL_USERNAME}`,
        pass: `${process.env.EMAIL_PASSWORD}`,
      },
    });
    //email options
    const mailOptions = {
      from: `${process.env.EMAIL_USERNAME}`, // Sender address
      to: `${user?.email}`, // Receiver address
      subject: 'Email Verification',
      html: `<p>Please verify your email by clicking the link below:</p>
             <a href="http://localhost:5173/handletokenverify?token=${token}">Verify Email</a>`,
    };
    //sending email
    const response = await transporter.sendMail(
      mailOptions,
      function (err, data) {
        if (err) {
          console.error('Error sending email verification', err.message);
          return res
            .status(500)
            .json({ message: 'Error sending email verification' });
        } else {
          res
            .status(200)
            .json({ message: 'Email verification link sent successfully' });
          console.log('Email sent successfully');
        }
      },
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Error sending email verification' });
  }
};

//get the token and id from the request
//validates the token and id
//verifies the token
//updates the user email verification status
//returns the updated user
export const verifyGmailToken = async (req, res) => {
  //getting token and id from req

  const { token, id } = req.body;
  try {
    //validating token and id
    if (!token || !id) {
      return res.status(400).json({ message: 'All Fields are required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //verifying token
    if (!decoded) {
      return res.status(400).json({ message: 'Invalid Token' });
    }
    //updating user email verification status
    const user = await User.findByIdAndUpdate(
      id,
      { isEmailVerified: true },
      { new: true },
    );
    //sending response
    return res
      .status(200)
      .json({ message: 'Email verified successfully', user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error verifying email' });
  }
};
