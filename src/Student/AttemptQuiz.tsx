// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import API from '../common/services/api';

// import {
//   Box,
//   Container,
//   Typography,
//   Paper,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   LinearProgress,
//   Button,
//   Chip,
//   Alert,
//   TextField,
//   FormControl
// } from '@mui/material';
// import { Timer } from '@mui/icons-material';
// import Layout from '../common/component/layout';
// import StudentSidebar from './components/Sidebar';

// interface Question {
//   questionId: number;
//   question: string;
//   options: string[] | string;
//   topic?: string;
// }

// interface QuizData {
//   quiz: {
//     quizId: number;
//     title: string;
//     timelimit?: number;
//     questions: Question[];
//   };
//   timelimit?: number;
// }

// const QuizAttempt: React.FC = () => {
//   const { lessonId } = useParams<{ lessonId: string }>();
//   const navigate = useNavigate();

//   const [quizData, setQuizData] = useState<QuizData | null>(null);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState<{ [key: number]: string }>({});
//   const [timeLeft, setTimeLeft] = useState<number | null>(null);
//   const [quizSubmitted, setQuizSubmitted] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
  
//   // Results
//   const [score, setScore] = useState(0);
//   const [feedback, setFeedback] = useState('');
//   const [recommendation, setRecommendation] = useState('');

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         const res = await API.get(`/quizzes/lesson/${lessonId}`);
//         if (!res.data.quiz || !res.data.quiz.questions || res.data.quiz.questions.length === 0) {
//           setError('No quiz or questions found for this lesson.');
//           setLoading(false);
//           return;
//         }
//         setQuizData(res.data);
//         if (res.data.timelimit) {
//           setTimeLeft(res.data.timelimit * 60);
//         }
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching quiz:', err);
//         setError('Failed to load quiz. Please try again.');
//         setLoading(false);
//       }
//     };
//     fetchQuiz();
//   }, [lessonId]);

//   // Timer effect
//   useEffect(() => {
//     if (timeLeft !== null && timeLeft > 0 && !quizSubmitted) {
//       const timer = setInterval(() => {
//         setTimeLeft((prev) => {
//           if (prev === null || prev <= 1) {
//             clearInterval(timer);
//             handleSubmitQuiz();
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [timeLeft, quizSubmitted]);

//   const handleAnswer = (questionId: number, value: string) => {
//     setAnswers((prev) => ({ ...prev, [questionId]: value }));
//   };

//   const handleSubmitQuiz = async () => {
//     if (!quizData) return;
    
//     // Check if partial
//     const totalQuestions = quizData.quiz.questions.length;
//     const answeredCount = Object.keys(answers).length;
//     if (answeredCount < totalQuestions && (timeLeft === null || timeLeft > 0)) {
//       if (!window.confirm(`You've answered ${answeredCount}/${totalQuestions} questions. Submit anyway?`)) {
//         return;
//       }
//     }

//     const payload = {
//       quizId: quizData.quiz.quizId,
//       answers: Object.entries(answers).map(([qId, ans]) => ({
//         questionId: Number(qId),
//         selectedAnswer: ans,
//       })),
//       timeTaken: quizData.timelimit ? (quizData.timelimit * 60 - (timeLeft || 0)) : 0,
//     };

//     try {
//       const response = await API.post('/quizzes/submit', payload);
//       const { score, feedback, recommendation } = response.data;
//       setScore(score);
//       setFeedback(feedback);
//       setRecommendation(recommendation);
//       setQuizSubmitted(true);
//     } catch (error) {
//       console.error('Error submitting quiz:', error);
//       alert('Failed to submit quiz. Please try again.');
//     }
//   };

//   const handleBackToLessons = () => {
//     navigate('/student/quiz');
//   };

//   if (loading) {
//     return (
//       <Layout title="Quiz" sidebar={<StudentSidebar />}>
//         <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
//           <LinearProgress />
//           <Typography sx={{ mt: 2 }}>Loading quiz...</Typography>
//         </Container>
//       </Layout>
//     );
//   }

//   if (error) {
//     return (
//       <Layout title="Quiz" sidebar={<StudentSidebar />}>
//         <Container maxWidth="md" sx={{ mt: 4 }}>
//           <Alert severity="error">{error}</Alert>
//           <Button variant="contained" sx={{ mt: 2 }} onClick={handleBackToLessons}>
//             Back to Lessons
//           </Button>
//         </Container>
//       </Layout>
//     );
//   }

//   if (!quizData) return null;

//   const questions = quizData.quiz.questions;
//   const totalQuestions = questions.length;

