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
  Box,
  Typography,
  Alert,
  CircularProgress,
  Paper,
} from '@mui/material'; // ✅ Only keep what's used
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import type { CredentialResponse } from '@react-oauth/google';
import API from '../services/api';
import './Login.css';

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
      <Box className="login-page">
        {/* Notebook paper background */}
        <Box className="login-bg" />
        <Box className="login-margin" />

        <Paper className="login-card">
          {/* Red top bar */}
          <Box className="card-top-bar" />

          {/* Brand */}
          <Box className="brand">
            <svg viewBox="0 0 32 32" fill="none" width="30" height="30">
              <rect x="4" y="10" width="24" height="16" rx="2" stroke="#1B2430" strokeWidth="2" />
              <path d="M4 15H28" stroke="#1B2430" strokeWidth="2" />
              <path d="M9 20L13 24L21 15" stroke="#C0392B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="brand-text">QuizAI</span>
          </Box>
          <Typography className="sub-text">Sign in to continue learning</Typography>

          {error && (
            <Alert severity="error" className="error-alert" onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleEmailLogin}>
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

            <div className="field">
              <label>Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                className="toggle-eye"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Show password"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                  <path d="M2 12C2 12 5.5 5.5 12 5.5C18.5 5.5 22 12 22 12C22 12 18.5 18.5 12 18.5C5.5 18.5 2 12 2 12Z" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </button>
            </div>

            <div className="row-between">
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/forgot-password'); }}>Forgot password?</a>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </button>
          </form>

          <div className="divider">OR</div>

          <button className="btn-google" onClick={() => { /* Google login triggers via the GoogleLogin component below */ }}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.05H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.95l2.85-2.86z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.85c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            Continue with Google
          </button>

          {/* Hidden GoogleLogin component to handle the actual OAuth flow */}
          <Box sx={{ display: 'none' }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="filled_blue"
              shape="pill"
              width="100%"
              text="signin_with"
            />
          </Box>

          <p className="footer-link">
            Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/signup'); }}>Sign Up</a>
          </p>
        </Paper>
      </Box>
    </GoogleOAuthProvider>
  );
};

export default Login;