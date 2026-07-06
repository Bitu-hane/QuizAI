// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Container,
//   Paper,
//   Typography,
//   Box,
// } from '@mui/material';

// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import type { CredentialResponse } from '@react-oauth/google';
// const Login: React.FC = () => {
//   const navigate = useNavigate();

//   const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
//     try {
//       console.log('Google ID Token:', credentialResponse.credential);

//       if (!credentialResponse.credential) {
//         console.error('No credential returned');
//         return;
//       }

//       // Example backend call
//       // const res = await API.post('/auth/google', {
//       //   token: credentialResponse.credential,
//       // });

//       // if (res.data.success) {
//       //   navigate('/student/lessons');
//       // }

//       navigate('/student/lessons'); // temporary direct navigation
//     } catch (err) {
//       console.error('Google login error:', err);
//     }
//   };

//   const handleGoogleError = () => {
//     console.error('Google Login Failed');
//   };

//   return (
//     <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
//       <Container maxWidth="sm" sx={{ mt: 8 }}>
//         <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          
//           <Typography variant="h4" align="center" gutterBottom>
//             Login
//           </Typography>

//           {/* Your normal login form goes here */}
//           <Box>
//             {/* email/password inputs etc */}
//           </Box>

// <Box sx={{ mt: 2, textAlign: 'center' }}>
//                 <Typography variant="body2" sx={{ mb: 2 }}>
//               OR
//             </Typography>

//             <GoogleLogin
//               onSuccess={handleGoogleSuccess}
//               onError={handleGoogleError}
//             />
//           </Box>

//         </Paper>
//       </Container>
//     </GoogleOAuthProvider>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Divider,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import type { CredentialResponse } from '@react-oauth/google';
import API from '../services/api';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await API.post('/auth/login', { email, password });
      const { accessToken, refreshToken, user } = res.data;
      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));
      const roles = user.roles || ['student'];
      navigate(roles.includes('admin') ? '/admin/dashboard' : '/student/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    setError('');
    setLoading(true);
    try {
      if (!credentialResponse.credential) {
        throw new Error('No credential returned');
      }
      const res = await API.post('/auth/google', { token: credentialResponse.credential });
      const { accessToken, refreshToken, user } = res.data;
      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));
      const roles = user.roles || ['student'];
      navigate(roles.includes('admin') ? '/admin/dashboard' : '/student/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Google login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Google login failed. Please try again.');
  };

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  if (!clientId) {
    console.warn('Missing VITE_GOOGLE_CLIENT_ID in environment variables');
  }

  return (
    <GoogleOAuthProvider clientId={clientId || ''}>
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            bgcolor: 'white',
            boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
          }}
        >
      <Box sx={{ textAlign: 'center', mb: 3 }}>
  <Typography variant="h4" sx={{ color: '#1A202C', fontWeight: 700 }}>
    📚 QuizAI
  </Typography>
  <Typography variant="body2" sx={{ color: '#64748B', mt: 1 }}>
    Sign in to continue learning
  </Typography>
</Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleEmailLogin}>
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              sx={{ mb: 1 }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              sx={{
                mt: 2,
                py: 1.5,
                bgcolor: '#7C3AED',
                '&:hover': { bgcolor: '#6D28D9' },
                borderRadius: 2,
                fontWeight: 600,
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
          </form>

        <Box sx={{ mt: 2, textAlign: 'right' }}>
  <Typography
    variant="body2"
    color="#7C3AED"
    sx={{ cursor: 'pointer' }}
onClick={() => navigate('/forgot-password')}
  >
    Forgot password?
  </Typography>
</Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Divider sx={{ mb: 2 }}>OR</Divider>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="filled_blue"
              shape="pill"
              width="100%"
              text="signin_with"
            />
          </Box>

      <Box
  sx={{
    mt: 3,
    textAlign: 'center',
  }}
>
  <Typography
    variant="body2"
    sx={{
      color: '#64748B',
    }}
  >
    Don't have an account?{' '}
    <Button
      variant="text"
      sx={{
        color: '#7C3AED',
        fontWeight: 600,
        textTransform: 'none',
        '&:hover': {
          bgcolor: 'transparent',
          textDecoration: 'underline',
        },
      }}
      onClick={() => navigate('/signup')}
    >
      Sign Up
    </Button>
  </Typography>
</Box>
        </Paper>
      </Container>
    </GoogleOAuthProvider>
  );
};

export default Login;