//   if (quizSubmitted) {
//     const percentage = score;
//     return (
//       <Layout title="Quiz Results" sidebar={<StudentSidebar />}>
//         <Container maxWidth="md" sx={{ mt: 4 }}>
//           <Paper elevation={0} sx={{ p: 4, borderRadius: 3, bgcolor: 'white' }}>
//             <Box sx={{ textAlign: 'center' }}>
//               <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
//                 Quiz Complete! 🎉
//               </Typography>
//               <Box
//                 sx={{
//                   width: 120,
//                   height: 120,
//                   borderRadius: '50%',
//                   bgcolor: percentage >= 70 ? '#ECFDF5' : '#FEF2F2',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mx: 'auto',
//                   my: 3,
//                 }}
//               >
//                 <Typography
//                   variant="h2"
//                   sx={{ fontWeight: 700, color: percentage >= 70 ? '#10B981' : '#EF4444' }}
//                 >
//                   {percentage}%
//                 </Typography>
//               </Box>
//               <Typography variant="h5" gutterBottom>
//                 {Math.round((score / 100) * totalQuestions)} / {totalQuestions} Correct
//               </Typography>
//               <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>
//                 {feedback}
//               </Typography>
//               <Typography variant="body2" color="primary" sx={{ mb: 3 }}>
//                 📘 {recommendation}
//               </Typography>
//               <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
//                 <Button
//                   variant="outlined"
//                   onClick={handleBackToLessons}
//                   sx={{ borderColor: '#7C3AED', color: '#7C3AED' }}
//                 >
//                   Back to Quizzes
//                 </Button>
//                 <Button
//                   variant="contained"
//                   sx={{ bgcolor: '#7C3AED', '&:hover': { bgcolor: '#6D28D9' } }}
//                   onClick={() => navigate('/student/reports')}
//                 >
//                   View Reports
//                 </Button>
//               </Box>
//             </Box>
//           </Paper>
//         </Container>
//       </Layout>
//     );
//   }

//   const question = questions[currentQuestion];
//   const progress = ((currentQuestion + 1) / totalQuestions) * 100;
//   const minutes = Math.floor((timeLeft || 0) / 60);
//   const seconds = (timeLeft || 0) % 60;

//   // Parse options securely
//   let parsedOptions: string[] = [];
//   if (Array.isArray(question.options)) {
//     parsedOptions = question.options;
//   } else if (typeof question.options === 'string') {
//     try {
//       parsedOptions = JSON.parse(question.options);
//     } catch (e) {
//       parsedOptions = [];
//     }
//   }
//   const isTextQuestion = parsedOptions.length === 0;

//   return (
//     <Layout title="Quiz" sidebar={<StudentSidebar />}>
//       <Container maxWidth="md" sx={{ mt: 4 }}>
//         <Paper elevation={0} sx={{ p: 4, borderRadius: 3, bgcolor: 'white' }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//             <Typography variant="h6" sx={{ fontWeight: 700 }}>
//               Question {currentQuestion + 1} of {totalQuestions}
//             </Typography>
//             {timeLeft !== null && (
//               <Chip
//                 icon={<Timer />}
//                 label={`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
//                 size="small"
//                 sx={{ bgcolor: '#FEF2F2', color: '#EF4444' }}
//               />
//             )}
//           </Box>
//           <LinearProgress
//             variant="determinate"
//             value={progress}
//             sx={{
//               height: 8,
//               borderRadius: 4,
//               mb: 3,
//               bgcolor: '#F5F3FF',
//               '& .MuiLinearProgress-bar': {
//                 borderRadius: 4,
//                 background: 'linear-gradient(90deg, #7C3AED, #8B5CF6)',
//               },
//             }}
//           />
//           <Typography variant="body1" sx={{ fontSize: '1.1rem', mb: 3 }}>
//             {question.question}
//           </Typography>
          
//           {isTextQuestion ? (
//             <TextField
//               fullWidth
//               multiline
//               rows={3}
//               placeholder="Type your answer here..."
//               value={answers[question.questionId] || ''}
//               onChange={(e) => handleAnswer(question.questionId, e.target.value)}
//             />
//           ) : (
//             <FormControl component="fieldset" fullWidth>
//               <RadioGroup
//                 value={answers[question.questionId] || ''}
//                 onChange={(e) => handleAnswer(question.questionId, e.target.value)}
//               >
//                 {parsedOptions.map((option, idx) => (
//                   <FormControlLabel
//                     key={idx}
//                     value={option}
//                     control={<Radio sx={{ color: '#7C3AED', '&.Mui-checked': { color: '#7C3AED' } }} />}
//                     label={option}
//                     sx={{
//                       mb: 1,
//                       p: 1,
//                       borderRadius: 2,
//                       border: '1px solid',
//                       borderColor: answers[question.questionId] === option ? '#7C3AED' : '#E2E8F0',
//                       bgcolor: answers[question.questionId] === option ? '#F5F3FF' : 'transparent',
//                       transition: 'all 0.2s ease',
//                       '&:hover': { bgcolor: '#F5F3FF' },
//                     }}
//                   />
//                 ))}
//               </RadioGroup>
//             </FormControl>
//           )}

