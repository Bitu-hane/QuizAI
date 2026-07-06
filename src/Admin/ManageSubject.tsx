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
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Snackbar,
//   Alert,
// } from '@mui/material';
// import { Add, Edit, Delete } from '@mui/icons-material';
// import Layout from '../common/component/layout';
// import AdminSidebar from './components/Sidebar';

// const initialSubjects = [
//   { id: 1, name: 'Mathematics', gradeId: 6 },
//   { id: 2, name: 'English', gradeId: 6 },
//   { id: 3, name: 'Physics', gradeId: 7 },
//   // ... more
// ];

// const grades = [6, 7, 8, 9, 10, 11, 12];

// const Subjects: React.FC = () => {
//   const [subjects, setSubjects] = useState(initialSubjects);
//   const [open, setOpen] = useState(false);
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [formData, setFormData] = useState({ name: '', gradeId: '' });
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

//   const handleOpen = (subject?: typeof initialSubjects[0]) => {
//     if (subject) {
//       setEditingId(subject.id);
//       setFormData({ name: subject.name, gradeId: subject.gradeId.toString() });
//     } else {
//       setEditingId(null);
//       setFormData({ name: '', gradeId: '' });
//     }
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setEditingId(null);
//     setFormData({ name: '', gradeId: '' });
//   };

//   const handleSave = () => {
//     if (!formData.name.trim() || !formData.gradeId) {
//       setSnackbar({ open: true, message: 'Please fill all fields', severity: 'error' });
//       return;
//     }
//     const gradeId = parseInt(formData.gradeId);
//     if (editingId) {
//       setSubjects(subjects.map(s => s.id === editingId ? { ...s, name: formData.name, gradeId } : s));
//       setSnackbar({ open: true, message: 'Subject updated!', severity: 'success' });
//     } else {
//       const newId = Math.max(...subjects.map(s => s.id)) + 1;
//       setSubjects([...subjects, { id: newId, name: formData.name, gradeId }]);
//       setSnackbar({ open: true, message: 'Subject added!', severity: 'success' });
//     }
//     handleClose();
//   };

//   const handleDelete = (id: number) => {
//     if (window.confirm('Delete this subject?')) {
//       setSubjects(subjects.filter(s => s.id !== id));
//       setSnackbar({ open: true, message: 'Subject deleted!', severity: 'success' });
//     }
//   };

//   return (
//     <Layout title="Manage Subjects" sidebar={<AdminSidebar />}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//         <Typography variant="h4" sx={{ fontWeight: 700 }}>Subjects</Typography>
//         <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()} sx={{ bgcolor: '#7C3AED' }}>
//           Add Subject
//         </Button>
//       </Box>

//       <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
//         <Table>
//           <TableHead sx={{ bgcolor: '#F5F3FF' }}>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Grade</TableCell>
//               <TableCell align="right">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {subjects.map((subject) => (
//               <TableRow key={subject.id} hover>
//                 <TableCell>{subject.id}</TableCell>
//                 <TableCell>{subject.name}</TableCell>
//                 <TableCell>Grade {subject.gradeId}</TableCell>
//                 <TableCell align="right">
//                   <IconButton color="primary" onClick={() => handleOpen(subject)}><Edit /></IconButton>
//                   <IconButton color="error" onClick={() => handleDelete(subject.id)}><Delete /></IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//         <DialogTitle>{editingId ? 'Edit Subject' : 'Add Subject'}</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             label="Subject Name"
//             fullWidth
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           />
//           <FormControl fullWidth margin="dense">
//             <InputLabel>Grade</InputLabel>
//             <Select
//               value={formData.gradeId}
//               label="Grade"
//               onChange={(e) => setFormData({ ...formData, gradeId: e.target.value })}
//             >
//               {grades.map((g) => (
//                 <MenuItem key={g} value={g}>Grade {g}</MenuItem>
//               ))}
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

// export default Subjects;



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
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import Layout from '../common/component/layout';
import AdminSidebar from './components/Sidebar';
import API from '../common/services/api';

// ----- Types -----
interface Subject {
  _id: string;
  subjectId: number;
  name: string;
  gradeId: number;
}

interface Grade {
  _id: string;
  gradeId: number;
  level: number;
}

const ManageSubjects: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', gradeId: '' });
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  // ----- Fetch subjects and grades on mount -----
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch subjects
      const subjectsRes = await API.get('/admin/subjects');
      setSubjects(subjectsRes.data);

      // Fetch grades for dropdown
      const gradesRes = await API.get('/admin/grades');
      setGrades(gradesRes.data);
    } catch (error: any) {
      console.error('Error fetching data:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to load data',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // ----- Open dialog (add/edit) -----
  const handleOpen = (subject?: Subject) => {
    if (subject) {
      setEditingId(subject._id);
      setFormData({
        name: subject.name,
        gradeId: subject.gradeId.toString(),
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', gradeId: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setFormData({ name: '', gradeId: '' });
  };

  // ----- Save (create or update) -----
  const handleSave = async () => {
    if (!formData.name.trim() || !formData.gradeId) {
      setSnackbar({
        open: true,
        message: 'Please fill all fields',
        severity: 'error',
      });
      return;
    }

    const gradeId = parseInt(formData.gradeId);
    setSubmitting(true);
    try {
      if (editingId) {
        await API.put(`/admin/subjects/${editingId}`, {
          name: formData.name,
          gradeId,
        });
        setSnackbar({ open: true, message: 'Subject updated!', severity: 'success' });
      } else {
        await API.post('/admin/subjects', {
          name: formData.name,
          gradeId,
        });
        setSnackbar({ open: true, message: 'Subject added!', severity: 'success' });
      }
      fetchData(); // refresh list
      handleClose();
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Operation failed',
        severity: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ----- Delete -----
  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this subject?')) return;
    try {
      await API.delete(`/admin/subjects/${id}`);
      setSnackbar({ open: true, message: 'Subject deleted!', severity: 'success' });
      fetchData();
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Delete failed',
        severity: 'error',
      });
    }
  };

  // ----- Render -----
  return (
    <Layout title="Manage Subjects" sidebar={<AdminSidebar />}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Subjects</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpen()}
          sx={{ bgcolor: '#7C3AED' }}
        >
          Add Subject
        </Button>
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
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No subjects found. Click "Add Subject" to create one.
                  </TableCell>
                </TableRow>
              ) : (
                subjects.map((subject) => {
                  const gradeLabel = grades.find(g => g.gradeId === subject.gradeId)?.level || subject.gradeId;
                  return (
                    <TableRow key={subject._id} hover>
                      <TableCell>{subject.subjectId}</TableCell>
                      <TableCell>{subject.name}</TableCell>
                      <TableCell>Grade {gradeLabel}</TableCell>
                      <TableCell align="right">
                        <IconButton color="primary" onClick={() => handleOpen(subject)}>
                          <Edit />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(subject._id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Edit Subject' : 'Add Subject'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Subject Name"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={submitting}
          />
          <FormControl fullWidth margin="dense" disabled={submitting}>
            <InputLabel>Grade</InputLabel>
            <Select
              value={formData.gradeId}
              label="Grade"
              onChange={(e) => setFormData({ ...formData, gradeId: e.target.value })}
            >
              {grades.map((g) => (
                <MenuItem key={g._id} value={g.gradeId}>
                  Grade {g.level}
                </MenuItem>
              ))}
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

      {/* Snackbar */}
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

export default ManageSubjects;