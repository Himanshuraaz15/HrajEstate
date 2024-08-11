import nodemailer from "nodemailer";

// nodemailerConfig.js

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use the email service you prefer (e.g., Gmail, SMTP)
  auth: {
    user: process.env.EMAIL, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app password for Gmail
  },
});

export default transporter;


// export const sendOtpEmail = async (email, otp) => {
//   const mailOptions = {
//     from: 'himanshunraj12@gmail.com',
//     to: email,
//     subject: 'Your OTP Code',
//     text: `Your OTP code is ${otp}`,
//   };

//   await transporter.sendMail(mailOptions);
// };


