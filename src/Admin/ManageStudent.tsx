// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Snackbar,
//   Alert,
//   Chip,
// } from '@mui/material';
// import { Edit, Delete } from '@mui/icons-material';
// import Layout from '../common/component/layout';
// import AdminSidebar from './components/Sidebar';

// const initialUsers = [
//   { id: 1, name: 'Abebe Kebede', email: 'abebe@example.com', grade: 10, status: 'active', role: 'student' },
//   { id: 2, name: 'Tigist Alemu', email: 'tigist@example.com', grade: 11, status: 'active', role: 'student' },
//   { id: 3, name: 'Admin User', email: 'admin@example.com', grade: null, status: 'active', role: 'admin' },
// ];

// const Users: React.FC = () => {
//   const [users, setUsers] = useState(initialUsers);
//   const [open, setOpen] = useState(false);
//   const [editingUser, setEditingUser] = useState<typeof initialUsers[0] | null>(null);
//   const [formData, setFormData] = useState({ status: '', role: '' });
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

//   const handleOpen = (user: typeof initialUsers[0]) => {
//     setEditingUser(user);
//     setFormData({ status: user.status, role: user.role });
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setEditingUser(null);
//     setFormData({ status: '', role: '' });
//   };

//   const handleSave = () => {
//     if (editingUser) {
//       setUsers(users.map(u => u.id === editingUser.id ? { ...u, status: formData.status, role: formData.role } : u));
//       setSnackbar({ open: true, message: 'User updated!', severity: 'success' });
//     }
//     handleClose();
//   };

//   const handleDelete = (id: number) => {
//     if (window.confirm('Delete this user?')) {
//       setUsers(users.filter(u => u.id !== id));
//       setSnackbar({ open: true, message: 'User deleted!', severity: 'success' });
//     }
//   };

//   return (
//     <Layout title="Manage Users" sidebar={<AdminSidebar />}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//         <Typography variant="h4" sx={{ fontWeight: 700 }}>Users</Typography>
//       </Box>

//       <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
//         <Table>
//           <TableHead sx={{ bgcolor: '#F5F3FF' }}>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Grade</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Role</TableCell>
//               <TableCell align="right">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {users.map((user) => (
//               <TableRow key={user.id} hover>
//                 <TableCell>{user.id}</TableCell>
//                 <TableCell>{user.name}</TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>{user.grade ? `Grade ${user.grade}` : 'N/A'}</TableCell>
//                 <TableCell>
//                   <Chip
//                     label={user.status}
//                     size="small"
//                     color={user.status === 'active' ? 'success' : 'error'}
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <Chip label={user.role} size="small" variant="outlined" />
//                 </TableCell>
//                 <TableCell align="right">
//                   <IconButton color="primary" onClick={() => handleOpen(user)}><Edit /></IconButton>
//                   <IconButton color="error" onClick={() => handleDelete(user.id)}><Delete /></IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//         <DialogTitle>Edit User</DialogTitle>
//         <DialogContent>
//           <FormControl fullWidth margin="dense">
//             <InputLabel>Status</InputLabel>
//             <Select
//               value={formData.status}
//               label="Status"
//               onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//             >
//               <MenuItem value="active">Active</MenuItem>
//               <MenuItem value="suspended">Suspended</MenuItem>
//             </Select>
//           </FormControl>
//           <FormControl fullWidth margin="dense">
//             <InputLabel>Role</InputLabel>
//             <Select
//               value={formData.role}
//               label="Role"
//               onChange={(e) => setFormData({ ...formData, role: e.target.value })}
//             >
//               <MenuItem value="student">Student</MenuItem>
//               <MenuItem value="admin">Admin</MenuItem>
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleSave} variant="contained" sx={{ bgcolor: '#7C3AED' }}>
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
//         <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Layout>
//   );
// };

// export default Users;


import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  Chip,
  CircularProgress,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import Layout from '../common/component/layout';
import AdminSidebar from './components/Sidebar';
import API from '../common/services/api';

// ----- Types -----
interface User {
  _id: string;
  FName: string;
  MName: string;
  LName: string;
  email: string;
  gradeId?: number;
  status: 'active' | 'suspended';
  roles: string[];
}

interface Grade {
  _id: string;
  gradeId: number;
  level: number;
}

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({ status: '', role: '' });
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  useEffect(() => {
    fetchData();
  }, []);

 const fetchData = async () => {
  setLoading(true);
  try {
    const usersRes = await API.get('/admin/users');
    // ✅ Show ALL users (don't filter)
    setUsers(usersRes.data);

    const gradesRes = await API.get('/admin/grades');
    setGrades(gradesRes.data);
  } catch (error: any) {
    console.error('Error fetching data:', error);
    setSnackbar({
      open: true,
      message: error.response?.data?.message || 'Failed to load users',
      severity: 'error',
    });
  } finally {
    setLoading(false);
  }
};
  const handleOpen = (user: User) => {
    setEditingUser(user);
    setFormData({
      status: user.status,
      role: user.roles?.[0] || 'student',
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
    setFormData({ status: '', role: '' });
  };

  const handleSave = async () => {
    if (!editingUser) return;
    setSubmitting(true);
    try {
      await API.put(`/admin/users/${editingUser._id}`, {
        status: formData.status,
        role: formData.role,
      });
      setSnackbar({ open: true, message: 'User updated!', severity: 'success' });
      fetchData();
      handleClose();
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Update failed',
        severity: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await API.delete(`/admin/users/${id}`);
      setSnackbar({ open: true, message: 'User deleted!', severity: 'success' });
      fetchData();
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Delete failed',
        severity: 'error',
      });
    }
  };

  const getFullName = (user: User) => {
    return `${user.FName} ${user.MName} ${user.LName}`.trim();
  };

  const getGradeLabel = (gradeId?: number) => {
    if (!gradeId) return 'N/A';
    const grade = grades.find(g => g.gradeId === gradeId);
    return grade ? `Grade ${grade.level}` : `Grade ${gradeId}`;
  };

  return (
    <Layout title="Manage Users" sidebar={<AdminSidebar />}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Users (Students)</Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
          <Table>
            <TableHead sx={{ bgcolor: '#F5F3FF' }}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Role</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No students found.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user._id} hover>
                    <TableCell>{getFullName(user)}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getGradeLabel(user.gradeId)}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.status}
                        size="small"
                        color={user.status === 'active' ? 'success' : 'error'}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip label={user.roles?.[0] || 'student'} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" onClick={() => handleOpen(user)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(user._id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense" disabled={submitting}>
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              label="Status"
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="suspended">Suspended</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense" disabled={submitting}>
            <InputLabel>Role</InputLabel>
            <Select
              value={formData.role}
              label="Role"
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={submitting}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{ bgcolor: '#7C3AED' }}
            disabled={submitting}
          >
            {submitting ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default ManageUsers;