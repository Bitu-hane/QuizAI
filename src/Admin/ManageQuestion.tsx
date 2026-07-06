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
//     fetchData();
//   }, [quizId]);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const quizRes = await API.get(`/admin/quizzes/${quizId}`);
//       setQuiz(quizRes.data);

//       const questionsRes = await API.get(`/admin/quizzes/${quizId}/questions`);
//       setQuestions(questionsRes.data);
//     } catch (error: any) {
//       console.error('Error fetching data:', error);
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
//     if (question) {
//       setEditingId(question._id);
//       const options = JSON.parse(question.options || '[]');
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
//     // ✅ Only question and correct answer are required
//     if (!formData.question.trim() || !formData.correct.trim()) {
//       setSnackbar({
//         open: true,
//         message: 'Question and Correct Answer are required.',
//         severity: 'error',
//       });
//       return;
//     }

//     // ✅ Ensure correct answer is one of the options (if options are provided)
//     const hasOptions = formData.options.some(o => o.trim() !== '');
//     if (hasOptions && !formData.options.includes(formData.correct)) {
//       setSnackbar({
//         open: true,
//         message: 'Correct answer must be one of the options',
//         severity: 'error',
//       });
//       return;
//     }

//     // ✅ If no options provided, store empty array
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
//       fetchData();
//       handleClose();
//     } catch (error: any) {
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
//       fetchData();
//     } catch (error: any) {
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
//         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//           <CircularProgress />
//         </Box>
//       </Layout>
//     );
//   }

//   return (
//     <Layout title="Manage Questions" sidebar={<AdminSidebar />}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//           <IconButton onClick={() => navigate('/admin/questions')} color="primary">
//             <ArrowBack />
//           </IconButton>
//           <Typography variant="h4" sx={{ fontWeight: 700 }}>
//             Questions for: {quiz?.title || 'Quiz'}
//           </Typography>
//           <Chip
//             label={`${questions.length} questions`}
//             size="small"
//             sx={{ bgcolor: '#F5F3FF', color: '#7C3AED' }}
//           />
//         </Box>
//         <Button
//           variant="contained"
//           startIcon={<Add />}
//           onClick={() => handleOpen()}
//           sx={{ bgcolor: '#7C3AED' }}
//         >
//           Add Question
//         </Button>
//       </Box>

