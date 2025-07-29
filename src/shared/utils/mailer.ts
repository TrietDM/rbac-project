import * as nodemailer from 'nodemailer';

export const sendEmail = async (to: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    to,
    subject: 'Your OTP Code',
    text: `Your OTP is: ${otp}`,
  });
};