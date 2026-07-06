// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Container,
//   Paper,
//   Typography,
//   Box,
//   TextField,
//   Button,
//   Divider,
//   Alert,
//   CircularProgress,
//   IconButton,
//   InputAdornment,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import type { CredentialResponse } from '@react-oauth/google';
//  import API from '../services/api';

// const Signup: React.FC = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     FName: '',
//     MName: '',
//     LName: '',
//     gender: 'male',
//     dateOfBirth: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     gradeId: 6,
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   // ----- Handlers -----
//   // For TextField inputs
//   const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // For Select dropdowns
//   const handleSelectChange = (e: any) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }
//     if (formData.password.length < 6) {
//       setError('Password must be at least 6 characters');
//       return;
//     }
//     if (!formData.FName || !formData.LName || !formData.email || !formData.dateOfBirth) {
//       setError('Please fill all required fields');
//       return;
//     }

//     setLoading(true);
//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       console.log('Registration data:', formData);
//       navigate('/login');
//     } catch (err) {
//       setError('Registration failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
//     setError('');
//     setLoading(true);
//     try {
//       if (!credentialResponse.credential) {
//         throw new Error('No credential returned');
//       }
//       console.log('Google token:', credentialResponse.credential);
//       navigate('/login');
//     } catch (err) {
//       setError('Google signup failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleError = () => {
//     setError('Google signup failed. Please try again.');
//   };

//   const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
//   if (!clientId) {
//     console.warn('Missing VITE_GOOGLE_CLIENT_ID in environment variables');
//   }

//   return (
//     <GoogleOAuthProvider clientId={clientId || ''}>
//       <Container maxWidth="sm" sx={{ mt: 4 }}>
//         <Paper
//           elevation={3}
//           sx={{
//             p: 4,
//             borderRadius: 3,
//             bgcolor: 'white',
//             boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
//           }}
//         >
//           <Box sx={{ textAlign: 'center', mb: 3 }}>
//             <Typography variant="h4" sx={{ fontWeight: 700, color: '#1A202C' }}>
//               📚 Create Account
//             </Typography>
//             <Typography variant="body2" sx={{ color: '#64748B', mt: 1 }}>
//               Start your learning journey today
//             </Typography>
//           </Box>

//           {error && (
//             <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
//               {error}
//             </Alert>
//           )}

//           <form onSubmit={handleSignup}>
//             <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
//               <TextField
//                 label="First Name"
//                 name="FName"
//                 value={formData.FName}
//                 onChange={handleTextChange}
//                 required
//                 fullWidth
//                 disabled={loading}
//                 size="small"
//               />
//               <TextField
//                 label="Middle Name"
//                 name="MName"
//                 value={formData.MName}
//                 onChange={handleTextChange}
//                 fullWidth
//                 disabled={loading}
//                 size="small"
//               />
//               <TextField
//                 label="Last Name"
//                 name="LName"
//                 value={formData.LName}
//                 onChange={handleTextChange}
//                 required
//                 fullWidth
//                 disabled={loading}
//                 size="small"
//               />
//               <FormControl fullWidth size="small" disabled={loading}>
//                 <InputLabel>Gender</InputLabel>
//                 <Select
//                   name="gender"
//                   value={formData.gender}
//                   label="Gender"
//                   onChange={handleSelectChange}
//                 >
//                   <MenuItem value="male">Male</MenuItem>
//                   <MenuItem value="female">Female</MenuItem>
//                 </Select>
//               </FormControl>
//               <TextField
//                 label="Date of Birth"
//                 name="dateOfBirth"
//                 type="date"
//                 value={formData.dateOfBirth}
//                 onChange={handleTextChange}
//                 required
//                 fullWidth
//                 disabled={loading}
//                 size="small"
//                 slotProps={{
//                   inputLabel: { shrink: true },
//                 }}
//                 sx={{ gridColumn: { xs: '1', sm: 'span 2' } }}
//               />
//               <TextField
//                 label="Email"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleTextChange}
//                 required
//                 fullWidth
//                 disabled={loading}
//                 size="small"
//                 sx={{ gridColumn: { xs: '1', sm: 'span 2' } }}
//               />
//               <TextField
//                 label="Password"
//                 name="password"
//                 type={showPassword ? 'text' : 'password'}
//                 value={formData.password}
//                 onChange={handleTextChange}
//                 required
//                 fullWidth
//                 disabled={loading}
//                 size="small"
//                 slotProps={{
//                   input: {
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton
//                           onClick={() => setShowPassword(!showPassword)}
//                           edge="end"
//                         >
//                           {showPassword ? <VisibilityOff /> : <Visibility />}
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   },
//                 }}
//               />
//               <TextField
//                 label="Confirm Password"
//                 name="confirmPassword"
//                 type={showPassword ? 'text' : 'password'}
//                 value={formData.confirmPassword}
//                 onChange={handleTextChange}
//                 required
//                 fullWidth
//                 disabled={loading}
//                 size="small"
//               />
//               <FormControl fullWidth size="small" disabled={loading} sx={{ gridColumn: { xs: '1', sm: 'span 2' } }}>
//                 <InputLabel>Grade</InputLabel>
//                 <Select
//                   name="gradeId"
//                   value={formData.gradeId}
//                   label="Grade"
//                   onChange={handleSelectChange}
//                 >
//                   {[6, 7, 8, 9, 10, 11, 12].map((g) => (
//                     <MenuItem key={g} value={g}>Grade {g}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Box>