//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
//             <Button
//               variant="outlined"
//               disabled={currentQuestion === 0}
//               onClick={() => setCurrentQuestion((prev) => prev - 1)}
//               sx={{ borderColor: '#7C3AED', color: '#7C3AED' }}
//             >
//               Previous
//             </Button>
//             {currentQuestion === totalQuestions - 1 ? (
//               <Button
//                 variant="contained"
//                 sx={{ bgcolor: '#7C3AED', '&:hover': { bgcolor: '#6D28D9' } }}
//                 onClick={handleSubmitQuiz}
//               >
//                 Submit
//               </Button>
//             ) : (
//               <Button
//                 variant="contained"
//                 sx={{ bgcolor: '#7C3AED', '&:hover': { bgcolor: '#6D28D9' } }}
//                 onClick={() => setCurrentQuestion((prev) => prev + 1)}
//               >
//                 Next
//               </Button>
//             )}
//           </Box>
//         </Paper>
//       </Container>
//     </Layout>
//   );
// };

// export default QuizAttempt;




// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   Chip,
//   Alert,
//   TextField,
//   FormControl,
// } from '@mui/material';
// import { Timer } from '@mui/icons-material';
// import Layout from '../common/component/layout';
// import StudentSidebar from './components/Sidebar';
// import API from '../common/services/api';
// import './AttemptQuiz.css';

// interface Question {
//   questionId: number;
//   question: string;
//   options: string[] | string;
//   topic?: string;
//   explanation?: string;
//   correctAnswer?: string;
// }

// interface QuizData {
//   quiz: {
//     quizId: number;
//     title: string;
//     timelimit?: number;
//     questions: Question[];
//   };
//   timelimit?: number;
// }

// interface AnswerDetail {
//   questionId: number;
//   question: string;
//   selectedAnswer: string;
//   correctAnswer: string;
//   isCorrect: boolean;
//   explanation?: string;
// }

// interface QuizResult {
//   score: number;
//   totalQuestions: number;
//   percentage: number;
//   aiFeedback: string;
//   aiExplanation?: string;
//   recommendation: string;
//   strengths: string[];
//   weaknesses: string[];
//   answerDetails: AnswerDetail[];
//   quizTitle: string;
// }

// const QuizAttempt: React.FC = () => {
//   const { lessonId } = useParams<{ lessonId: string }>();
//   const navigate = useNavigate();

//   const [quizData, setQuizData] = useState<QuizData | null>(null);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState<{ [key: number]: string }>({});
//   const [timeLeft, setTimeLeft] = useState<number | null>(null);
//   const [quizSubmitted, setQuizSubmitted] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [result, setResult] = useState<QuizResult | null>(null);
//   const [showExplanations, setShowExplanations] = useState(false);

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         const res = await API.get(`/quizzes/lesson/${lessonId}`);
//         if (!res.data.quiz || !res.data.quiz.questions || res.data.quiz.questions.length === 0) {
//           setError('No quiz or questions found for this lesson.');
//           setLoading(false);
//           return;
//         }
//         setQuizData(res.data);
//         if (res.data.timelimit) {
//           setTimeLeft(res.data.timelimit * 60);
//         }
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching quiz:', err);
//         setError('Failed to load quiz. Please try again.');
//         setLoading(false);
//       }
//     };
//     fetchQuiz();
//   }, [lessonId]);

//   useEffect(() => {
//     if (timeLeft !== null && timeLeft > 0 && !quizSubmitted) {
//       const timer = setInterval(() => {
//         setTimeLeft((prev) => {
//           if (prev === null || prev <= 1) {
//             clearInterval(timer);
//             handleSubmitQuiz();
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [timeLeft, quizSubmitted]);

//   const handleAnswer = (questionId: number, value: string) => {
//     setAnswers((prev) => ({ ...prev, [questionId]: value }));
//   };

