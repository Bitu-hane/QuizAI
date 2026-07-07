// import React, { useState } from 'react';
// //import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Container,
//   Typography,
//   Card,
//   CardContent,
//   TextField,
//   Button,
//   Switch,
//   FormControlLabel,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Avatar,
//   IconButton,
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
// } from '@mui/material';
// import { PhotoCamera, Save, Delete } from '@mui/icons-material';
// import Layout from '../common/component/layout';
// import StudentSidebar from './components/Sidebar';

// const Settings: React.FC = () => {
//   //const navigate = useNavigate();

//   // ----- Mock Profile Data -----
//   const [profile, setProfile] = useState({
//     FName: 'Abebe',
//     MName: '',
//     LName: 'Kebede',
//     email: 'abebe@example.com',
//     dateOfBirth: '2005-01-01',
//     gender: 'male',
//     gradeId: 10,
//   });

//   // ----- Mock Password Data -----
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });

//   // ----- Preferences -----
//   const [darkMode, setDarkMode] = useState(false);
//   const [emailNotifications, setEmailNotifications] = useState(true);
//   const [difficulty, setDifficulty] = useState('adaptive');

//   // ----- UI State -----
//   const [saving, setSaving] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '', 
//     severity: 'success' as 'success' | 'error' | 'info' ,
//   });
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

//   // ----- Handlers -----
//   const handleSaveProfile = () => {
//     setSaving(true);
//     setTimeout(() => {
//       setSaving(false);
//       setSnackbar({ open: true, message: 'Profile updated successfully!', severity: 'success' });
//     }, 800);
//   };

//   const handleChangePassword = () => {
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       setSnackbar({ open: true, message: 'Passwords do not match', severity: 'error' });
//       return;
//     }
//     if (passwordData.newPassword.length < 6) {
//       setSnackbar({ open: true, message: 'Password must be at least 6 characters', severity: 'error' });
//       return;
//     }
//     setSaving(true);
//     setTimeout(() => {
//       setSaving(false);
//       setSnackbar({ open: true, message: 'Password changed successfully!', severity: 'success' });
//       setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
//     }, 800);
//   };

//   const handleDeleteAccount = () => {
//     setDeleteDialogOpen(false);
//     setSnackbar({ open: true, message: 'Account deletion is not implemented yet.', severity: 'info' });
//     // In a real app: navigate('/login') after deletion
//   };

//   const toggleDarkMode = (checked: boolean) => {
//     setDarkMode(checked);
//     localStorage.setItem('darkMode', String(checked));
//   };

//   return (
//     <Layout title="Settings" sidebar={<StudentSidebar />}>
//       <Container maxWidth="md" sx={{ mt: 4 }}>
//         <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
//           ⚙️ Settings
//         </Typography>

//         {/* ===== PROFILE CARD ===== */}
//         <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
//           <CardContent>
//             <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
//               👤 Profile
//             </Typography>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
//               <Avatar sx={{ width: 80, height: 80, bgcolor: '#7C3AED' }}>
//                 {profile.FName ? profile.FName[0] : 'U'}
//               </Avatar>
//               <IconButton color="primary" component="label">
//                 <PhotoCamera />
//                 <input hidden accept="image/*" type="file" />
//               </IconButton>
//             </Box>
//             <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
//               <TextField
//                 label="First Name"
//                 value={profile.FName}
//                 onChange={(e) => setProfile({ ...profile, FName: e.target.value })}
//                 fullWidth
//               />
//               <TextField
//                 label="Middle Name"
//                 value={profile.MName}
//                 onChange={(e) => setProfile({ ...profile, MName: e.target.value })}
//                 fullWidth
//               />
//               <TextField
//                 label="Last Name"
//                 value={profile.LName}
//                 onChange={(e) => setProfile({ ...profile, LName: e.target.value })}
//                 fullWidth
//               />
//               <TextField
//                 label="Email"
//                 value={profile.email}
//                 disabled
//                 fullWidth
//                 sx={{ '& .MuiInputBase-root': { bgcolor: '#f5f5f5' } }}
//               />
//               <TextField
//                 label="Date of Birth"
//                 type="date"
//                 value={profile.dateOfBirth}
//                 onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
//                 fullWidth
//                 slotProps={{
//                   inputLabel: { shrink: true },
//                 }}
//               />
//               <FormControl fullWidth>
//                 <InputLabel>Gender</InputLabel>
//                 <Select
//                   value={profile.gender}
//                   label="Gender"
//                   onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
//                 >
//                   <MenuItem value="male">Male</MenuItem>
//                   <MenuItem value="female">Female</MenuItem>
//                 </Select>
//               </FormControl>
//               <FormControl fullWidth>
//                 <InputLabel>Grade</InputLabel>
//                 <Select
//                   value={profile.gradeId}
//                   label="Grade"
//                   onChange={(e) => setProfile({ ...profile, gradeId: Number(e.target.value) })}
//                 >
//                   {[6, 7, 8, 9, 10, 11, 12].map((g) => (
//                     <MenuItem key={g} value={g}>Grade {g}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Box>
//             <Button
//               variant="contained"
//               startIcon={<Save />}
//               onClick={handleSaveProfile}
//               disabled={saving}
//               sx={{ mt: 3, bgcolor: '#7C3AED' }}
//             >
//               {saving ? 'Saving...' : 'Save Profile'}
//             </Button>
//           </CardContent>
//         </Card>

