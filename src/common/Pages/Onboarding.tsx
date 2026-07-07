import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Alert,
  CircularProgress,
  Paper,
} from '@mui/material';
import API from '../services/api';
import './Onboarding.css';

const grades = [6, 7, 8, 9, 10, 11, 12];

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [grade, setGrade] = useState<number>(6);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGrade(Number(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await API.post('/users/onboarding', { gradeId: grade });
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        user.onboardingCompleted = true;
        localStorage.setItem('user', JSON.stringify(user));
      }
      navigate('/student/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to complete onboarding');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="onboarding-page">
      {/* Notebook paper background */}
      <Box className="onboarding-bg" />
      <Box className="onboarding-margin" />

      <Paper className="onboarding-card">
        {/* Red top bar */}
        <Box className="card-top-bar" />

        {/* Brand */}
        <Box className="brand">
          <svg viewBox="0 0 32 32" fill="none" width="30" height="30">
            <rect x="4" y="10" width="24" height="16" rx="2" stroke="#1B2430" strokeWidth="2" />
            <path d="M4 15H28" stroke="#1B2430" strokeWidth="2" />
            <path d="M9 20L13 24L21 15" stroke="#C0392B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="brand-text">Welcome to QuizAI</span>
        </Box>
        <Typography className="sub-text">Select your grade to personalize your learning experience.</Typography>

        {error && (
          <Alert severity="error" className="error-alert" onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Your Grade</label>
            <select
              value={grade}
              onChange={handleGradeChange}
              disabled={loading}
              className="grade-select"
            >
              {grades.map((g) => (
                <option key={g} value={g}>Grade {g}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Continue to Dashboard'}
          </button>
        </form>

        <p className="footer-link">
          You can change your grade later in settings.
        </p>
      </Paper>
    </Box>
  );
};

export default Onboarding;