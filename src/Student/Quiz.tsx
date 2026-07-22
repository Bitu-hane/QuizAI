// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Chip,
//   CircularProgress,
//   Alert,
//   Select,
//   MenuItem,
//   FormControl,
//   Button,
// } from '@mui/material';
// import Layout from '../common/component/layout';
// import StudentSidebar from './components/Sidebar';
// import API from '../common/services/api';
// import './Quiz.css';


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

// const Quiz: React.FC = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [subjects, setSubjects] = useState<Subject[]>([]);
//   const [lessons, setLessons] = useState<Lesson[]>([]);
//   const [quizzes, setQuizzes] = useState<Quiz[]>([]);
//   const [selectedSubject, setSelectedSubject] = useState<number | null>(null);
//   const [studentGrade, setStudentGrade] = useState<number | null>(null);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchStudentData();
//   }, []);

//   const fetchStudentData = async () => {
//     setLoading(true);
//     try {
//       const userRes = await API.get('/auth/me');
//       const user = userRes.data;
//       setStudentGrade(user.gradeId);

//       if (!user.gradeId) {
//         setError('Please complete your onboarding to select a grade.');
//         setLoading(false);
//         return;
//       }

//       const subjectsRes = await API.get(`/subjects?gradeId=${user.gradeId}`);
//       setSubjects(subjectsRes.data);

//       const lessonsRes = await API.get('/lessons');
//       setLessons(lessonsRes.data);

//       const quizzesRes = await API.get('/quizzes');
//       setQuizzes(quizzesRes.data);

//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setError('Failed to load quiz data. Please try again.');
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
//     return (
//       <Layout title="Quiz" sidebar={<StudentSidebar />}>
//         <Box className="content" sx={{ maxWidth: 900, mx: 'auto' }}>
//           <Alert severity="warning" sx={{ mt: 4 }}>
//             {error}
//             <Button
//               variant="text"
//               sx={{ ml: 2 }}
//               onClick={() => navigate('/onboarding')}
//             >
//               Go to Onboarding
//             </Button>
//           </Alert>
//         </Box>
//       </Layout>
//     );
//   }

//   return (
//     <Layout title="Quiz" sidebar={<StudentSidebar />}>
//       <div className="quiz-content">
//         <div className="page-head">
//           <div className="page-icon">
//             <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//               <path d="M4 20L4.8 15.2L16 4L20 8L8.8 19.2L4 20Z" stroke="#C0392B" strokeWidth="1.7" strokeLinejoin="round" />
//             </svg>
//           </div>
//           <h1>Select Your Quiz</h1>
//         </div>
//         <p className="meta">
//           Grade {studentGrade || 'N/A'} · {subjects.length} subjects available
//         </p>

//         {studentGrade && subjects.length === 0 && (
//           <div className="notice">
//             <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//               <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
//               <path d="M12 8V13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
//               <circle cx="12" cy="16.3" r="0.9" fill="currentColor" />
//             </svg>
//             <span>
//               There are currently no subjects available for Grade {studentGrade}.
//               Please check back later or ask your administrator to create subjects.
//             </span>
//           </div>
//         )}

//         <div className="subject-select">
//           <label>Subject</label>
//           <FormControl fullWidth disabled={!subjects.length}>
//             <Select
//               value={selectedSubject || ''}
//               onChange={(e) => setSelectedSubject(Number(e.target.value))}
//               displayEmpty
//               renderValue={(value) => {
//                 if (!value) return <span style={{ color: '#9AA3AE' }}>Select a subject…</span>;
//                 const subject = subjects.find(s => s.subjectId === value);
//                 return subject?.name || '';
//               }}
//               sx={{
//                 fontFamily: 'Inter, sans-serif',
//                 fontSize: '15px',
//                 padding: '14px 16px',
//                 borderRadius: '6px',
//                 borderColor: 'rgba(27,36,48,0.12)',
//                 '& .MuiSelect-select': { padding: '0' },
//                 '& fieldset': { borderColor: 'rgba(27,36,48,0.12)', borderRadius: '6px' },
//                 '&:hover fieldset': { borderColor: '#1B2430' },
//                 '&.Mui-focused fieldset': { borderColor: '#1B2430' },
//               }}
//             >
//               {subjects.map((s) => (
//                 <MenuItem key={s._id} value={s.subjectId}>
//                   {s.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </div>

//         {selectedSubject && (
//           <div className="lessons-grid">
//             {subjectLessons.length === 0 ? (
//               <div className="sheet">
//                 <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
//                   <rect x="5" y="3" width="14" height="18" rx="1.5" stroke="#9AA3AE" strokeWidth="1.6" strokeDasharray="3 3" />
//                   <path d="M9 8H15M9 12H13" stroke="#9AA3AE" strokeWidth="1.6" strokeLinecap="round" />
//                 </svg>
//                 <h3>No lessons available</h3>
//                 <p>No lessons have been added for this subject yet.</p>
//               </div>
//             ) : (
//               subjectLessons.map((lesson) => {
//                 const quiz = getQuizForLesson(lesson.lessonId);
//                 const questionCount = quiz?.questions?.length || 0;
//                 const hasQuiz = !!quiz;

