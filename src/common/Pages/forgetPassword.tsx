import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import API from '../services/api';
import './forgetPassword.css';

const ForgetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: email, 2: otp, 3: new password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // ----- Step 1: Request OTP -----
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await API.post('/auth/forgot-password', { email });
      setSuccess('OTP sent to your email.');
      setStep(2);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  // ----- Step 2: Verify OTP -----
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await API.post('/auth/verify-otp', { email, otp });
      setSuccess('OTP verified. Set your new password.');
      setStep(3);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP.');
    } finally {
      setLoading(false);
    }
  };

  // ----- Step 3: Reset Password -----
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await API.post('/auth/reset-password', { email, otp, newPassword });
      setSuccess('Password reset successfully.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-page">
      {/* Notebook paper background */}
      <div className="forgot-bg" />
      <div className="forgot-margin" />

      <div className="forgot-card">
        {/* Red top bar */}
        <div className="card-top-bar" />

        {/* Brand */}
        <div className="brand">
          <svg viewBox="0 0 32 32" fill="none" width="30" height="30">
            <rect x="4" y="10" width="24" height="16" rx="2" stroke="#1B2430" strokeWidth="2" />
            <path d="M4 15H28" stroke="#1B2430" strokeWidth="2" />
            <path d="M9 20L13 24L21 15" stroke="#C0392B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="brand-text">Reset Password</span>
        </div>
        <p className="sub-text">Enter your email to receive a one‑time code</p>

        {error && <div className="custom-alert error">{error}</div>}
        {success && <div className="custom-alert success">{success}</div>}

        {/* Step 1: Email */}
        {step === 1 && (
          <form onSubmit={handleRequestOtp}>
            <div className="field">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Send OTP'}
            </button>
          </form>
        )}

        {/* Step 2: OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp}>
            <div className="field">
              <label>One‑Time Code</label>
              <input
                type="text"
                placeholder="Enter the code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify OTP'}
            </button>
            <button type="button" className="btn-link" onClick={() => setStep(1)}>
              Resend OTP
            </button>
          </form>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <div className="field">
              <label>New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="field">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
            </button>
          </form>
        )}

        <p className="footer-link">
          Remember your password? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Log In</a>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;