import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@mui/material';
import API from '../services/api';

const steps = ['Email', 'OTP', 'New Password'];

const ForgetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
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
      setActiveStep(1);
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
      setActiveStep(2);
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

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <form onSubmit={handleRequestOtp}>
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ mt: 2, bgcolor: '#7C3AED' }}
            >
              {loading ? <CircularProgress size={24} /> : 'Send OTP'}
            </Button>
          </form>
        );
      case 1:
        return (
          <form onSubmit={handleVerifyOtp}>
            <TextField
              label="Enter OTP"
              fullWidth
              margin="normal"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              disabled={loading}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ mt: 2, bgcolor: '#7C3AED' }}
            >
              {loading ? <CircularProgress size={24} /> : 'Verify OTP'}
            </Button>
            <Button
              variant="text"
              fullWidth
              sx={{ mt: 1 }}
              onClick={() => setActiveStep(0)}
            >
              Resend OTP
            </Button>
          </form>
        );
      case 2:
        return (
          <form onSubmit={handleResetPassword}>
            <TextField
              label="New Password"
              type="password"
              fullWidth
              margin="normal"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              disabled={loading}
            />
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ mt: 2, bgcolor: '#7C3AED' }}
            >
              {loading ? <CircularProgress size={24} /> : 'Reset Password'}
            </Button>
          </form>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'center' }}>
          🔐 Reset Password
        </Typography>

        <Stepper activeStep={activeStep} orientation="vertical" sx={{ mt: 3 }}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Box sx={{ mt: 1 }}>
                  {error && (
                    <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
                      {error}
                    </Alert>
                  )}
                  {success && (
                    <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
                      {success}
                    </Alert>
                  )}
                  {getStepContent(index)}
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            Remember your password?{' '}
            <Button
              variant="text"
              sx={{ color: '#7C3AED', fontWeight: 600 }}
              onClick={() => navigate('/login')}
            >
              Log In
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default ForgetPassword;