//                 return (
//                   <div className="lesson-card" key={lesson._id}>
//                     <div className="lesson-info">
//                       <h3>{lesson.title}</h3>
//                       <p>{lesson.description || 'No description available'}</p>
//                       <div className="lesson-tags">
//                         <Chip
//                           label={`${questionCount} questions`}
//                           size="small"
//                           sx={{ bgcolor: '#F5F3FF', color: '#7C3AED' }}
//                         />
//                         {quiz?.difficulty && (
//                           <Chip
//                             label={`Difficulty: ${quiz.difficulty}/5`}
//                             size="small"
//                             color={
//                               quiz.difficulty <= 2 ? 'success' :
//                               quiz.difficulty <= 4 ? 'warning' : 'error'
//                             }
//                           />
//                         )}
//                         {quiz?.timelimit && (
//                           <Chip
//                             label={`${quiz.timelimit} min`}
//                             size="small"
//                             variant="outlined"
//                           />
//                         )}
//                       </div>
//                     </div>
//                     <div className="lesson-action">
//                       <button
//                         className="quiz-btn"
//                         disabled={!hasQuiz}
//                         onClick={() => {
//                           if (hasQuiz) {
//                             navigate(`/student/quiz/attempt/${lesson.lessonId}`);
//                           } else {
//                             alert('No quiz available for this lesson yet.');
//                           }
//                         }}
//                       >
//                         {hasQuiz ? 'Attempt Quiz' : 'No Quiz Available'}
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default Quiz;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Chip,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  Button,
} from '@mui/material';
import Layout from '../common/component/layout';
import StudentSidebar from './components/Sidebar';
import API from '../common/services/api';
import useNotification from '../common/hooks/useNotification';
import './Quiz.css';
import UnlockModal from './components/UnlockModal';
import { useAuth } from '../common/contexts/AuthContext';
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
   isLocked?: boolean;   // ✅ ADD THIS
  price?: number;
}

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const { showError, showInfo } = useNotification();
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);
  const [studentGrade, setStudentGrade] = useState<number | null>(null);
  const [purchasedDifficulties, setPurchasedDifficulties] = useState<number[]>([]);
const [isPremium, setIsPremium] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
const [unlockModalOpen, setUnlockModalOpen] = useState(false);
const [selectedQuiz, setSelectedQuiz] = useState<{
  quizId: number;
  difficulty: number;
  price: number;
   lessonId: number;
  title: string;
} | null>(null);
  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    setLoading(true);
    try {
      const userRes = await API.get('/auth/me');
      const user = userRes.data;
      setStudentGrade(user.gradeId);
setPurchasedDifficulties(user.purchasedDifficulties || []);
      setIsPremium(user.isPremium || false);
      if (!user.gradeId) {
        const msg = 'Please complete your onboarding to select a grade.';
        setError(msg);
        showError(msg);
        setLoading(false);
        return;
      }

      const subjectsRes = await API.get(`/subjects?gradeId=${user.gradeId}`);
      setSubjects(subjectsRes.data);

      const lessonsRes = await API.get('/lessons');
      setLessons(lessonsRes.data);

      const quizzesRes = await API.get('/quizzes');
      setQuizzes(quizzesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      const msg = 'Failed to load quiz data. Please try again.';
      setError(msg);
      showError(msg);
    } finally {
      setLoading(false);
    }
  };

  const subjectLessons = selectedSubject
    ? lessons.filter(l => l.subjectId === selectedSubject)
    : [];
const openUnlockModal = (quiz: any, lessonId: number) => {
  setSelectedQuiz({
    quizId: quiz.quizId,
    difficulty: quiz.difficulty,
    price: quiz.price,
    title: quiz.title,
    lessonId: lessonId, // ✅ Add this
  });
  setUnlockModalOpen(true);
};
  const getQuizForLesson = (lessonId: number) => {
  const quiz = quizzes.find(q => q.lessonId === lessonId);
  if (!quiz) return null;
  
  const difficulty = quiz.difficulty || 1;
  
  // ✅ Check if user has purchased this difficulty or has premium
  const isLocked = difficulty >= 3 && 
                   !user?.isPremium && 
                   !(user?.purchasedDifficulties || []).includes(difficulty);
  
  const price = difficulty === 3 ? 500 : difficulty === 4 ? 700 : difficulty === 5 ? 1000 : 0;
  
  return {
    ...quiz,
    isLocked,
    price,
  };
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
          <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #f5c6cb', borderRadius: '4px', backgroundColor: '#f8d7da', color: '#721c24' }}>
            <p>{error}</p>
            <Button
              variant="text"
              sx={{ ml: 0, mt: 1 }}
              onClick={() => navigate('/onboarding')}
            >
              Go to Onboarding
            </Button>
          </div>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout title="Quiz" sidebar={<StudentSidebar />}>
      <div className="quiz-content">
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
  {hasQuiz && quiz.isLocked ? (
    <button
      className="quiz-btn lock-btn"
      onClick={() => openUnlockModal(quiz, lesson.lessonId)}
      style={{
        background: 'linear-gradient(135deg, #F59E0B, #D97706)',
        color: 'white',
        border: 'none',
      }}
    >
      🔒 Unlock for {quiz.price} ETB
    </button>
  ) : (
    <button
      className="quiz-btn"
      disabled={!hasQuiz}
      onClick={() => {
        if (hasQuiz) {
          navigate(`/student/quiz/attempt/${lesson.lessonId}`);
        } else {
          showInfo('No quiz available for this lesson yet.');
        }
      }}
    >
      {hasQuiz ? 'Attempt Quiz' : 'No Quiz Available'}
    </button>
  )}
</div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
      {/* Unlock Modal */}
<UnlockModal
  open={unlockModalOpen}
  onClose={() => setUnlockModalOpen(false)}
  difficulty={selectedQuiz?.difficulty || 0}
  price={selectedQuiz?.price || 0}
  lessonId={selectedQuiz?.lessonId || 0} // ✅ Pass lessonId
  onSuccess={() => {
    setUnlockModalOpen(false);
    fetchStudentData();
  }}
/>
    </Layout>
  );
};

export default Quiz;