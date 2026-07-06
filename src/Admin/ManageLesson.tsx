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
interface Lesson {
  _id: string;
  lessonId: number;
  title: string;
  description?: string;
  subjectId: number;
  gradeId: number;
}

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

const ManageLessons: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subjectId: '',
    gradeId: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  // ----- Fetch data on mount -----
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [lessonsRes, subjectsRes, gradesRes] = await Promise.all([
        API.get('/admin/lessons'),
        API.get('/admin/subjects'),
        API.get('/admin/grades'),
      ]);
      setLessons(lessonsRes.data);
      setSubjects(subjectsRes.data);
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
  const handleOpen = (lesson?: Lesson) => {
    if (lesson) {
      setEditingId(lesson._id);
      setFormData({
        title: lesson.title,
        description: lesson.description || '',
        subjectId: lesson.subjectId.toString(),
        gradeId: lesson.gradeId.toString(),
      });
    } else {
      setEditingId(null);
      setFormData({ title: '', description: '', subjectId: '', gradeId: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setFormData({ title: '', description: '', subjectId: '', gradeId: '' });
  };

  // ----- Save (create or update) -----
  const handleSave = async () => {
    if (!formData.title.trim() || !formData.subjectId || !formData.gradeId) {
      setSnackbar({
        open: true,
        message: 'Please fill all required fields (Title, Subject, Grade)',
        severity: 'error',
      });
      return;
    }

    const subjectId = parseInt(formData.subjectId);
    const gradeId = parseInt(formData.gradeId);

    const payload = {
      title: formData.title,
      description: formData.description,
      subjectId,
      gradeId,
    };

    setSubmitting(true);
    try {
      if (editingId) {
        await API.put(`/admin/lessons/${editingId}`, payload);
        setSnackbar({ open: true, message: 'Lesson updated!', severity: 'success' });
      } else {
        await API.post('/admin/lessons', payload);
        setSnackbar({ open: true, message: 'Lesson added!', severity: 'success' });
      }
      fetchData();
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
    if (!window.confirm('Delete this lesson?')) return;
    try {
      await API.delete(`/admin/lessons/${id}`);
      setSnackbar({ open: true, message: 'Lesson deleted!', severity: 'success' });
      fetchData();
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Delete failed',
        severity: 'error',
      });
    }
  };

  // ----- Get subject name by ID -----
  const getSubjectName = (subjectId: number) => {
    const subject = subjects.find(s => s.subjectId === subjectId);
    return subject ? subject.name : 'N/A';
  };

  // ----- Get grade level by ID -----
  const getGradeLevel = (gradeId: number) => {
    const grade = grades.find(g => g.gradeId === gradeId);
    return grade ? grade.level : gradeId;
  };

  if (loading) {
    return (
      <Layout title="Manage Lessons" sidebar={<AdminSidebar />}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout title="Manage Lessons" sidebar={<AdminSidebar />}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Lessons</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpen()}
          sx={{ bgcolor: '#7C3AED' }}
        >
          Add Lesson
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: '#F5F3FF' }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lessons.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No lessons found. Click "Add Lesson" to create one.
                </TableCell>
              </TableRow>
            ) : (
              lessons.map((lesson) => (
                <TableRow key={lesson._id} hover>
                  <TableCell>{lesson.lessonId}</TableCell>
                  <TableCell>{lesson.title}</TableCell>
                  <TableCell>{lesson.description || 'N/A'}</TableCell>
                  <TableCell>{getSubjectName(lesson.subjectId)}</TableCell>
                  <TableCell>Grade {getGradeLevel(lesson.gradeId)}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpen(lesson)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(lesson._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId ? 'Edit Lesson' : 'Add Lesson'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Lesson Title"
            fullWidth
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            disabled={submitting}
            required
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={2}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            disabled={submitting}
          />
          <FormControl fullWidth margin="dense" disabled={submitting}>
            <InputLabel>Subject</InputLabel>
            <Select
              value={formData.subjectId}
              label="Subject"
              onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
            >
              {subjects.map((s) => (
                <MenuItem key={s._id} value={s.subjectId}>
                  {s.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

export default ManageLessons;