//   const handleSubmitQuiz = async () => {
//     if (!quizData) return;
//     const totalQuestions = quizData.quiz.questions.length;
//     const answeredCount = Object.keys(answers).length;
//     if (answeredCount < totalQuestions && (timeLeft === null || timeLeft > 0)) {
//       if (!window.confirm(`You've answered ${answeredCount}/${totalQuestions} questions. Submit anyway?`)) {
//         return;
//       }
//     }

//     const payload = {
//       quizId: quizData.quiz.quizId,
//       answers: Object.entries(answers).map(([qId, ans]) => ({
//         questionId: Number(qId),
//         selectedAnswer: ans,
//       })),
//       timeTaken: quizData.timelimit ? (quizData.timelimit * 60 - (timeLeft || 0)) : 0,
//     };

//     try {
//       const response = await API.post('/quizzes/submit', payload);
//       const data = response.data;
      
//       const answerDetails: AnswerDetail[] = data.answers.map((ans: any) => {
//         const question = quizData.quiz.questions.find(q => q.questionId === ans.questionId);
//         return {
//           questionId: ans.questionId,
//           question: question?.question || 'Unknown question',
//           selectedAnswer: ans.selectedAnswer,
//           correctAnswer: ans.correctAnswer || 'N/A',
//           isCorrect: ans.isCorrect,
//           explanation: ans.explanation || 'No explanation available.',
//         };
//       });

//       const percentage = (data.score / answerDetails.length) * 100;
//       const topics = quizData.quiz.questions.map((q) => q.topic || 'General');
//       const topicPerformance: { [key: string]: { correct: number; total: number } } = {};
//       answerDetails.forEach((detail, index) => {
//         const topic = topics[index] || 'General';
//         if (!topicPerformance[topic]) {
//           topicPerformance[topic] = { correct: 0, total: 0 };
//         }
//         topicPerformance[topic].total++;
//         if (detail.isCorrect) {
//           topicPerformance[topic].correct++;
//         }
//       });

//       const strengths = Object.entries(topicPerformance)
//         .filter(([_, perf]) => (perf.correct / perf.total) >= 0.7)
//         .map(([topic]) => topic);

//       const weaknesses = Object.entries(topicPerformance)
//         .filter(([_, perf]) => (perf.correct / perf.total) < 0.5)
//         .map(([topic]) => topic);

//       setResult({
//         score: data.score,
//         totalQuestions: answerDetails.length,
//         percentage,
//         aiFeedback: data.feedback || data.aiFeedback || 'Great effort! Keep practicing to improve further.',
//         aiExplanation: data.aiExplanation || 'Based on your answers, focus on the areas where you made mistakes.',
//         recommendation: data.recommendation || data.recommendLesson || 'Review the topics you found challenging.',
//         strengths,
//         weaknesses,
//         answerDetails,
//         quizTitle: quizData.quiz.title,
//       });
      
//       setQuizSubmitted(true);
//     } catch (error) {
//       console.error('Error submitting quiz:', error);
//       alert('Failed to submit quiz. Please try again.');
//     }
//   };

//   const handleBackToLessons = () => {
//     navigate('/student/quiz');
//   };

//   if (loading) {
//     return (
//       <Layout title="Quiz" sidebar={<StudentSidebar />}>
//         <div className="quiz-loading">
//           <div className="progress-bar-wrapper" style={{ maxWidth: 400, margin: '0 auto' }}>
//             <div className="progress-bar" style={{ width: '100%' }} />
//           </div>
//           <p>Loading quiz...</p>
//         </div>
//       </Layout>
//     );
//   }

//   if (error) {
//     return (
//       <Layout title="Quiz" sidebar={<StudentSidebar />}>
//         <div className="quiz-error">
//           <Alert severity="error">{error}</Alert>
//           <button className="quiz-btn-outline" onClick={handleBackToLessons}>
//             Back to Lessons
//           </button>
//         </div>
//       </Layout>
//     );
//   }

//   if (!quizData) return null;

//   const questions = quizData.quiz.questions;
//   const totalQuestions = questions.length;

//   if (quizSubmitted && result) {
//     const {
//       score, totalQuestions, percentage,
//       aiFeedback, aiExplanation, recommendation,
//       strengths, weaknesses, answerDetails, quizTitle,
//     } = result;
//     const passed = percentage >= 70;

