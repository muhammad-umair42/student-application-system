import cron from 'node-cron';
import nodemailer from 'nodemailer';
import { Application } from './../models/application-model.js';

// Checks users with draft applications and sends them a reminder email every hour
const performDailyTask = async () => {
  try {
    const applications = await Application.find({ status: 'draft' }).populate({
      path: 'user',
      select: 'email',
    });

    // Remove duplicates
    const userEmails = applications
      .map(app => app.user.email)
      .filter((email, index, self) => email && self.indexOf(email) === index);
    if (userEmails.length === 0) {
      console.log('No users found with draft applications.');
      return;
    }
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
      bcc: userEmails.join(','),
      subject: 'Send Your Draft Applications',
      text: `Dear User, You have Draft Applications in student-applications-system to be submitted. Please login and submit them. Thank you.`,
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
    console.error(error);
  }
};

const dailyJob = cron.schedule('0 0 * * *', () => {
  performDailyTask();
});

// Function to start the cron jobs
const startJobs = () => {
  dailyJob.start();
};

export { startJobs };
