import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import Layout from '../common/component/layout';
import StudentSidebar from './components/Sidebar';
import API from '../common/services/api';

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
        <Container maxWidth="lg" sx={{ mt: 4 }}>
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
        </Container>
      </Layout>
    );
  }

  return (
    <Layout title="Quiz" sidebar={<StudentSidebar />}>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
          📝 Select Your Quiz
        </Typography>

        {studentGrade && (
          <Typography variant="body1" sx={{ color: '#64748B', mb: 3 }}>
            Grade {studentGrade} • {subjects.length} subjects available
          </Typography>
        )}

        {studentGrade && subjects.length === 0 && (
          <Alert severity="info" sx={{ mb: 4 }}>
            There are currently no subjects available for Grade {studentGrade}. Please check back later or ask your administrator to create subjects.
          </Alert>
        )}

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth disabled={!subjects.length}>
              <InputLabel>Subject</InputLabel>
              <Select
                value={selectedSubject || ''}
                label="Subject"
                onChange={(e) => setSelectedSubject(Number(e.target.value))}
              >
                {subjects.map((s) => (
                  <MenuItem key={s._id} value={s.subjectId}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {selectedSubject && (
          <>
            <Typography variant="h6" sx={{ mb: 2 }}>Lessons</Typography>
            <Grid container spacing={3}>
              {subjectLessons.length === 0 ? (
                <Grid size={{ xs: 12 }}>
                  <Typography variant="body2" color="text.secondary">
                    No lessons available for this subject.
                  </Typography>
                </Grid>
              ) : (
                subjectLessons.map((lesson) => {
                  const quiz = getQuizForLesson(lesson.lessonId);
                  const questionCount = quiz?.questions?.length || 0;
                  return (
                    <Grid key={lesson._id} size={{ xs: 12, md: 6 }}>
                      <Card
                        sx={{
                          borderRadius: 3,
                          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
                          transition: 'transform 0.2s ease',
                          '&:hover': { transform: 'translateY(-4px)' },
                          display: 'flex',
                          flexDirection: 'column',
                          height: '100%',
                        }}
                      >
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {lesson.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            {lesson.description || 'No description available'}
                          </Typography>
                          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
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
                          </Box>
                        </CardContent>
                        <Box sx={{ p: 2 }}>
                          <Button
                            variant="contained"
                            fullWidth
                            startIcon={<PlayArrow />}
                            sx={{ bgcolor: '#7C3AED', '&:hover': { bgcolor: '#6D28D9' } }}
                            onClick={() => {
                              if (quiz) {
                                navigate(`/student/quiz/attempt/${lesson.lessonId}`);
                              } else {
                                alert('No quiz available for this lesson yet.');
                              }
                            }}
                            disabled={!quiz}
                          >
                            {quiz ? 'Attempt Quiz' : 'No Quiz Available'}
                          </Button>
                        </Box>
                      </Card>
                    </Grid>
                  );
                })
              )}
            </Grid>
          </>
        )}
      </Container>
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