//     return (
//       <Layout title="Quiz Results" sidebar={<StudentSidebar />}>
//         <div className="results-container">
//           <div className="results-card">
//             <h1>{passed ? '🎉 Excellent Work!' : '💪 Keep Learning!'}</h1>
//             <p className="meta">{quizTitle}</p>
//             <div className="score-circle" style={{ borderColor: passed ? '#2E7D52' : '#C0392B' }}>
//               <span className="score-number" style={{ color: passed ? '#2E7D52' : '#C0392B' }}>
//                 {Math.round(percentage)}%
//               </span>
//               <span className="score-label">{score} / {totalQuestions} correct</span>
//             </div>
//             <Chip label={passed ? '✅ Passed' : '❌ Needs Improvement'} color={passed ? 'success' : 'error'} />
//           </div>

//           <div className="ai-feedback-box">
//             <h3>💡 AI Feedback</h3>
//             <p>{aiFeedback}</p>
//           </div>

//           <div className="strengths-weaknesses">
//             <div className="strength-box">
//               <h4>✅ Strengths</h4>
//               {strengths.length ? (
//                 <ul>{strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
//               ) : <p>Keep practicing to identify your strengths!</p>}
//             </div>
//             <div className="weakness-box">
//               <h4>📉 Areas to Improve</h4>
//               {weaknesses.length ? (
//                 <ul>{weaknesses.map((w, i) => <li key={i}>{w}</li>)}</ul>
//               ) : <p>No major weaknesses identified. Great job!</p>}
//             </div>
//           </div>

//           <div className="recommendation-box">
//             <h4>📘 Recommended Next Lesson</h4>
//             <p>{recommendation}</p>
//             {aiExplanation && <p className="meta">{aiExplanation}</p>}
//           </div>

//           <div className="explanations-section">
//             <div className="explanations-header" onClick={() => setShowExplanations(!showExplanations)}>
//               <h3>📝 Detailed Answers & Explanations</h3>
//               <Chip label={showExplanations ? 'Hide' : 'Show'} size="small" sx={{ bgcolor: '#C0392B', color: 'white' }} />
//             </div>
//             {showExplanations && (
//               <div className="explanations-list">
//                 {answerDetails.map((detail, index) => (
//                   <div key={index} className="explanation-item">
//                     <div className="explanation-summary">
//                       <span>{detail.isCorrect ? '✅' : '❌'}</span>
//                       <span>Q{index + 1}: {detail.question.length > 60 ? detail.question.substring(0, 60) + '...' : detail.question}</span>
//                       <Chip label={detail.isCorrect ? 'Correct' : 'Incorrect'} size="small" color={detail.isCorrect ? 'success' : 'error'} />
//                     </div>
//                     <div className="explanation-details">
//                       <p><strong>Your answer:</strong> {detail.selectedAnswer || 'Not answered'}</p>
//                       {!detail.isCorrect && <p><strong>Correct answer:</strong> {detail.correctAnswer}</p>}
//                       <div className="explanation-text">
//                         <strong>📖 Explanation:</strong>
//                         <p>{detail.explanation || 'No explanation available.'}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="action-buttons">
//             <button className="quiz-btn-outline" onClick={handleBackToLessons}>Back to Quizzes</button>
//             <button className="quiz-btn" onClick={() => navigate('/student/reports')}>View Reports</button>
//             <button className="quiz-btn" style={{ background: '#2E7D52', borderColor: '#2E7D52' }} onClick={() => navigate(`/student/quiz/${lessonId}`)}>Retry Quiz</button>
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   const question = questions[currentQuestion];
//   const progress = ((currentQuestion + 1) / totalQuestions) * 100;
//   const minutes = Math.floor((timeLeft || 0) / 60);
//   const seconds = (timeLeft || 0) % 60;

//   let parsedOptions: string[] = [];
//   if (Array.isArray(question.options)) {
//     parsedOptions = question.options;
//   } else if (typeof question.options === 'string') {
//     try {
//       parsedOptions = JSON.parse(question.options);
//     } catch (e) {
//       parsedOptions = [];
//     }
//   }
//   const isTextQuestion = parsedOptions.length === 0;

//   return (
//     <Layout title="Quiz" sidebar={<StudentSidebar />}>
//       <div className="quiz-taking-container">
//         <div className="quiz-card">
//           <div className="quiz-header">
//             <div className="quiz-title">
//               <h2>Question {currentQuestion + 1} of {totalQuestions}</h2>
//               {timeLeft !== null && (
//                 <Chip
//                   icon={<Timer />}
//                   label={`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
//                   size="small"
//                   sx={{ bgcolor: '#FEF2F2', color: '#C0392B' }}
//                 />
//               )}
//             </div>
//             <div className="progress-bar-wrapper">
//               <div className="progress-bar" style={{ width: `${progress}%` }} />
//             </div>
//           </div>