//       {questions.length === 0 ? (
//         <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
//           <Typography variant="body1" color="text.secondary">
//             No questions found for this quiz. Click "Add Question" to create one.
//           </Typography>
//         </Paper>
//       ) : (
//         <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
//           <Table>
//             <TableHead sx={{ bgcolor: '#F5F3FF' }}>
//               <TableRow>
//                 <TableCell>ID</TableCell>
//                 <TableCell>Question</TableCell>
//                 <TableCell>Topic</TableCell>
//                 <TableCell>Options</TableCell>
//                 <TableCell>Correct Answer</TableCell>
//                 <TableCell align="right">Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {questions.map((q) => {
//                 const options = JSON.parse(q.options || '[]');
//                 const hasOptions = options.length > 0;
//                 return (
//                   <TableRow key={q._id} hover>
//                     <TableCell>{q.questionId}</TableCell>
//                     <TableCell sx={{ maxWidth: 200 }}>{q.question}</TableCell>
//                     <TableCell>
//                       {q.topic ? <Chip label={q.topic} size="small" sx={{ bgcolor: '#F5F3FF', color: '#7C3AED' }} /> : 'N/A'}
//                     </TableCell>
//                     <TableCell>
//                       {hasOptions ? (
//                         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                           {options.map((opt: string, idx: number) => (
//                             <Chip
//                               key={idx}
//                               label={opt}
//                               size="small"
//                               variant={opt === q.correct ? 'filled' : 'outlined'}
//                               sx={{
//                                 bgcolor: opt === q.correct ? '#7C3AED' : 'transparent',
//                                 color: opt === q.correct ? 'white' : 'inherit',
//                               }}
//                             />
//                           ))}
//                         </Box>
//                       ) : (
//                         <Typography variant="caption" color="text.secondary">
//                           No options provided
//                         </Typography>
//                       )}
//                     </TableCell>
//                     <TableCell>
//                       <Chip label={q.correct} size="small" sx={{ bgcolor: '#10B981', color: 'white' }} />
//                     </TableCell>
//                     <TableCell align="right">
//                       <IconButton color="primary" onClick={() => handleOpen(q)}>
//                         <Edit />
//                       </IconButton>
//                       <IconButton color="error" onClick={() => handleDelete(q._id)}>
//                         <Delete />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       {/* Add/Edit Dialog */}
//       <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
//         <DialogTitle>{editingId ? 'Edit Question' : 'Add Question'}</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             label="Question *"
//             fullWidth
//             multiline
//             rows={2}
//             value={formData.question}
//             onChange={(e) => setFormData({ ...formData, question: e.target.value })}
//             disabled={submitting}
//             required
//             placeholder="Enter the question text"
//           />
//           <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
//             Options (optional – leave blank for open-ended questions)
//           </Typography>
//           <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 1 }}>
//             {formData.options.map((opt, idx) => (
//               <TextField
//                 key={idx}
//                 label={`Option ${idx + 1}`}
//                 value={opt}
//                 onChange={(e) => handleOptionChange(idx, e.target.value)}
//                 disabled={submitting}
//                 placeholder={`Option ${idx + 1}`}
//               />
//             ))}
//           </Box>
//           <TextField
//             margin="dense"
//             label="Correct Answer *"
//             fullWidth
//             value={formData.correct}
//             onChange={(e) => setFormData({ ...formData, correct: e.target.value })}
//             disabled={submitting}
//             required
//             placeholder="Enter the correct answer"
//             sx={{ mt: 1 }}
//           />
//           <TextField
//             margin="dense"
//             label="Explanation (optional)"
//             fullWidth
//             multiline
//             rows={2}
//             value={formData.explanation}
//             onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
//             disabled={submitting}
//             placeholder="Explain why this answer is correct"
//           />
//           <TextField
//             margin="dense"
//             label="Topic (optional)"
//             fullWidth
//             value={formData.topic}
//             onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
//             disabled={submitting}
//             placeholder="e.g., Algebra, Grammar, etc."
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} disabled={submitting}>
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSave}
//             variant="contained"
//             sx={{ bgcolor: '#7C3AED' }}
//             disabled={submitting}
//           >
//             {submitting ? <CircularProgress size={24} /> : 'Save'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
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

// export default ManageQuestions;



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import { Add, Edit, Delete, ArrowBack } from '@mui/icons-material';
import Layout from '../common/component/layout';
import AdminSidebar from './components/Sidebar';
import API from '../common/services/api';

// ----- Types -----
interface Question {
  _id: string;
  questionId: number;
  question: string;
  options: string | string[];
  correct: string;
  explanation?: string;
  aiExplain?: string;
  topic?: string;
}

interface Quiz {
  _id: string;
  quizId: number;
  title: string;
  lessonId: number;
  questions: number[];
}

// ✅ SAFE PARSER (FIX)
const parseOptions = (raw: any): string[] => {
  if (!raw) return [];

  if (Array.isArray(raw)) return raw;

  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  return [];
};

