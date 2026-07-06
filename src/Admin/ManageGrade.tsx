


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
  Snackbar,
  Alert,
  Chip,
  CircularProgress,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import Layout from '../common/component/layout';
import AdminSidebar from './components/Sidebar';
import API from '../common/services/api';

// ----- Types -----
interface Grade {
  _id: string;
  gradeId: number;
  level: number;
}

const AdminGrades: React.FC = () => {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ level: '' });
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  // ----- Fetch grades on mount -----
  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    setLoading(true);
    try {
      const res = await API.get('/admin/grades');
      setGrades(res.data);
    } catch (error: any) {
      console.error('Error fetching grades:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to load grades',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // ----- Open dialog (add/edit) -----
  const handleOpen = (grade?: Grade) => {
    if (grade) {
      setEditingId(grade._id);
      setFormData({ level: grade.level.toString() });
    } else {
      setEditingId(null);
      setFormData({ level: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setFormData({ level: '' });
  };

  // ----- Save (create or update) -----
  const handleSave = async () => {
    const level = parseInt(formData.level);
    if (isNaN(level) || level < 1 || level > 12) {
      setSnackbar({
        open: true,
        message: 'Please enter a valid grade level (1-12)',
        severity: 'error',
      });
      return;
    }

    setSubmitting(true);
    try {
      if (editingId) {
        await API.put(`/admin/grades/${editingId}`, { level });
        setSnackbar({ open: true, message: 'Grade updated!', severity: 'success' });
      } else {
        await API.post('/admin/grades', { level });
        setSnackbar({ open: true, message: 'Grade added!', severity: 'success' });
      }
      fetchGrades();
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
    if (!window.confirm('Are you sure you want to delete this grade?')) return;
    try {
      await API.delete(`/admin/grades/${id}`);
      setSnackbar({ open: true, message: 'Grade deleted!', severity: 'success' });
      fetchGrades();
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
    <Layout title="Manage Grades" sidebar={<AdminSidebar />}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Grades</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpen()}
          sx={{ bgcolor: '#7C3AED' }}
        >
          Add Grade
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
                <TableCell>Level</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {grades.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No grades found. Click "Add Grade" to create one.
                  </TableCell>
                </TableRow>
              ) : (
                grades.map((grade) => (
                  <TableRow key={grade._id} hover>
                    <TableCell>{grade.gradeId}</TableCell>
                    <TableCell>
                      <Chip
                        label={`Grade ${grade.level}`}
                        sx={{ bgcolor: '#7C3AED', color: 'white' }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" onClick={() => handleOpen(grade)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(grade._id)}>
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

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Edit Grade' : 'Add Grade'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Grade Level"
            type="number"
            fullWidth
            value={formData.level}
            onChange={(e) => setFormData({ level: e.target.value })}
            disabled={submitting}
            slotProps={{
              htmlInput: { min: 1, max: 12 },
            }}
          />
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

export default AdminGrades;