//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               size="large"
//               disabled={loading}
//               sx={{
//                 mt: 3,
//                 py: 1.5,
//                 bgcolor: '#7C3AED',
//                 '&:hover': { bgcolor: '#6D28D9' },
//                 borderRadius: 2,
//                 fontWeight: 600,
//               }}
//             >
//               {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
//             </Button>
//           </form>

//           <Box sx={{ mt: 3, textAlign: 'center' }}>
//             <Divider sx={{ mb: 2 }}>OR</Divider>
//             <GoogleLogin
//               onSuccess={handleGoogleSuccess}
//               onError={handleGoogleError}
//               theme="filled_blue"
//               shape="pill"
//               width="100%"
//               text="signup_with"
//             />
//           </Box>

//           <Box sx={{ mt: 3, textAlign: 'center' }}>
//             <Typography variant="body2" sx={{ color: '#64748B' }}>
//               Already have an account?{' '}
//               <Button
//                 variant="text"
//                 sx={{
//                   color: '#7C3AED',
//                   fontWeight: 600,
//                   textTransform: 'none',
//                   '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
//                 }}
//                 onClick={() => navigate('/login')}
//               >
//                 Log In
//               </Button>
//             </Typography>
//           </Box>
//         </Paper>
//       </Container>
//     </GoogleOAuthProvider>
//   );
// };

// export default Signup;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Container,
//   Paper,
//   Typography,
//   Box,
//   TextField,
//   Button,
//   Divider,
//   Alert,
//   CircularProgress,
//   IconButton,
//   InputAdornment,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from '@mui/material';
// import type { SelectChangeEvent } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import type { CredentialResponse } from '@react-oauth/google';
// import API from '../common/services/api'; // ✅ uncommented

// const Signup: React.FC = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     FName: '',
//     MName: '',
//     LName: '',
//     gender: 'male',
//     dateOfBirth: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     gradeId: 6,
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   // For TextField inputs
//   const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // For Select dropdowns
//   const handleSelectChange = (e: SelectChangeEvent<string | number>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name as string]: value }));
//   };

//   // ----- Signup handler (actual API call) -----
//  const handleSignup = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setError('');

//   if (formData.password !== formData.confirmPassword) {
//     setError('Passwords do not match');
//     return;
//   }
//   if (formData.password.length < 6) {
//     setError('Password must be at least 6 characters');
//     return;
//   }
//   if (!formData.FName || !formData.LName || !formData.email || !formData.dateOfBirth) {
//     setError('Please fill all required fields');
//     return;
//   }

//   setLoading(true);
//   try {
//     const { confirmPassword, ...payload } = formData;
//     const res = await API.post('/auth/register', payload);
//     const { accessToken, refreshToken, user } = res.data;
//     localStorage.setItem('token', accessToken);
//     localStorage.setItem('refreshToken', refreshToken);
//     localStorage.setItem('user', JSON.stringify(user));
//     console.log('Signup success:', res.data);
//     navigate('/onboarding'); // ✅ redirect to onboarding
//   } catch (err: any) {
//     const message = err.response?.data?.message || 'Registration failed. Please try again.';
//     setError(message);
//   } finally {
//     setLoading(false);
//   }
// };
//   // Google signup (still just redirects, but we can also integrate)
//   const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
//     setError('');
//     setLoading(true);
//     try {
//       if (!credentialResponse.credential) {
//         throw new Error('No credential returned');
//       }
//       // You can send the token to the backend to create a user
//       // const res = await API.post('/auth/google', { token: credentialResponse.credential });
//       // if (res.data) navigate('/login');
//       console.log('Google token:', credentialResponse.credential);
//       navigate('/login');
//     } catch (err) {
//       setError('Google signup failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleError = () => {
//     setError('Google signup failed. Please try again.');
//   };

//   const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
//   if (!clientId) {
//     console.warn('Missing VITE_GOOGLE_CLIENT_ID in environment variables');
//   }

