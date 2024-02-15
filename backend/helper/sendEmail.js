import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
  });
};

const sendMail = async (mailOptions) => {
  try {
    const transporter = createTransporter();
     await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email send failed with error:', error);
    throw error;
  }
};

const sendResetLinkEmail = async (recipientEmail, resetLink) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: ${resetLink}`,
    };
    
    
    await sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

export { sendResetLinkEmail };