const ManageQuestions: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    correct: '',
    explanation: '',
    topic: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  useEffect(() => {
    fetchData();
  }, [quizId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const quizRes = await API.get(`/admin/quizzes/${quizId}`);
      setQuiz(quizRes.data);

      const questionsRes = await API.get(`/admin/quizzes/${quizId}/questions`);
      setQuestions(questionsRes.data);
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to load data',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (question?: Question) => {
    if (question) {
      setEditingId(question._id);

      // ✅ SAFE PARSE
      const options = parseOptions(question.options);

      setFormData({
        question: question.question,
        options: options.length ? options : ['', '', '', ''],
        correct: question.correct,
        explanation: question.explanation || '',
        topic: question.topic || '',
      });
    } else {
      setEditingId(null);
      setFormData({
        question: '',
        options: ['', '', '', ''],
        correct: '',
        explanation: '',
        topic: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setFormData({
      question: '',
      options: ['', '', '', ''],
      correct: '',
      explanation: '',
      topic: '',
    });
  };

  const handleSave = async () => {
    if (!formData.question.trim() || !formData.correct.trim()) {
      setSnackbar({
        open: true,
        message: 'Question and Correct Answer are required.',
        severity: 'error',
      });
      return;
    }

    const hasOptions = formData.options.some(o => o.trim() !== '');

    if (hasOptions && !formData.options.includes(formData.correct)) {
      setSnackbar({
        open: true,
        message: 'Correct answer must be one of the options',
        severity: 'error',
      });
      return;
    }

    const optionsToStore = hasOptions ? formData.options : [];

    const payload = {
      question: formData.question,
      options: JSON.stringify(optionsToStore),
      correct: formData.correct,
      explanation: formData.explanation || '',
      topic: formData.topic || '',
    };

    setSubmitting(true);
    try {
      if (editingId) {
        await API.put(`/admin/questions/${editingId}`, payload);
        setSnackbar({ open: true, message: 'Question updated!', severity: 'success' });
      } else {
        await API.post(`/admin/quizzes/${quizId}/questions`, payload);
        setSnackbar({ open: true, message: 'Question added!', severity: 'success' });
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

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this question?')) return;

    try {
      await API.delete(`/admin/questions/${id}`);
      setSnackbar({ open: true, message: 'Question deleted!', severity: 'success' });
      fetchData();
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Delete failed',
        severity: 'error',
      });
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  if (loading) {
    return (
      <Layout title="Manage Questions" sidebar={<AdminSidebar />}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout title="Manage Questions" sidebar={<AdminSidebar />}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={() => navigate('/admin/questions')}>
            <ArrowBack />
          </IconButton>

          <Typography variant="h4">
            Questions for: {quiz?.title || 'Quiz'}
          </Typography>

          <Chip label={`${questions.length} questions`} />
        </Box>

        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>
          Add Question
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Question</TableCell>
              <TableCell>Topic</TableCell>
              <TableCell>Options</TableCell>
              <TableCell>Correct</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {questions.map((q) => {
              const options = parseOptions(q.options);
              const hasOptions = options.length > 0;

              return (
                <TableRow key={q._id}>
                  <TableCell>{q.questionId}</TableCell>
                  <TableCell>{q.question}</TableCell>

                  <TableCell>
                    {q.topic ? <Chip label={q.topic} /> : 'N/A'}
                  </TableCell>

                  <TableCell>
                    {hasOptions ? (
                      options.map((opt, idx) => (
                        <Chip
                          key={idx}
                          label={opt}
                          sx={{
                            mr: 0.5,
                            bgcolor: opt === q.correct ? '#7C3AED' : undefined,
                            color: opt === q.correct ? 'white' : undefined,
                          }}
                        />
                      ))
                    ) : (
                      <Typography variant="caption">No options</Typography>
                    )}
                  </TableCell>

                  <TableCell>
                    <Chip label={q.correct} color="success" />
                  </TableCell>

                  <TableCell align="right">
                    <IconButton onClick={() => handleOpen(q)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(q._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>
          {editingId ? 'Edit Question' : 'Add Question'}
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Question"
            value={formData.question}
            onChange={(e) =>
              setFormData({ ...formData, question: e.target.value })
            }
            sx={{ mt: 2 }}
          />

          {formData.options.map((opt, idx) => (
            <TextField
              key={idx}
              fullWidth
              label={`Option ${idx + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
              sx={{ mt: 2 }}
            />
          ))}

          <TextField
            fullWidth
            label="Correct Answer"
            value={formData.correct}
            onChange={(e) =>
              setFormData({ ...formData, correct: e.target.value })
            }
            sx={{ mt: 2 }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {submitting ? <CircularProgress size={20} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Layout>
  );
};

export default ManageQuestions;