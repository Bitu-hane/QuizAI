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







// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Typography,
//   Alert,
//   CircularProgress,
//   Paper,
// } from '@mui/material';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import type { CredentialResponse } from '@react-oauth/google';
// import API from '../common/services/api';
// import './Signup.css';

// const Signup: React.FC = () => {
//   const navigate = useNavigate();

 
//   const today = new Date();
//   const minAge = 8;
//   const maxDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
//   const maxDateString = maxDate.toISOString().split('T')[0];

//   const [formData, setFormData] = useState({
//     FName: '',
//     MName: '',
//     LName: '',
//     gender: 'female',
//     dateOfBirth: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [dateError, setDateError] = useState('');

//   const validateDateOfBirth = (value: string) => {
//     if (!value) {
//       setDateError('Date of birth is required');
//       return;
//     }
//     const selectedDate = new Date(value);
//     const age = today.getFullYear() - selectedDate.getFullYear();
//     const monthDiff = today.getMonth() - selectedDate.getMonth();
//     const dayDiff = today.getDate() - selectedDate.getDate();
//     const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;

//     if (actualAge < minAge) {
//       setDateError(`You must be at least ${minAge} years old to sign up`);
//     } else {
//       setDateError('');
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (name === 'dateOfBirth') {
//       validateDateOfBirth(value);
//     }
//   };

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     if (!formData.FName || !formData.LName || !formData.email || !formData.dateOfBirth) {
//       setError('Please fill all required fields');
//       return;
//     }
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }
//     if (formData.password.length < 6) {
//       setError('Password must be at least 6 characters');
//       return;
//     }
//     if (dateError) {
//       setError(dateError);
//       return;
//     }

//     setLoading(true);
//     try {
//       const { confirmPassword, ...payload } = formData;
//       const res = await API.post('/auth/register', payload);
//       const { accessToken, refreshToken, user } = res.data;
//       localStorage.setItem('token', accessToken);
//       localStorage.setItem('refreshToken', refreshToken);
//       localStorage.setItem('user', JSON.stringify(user));
//       console.log('Signup success:', res.data);
//       navigate('/onboarding');
//     } catch (err: any) {
//       const message = err.response?.data?.message || 'Registration failed. Please try again.';
//       setError(message);
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
//       <Box className="signup-page">
//         <Box className="signup-bg" />
//         <Box className="signup-margin" />

//         <Paper className="signup-card">
//           <Box className="card-top-bar" />

//           <Box className="brand">
//             <svg viewBox="0 0 32 32" fill="none" width="30" height="30">
//               <rect x="4" y="10" width="24" height="16" rx="2" stroke="#1B2430" strokeWidth="2" />
//               <path d="M4 15H28" stroke="#1B2430" strokeWidth="2" />
//               <path d="M9 20L13 24L21 15" stroke="#C0392B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//             <span className="brand-text">Create Account</span>
//           </Box>
//           <Typography className="sub-text">Start your learning journey today</Typography>

//           {error && (
//             <Alert severity="error" className="error-alert" onClose={() => setError('')}>
//               {error}
//             </Alert>
//           )}

//           <form onSubmit={handleSignup}>
         
//             <div className="grid2">
//               <div className="field">
//                 <label>First Name</label>
//                 <input
//                   type="text"
//                   name="FName"
//                   placeholder="Bitanya"
//                   value={formData.FName}
//                   onChange={handleInputChange}
//                   required
//                   disabled={loading}
//                 />
//               </div>
//               <div className="field">
//                 <label>Middle Name</label>
//                 <input
//                   type="text"
//                   name="MName"
//                   placeholder="Optional"
//                   value={formData.MName}
//                   onChange={handleInputChange}
//                   disabled={loading}
//                 />
//               </div>
//             </div>

//             <div className="grid2">
//               <div className="field">
//                 <label>Last Name</label>
//                 <input
//                   type="text"
//                   name="LName"
//                   placeholder="Moges"
//                   value={formData.LName}
//                   onChange={handleInputChange}
//                   required
//                   disabled={loading}
//                 />
//               </div>
//               <div className="field">
//                 <label>Gender</label>
//                 <select
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleInputChange}
//                   disabled={loading}
//                 >
//                   <option value="female">Female</option>
//                   <option value="male">Male</option>
//                   <option value="prefer-not-to-say">Prefer not to say</option>
//                 </select>
//               </div>
//             </div>

//             <div className="field">
//               <label>Date of Birth</label>
//               <input
//                 type="date"
//                 name="dateOfBirth"
//                 value={formData.dateOfBirth}
//                 onChange={handleInputChange}
//                 max={maxDateString}
//                 required
//                 disabled={loading}
//               />
//             </div>

//             <div className="date-hint">{dateError || 'Must be at least 8 years old'}</div>

//             <div className="field">
//               <label>Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="you@example.com"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 required
//                 disabled={loading}
//               />
//             </div>