//   return (
//     <GoogleOAuthProvider clientId={clientId || ''}>
//       <Container maxWidth="sm" sx={{ mt: 4 }}>
//         <Paper
//           elevation={3}
//           sx={{
//             p: 4,
//             borderRadius: 3,
//             bgcolor: 'white',
//             boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
//           }}
//         >
//           <Box sx={{ textAlign: 'center', mb: 3 }}>
//             <Typography variant="h4" sx={{ fontWeight: 700, color: '#1A202C' }}>
//               📚 Create Account
//             </Typography>
//             <Typography variant="body2" sx={{ color: '#64748B', mt: 1 }}>
//               Start your learning journey today
//             </Typography>
//           </Box>

//           {error && (
//             <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
//               {error}
//             </Alert>
//           )}

//           <form onSubmit={handleSignup}>
//             <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
//               <TextField
//                 label="First Name"
//                 name="FName"
//                 value={formData.FName}
//                 onChange={handleTextChange}
//                 required
//                 fullWidth
//                 disabled={loading}
//                 size="small"
//               />
//               <TextField
//                 label="Middle Name"
//                 name="MName"
//                 value={formData.MName}
//                 onChange={handleTextChange}
//                 fullWidth
//                 disabled={loading}
//                 size="small"
//               />
//               <TextField
//                 label="Last Name"
//                 name="LName"
//                 value={formData.LName}
//                 onChange={handleTextChange}
//                 required
//                 fullWidth
//                 disabled={loading}
//                 size="small"
//               />
//               <FormControl fullWidth size="small" disabled={loading}>
//                 <InputLabel>Gender</InputLabel>
//                 <Select
//                   name="gender"
//                   value={formData.gender}
//                   label="Gender"
//                   onChange={handleSelectChange}
//                 >
//                   <MenuItem value="male">Male</MenuItem>
//                   <MenuItem value="female">Female</MenuItem>
//                 </Select>
//               </FormControl>
//               <TextField
//                 label="Date of Birth"
//                 name="dateOfBirth"
//                 type="date"
//                 value={formData.dateOfBirth}
//                 onChange={handleTextChange}
//                 required
//                 fullWidth
//                 disabled={loading}
//                 size="small"
//                 slotProps={{
//                   inputLabel: { shrink: true },
//                 }}
//                 sx={{ gridColumn: { xs: '1', sm: 'span 2' } }}
//               />
//               <TextField
//                 label="Email"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleTextChange}
//                 required
//                 fullWidth
//                 disabled={loading}
//                 size="small"
//                 sx={{ gridColumn: { xs: '1', sm: 'span 2' } }}
//               />
//               <TextField
//                 label="Password"
//                 name="password"
//                 type={showPassword ? 'text' : 'password'}
//                 value={formData.password}
//                 onChange={handleTextChange}
//                 required
//                 fullWidth
//                 disabled={loading}
//                 size="small"
//                 slotProps={{
//                   input: {
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton
//                           onClick={() => setShowPassword(!showPassword)}
//                           edge="end"
//                         >
//                           {showPassword ? <VisibilityOff /> : <Visibility />}
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   },
//                 }}
//               />
//               <TextField
//                 label="Confirm Password"
//                 name="confirmPassword"
//                 type={showPassword ? 'text' : 'password'}
//                 value={formData.confirmPassword}
//                 onChange={handleTextChange}
//                 required
//                 fullWidth
//                 disabled={loading}
//                 size="small"
//               />
//               <FormControl fullWidth size="small" disabled={loading} sx={{ gridColumn: { xs: '1', sm: 'span 2' } }}>
//                 <InputLabel>Grade</InputLabel>
//                 <Select
//                   name="gradeId"
//                   value={formData.gradeId}
//                   label="Grade"
//                   onChange={handleSelectChange}
//                 >
//                   {[6, 7, 8, 9, 10, 11, 12].map((g) => (
//                     <MenuItem key={g} value={g}>Grade {g}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Box>

//             <Button
//               type="submit"
//               variant="contained"
//               fullWidth
//               size="large"
//               disabled={loading}
//               sx={{
//                 mt: 3,
//                 py: 1.5,
//                 bgcolor: '#7C3AED',
//                 '&:hover': { bgcolor: '#6D28D9' },
//                 borderRadius: 2,
//                 fontWeight: 600,
//               }}
//             >
//               {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
//             </Button>
//           </form>

//           <Box sx={{ mt: 3, textAlign: 'center' }}>
//             <Divider sx={{ mb: 2 }}>OR</Divider>
//             <GoogleLogin
//               onSuccess={handleGoogleSuccess}
//               onError={handleGoogleError}
//               theme="filled_blue"
//               shape="pill"
//               width="100%"
//               text="signup_with"
//             />
//           </Box>

