// import nodemailer from 'nodemailer';
// import { env } from '../config/env';

// const transporter = nodemailer.createTransport({
//   host: env.EMAIL_HOST || 'smtp.gmail.com',
//   port: Number(env.EMAIL_PORT) || 587,
//   secure: false, // true for 465
//   auth: {
//     user: env.EMAIL_USER,
//     pass: env.EMAIL_PASS,
//   },
// });

// export const sendOTPEmail = async (to: string, otp: string) => {
//   await transporter.sendMail({
//     from: env.EMAIL_USER,
//     to,
//     subject: 'Password Reset OTP',
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
//         <h2 style="color: #7C3AED;">QuizAI Password Reset</h2>
//         <p>You requested a password reset. Use the following OTP to proceed:</p>
//         <div style="background: #F5F3FF; padding: 20px; text-align: center; border-radius: 8px; font-size: 32px; font-weight: bold; letter-spacing: 4px;">
//           ${otp}
//         </div>
//         <p style="color: #666; font-size: 14px;">This OTP expires in 10 minutes.</p>
//         <p style="color: #666; font-size: 14px;">If you didn't request this, ignore this email.</p>
//       </div>
//     `,
//   });
// };



import nodemailer from 'nodemailer';
import { env } from '../config/env';

// ✅ Use Gmail SMTP with SSL (port 465)
const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST || 'smtp.gmail.com',
  port: Number(env.EMAIL_PORT) || 465,
  secure: true, // SSL
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
  tls: {
    family: 4, // force IPv4
  },
  connectionTimeout: 5000,
  greetingTimeout: 5000,
  socketTimeout: 5000,
} as any);

export const sendOTPEmail = async (to: string, otp: string) => {
  try {
    await transporter.sendMail({
      from: env.EMAIL_USER, // ✅ Sends from your Gmail
      to,
      subject: 'Password Reset OTP – QuizAI',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
          <h2 style="color: #7C3AED;">🔐 QuizAI Password Reset</h2>
          <p>You requested a password reset. Use the following OTP to proceed:</p>
          <div style="background: #F5F3FF; padding: 20px; text-align: center; border-radius: 8px; font-size: 32px; font-weight: bold; letter-spacing: 4px;">
            ${otp}
          </div>
          <p style="color: #666; font-size: 14px;">This OTP expires in 10 minutes.</p>
          <p style="color: #666; font-size: 14px;">If you didn't request this, ignore this email.</p>
          <hr />
          <p style="color: #999; font-size: 12px;">QuizAI – Learn Smarter with AI</p>
        </div>
      `,
    });
    console.log(`📧 OTP email sent to ${to}`);
  } catch (error) {
    console.error('❌ Email send error:', error);
    throw error;
  }
};