//         {/* ===== SECURITY CARD ===== */}
//         <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
//           <CardContent>
//             <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
//               🔐 Security
//             </Typography>
//             <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 2, maxWidth: 400 }}>
//               <TextField
//                 label="Current Password"
//                 type="password"
//                 value={passwordData.currentPassword}
//                 onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
//                 fullWidth
//               />
//               <TextField
//                 label="New Password"
//                 type="password"
//                 value={passwordData.newPassword}
//                 onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
//                 fullWidth
//               />
//               <TextField
//                 label="Confirm New Password"
//                 type="password"
//                 value={passwordData.confirmPassword}
//                 onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
//                 fullWidth
//               />
//             </Box>
//             <Button
//               variant="contained"
//               startIcon={<Save />}
//               onClick={handleChangePassword}
//               disabled={saving}
//               sx={{ mt: 3, bgcolor: '#7C3AED' }}
//             >
//               {saving ? 'Updating...' : 'Change Password'}
//             </Button>
//           </CardContent>
//         </Card>

//         {/* ===== PREFERENCES CARD ===== */}
//         <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
//           <CardContent>
//             <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
//               🎯 Preferences
//             </Typography>
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
//               <FormControlLabel
//                 control={
//                   <Switch
//                     checked={darkMode}
//                     onChange={(e) => toggleDarkMode(e.target.checked)}
//                     sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#7C3AED' } }}
//                   />
//                 }
//                 label="Dark Mode"
//               />
//               <FormControlLabel
//                 control={
//                   <Switch
//                     checked={emailNotifications}
//                     onChange={(e) => setEmailNotifications(e.target.checked)}
//                     sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#7C3AED' } }}
//                   />
//                 }
//                 label="Email Notifications"
//               />
//               <FormControl fullWidth>
//                 <InputLabel>Difficulty Level</InputLabel>
//                 <Select
//                   value={difficulty}
//                   label="Difficulty Level"
//                   onChange={(e) => setDifficulty(e.target.value)}
//                 >
//                   <MenuItem value="easy">Easy</MenuItem>
//                   <MenuItem value="medium">Medium</MenuItem>
//                   <MenuItem value="hard">Hard</MenuItem>
//                   <MenuItem value="adaptive">Adaptive (AI)</MenuItem>
//                 </Select>
//               </FormControl>
//             </Box>
//           </CardContent>
//         </Card>

//         {/* ===== DANGER ZONE ===== */}
//         <Card sx={{ mb: 3, borderRadius: 3, border: '1px solid #FEE2E2' }}>
//           <CardContent>
//             <Typography variant="h6" sx={{ fontWeight: 600, color: '#DC2626', mb: 2 }}>
//               ⚠️ Danger Zone
//             </Typography>
//             <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//               Permanently delete your account and all associated data. This action cannot be undone.
//             </Typography>
//             <Button
//               variant="outlined"
//               color="error"
//               startIcon={<Delete />}
//               onClick={() => setDeleteDialogOpen(true)}
//             >
//               Delete Account
//             </Button>
//           </CardContent>
//         </Card>
//       </Container>

//       {/* ===== DELETE CONFIRMATION DIALOG ===== */}
//       <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
//         <DialogTitle>Delete Account?</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to delete your account? This will permanently remove all your data, including quiz history and progress. This action cannot be undone.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
//           <Button onClick={handleDeleteAccount} color="error" variant="contained">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* ===== SNACKBAR ===== */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={4000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert
//           severity={snackbar.severity}
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Layout>
//   );
// };

// export default Settings;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Snackbar,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import Layout from '../common/component/layout';
import StudentSidebar from './components/Sidebar';
import API from '../common/services/api';
import './Setting.css';

interface UserProfile {
  _id: string;
  FName: string;
  MName: string;
  LName: string;
  email: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  gradeId: number;
  PImage?: string[];
  status?: string;
  onboardingCompleted?: boolean;
}