//           <div className="question-text">
//             <p>{question.question}</p>
//           </div>

//           {isTextQuestion ? (
//             <TextField
//               fullWidth
//               multiline
//               rows={3}
//               placeholder="Type your answer here..."
//               value={answers[question.questionId] || ''}
//               onChange={(e) => handleAnswer(question.questionId, e.target.value)}
//               className="text-answer"
//             />
//           ) : (
//             <FormControl component="fieldset" className="options-group">
//               <RadioGroup
//                 value={answers[question.questionId] || ''}
//                 onChange={(e) => handleAnswer(question.questionId, e.target.value)}
//               >
//                 {parsedOptions.map((option, idx) => (
//                   <FormControlLabel
//                     key={idx}
//                     value={option}
//                     control={<Radio sx={{ color: '#7C3AED', '&.Mui-checked': { color: '#7C3AED' } }} />}
//                     label={option}
//                     className="option-item"
//                   />
//                 ))}
//               </RadioGroup>
//             </FormControl>
//           )}

//           <div className="quiz-nav">
//             <button
//               className="quiz-btn-outline"
//               disabled={currentQuestion === 0}
//               onClick={() => setCurrentQuestion(prev => prev - 1)}
//             >
//               Previous
//             </button>
//             {currentQuestion === totalQuestions - 1 ? (
//               <button className="quiz-btn" onClick={handleSubmitQuiz}>
//                 Submit Quiz
//               </button>
//             ) : (
//               <button className="quiz-btn" onClick={() => setCurrentQuestion(prev => prev + 1)}>
//                 Next
//               </button>
//             )}
//           </div>

//           <div className="question-progress">
//             {questions.map((_, idx) => (
//               <div
//                 key={idx}
//                 className={`progress-dot ${answers[questions[idx].questionId] ? 'answered' : ''}`}
//                 onClick={() => setCurrentQuestion(idx)}
//               >
//                 {idx + 1}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default QuizAttempt;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Chip,
  TextField,
  FormControl,
} from '@mui/material';
import { Timer } from '@mui/icons-material';
import Layout from '../common/component/layout';
import StudentSidebar from './components/Sidebar';
import API from '../common/services/api';
import useNotification from '../common/hooks/useNotification';
import './AttemptQuiz.css';


interface Question {
  questionId: number;
  question: string;
  options: string[] | string;
  topic?: string;
  explanation?: string;
  correctAnswer?: string;
}

interface QuizData {
  quiz: {
    quizId: number;
    title: string;
    timelimit?: number;
    questions: Question[];
  };
  timelimit?: number;
}

interface AnswerDetail {
  questionId: number;
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation?: string;
}

interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  aiFeedback: string;
  aiExplanation?: string;
  recommendation: string;
  strengths: string[];
  weaknesses: string[];
  answerDetails: AnswerDetail[];
  quizTitle: string;
}