//           <Box sx={{ mt: 3, textAlign: 'center' }}>
//             <Typography variant="body2" sx={{ color: '#64748B' }}>
//               Already have an account?{' '}
//               <Button
//                 variant="text"
//                 sx={{
//                   color: '#7C3AED',
//                   fontWeight: 600,
//                   textTransform: 'none',
//                   '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
//                 }}
//                 onClick={() => navigate('/login')}
//               >
//                 Log In
//               </Button>
//             </Typography>
//           </Box>
//         </Paper>
//       </Container>
//     </GoogleOAuthProvider>
//   );
// };

// export default Signup;
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import type { CredentialResponse } from '@react-oauth/google';
import API from '../common/services/api';

const Signup: React.FC = () => {
  const navigate = useNavigate();

  // Date validation constants
  const today = new Date();
  const minAge = 8;
  const maxDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
  const maxDateString = maxDate.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    FName: '',
    MName: '',
    LName: '',
    gender: 'male',
    dateOfBirth: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dateError, setDateError] = useState('');

  const validateDateOfBirth = (value: string) => {
    if (!value) {
      setDateError('Date of birth is required');
      return;
    }
    const selectedDate = new Date(value);
    const age = today.getFullYear() - selectedDate.getFullYear();
    const monthDiff = today.getMonth() - selectedDate.getMonth();
    const dayDiff = today.getDate() - selectedDate.getDate();
    const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;

    if (actualAge < minAge) {
      setDateError(`You must be at least ${minAge} years old to sign up`);
    } else {
      setDateError('');
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'dateOfBirth') {
      validateDateOfBirth(value);
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<string | number>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as string]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.FName || !formData.LName || !formData.email || !formData.dateOfBirth) {
      setError('Please fill all required fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (dateError) {
      setError(dateError);
      return;
    }

    setLoading(true);
    try {
      const { confirmPassword, ...payload } = formData;
      const res = await API.post('/auth/register', payload);
      const { accessToken, refreshToken, user } = res.data;
      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));
      console.log('Signup success:', res.data);
      navigate('/onboarding');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(message);
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
      console.log('Google token:', credentialResponse.credential);
      navigate('/login');
    } catch (err) {
      setError('Google signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Google signup failed. Please try again.');
  };

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  if (!clientId) {
    console.warn('Missing VITE_GOOGLE_CLIENT_ID in environment variables');
  }

  return (
    <GoogleOAuthProvider clientId={clientId || ''}>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
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
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1A202C' }}>
              📚 Create Account
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B', mt: 1 }}>
              Start your learning journey today
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSignup}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              <TextField
                label="First Name"
                name="FName"
                value={formData.FName}
                onChange={handleTextChange}
                required
                fullWidth
                disabled={loading}
                size="small"
              />
              <TextField
                label="Middle Name"
                name="MName"
                value={formData.MName}
                onChange={handleTextChange}
                fullWidth
                disabled={loading}
                size="small"
              />
              <TextField
                label="Last Name"
                name="LName"
                value={formData.LName}
                onChange={handleTextChange}
                required
                fullWidth
                disabled={loading}
                size="small"
              />
              <FormControl fullWidth size="small" disabled={loading}>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  label="Gender"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>

              {/* ✅ FIXED DATE FIELD – using slotProps.htmlInput */}
              <TextField
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleTextChange}
                required
                fullWidth
                disabled={loading}
                size="small"
                error={!!dateError}
                helperText={dateError || `Must be at least ${minAge} years old`}
                slotProps={{
                  inputLabel: { shrink: true },      // ✅ Shrink label
                  htmlInput: { max: maxDateString }, // ✅ Native max attribute
                }}
                sx={{ gridColumn: { xs: '1', sm: 'span 2' } }}
              />

              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleTextChange}
                required
                fullWidth
                disabled={loading}
                size="small"
                sx={{ gridColumn: { xs: '1', sm: 'span 2' } }}
              />
              <TextField
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleTextChange}
                required
                fullWidth
                disabled={loading}
                size="small"
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
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleTextChange}
                required
                fullWidth
                disabled={loading}
                size="small"
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.5,
                bgcolor: '#7C3AED',
                '&:hover': { bgcolor: '#6D28D9' },
                borderRadius: 2,
                fontWeight: 600,
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Divider sx={{ mb: 2 }}>OR</Divider>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="filled_blue"
              shape="pill"
              width="100%"
              text="signup_with"
            />
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#64748B' }}>
              Already have an account?{' '}
              <Button
                variant="text"
                sx={{
                  color: '#7C3AED',
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
                }}
                onClick={() => navigate('/login')}
              >
                Log In
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </GoogleOAuthProvider>
  );
};

export default Signup;