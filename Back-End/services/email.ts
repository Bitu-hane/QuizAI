import nodemailer from 'nodemailer';
import { env } from '../config/env';

const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST || 'smtp.gmail.com',
  port: Number(env.EMAIL_PORT) || 587,
  secure: false, // true for 465
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (to: string, otp: string) => {
  await transporter.sendMail({
    from: env.EMAIL_USER,
    to,
    subject: 'Password Reset OTP',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
        <h2 style="color: #7C3AED;">QuizAI Password Reset</h2>
        <p>You requested a password reset. Use the following OTP to proceed:</p>
        <div style="background: #F5F3FF; padding: 20px; text-align: center; border-radius: 8px; font-size: 32px; font-weight: bold; letter-spacing: 4px;">
          ${otp}
        </div>
        <p style="color: #666; font-size: 14px;">This OTP expires in 10 minutes.</p>
        <p style="color: #666; font-size: 14px;">If you didn't request this, ignore this email.</p>
      </div>
    `,
  });
};