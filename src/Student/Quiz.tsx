import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Chip,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
  Button,
} from '@mui/material';
import Layout from '../common/component/layout';
import StudentSidebar from './components/Sidebar';
import API from '../common/services/api';
import './Quiz.css';

// ----- Types -----
interface Subject {
  _id: string;
  subjectId: number;
  name: string;
  gradeId: number;
}

interface Lesson {
  _id: string;
  lessonId: number;
  title: string;
  description?: string;
  subjectId: number;
  gradeId: number;
}

interface Quiz {
  _id: string;
  quizId: number;
  title: string;
  lessonId: number;
  timelimit?: number;
  difficulty?: number;
  questions: number[];
}

// ----- Component -----
const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);
  const [studentGrade, setStudentGrade] = useState<number | null>(null);
  const [error, setError] = useState('');

  // ----- Fetch student profile and data -----
  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    setLoading(true);
    try {
      // 1. Get current user to fetch grade
      const userRes = await API.get('/auth/me');
      const user = userRes.data;
      setStudentGrade(user.gradeId);

      if (!user.gradeId) {
        setError('Please complete your onboarding to select a grade.');
        setLoading(false);
        return;
      }

      // 2. Fetch subjects for the student's grade
      const subjectsRes = await API.get(`/subjects?gradeId=${user.gradeId}`);
      setSubjects(subjectsRes.data);

      // 3. Fetch all lessons
      const lessonsRes = await API.get('/lessons');
      setLessons(lessonsRes.data);

      // 4. Fetch all quizzes
      const quizzesRes = await API.get('/quizzes');
      setQuizzes(quizzesRes.data);

    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load quiz data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ----- Get lessons for selected subject -----
  const subjectLessons = selectedSubject
    ? lessons.filter(l => l.subjectId === selectedSubject)
    : [];

  // ----- Get quiz for a lesson -----
  const getQuizForLesson = (lessonId: number) => {
    return quizzes.find(q => q.lessonId === lessonId);
  };

  if (loading) {
    return (
      <Layout title="Quiz" sidebar={<StudentSidebar />}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Quiz" sidebar={<StudentSidebar />}>
        <Box className="content" sx={{ maxWidth: 900, mx: 'auto' }}>
          <Alert severity="warning" sx={{ mt: 4 }}>
            {error}
            <Button
              variant="text"
              sx={{ ml: 2 }}
              onClick={() => navigate('/onboarding')}
            >
              Go to Onboarding
            </Button>
          </Alert>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout title="Quiz" sidebar={<StudentSidebar />}>
      <div className="quiz-content">
        {/* ----- Page Head ----- */}
        <div className="page-head">
          <div className="page-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M4 20L4.8 15.2L16 4L20 8L8.8 19.2L4 20Z" stroke="#C0392B" strokeWidth="1.7" strokeLinejoin="round" />
            </svg>
          </div>
          <h1>Select Your Quiz</h1>
        </div>
        <p className="meta">
          Grade {studentGrade || 'N/A'} · {subjects.length} subjects available
        </p>

        {/* ----- Notice if no subjects ----- */}
        {studentGrade && subjects.length === 0 && (
          <div className="notice">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
              <path d="M12 8V13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="12" cy="16.3" r="0.9" fill="currentColor" />
            </svg>
            <span>
              There are currently no subjects available for Grade {studentGrade}.
              Please check back later or ask your administrator to create subjects.
            </span>
          </div>
        )}

        {/* ----- Subject Select ----- */}
        <div className="subject-select">
          <label>Subject</label>
          <FormControl fullWidth disabled={!subjects.length}>
            <Select
              value={selectedSubject || ''}
              onChange={(e) => setSelectedSubject(Number(e.target.value))}
              displayEmpty
              renderValue={(value) => {
                if (!value) return <span style={{ color: '#9AA3AE' }}>Select a subject…</span>;
                const subject = subjects.find(s => s.subjectId === value);
                return subject?.name || '';
              }}
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '15px',
                padding: '14px 16px',
                borderRadius: '6px',
                borderColor: 'rgba(27,36,48,0.12)',
                '& .MuiSelect-select': { padding: '0' },
                '& fieldset': { borderColor: 'rgba(27,36,48,0.12)', borderRadius: '6px' },
                '&:hover fieldset': { borderColor: '#1B2430' },
                '&.Mui-focused fieldset': { borderColor: '#1B2430' },
              }}
            >
              {subjects.map((s) => (
                <MenuItem key={s._id} value={s.subjectId}>
                  {s.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* ----- Lessons / Quiz List ----- */}
        {selectedSubject && (
          <div className="lessons-grid">
            {subjectLessons.length === 0 ? (
              <div className="sheet">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                  <rect x="5" y="3" width="14" height="18" rx="1.5" stroke="#9AA3AE" strokeWidth="1.6" strokeDasharray="3 3" />
                  <path d="M9 8H15M9 12H13" stroke="#9AA3AE" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                <h3>No lessons available</h3>
                <p>No lessons have been added for this subject yet.</p>
              </div>
            ) : (
              subjectLessons.map((lesson) => {
                const quiz = getQuizForLesson(lesson.lessonId);
                const questionCount = quiz?.questions?.length || 0;
                const hasQuiz = !!quiz;

                return (
                  <div className="lesson-card" key={lesson._id}>
                    <div className="lesson-info">
                      <h3>{lesson.title}</h3>
                      <p>{lesson.description || 'No description available'}</p>
                      <div className="lesson-tags">
                        <Chip
                          label={`${questionCount} questions`}
                          size="small"
                          sx={{ bgcolor: '#F5F3FF', color: '#7C3AED' }}
                        />
                        {quiz?.difficulty && (
                          <Chip
                            label={`Difficulty: ${quiz.difficulty}/5`}
                            size="small"
                            color={
                              quiz.difficulty <= 2 ? 'success' :
                              quiz.difficulty <= 4 ? 'warning' : 'error'
                            }
                          />
                        )}
                        {quiz?.timelimit && (
                          <Chip
                            label={`${quiz.timelimit} min`}
                            size="small"
                            variant="outlined"
                          />
                        )}
                      </div>
                    </div>
                    <div className="lesson-action">
                      <button
                        className="quiz-btn"
                        disabled={!hasQuiz}
                        onClick={() => {
                          if (hasQuiz) {
                            navigate(`/student/quiz/attempt/${lesson.lessonId}`);
                          } else {
                            alert('No quiz available for this lesson yet.');
                          }
                        }}
                      >
                        {hasQuiz ? 'Attempt Quiz' : 'No Quiz Available'}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Quiz;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Chip,
//   CircularProgress,
//   Alert,
// } from '@mui/material';
// import { PlayArrow } from '@mui/icons-material';
// import Layout from '../common/component/layout';
// import StudentSidebar from './components/Sidebar';
// import API from '../common/services/api';

// interface Subject {
//   _id: string;
//   subjectId: number;
//   name: string;
//   gradeId: number;
// }

// interface Lesson {
//   _id: string;
//   lessonId: number;
//   title: string;
//   description?: string;
//   subjectId: number;
//   gradeId: number;
// }

// interface Quiz {
//   _id: string;
//   quizId: number;
//   title: string;
//   lessonId: number;
//   timelimit?: number;
//   difficulty?: number;
//   questions: number[];
// }

// const QuizPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [subjects, setSubjects] = useState<Subject[]>([]);
//   const [lessons, setLessons] = useState<Lesson[]>([]);
//   const [quizzes, setQuizzes] = useState<Quiz[]>([]);
//   const [selectedSubject, setSelectedSubject] = useState<number | null>(null);
//   const [studentGrade, setStudentGrade] = useState<number | null>(null);
//   const [error, setError] = useState('');
//   const [debugInfo, setDebugInfo] = useState('');

//   useEffect(() => {
//     fetchStudentData();
//   }, []);

//   const fetchStudentData = async () => {
//     setLoading(true);
//     setError('');
//     setDebugInfo('');

//     try {
//       // Check if token exists
//       const token = localStorage.getItem('token');
//       console.log('🔑 Token exists:', !!token);
//       setDebugInfo(prev => prev + `Token exists: ${!!token}\n`);

//       if (!token) {
//         setError('Please login first');
//         setLoading(false);
//         return;
//       }

//       console.log('📡 Fetching user data...');
//       setDebugInfo(prev => prev + 'Fetching user data...\n');

//       // 1. Get current user
//       const userRes = await API.get('/auth/me');
//       console.log('✅ User data:', userRes.data);
//       setDebugInfo(prev => prev + `✅ User: ${userRes.data.email}\n`);

//       const user = userRes.data;
//       setStudentGrade(user.gradeId);

//       if (!user.gradeId) {
//         setError('Please complete your onboarding to select a grade.');
//         setLoading(false);
//         return;
//       }

//       console.log('📡 Fetching subjects for grade:', user.gradeId);
//       setDebugInfo(prev => prev + `Fetching subjects for grade ${user.gradeId}...\n`);

//       // 2. Fetch subjects
//       const subjectsRes = await API.get(`/subjects?gradeId=${user.gradeId}`);
//       console.log('✅ Subjects:', subjectsRes.data);
//       setDebugInfo(prev => prev + `✅ Found ${subjectsRes.data.length} subjects\n`);
//       setSubjects(subjectsRes.data);

//       console.log('📡 Fetching lessons...');
//       setDebugInfo(prev => prev + 'Fetching lessons...\n');

//       // 3. Fetch lessons
//       const lessonsRes = await API.get('/lessons');
//       console.log('✅ Lessons:', lessonsRes.data);
//       setDebugInfo(prev => prev + `✅ Found ${lessonsRes.data.length} lessons\n`);
//       setLessons(lessonsRes.data);

//       console.log('📡 Fetching quizzes...');
//       setDebugInfo(prev => prev + 'Fetching quizzes...\n');

//       // 4. Fetch quizzes
//       const quizzesRes = await API.get('/quizzes');
//       console.log('✅ Quizzes:', quizzesRes.data);
//       setDebugInfo(prev => prev + `✅ Found ${quizzesRes.data.length} quizzes\n`);
//       setQuizzes(quizzesRes.data);

//       if (subjectsRes.data.length === 0) {
//         setError(`No subjects found for Grade ${user.gradeId}. Please contact your administrator.`);
//       }

//       setDebugInfo(prev => prev + '✅ All data loaded successfully!');

//     } catch (error: any) {
//       console.error('❌ Error fetching data:', error);
//       setDebugInfo(prev => prev + `❌ Error: ${error.message}\n`);

//       // Check for specific errors
//       if (error.response) {
//         console.error('Response status:', error.response.status);
//         console.error('Response data:', error.response.data);
//         setDebugInfo(prev => prev + `Status: ${error.response.status}\nMessage: ${error.response.data?.message || 'Unknown'}\n`);

//         if (error.response.status === 401) {
//           localStorage.removeItem('token');
//           setError('Your session has expired. Please login again.');
//         } else {
//           setError(error.response.data?.message || 'Failed to load quiz data. Please try again.');
//         }
//       } else if (error.request) {
//         console.error('No response received');
//         setError('Cannot connect to the server. Please make sure the backend is running.');
//       } else {
//         setError(error.message || 'Something went wrong. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const subjectLessons = selectedSubject
//     ? lessons.filter(l => l.subjectId === selectedSubject)
//     : [];

//   const getQuizForLesson = (lessonId: number) => {
//     return quizzes.find(q => q.lessonId === lessonId);
//   };

//   if (loading) {
//     return (
//       <Layout title="Quiz" sidebar={<StudentSidebar />}>
//         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
//           <CircularProgress />
//         </Box>
//       </Layout>
//     );
//   }

//   if (error) {
//     const isAuthError = error.includes('login') || error.includes('expired') || error.includes('session');
//     return (
//       <Layout title="Quiz" sidebar={<StudentSidebar />}>
//         <Container maxWidth="lg" sx={{ mt: 4 }}>
//           <Alert severity="warning" sx={{ mt: 4, mb: 2 }}>
//             {error}
//           </Alert>
          
//           {/* Show debug info */}
//           <Alert severity="info" sx={{ mb: 2, whiteSpace: 'pre-wrap' }}>
//             <Typography variant="subtitle2">Debug Info:</Typography>
//             <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
//               {debugInfo}
//             </Typography>
//           </Alert>
          
//           <Box sx={{ display: 'flex', gap: 2 }}>
//             {isAuthError && (
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => navigate('/login')}
//               >
//                 Go to Login
//               </Button>
//             )}
//             <Button
//               variant="outlined"
//               onClick={() => {
//                 localStorage.removeItem('token');
//                 window.location.reload();
//               }}
//             >
//               Retry
//             </Button>
//           </Box>
//         </Container>
//       </Layout>
//     );
//   }

//   return (
//     <Layout title="Quiz" sidebar={<StudentSidebar />}>
//       <Container maxWidth="lg" sx={{ mt: 4 }}>
//         <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
//           📝 Select Your Quiz
//         </Typography>

//         {studentGrade && (
//           <Typography variant="body1" sx={{ color: '#64748B', mb: 3 }}>
//             Grade {studentGrade} • {subjects.length} subjects available
//           </Typography>
//         )}

//         <Grid container spacing={3} sx={{ mb: 4 }}>
//           <Grid size={{ xs: 12, md: 6 }}>
//             <FormControl fullWidth>
//               <InputLabel>Subject</InputLabel>
//               <Select
//                 value={selectedSubject || ''}
//                 label="Subject"
//                 onChange={(e) => setSelectedSubject(Number(e.target.value))}
//                 disabled={subjects.length === 0}
//               >
//                 {subjects.map((s) => (
//                   <MenuItem key={s._id} value={s.subjectId}>
//                     {s.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//         </Grid>

//         {subjects.length === 0 && (
//           <Alert severity="info" sx={{ mb: 4 }}>
//             No subjects available for your grade. Please contact your administrator.
//           </Alert>
//         )}

//         {selectedSubject && (
//           <>
//             <Typography variant="h6" sx={{ mb: 2 }}>Lessons</Typography>
//             <Grid container spacing={3}>
//               {subjectLessons.length === 0 ? (
//                 <Grid size={{ xs: 12 }}>
//                   <Typography variant="body2" color="text.secondary">
//                     No lessons available for this subject.
//                   </Typography>
//                 </Grid>
//               ) : (
//                 subjectLessons.map((lesson) => {
//                   const quiz = getQuizForLesson(lesson.lessonId);
//                   const questionCount = quiz?.questions?.length || 0;
//                   return (
//                     <Grid key={lesson._id} size={{ xs: 12, md: 6 }}>
//                       <Card
//                         sx={{
//                           borderRadius: 3,
//                           boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
//                           transition: 'transform 0.2s ease',
//                           '&:hover': { transform: 'translateY(-4px)' },
//                           display: 'flex',
//                           flexDirection: 'column',
//                           height: '100%',
//                         }}
//                       >
//                         <CardContent sx={{ flexGrow: 1 }}>
//                           <Typography variant="h6" sx={{ fontWeight: 700 }}>
//                             {lesson.title}
//                           </Typography>
//                           <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                             {lesson.description || 'No description available'}
//                           </Typography>
//                           <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//                             <Chip
//                               label={`${questionCount} questions`}
//                               size="small"
//                               sx={{ bgcolor: '#F5F3FF', color: '#7C3AED' }}
//                             />
//                             {quiz?.difficulty && (
//                               <Chip
//                                 label={`Difficulty: ${quiz.difficulty}/5`}
//                                 size="small"
//                                 color={
//                                   quiz.difficulty <= 2 ? 'success' :
//                                   quiz.difficulty <= 4 ? 'warning' : 'error'
//                                 }
//                               />
//                             )}
//                             {quiz?.timelimit && (
//                               <Chip
//                                 label={`${quiz.timelimit} min`}
//                                 size="small"
//                                 variant="outlined"
//                               />
//                             )}
//                           </Box>
//                         </CardContent>
//                         <Box sx={{ p: 2 }}>
//                           <Button
//                             variant="contained"
//                             fullWidth
//                             startIcon={<PlayArrow />}
//                             sx={{ bgcolor: '#7C3AED', '&:hover': { bgcolor: '#6D28D9' } }}
//                             onClick={() => {
//                               if (quiz) {
//                                 navigate(`/student/quiz/attempt/${lesson.lessonId}`);
//                               } else {
//                                 alert('No quiz available for this lesson yet.');
//                               }
//                             }}
//                             disabled={!quiz}
//                           >
//                             {quiz ? 'Attempt Quiz' : 'No Quiz Available'}
//                           </Button>
//                         </Box>
//                       </Card>
//                     </Grid>
//                   );
//                 })
//               )}
//             </Grid>
//           </>
//         )}
//       </Container>
//     </Layout>
//   );
// };

// export default QuizPage;