const Settings: React.FC = () => {
  const navigate = useNavigate();

  // ----- State -----
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile>({
    _id: '',
    FName: '',
    MName: '',
    LName: '',
    email: '',
    dateOfBirth: '',
    gender: 'male',
    gradeId: 6,
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [difficulty, setDifficulty] = useState('adaptive');
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning',
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // ----- Fetch Profile on Mount -----
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await API.get('/auth/me');
      const user = res.data;
      setProfile({
        _id: user._id,
        FName: user.FName || '',
        MName: user.MName || '',
        LName: user.LName || '',
        email: user.email || '',
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
        gender: user.gender || 'male',
        gradeId: user.gradeId || 6,
        PImage: user.PImage || [],
        status: user.status,
        onboardingCompleted: user.onboardingCompleted,
      });
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to load profile',
        severity: 'error',
      });
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  // ----- Handlers -----
  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      const payload = {
        FName: profile.FName,
        MName: profile.MName,
        LName: profile.LName,
        gender: profile.gender,
        dateOfBirth: profile.dateOfBirth,
        gradeId: profile.gradeId,
      };
      await API.put('/auth/profile', payload);

      if (avatarFile) {
        const formData = new FormData();
        formData.append('avatar', avatarFile);
        await API.post('/auth/avatar', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setAvatarFile(null);
      }

      setSnackbar({
        open: true,
        message: 'Profile updated successfully!',
        severity: 'success',
      });
      await fetchProfile();
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to update profile',
        severity: 'error',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSnackbar({
        open: true,
        message: 'Passwords do not match',
        severity: 'error',
      });
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setSnackbar({
        open: true,
        message: 'Password must be at least 6 characters',
        severity: 'error',
      });
      return;
    }

    try {
      setSaving(true);
      await API.put('/auth/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setSnackbar({
        open: true,
        message: 'Password changed successfully!',
        severity: 'success',
      });
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error: any) {
      console.error('Error changing password:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to change password',
        severity: 'error',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleteDialogOpen(false);
    try {
      await API.delete('/auth/delete-account');
      setSnackbar({
        open: true,
        message: 'Account deleted successfully',
        severity: 'info',
      });
      localStorage.removeItem('token');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error: any) {
      console.error('Error deleting account:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to delete account',
        severity: 'error',
      });
    }
  };

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
    localStorage.setItem('darkMode', String(checked));
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAvatarFile(event.target.files[0]);
    }
  };

  const getInitials = () => {
    const first = profile.FName?.charAt(0) || '';
    const last = profile.LName?.charAt(0) || '';
    return `${first}${last}`.toUpperCase() || 'U';
  };

  // ----- Render -----
  if (loading) {
    return (
      <Layout title="Settings" sidebar={<StudentSidebar />}>
        <div className="settings-loading">
          <CircularProgress sx={{ color: '#7C3AED' }} />
          <p>Loading settings...</p>
        </div>
      </Layout>
    );
  }

  const profileImage = profile.PImage && profile.PImage.length > 0 ? profile.PImage[0] : null;

  return (
    <Layout title="Settings" sidebar={<StudentSidebar />}>
      <div className="settings-content">
      
        <div className="page-head">
          <div className="page-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke="#C0392B" strokeWidth="1.7" />
              <path d="M19.4 13.5a7.6 7.6 0 000-3l1.9-1.5-2-3.4-2.3.7a7.6 7.6 0 00-2.6-1.5L14 2h-4l-.4 2.3a7.6 7.6 0 00-2.6 1.5l-2.3-.7-2 3.4L4.6 10.5a7.6 7.6 0 000 3L2.7 15l2 3.4 2.3-.7c.76.66 1.64 1.18 2.6 1.5L10 22h4l.4-2.3a7.6 7.6 0 002.6-1.5l2.3.7 2-3.4-1.9-1.5z" stroke="#C0392B" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
          </div>
          <h1>Settings</h1>
        </div>

       
        <div className="panel">
          <div className="panel-head">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="#4B5563" strokeWidth="1.7" />
              <path d="M4 20C4 16 7.5 14 12 14C16.5 14 20 16 20 20" stroke="#4B5563" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
            <h3>Profile</h3>
          </div>

          <div className="avatar-row">
            <div className="avatar-lg" style={{ backgroundImage: profileImage ? `url(${profileImage})` : 'none' }}>
              {!profileImage && getInitials()}
            </div>
            <label className="cam-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M4 8H7L9 5H15L17 8H20V19H4V8Z" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round" />
                <circle cx="12" cy="13" r="3" stroke="#fff" strokeWidth="1.7" />
              </svg>
              <input hidden accept="image/*" type="file" onChange={handleAvatarChange} />
            </label>
            {avatarFile && <span className="avatar-filename">{avatarFile.name}</span>}
          </div>

          <div className="grid2">
            <div>
              <label>First Name</label>
              <input
                type="text"
                value={profile.FName}
                onChange={(e) => setProfile({ ...profile, FName: e.target.value })}
              />
            </div>
            <div>
              <label>Middle Name</label>
              <input
                type="text"
                value={profile.MName}
                onChange={(e) => setProfile({ ...profile, MName: e.target.value })}
              />
            </div>
          </div>
          <div className="grid2">
            <div>
              <label>Last Name</label>
              <input
                type="text"
                value={profile.LName}
                onChange={(e) => setProfile({ ...profile, LName: e.target.value })}
              />
            </div>
            <div>
              <label>Email</label>
              <input type="email" value={profile.email} disabled />
            </div>
          </div>
          <div className="grid2">
            <div>
              <label>Date of Birth</label>
              <input
                type="date"
                value={profile.dateOfBirth}
                onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
              />
            </div>
            <div>
              <label>Gender</label>
              <select
                value={profile.gender}
                onChange={(e) => setProfile({ ...profile, gender: e.target.value as 'male' | 'female' })}
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>
          </div>
          <div className="grid2">
            <div>
              <label>Grade</label>
              <select
                value={profile.gradeId}
                onChange={(e) => setProfile({ ...profile, gradeId: Number(e.target.value) })}
              >
                {[6, 7, 8, 9, 10, 11, 12].map((g) => (
                  <option key={g} value={g}>Grade {g}</option>
                ))}
              </select>
            </div>
            <div></div>
          </div>

          <button className="btn-primary" onClick={handleSaveProfile} disabled={saving}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M5 4H16L19 7V20H5V4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
              <path d="M8 4V9H15V4" stroke="currentColor" strokeWidth="1.7" />
            </svg>
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>

    
        <div className="panel">
          <div className="panel-head">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
              <rect x="5" y="10" width="14" height="10" rx="1.5" stroke="#4B5563" strokeWidth="1.7" />
              <path d="M8 10V7C8 4.8 9.8 3 12 3C14.2 3 16 4.8 16 7V10" stroke="#4B5563" strokeWidth="1.7" />
            </svg>
            <h3>Security</h3>
          </div>
          <div className="grid2">
            <div>
              <label>Current Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              />
            </div>
            <div></div>
          </div>
          <div className="grid2">
            <div>
              <label>New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              />
            </div>
            <div>
              <label>Confirm New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              />
            </div>
          </div>
          <button className="btn-primary" onClick={handleChangePassword} disabled={saving}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M5 4H16L19 7V20H5V4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
              <path d="M8 4V9H15V4" stroke="currentColor" strokeWidth="1.7" />
            </svg>
            {saving ? 'Updating...' : 'Change Password'}
          </button>
        </div>

        <div className="panel">
          <div className="panel-head">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#4B5563" strokeWidth="1.7" />
              <circle cx="12" cy="12" r="5" stroke="#4B5563" strokeWidth="1.7" />
              <circle cx="12" cy="12" r="1.3" fill="#4B5563" />
            </svg>
            <h3>Preferences</h3>
          </div>
          <div className="switch-row">
            <span>Dark Mode</span>
            <label className="switch">
              <input type="checkbox" checked={darkMode} onChange={(e) => toggleDarkMode(e.target.checked)} />
              <span className="slider"></span>
            </label>
          </div>
          <div className="switch-row">
            <span>Email Notifications</span>
            <label className="switch">
              <input type="checkbox" checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} />
              <span className="slider"></span>
            </label>
          </div>
          <div className="switch-row" style={{ display: 'block' }}>
            <label>Difficulty Level</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="adaptive">Adaptive (AI)</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

      
        <div className="panel danger">
          <div className="panel-head">
            <h3>⚠ Danger Zone</h3>
          </div>
          <p>Permanently delete your account and all associated data. This action cannot be undone.</p>
          <button className="btn-danger" onClick={() => setDeleteDialogOpen(true)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M4 7H20M9 7V4H15V7M6 7L7 20H17L18 7" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
            </svg>
            Delete Account
          </button>
        </div>
      </div>
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Account?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This will permanently remove all your data,
            including quiz history and progress. This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className="btn-outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</button>
          <button className="btn-danger" onClick={handleDeleteAccount}>Delete</button>
        </DialogActions>
      </Dialog>


      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default Settings;