//             <div className="grid2">
//               <div className="field">
//                 <label>Password</label>
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   placeholder="********"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   required
//                   disabled={loading}
//                 />
//                 <button
//                   type="button"
//                   className="toggle-eye"
//                   onClick={() => setShowPassword(!showPassword)}
//                   aria-label="Show password"
//                 >
//                   <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
//                     <path d="M2 12C2 12 5.5 5.5 12 5.5C18.5 5.5 22 12 22 12C22 12 18.5 18.5 12 18.5C5.5 18.5 2 12 2 12Z" stroke="currentColor" strokeWidth="1.6" />
//                     <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
//                   </svg>
//                 </button>
//               </div>
//               <div className="field">
//                 <label>Confirm Password</label>
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="confirmPassword"
//                   placeholder="********"
//                   value={formData.confirmPassword}
//                   onChange={handleInputChange}
//                   required
//                   disabled={loading}
//                 />
//               </div>
//             </div>

//             <button type="submit" className="btn-primary" disabled={loading}>
//               {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
//             </button>
//           </form>

//           <div className="divider">OR</div>

//           <button className="btn-google" onClick={() => { /* Google login triggers via the GoogleLogin component below */ }}>
//             <svg width="18" height="18" viewBox="0 0 24 24">
//               <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
//               <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85C3.99 20.53 7.7 23 12 23z" />
//               <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.05H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.95l2.85-2.86z" />
//               <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.85c.87-2.6 3.3-4.52 6.16-4.52z" />
//             </svg>
//             Continue with Google
//           </button>

//           <Box sx={{ display: 'none' }}>
//             <GoogleLogin
//               onSuccess={handleGoogleSuccess}
//               onError={handleGoogleError}
//               theme="filled_blue"
//               shape="pill"
//               width="100%"
//               text="signup_with"
//             />
//           </Box>

//           <p className="footer-link">
//             Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Log In</a>
//           </p>
//         </Paper>
//       </Box>
//     </GoogleOAuthProvider>
//   );
// };

// export default Signup;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
} from '@mui/material';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import type { CredentialResponse } from '@react-oauth/google';
import API from '../common/services/api';
import useNotification from '../common/hooks/useNotification';
import './Signup.css';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { showError, showSuccess } = useNotification();

  // Date validation constants
  const today = new Date();
  const minAge = 8;
  const maxDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
  const maxDateString = maxDate.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    FName: '',
    MName: '',
    LName: '',
    gender: 'female',
    dateOfBirth: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'dateOfBirth') {
      validateDateOfBirth(value);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.FName || !formData.LName || !formData.email || !formData.dateOfBirth) {
      showError('Please fill all required fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      showError('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      showError('Password must be at least 6 characters');
      return;
    }
    if (dateError) {
      showError(dateError);
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
      showSuccess('Account created successfully!');
      navigate('/onboarding');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Registration failed. Please try again.';
      showError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    setLoading(true);
    try {
      if (!credentialResponse.credential) {
        throw new Error('No credential returned');
      }
      console.log('Google token:', credentialResponse.credential);
      showSuccess('Google signup successful!');
      navigate('/login');
    } catch (err) {
      showError('Google signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    showError('Google signup failed. Please try again.');
  };

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  if (!clientId) {
    console.warn('Missing VITE_GOOGLE_CLIENT_ID in environment variables');
  }

  return (
    <GoogleOAuthProvider clientId={clientId || ''}>
      <Box className="signup-page">
        {/* Notebook paper background */}
        <Box className="signup-bg" />
        <Box className="signup-margin" />

        <Paper className="signup-card">
          {/* Red top bar */}
          <Box className="card-top-bar" />

          {/* Brand */}
          <Box className="brand">
            <svg viewBox="0 0 32 32" fill="none" width="30" height="30">
              <rect x="4" y="10" width="24" height="16" rx="2" stroke="#1B2430" strokeWidth="2" />
              <path d="M4 15H28" stroke="#1B2430" strokeWidth="2" />
              <path d="M9 20L13 24L21 15" stroke="#C0392B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="brand-text">Create Account</span>
          </Box>
          <Typography className="sub-text">Start your learning journey today</Typography>

          <form onSubmit={handleSignup}>
            {/* Row 1: First Name + Middle Name */}
            <div className="grid2">
              <div className="field">
                <label>First Name</label>
                <input
                  type="text"
                  name="FName"
                  placeholder="Bitanya"
                  value={formData.FName}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </div>
              <div className="field">
                <label>Middle Name</label>
                <input
                  type="text"
                  name="MName"
                  placeholder="Optional"
                  value={formData.MName}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Row 2: Last Name + Gender */}
            <div className="grid2">
              <div className="field">
                <label>Last Name</label>
                <input
                  type="text"
                  name="LName"
                  placeholder="Moges"
                  value={formData.LName}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </div>
              <div className="field">
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  disabled={loading}
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>

            {/* Row 3: Date of Birth (Full width) */}
            <div className="field">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                max={maxDateString}
                required
                disabled={loading}
              />
            </div>

            {/* Date hint */}
            <div className="date-hint">{dateError || 'Must be at least 8 years old'}</div>

            {/* Email */}
            <div className="field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>

            {/* Row 4: Password + Confirm Password */}
            <div className="grid2">
              <div className="field">
                <label>Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleInputChange}
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
              <div className="field">
                <label>Confirm Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="********"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
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

          {/* Hidden GoogleLogin component */}
          <Box sx={{ display: 'none' }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="filled_blue"
              shape="pill"
              width="100%"
              text="signup_with"
            />
          </Box>

          <p className="footer-link">
            Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Log In</a>
          </p>
        </Paper>
      </Box>
    </GoogleOAuthProvider>
  );
};

export default Signup;