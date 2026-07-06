import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material'; // ✅ type-only import
import API from '../services/api';

const grades = [6, 7, 8, 9, 10, 11, 12];

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [grade, setGrade] = useState<number>(6);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGradeChange = (e: SelectChangeEvent<number>) => {
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
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'center' }}>
          🎉 Welcome!
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', mb: 4 }}>
          Select your grade to personalize your learning experience.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel>Your Grade</InputLabel>
            <Select
              value={grade}
              label="Your Grade"
              onChange={handleGradeChange}
              disabled={loading}
            >
              {grades.map((g) => (
                <MenuItem key={g} value={g}>Grade {g}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={loading}
            sx={{ bgcolor: '#7C3AED' }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Continue to Dashboard'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Onboarding;