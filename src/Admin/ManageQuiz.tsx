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
  Chip,
  CircularProgress,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import Layout from '../common/component/layout';
import AdminSidebar from './components/Sidebar';
import API from '../common/services/api';

// ----- Types -----
interface Quiz {
  _id: string;
  quizId: number;
  title: string;
  lessonId: number;
  timelimit?: number;
  difficulty?: number;
  questions: number[];
}

interface Lesson {
  _id: string;
  lessonId: number;
  title: string;
}

const ManageQuizzes: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    lessonId: '',
    timelimit: '',
    difficulty: '',
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
      const [quizzesRes, lessonsRes] = await Promise.all([
        API.get('/admin/quizzes'),
        API.get('/admin/lessons'),
      ]);
      setQuizzes(quizzesRes.data);
      setLessons(lessonsRes.data);
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
  const handleOpen = (quiz?: Quiz) => {
    if (quiz) {
      setEditingId(quiz._id);
      setFormData({
        title: quiz.title,
        lessonId: quiz.lessonId.toString(),
        timelimit: quiz.timelimit?.toString() || '',
        difficulty: quiz.difficulty?.toString() || '',
      });
    } else {
      setEditingId(null);
      setFormData({ title: '', lessonId: '', timelimit: '', difficulty: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setFormData({ title: '', lessonId: '', timelimit: '', difficulty: '' });
  };

  // ----- Save (create or update) -----
  const handleSave = async () => {
    if (!formData.title.trim() || !formData.lessonId || !formData.timelimit || !formData.difficulty) {
      setSnackbar({ open: true, message: 'Please fill all fields', severity: 'error' });
      return;
    }
    const lessonId = parseInt(formData.lessonId);
    const timelimit = parseInt(formData.timelimit);
    const difficulty = parseInt(formData.difficulty);

    if (isNaN(timelimit) || timelimit < 1) {
      setSnackbar({ open: true, message: 'Time limit must be a positive number', severity: 'error' });
      return;
    }
    if (isNaN(difficulty) || difficulty < 1 || difficulty > 5) {
      setSnackbar({ open: true, message: 'Difficulty must be between 1 and 5', severity: 'error' });
      return;
    }

    const payload = {
      title: formData.title,
      lessonId,
      timelimit,
      difficulty,
      questions: [],
    };

    setSubmitting(true);
    try {
      if (editingId) {
        await API.put(`/admin/quizzes/${editingId}`, payload);
        setSnackbar({ open: true, message: 'Quiz updated!', severity: 'success' });
      } else {
        await API.post('/admin/quizzes', payload);
        setSnackbar({ open: true, message: 'Quiz added!', severity: 'success' });
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
    if (!window.confirm('Delete this quiz?')) return;
    try {
      await API.delete(`/admin/quizzes/${id}`);
      setSnackbar({ open: true, message: 'Quiz deleted!', severity: 'success' });
      fetchData();
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Delete failed',
        severity: 'error',
      });
    }
  };

  // ----- Get lesson title by ID -----
  const getLessonTitle = (lessonId: number) => {
    const lesson = lessons.find(l => l.lessonId === lessonId);
    return lesson ? lesson.title : 'N/A';
  };

  if (loading) {
    return (
      <Layout title="Manage Quizzes" sidebar={<AdminSidebar />}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout title="Manage Quizzes" sidebar={<AdminSidebar />}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Quizzes</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpen()}
          sx={{ bgcolor: '#7C3AED' }}
        >
          Add Quiz
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: '#F5F3FF' }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Lesson</TableCell>
              <TableCell>Time Limit</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quizzes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No quizzes found. Click "Add Quiz" to create one.
                </TableCell>
              </TableRow>
            ) : (
              quizzes.map((quiz) => (
                <TableRow key={quiz._id} hover>
                  <TableCell>{quiz.quizId}</TableCell>
                  <TableCell>{quiz.title}</TableCell>
                  <TableCell>{getLessonTitle(quiz.lessonId)}</TableCell>
                  <TableCell>{quiz.timelimit || 'N/A'} min</TableCell>
                  <TableCell>
                    <Chip
                      label={quiz.difficulty || 'N/A'}
                      size="small"
                      color={
                        !quiz.difficulty ? 'default' :
                        quiz.difficulty <= 2 ? 'success' :
                        quiz.difficulty <= 4 ? 'warning' : 'error'
                      }
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpen(quiz)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(quiz._id)}>
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
        <DialogTitle>{editingId ? 'Edit Quiz' : 'Add Quiz'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Quiz Title"
            fullWidth
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            disabled={submitting}
          />
          <FormControl fullWidth margin="dense" disabled={submitting}>
            <InputLabel>Lesson</InputLabel>
            <Select
              value={formData.lessonId}
              label="Lesson"
              onChange={(e) => setFormData({ ...formData, lessonId: e.target.value })}
            >
              {lessons.map((l) => (
                <MenuItem key={l._id} value={l.lessonId}>
                  {l.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Time Limit (minutes)"
            type="number"
            fullWidth
            value={formData.timelimit}
            onChange={(e) => setFormData({ ...formData, timelimit: e.target.value })}
            disabled={submitting}
            slotProps={{ htmlInput: { min: 1 } }}
          />
          <TextField
            margin="dense"
            label="Difficulty (1-5)"
            type="number"
            fullWidth
            value={formData.difficulty}
            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
            disabled={submitting}
            slotProps={{ htmlInput: { min: 1, max: 5 } }}
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

export default ManageQuizzes;


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
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
//   Snackbar,
//   Alert,
//   Chip,
//   CircularProgress,
// } from '@mui/material';
// import { Add, Edit, Delete, ArrowBack } from '@mui/icons-material';
// import Layout from '../common/component/layout';
// import AdminSidebar from './components/Sidebar';
// import API from '../common/services/api';

// // ----- Types -----
// interface Question {
//   _id: string;
//   questionId: number;
//   question: string;
//   options: string;
//   correct: string;
//   explanation?: string;
//   aiExplain?: string;
//   topic?: string;
// }

// interface Quiz {
//   _id: string;
//   quizId: number;
//   title: string;
//   lessonId: number;
//   questions: number[];
// }

// const ManageQuestions: React.FC = () => {
//   const { quizId } = useParams<{ quizId: string }>();
//   const navigate = useNavigate();

//   const [quiz, setQuiz] = useState<Quiz | null>(null);
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [open, setOpen] = useState(false);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [formData, setFormData] = useState({
//     question: '',
//     options: ['', '', '', ''],
//     correct: '',
//     explanation: '',
//     topic: '',
//   });
//   const [submitting, setSubmitting] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'success' as 'success' | 'error',
//   });

//   useEffect(() => {
//     if (quizId) {
//       fetchData();
//     } else {
//       setError('Quiz ID is missing');
//       setLoading(false);
//     }
//   }, [quizId]);

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       console.log('📚 Fetching quiz data for ID:', quizId);
      
//       // Fetch quiz details
//       const quizRes = await API.get(`/admin/quizzes/${quizId}`);
//       console.log('✅ Quiz data:', quizRes.data);
//       setQuiz(quizRes.data);

//       // Fetch questions for this quiz
//       const questionsRes = await API.get(`/admin/quizzes/${quizId}/questions`);
//       console.log('✅ Questions data:', questionsRes.data);
//       setQuestions(questionsRes.data);
      
//     } catch (error: any) {
//       console.error('❌ Error fetching data:', error);
//       setError(error.response?.data?.message || 'Failed to load data');
//       setSnackbar({
//         open: true,
//         message: error.response?.data?.message || 'Failed to load data',
//         severity: 'error',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOpen = (question?: Question) => {
//     console.log('📝 Opening dialog for:', question ? 'edit' : 'add');
//     if (question) {
//       setEditingId(question._id);
//       let options = [];
//       try {
//         options = JSON.parse(question.options || '[]');
//       } catch {
//         options = ['', '', '', ''];
//       }
//       setFormData({
//         question: question.question,
//         options: options.length === 4 ? options : ['', '', '', ''],
//         correct: question.correct,
//         explanation: question.explanation || '',
//         topic: question.topic || '',
//       });
//     } else {
//       setEditingId(null);
//       setFormData({
//         question: '',
//         options: ['', '', '', ''],
//         correct: '',
//         explanation: '',
//         topic: '',
//       });
//     }
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setEditingId(null);
//     setFormData({
//       question: '',
//       options: ['', '', '', ''],
//       correct: '',
//       explanation: '',
//       topic: '',
//     });
//   };

//   const handleSave = async () => {
//     if (!formData.question.trim() || !formData.correct.trim()) {
//       setSnackbar({
//         open: true,
//         message: 'Question and Correct Answer are required.',
//         severity: 'error',
//       });
//       return;
//     }

//     const hasOptions = formData.options.some(o => o.trim() !== '');
//     if (hasOptions && !formData.options.includes(formData.correct)) {
//       setSnackbar({
//         open: true,
//         message: 'Correct answer must be one of the options',
//         severity: 'error',
//       });
//       return;
//     }

//     const optionsToStore = hasOptions ? formData.options : [];
//     const payload = {
//       question: formData.question,
//       options: JSON.stringify(optionsToStore),
//       correct: formData.correct,
//       explanation: formData.explanation || '',
//       topic: formData.topic || '',
//     };

//     setSubmitting(true);
//     try {
//       if (editingId) {
//         await API.put(`/admin/questions/${editingId}`, payload);
//         setSnackbar({ open: true, message: 'Question updated!', severity: 'success' });
//       } else {
//         await API.post(`/admin/quizzes/${quizId}/questions`, payload);
//         setSnackbar({ open: true, message: 'Question added!', severity: 'success' });
//       }
//       await fetchData();
//       handleClose();
//     } catch (error: any) {
//       console.error('❌ Save error:', error);
//       setSnackbar({
//         open: true,
//         message: error.response?.data?.message || 'Operation failed',
//         severity: 'error',
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (!window.confirm('Delete this question?')) return;
//     try {
//       await API.delete(`/admin/questions/${id}`);
//       setSnackbar({ open: true, message: 'Question deleted!', severity: 'success' });
//       await fetchData();
//     } catch (error: any) {
//       console.error('❌ Delete error:', error);
//       setSnackbar({
//         open: true,
//         message: error.response?.data?.message || 'Delete failed',
//         severity: 'error',
//       });
//     }
//   };

//   const handleOptionChange = (index: number, value: string) => {
//     const newOptions = [...formData.options];
//     newOptions[index] = value;
//     setFormData({ ...formData, options: newOptions });
//   };

//   if (loading) {
//     return (
//       <Layout title="Manage Questions" sidebar={<AdminSidebar />}>
//         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
//           <CircularProgress />
//         </Box>
//       </Layout>
//     );
//   }

//   if (error) {
//     return (
//       <Layout title="Manage Questions" sidebar={<AdminSidebar />}>
//         <Box sx={{ p: 4 }}>
//           <Alert 
//             severity="error" 
//             action={
//               <Button color="inherit" size="small" onClick={fetchData}>
//                 Retry
//               </Button>
//             }
//           >
//             {error}
//           </Alert>
//         </Box>
//       </Layout>
//     );
//   }

//   return (
//     <Layout title="Manage Questions" sidebar={<AdminSidebar />}>
//       <Box sx={{ p: 3 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//            <IconButton onClick={() => navigate(`/admin/quizzes/${quiz.id}/questions`)}>
//   <Edit />
// </IconButton>
//             <Typography variant="h4" sx={{ fontWeight: 700 }}>
//               Questions for: {quiz?.title || 'Quiz'}
//             </Typography>
//             <Chip
//               label={`${questions.length} questions`}
//               size="small"
//               sx={{ bgcolor: '#F5F3FF', color: '#7C3AED' }}
//             />
//           </Box>
//           <Button
//             variant="contained"
//             startIcon={<Add />}
//             onClick={() => handleOpen()}
//             sx={{ bgcolor: '#7C3AED', '&:hover': { bgcolor: '#6D28D9' } }}
//           >
//             Add Question
//           </Button>
//         </Box>

//         {questions.length === 0 ? (
//           <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
//             <Typography variant="body1" color="text.secondary">
//               No questions found for this quiz. Click "Add Question" to create one.
//             </Typography>
//           </Paper>
//         ) : (
//           <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
//             <Table>
//               <TableHead sx={{ bgcolor: '#F5F3FF' }}>
//                 <TableRow>
//                   <TableCell>ID</TableCell>
//                   <TableCell>Question</TableCell>
//                   <TableCell>Topic</TableCell>
//                   <TableCell>Options</TableCell>
//                   <TableCell>Correct Answer</TableCell>
//                   <TableCell align="right">Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {questions.map((q) => {
//                   let options = [];
//                   try {
//                     options = JSON.parse(q.options || '[]');
//                   } catch {
//                     options = [];
//                   }
//                   const hasOptions = options.length > 0;
//                   return (
//                     <TableRow key={q._id} hover>
//                       <TableCell>{q.questionId}</TableCell>
//                       <TableCell sx={{ maxWidth: 200 }}>{q.question}</TableCell>
//                       <TableCell>
//                         {q.topic ? (
//                           <Chip label={q.topic} size="small" sx={{ bgcolor: '#F5F3FF', color: '#7C3AED' }} />
//                         ) : (
//                           'N/A'
//                         )}
//                       </TableCell>
//                       <TableCell>
//                         {hasOptions ? (
//                           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                             {options.map((opt: string, idx: number) => (
//                               <Chip
//                                 key={idx}
//                                 label={opt}
//                                 size="small"
//                                 variant={opt === q.correct ? 'filled' : 'outlined'}
//                                 sx={{
//                                   bgcolor: opt === q.correct ? '#7C3AED' : 'transparent',
//                                   color: opt === q.correct ? 'white' : 'inherit',
//                                 }}
//                               />
//                             ))}
//                           </Box>
//                         ) : (
//                           <Typography variant="caption" color="text.secondary">
//                             No options provided
//                           </Typography>
//                         )}
//                       </TableCell>
//                       <TableCell>
//                         <Chip label={q.correct} size="small" sx={{ bgcolor: '#10B981', color: 'white' }} />
//                       </TableCell>
//                       <TableCell align="right">
//                         <IconButton color="primary" onClick={() => handleOpen(q)}>
//                           <Edit />
//                         </IconButton>
//                         <IconButton color="error" onClick={() => handleDelete(q._id)}>
//                           <Delete />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}

//         {/* Add/Edit Dialog */}
//         <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
//           <DialogTitle>{editingId ? 'Edit Question' : 'Add Question'}</DialogTitle>
//           <DialogContent>
//             <TextField
//               margin="dense"
//               label="Question *"
//               fullWidth
//               multiline
//               rows={2}
//               value={formData.question}
//               onChange={(e) => setFormData({ ...formData, question: e.target.value })}
//               disabled={submitting}
//               required
//               placeholder="Enter the question text"
//             />
//             <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
//               Options (optional – leave blank for open-ended questions)
//             </Typography>
//             <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 1 }}>
//               {formData.options.map((opt, idx) => (
//                 <TextField
//                   key={idx}
//                   label={`Option ${idx + 1}`}
//                   value={opt}
//                   onChange={(e) => handleOptionChange(idx, e.target.value)}
//                   disabled={submitting}
//                   placeholder={`Option ${idx + 1}`}
//                 />
//               ))}
//             </Box>
//             <TextField
//               margin="dense"
//               label="Correct Answer *"
//               fullWidth
//               value={formData.correct}
//               onChange={(e) => setFormData({ ...formData, correct: e.target.value })}
//               disabled={submitting}
//               required
//               placeholder="Enter the correct answer"
//               sx={{ mt: 1 }}
//             />
//             <TextField
//               margin="dense"
//               label="Explanation (optional)"
//               fullWidth
//               multiline
//               rows={2}
//               value={formData.explanation}
//               onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
//               disabled={submitting}
//               placeholder="Explain why this answer is correct"
//             />
//             <TextField
//               margin="dense"
//               label="Topic (optional)"
//               fullWidth
//               value={formData.topic}
//               onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
//               disabled={submitting}
//               placeholder="e.g., Algebra, Grammar, etc."
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose} disabled={submitting}>
//               Cancel
//             </Button>
//             <Button
//               onClick={handleSave}
//               variant="contained"
//               sx={{ bgcolor: '#7C3AED', '&:hover': { bgcolor: '#6D28D9' } }}
//               disabled={submitting}
//             >
//               {submitting ? <CircularProgress size={24} /> : 'Save'}
//             </Button>
//           </DialogActions>
//         </Dialog>

//         <Snackbar
//           open={snackbar.open}
//           autoHideDuration={3000}
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//           anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//         >
//           <Alert
//             severity={snackbar.severity}
//             onClose={() => setSnackbar({ ...snackbar, open: false })}
//           >
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </Box>
//     </Layout>
//   );
// };

// export default ManageQuestions;