const QuizAttempt: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { showError, showSuccess } = useNotification();


  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [result, setResult] = useState<QuizResult | null>(null);
  const [showExplanations, setShowExplanations] = useState(false);


  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await API.get(`/quizzes/lesson/${lessonId}`);
        if (!res.data.quiz || !res.data.quiz.questions || res.data.quiz.questions.length === 0) {
          const msg = 'No quiz or questions found for this lesson.';
          setError(msg);
          showError(msg);
          setLoading(false);
          return;
        }
        setQuizData(res.data);
        if (res.data.timelimit) {
          setTimeLeft(res.data.timelimit * 60);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching quiz:', err);
        const msg = 'Failed to load quiz. Please try again.';
        setError(msg);
        showError(msg);
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [lessonId, showError]);

  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0 && !quizSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(timer);
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, quizSubmitted]);

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmitQuiz = async () => {
    if (!quizData) return;
    const totalQuestions = quizData.quiz.questions.length;
    const answeredCount = Object.keys(answers).length;
    if (answeredCount < totalQuestions && (timeLeft === null || timeLeft > 0)) {
      if (!window.confirm(`You've answered ${answeredCount}/${totalQuestions} questions. Submit anyway?`)) {
        return;
      }
    }

    const payload = {
      quizId: quizData.quiz.quizId,
      answers: Object.entries(answers).map(([qId, ans]) => ({
        questionId: Number(qId),
        selectedAnswer: ans,
      })),
      timeTaken: quizData.timelimit ? (quizData.timelimit * 60 - (timeLeft || 0)) : 0,
    };

    try {
      const response = await API.post('/quizzes/submit', payload);
      const data = response.data;
      
      const answerDetails: AnswerDetail[] = data.answers.map((ans: any) => {
        const question = quizData.quiz.questions.find(q => q.questionId === ans.questionId);
        return {
          questionId: ans.questionId,
          question: question?.question || 'Unknown question',
          selectedAnswer: ans.selectedAnswer,
          correctAnswer: ans.correctAnswer || 'N/A',
          isCorrect: ans.isCorrect,
          explanation: ans.explanation || 'No explanation available.',
        };
      });

      const percentage = (data.score / answerDetails.length) * 100;
      const topics = quizData.quiz.questions.map((q) => q.topic || 'General');
      const topicPerformance: { [key: string]: { correct: number; total: number } } = {};
      answerDetails.forEach((detail, index) => {
        const topic = topics[index] || 'General';
        if (!topicPerformance[topic]) {
          topicPerformance[topic] = { correct: 0, total: 0 };
        }
        topicPerformance[topic].total++;
        if (detail.isCorrect) {
          topicPerformance[topic].correct++;
        }
      });

      const strengths = Object.entries(topicPerformance)
        .filter(([_, perf]) => (perf.correct / perf.total) >= 0.7)
        .map(([topic]) => topic);

      const weaknesses = Object.entries(topicPerformance)
        .filter(([_, perf]) => (perf.correct / perf.total) < 0.5)
        .map(([topic]) => topic);

      setResult({
        score: data.score,
        totalQuestions: answerDetails.length,
        percentage,
        aiFeedback: data.feedback || data.aiFeedback || 'Great effort! Keep practicing to improve further.',
        aiExplanation: data.aiExplanation || 'Based on your answers, focus on the areas where you made mistakes.',
        recommendation: data.recommendation || data.recommendLesson || 'Review the topics you found challenging.',
        strengths,
        weaknesses,
        answerDetails,
        quizTitle: quizData.quiz.title,
      });
      
      setQuizSubmitted(true);
      showSuccess('Quiz submitted successfully!');
    } catch (error) {
      console.error('Error submitting quiz:', error);
      showError('Failed to submit quiz. Please try again.');
    }
  };

  const handleBackToLessons = () => {
    navigate('/student/quiz');
  };

  if (loading) {
    return (
      <Layout title="Quiz" sidebar={<StudentSidebar />}>
        <div className="quiz-loading">
          <div className="progress-bar-wrapper" style={{ maxWidth: 400, margin: '0 auto' }}>
            <div className="progress-bar" style={{ width: '100%' }} />
          </div>
          <p>Loading quiz...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Quiz" sidebar={<StudentSidebar />}>
        <div className="quiz-error">
          <p>{error}</p>
          <button className="quiz-btn-outline" onClick={handleBackToLessons}>
            Back to Lessons
          </button>
        </div>
      </Layout>
    );
  }

  if (!quizData) return null;

  const questions = quizData.quiz.questions;
  const totalQuestions = questions.length;

  if (quizSubmitted && result) {
    const {
      score, totalQuestions, percentage,
      aiFeedback, aiExplanation, recommendation,
      strengths, weaknesses, answerDetails, quizTitle,
    } = result;
    const passed = percentage >= 70;

    return (
      <Layout title="Quiz Results" sidebar={<StudentSidebar />}>
        <div className="results-container">
          <div className="results-card">
            <h1>{passed ? '🎉 Excellent Work!' : '💪 Keep Learning!'}</h1>
            <p className="meta">{quizTitle}</p>
            <div className="score-circle" style={{ borderColor: passed ? '#2E7D52' : '#C0392B' }}>
              <span className="score-number" style={{ color: passed ? '#2E7D52' : '#C0392B' }}>
                {Math.round(percentage)}%
              </span>
              <span className="score-label">{score} / {totalQuestions} correct</span>
            </div>
            <Chip label={passed ? '✅ Passed' : '❌ Needs Improvement'} color={passed ? 'success' : 'error'} />
          </div>

          <div className="ai-feedback-box">
            <h3>💡 AI Feedback</h3>
            <p>{aiFeedback}</p>
          </div>

          <div className="strengths-weaknesses">
            <div className="strength-box">
              <h4>✅ Strengths</h4>
              {strengths.length ? (
                <ul>{strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
              ) : <p>Keep practicing to identify your strengths!</p>}
            </div>
            <div className="weakness-box">
              <h4>📉 Areas to Improve</h4>
              {weaknesses.length ? (
                <ul>{weaknesses.map((w, i) => <li key={i}>{w}</li>)}</ul>
              ) : <p>No major weaknesses identified. Great job!</p>}
            </div>
          </div>

          <div className="recommendation-box">
            <h4>📘 Recommended Next Lesson</h4>
            <p>{recommendation}</p>
            {aiExplanation && <p className="meta">{aiExplanation}</p>}
          </div>

          <div className="explanations-section">
            <div className="explanations-header" onClick={() => setShowExplanations(!showExplanations)}>
              <h3>📝 Detailed Answers & Explanations</h3>
              <Chip label={showExplanations ? 'Hide' : 'Show'} size="small" sx={{ bgcolor: '#C0392B', color: 'white' }} />
            </div>
            {showExplanations && (
              <div className="explanations-list">
                {answerDetails.map((detail, index) => (
                  <div key={index} className="explanation-item">
                    <div className="explanation-summary">
                      <span>{detail.isCorrect ? '✅' : '❌'}</span>
                      <span>Q{index + 1}: {detail.question.length > 60 ? detail.question.substring(0, 60) + '...' : detail.question}</span>
                      <Chip label={detail.isCorrect ? 'Correct' : 'Incorrect'} size="small" color={detail.isCorrect ? 'success' : 'error'} />
                    </div>
                    <div className="explanation-details">
                      <p><strong>Your answer:</strong> {detail.selectedAnswer || 'Not answered'}</p>
                      {!detail.isCorrect && <p><strong>Correct answer:</strong> {detail.correctAnswer}</p>}
                      <div className="explanation-text">
                        <strong>📖 Explanation:</strong>
                        <p>{detail.explanation || 'No explanation available.'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="action-buttons">
            <button className="quiz-btn-outline" onClick={handleBackToLessons}>Back to Quizzes</button>
            <button className="quiz-btn" onClick={() => navigate('/student/reports')}>View Reports</button>
            <button className="quiz-btn" style={{ background: '#2E7D52', borderColor: '#2E7D52' }} onClick={() => navigate(`/student/quiz/${lessonId}`)}>Retry Quiz</button>
          </div>
        </div>
      </Layout>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const minutes = Math.floor((timeLeft || 0) / 60);
  const seconds = (timeLeft || 0) % 60;

  let parsedOptions: string[] = [];
  if (Array.isArray(question.options)) {
    parsedOptions = question.options;
  } else if (typeof question.options === 'string') {
    try {
      parsedOptions = JSON.parse(question.options);
    } catch (e) {
      parsedOptions = [];
    }
  }
  const isTextQuestion = parsedOptions.length === 0;

  return (
    <Layout title="Quiz" sidebar={<StudentSidebar />}>
      <div className="quiz-taking-container">
        <div className="quiz-card">
          <div className="quiz-header">
            <div className="quiz-title">
              <h2>Question {currentQuestion + 1} of {totalQuestions}</h2>
              {timeLeft !== null && (
                <Chip
                  icon={<Timer />}
                  label={`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
                  size="small"
                  sx={{ bgcolor: '#FEF2F2', color: '#C0392B' }}
                />
              )}
            </div>
            <div className="progress-bar-wrapper">
              <div className="progress-bar" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="question-text">
            <p>{question.question}</p>
          </div>

          {isTextQuestion ? (
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Type your answer here..."
              value={answers[question.questionId] || ''}
              onChange={(e) => handleAnswer(question.questionId, e.target.value)}
              className="text-answer"
            />
          ) : (
            <FormControl component="fieldset" className="options-group">
              <RadioGroup
                value={answers[question.questionId] || ''}
                onChange={(e) => handleAnswer(question.questionId, e.target.value)}
              >
                {parsedOptions.map((option, idx) => (
                  <FormControlLabel
                    key={idx}
                    value={option}
                    control={<Radio sx={{ color: '#7C3AED', '&.Mui-checked': { color: '#7C3AED' } }} />}
                    label={option}
                    className="option-item"
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}

          <div className="quiz-nav">
            <button
              className="quiz-btn-outline"
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion(prev => prev - 1)}
            >
              Previous
            </button>
            {currentQuestion === totalQuestions - 1 ? (
              <button className="quiz-btn" onClick={handleSubmitQuiz}>
                Submit Quiz
              </button>
            ) : (
              <button className="quiz-btn" onClick={() => setCurrentQuestion(prev => prev + 1)}>
                Next
              </button>
            )}
          </div>

          <div className="question-progress">
            {questions.map((_, idx) => (
              <div
                key={idx}
                className={`progress-dot ${answers[questions[idx].questionId] ? 'answered' : ''}`}
                onClick={() => setCurrentQuestion(idx)}
              >
                {idx + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuizAttempt;