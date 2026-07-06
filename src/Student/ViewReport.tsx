// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   LinearProgress,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Chip,
//   Avatar,
//   Button,
// } from '@mui/material';
// import {
//   TrendingUp,
//   Assignment,
//   EmojiEvents,
//   AccessTime,
//   Psychology,
//   ArrowBack,
// } from '@mui/icons-material';
// import Layout from '../common/component/layout';
// import StudentSidebar from './components/Sidebar';

// // ===== HARDCODED DATA (unchanged) =====
// const summaryStats = [
//   { title: 'Total Quizzes', value: '24', icon: <Assignment sx={{ color: '#7C3AED' }} />, bgColor: '#F5F3FF' },
//   { title: 'Average Score', value: '78%', icon: <TrendingUp sx={{ color: '#10B981' }} />, bgColor: '#ECFDF5' },
//   { title: 'Best Score', value: '92%', icon: <EmojiEvents sx={{ color: '#F59E0B' }} />, bgColor: '#FFFBEB' },
//   { title: 'Total Time', value: '4.5h', icon: <AccessTime sx={{ color: '#3B82F6' }} />, bgColor: '#EFF6FF' },
// ];

// const subjectPerformance = [
//   { name: 'Mathematics', progress: 85, score: 85, color: '#7C3AED' },
//   { name: 'Physics', progress: 70, score: 72, color: '#8B5CF6' },
//   { name: 'Chemistry', progress: 90, score: 90, color: '#10B981' },
//   { name: 'Biology', progress: 60, score: 65, color: '#F59E0B' },
//   { name: 'English', progress: 75, score: 78, color: '#3B82F6' },
// ];

// const quizHistory = [
//   { id: 1, date: '2024-01-15', subject: 'Mathematics', lesson: 'Algebra', score: 85, status: 'Passed' },
//   { id: 2, date: '2024-01-14', subject: 'Physics', lesson: 'Mechanics', score: 72, status: 'Passed' },
//   { id: 3, date: '2024-01-13', subject: 'Chemistry', lesson: 'Organic Chemistry', score: 90, status: 'Passed' },
//   { id: 4, date: '2024-01-12', subject: 'Biology', lesson: 'Cell Biology', score: 65, status: 'Failed' },
//   { id: 5, date: '2024-01-11', subject: 'Mathematics', lesson: 'Geometry', score: 78, status: 'Passed' },
//   { id: 6, date: '2024-01-10', subject: 'English', lesson: 'Grammar', score: 80, status: 'Passed' },
// ];

// const strengths = ['Algebra', 'Chemistry Reactions', 'Reading Comprehension'];
// const weaknesses = ['Mechanics', 'Cell Biology', 'Geometry'];

// const aiInsights = {
//   summary: 'You are performing well in Mathematics and Chemistry. Focus on Mechanics and Cell Biology.',
//   nextSteps: 'Complete Geometry module and practice mechanics problems.',
// };

// const ViewReport: React.FC = () => {
//   const navigate = useNavigate();

//   return (
//     <Layout title="Reports" sidebar={<StudentSidebar />}>
//       {/* rest of the component unchanged – same JSX */}
//       <Box sx={{ mb: 4 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
//           <Typography variant="h4" sx={{ fontWeight: 700, color: '#1A202C' }}>
//             📊 Performance Reports
//           </Typography>
//           <Button
//             startIcon={<ArrowBack />}
//             onClick={() => navigate('/student/dashboard')}
//             sx={{ color: '#7C3AED' }}
//           >
//             Back to Dashboard
//           </Button>
//         </Box>
//         <Typography variant="body1" sx={{ color: '#475569', mt: 1 }}>
//           Detailed analysis of your quiz performance and learning progress.
//         </Typography>
//       </Box>

//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         {summaryStats.map((stat, index) => (
//           <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
//             <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
//               <CardContent>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <Box>
//                     <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 500 }}>
//                       {stat.title}
//                     </Typography>
//                     <Typography variant="h4" sx={{ fontWeight: 700, color: '#1A202C', mt: 1 }}>
//                       {stat.value}
//                     </Typography>
//                   </Box>
//                   <Avatar sx={{ bgcolor: stat.bgColor, width: 48, height: 48, borderRadius: 2 }}>
//                     {stat.icon}
//                   </Avatar>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)', mb: 4 }}>
//         <CardContent>
//           <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A202C' }} gutterBottom>
//             Subject Performance
//           </Typography>
//           <Grid container spacing={2}>
//             {subjectPerformance.map((subject, index) => (
//               <Grid key={index} size={{ xs: 12, md: 6 }}>
//                 <Box sx={{ mb: 2 }}>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
//                     <Typography variant="body2" sx={{ fontWeight: 600, color: '#1A202C' }}>
//                       {subject.name}
//                     </Typography>
//                     <Typography variant="body2" sx={{ fontWeight: 700, color: subject.color }}>
//                       {subject.score}%
//                     </Typography>
//                   </Box>
//                   <LinearProgress
//                     variant="determinate"
//                     value={subject.progress}
//                     sx={{
//                       height: 8,
//                       borderRadius: 4,
//                       bgcolor: '#F5F3FF',
//                       '& .MuiLinearProgress-bar': {
//                         borderRadius: 4,
//                         background: `linear-gradient(90deg, ${subject.color}, ${subject.color}dd)`,
//                       },
//                     }}
//                   />
//                 </Box>
//               </Grid>
//             ))}
//           </Grid>
//         </CardContent>
//       </Card>

//       <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)', mb: 4 }}>
//         <CardContent>
//           <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A202C' }} gutterBottom>
//             Quiz History
//           </Typography>
//           <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ bgcolor: '#F5F3FF' }}>
//                   <TableCell>Date</TableCell>
//                   <TableCell>Subject</TableCell>
//                   <TableCell>Lesson</TableCell>
//                   <TableCell align="center">Score</TableCell>
//                   <TableCell align="center">Status</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {quizHistory.map((row) => (
//                   <TableRow key={row.id} hover>
//                     <TableCell>{row.date}</TableCell>
//                     <TableCell>{row.subject}</TableCell>
//                     <TableCell>{row.lesson}</TableCell>
//                     <TableCell align="center">
//                       <Typography
//                         variant="body2"
//                         sx={{ fontWeight: 700, color: row.score >= 70 ? '#10B981' : '#EF4444' }}
//                       >
//                         {row.score}%
//                       </Typography>
//                     </TableCell>
//                     <TableCell align="center">
//                       <Chip
//                         label={row.status}
//                         size="small"
//                         sx={{
//                           bgcolor: row.status === 'Passed' ? '#ECFDF5' : '#FEF2F2',
//                           color: row.status === 'Passed' ? '#10B981' : '#EF4444',
//                         }}
//                       />
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </CardContent>
//       </Card>

//       <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
//         <CardContent>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
//             <Psychology sx={{ color: '#7C3AED' }} />
//             <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A202C' }}>
//               AI Learning Insights
//             </Typography>
//           </Box>
//           <Typography variant="body1" sx={{ color: '#475569', mb: 2 }}>
//             {aiInsights.summary}
//           </Typography>
//           <Typography variant="body2" sx={{ color: '#7C3AED', fontWeight: 500 }}>
//             📌 Recommended next steps: {aiInsights.nextSteps}
//           </Typography>
//           <Box sx={{ mt: 2 }}>
//             <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#10B981' }}>
//               Strengths
//             </Typography>
//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
//               {strengths.map((item) => (
//                 <Chip key={item} label={item} sx={{ bgcolor: '#ECFDF5', color: '#10B981' }} />
//               ))}
//             </Box>
//             <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#EF4444' }}>
//               Areas to Improve
//             </Typography>
//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//               {weaknesses.map((item) => (
//                 <Chip key={item} label={item} sx={{ bgcolor: '#FEF2F2', color: '#EF4444' }} />
//               ))}
//             </Box>
//           </Box>
//         </CardContent>
//       </Card>
//     </Layout>
//   );
// };

// export default ViewReport;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   LinearProgress,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Chip,
//   Avatar,
//   Button,
//   CircularProgress,
//   Alert,
// } from '@mui/material';
// import {
//   TrendingUp,
//   Assignment,
//   EmojiEvents,
//   AccessTime,
//   Psychology,
//   ArrowBack,
//   School,
// } from '@mui/icons-material'; // ✅ Removed TrendingDown
// import Layout from '../common/component/layout';
// import StudentSidebar from './components/Sidebar';
// import API from '../common/services/api';

// // ===== INTERFACES =====
// interface QuizHistoryItem {
//   _id: string;
//   quizId: number;
//   subject: string;
//   lesson: string;
//   score: number;
//   totalQuestions: number;
//   percentage: number;
//   status: 'Passed' | 'Failed';
//   createdAt: string;
// }

// interface SubjectPerformance {
//   subjectId: number;
//   name: string;
//   averageScore: number;
//   totalQuizzes: number;
//   bestScore: number;
//   progress: number; // percentage of mastery
// }

// interface SummaryStats {
//   totalQuizzes: number;
//   averageScore: number;
//   bestScore: number;
//   totalTimeSpent: number; // in minutes
//   totalQuestionsAnswered: number;
//   passRate: number;
// }

// interface AIInsights {
//   summary: string;
//   nextSteps: string;
//   strengths: string[];
//   weaknesses: string[];
//   recommendedLessons: string[];
// }

// interface ReportData {
//   summary: SummaryStats;
//   subjectPerformance: SubjectPerformance[];
//   quizHistory: QuizHistoryItem[];
//   aiInsights: AIInsights;
// }

// const ViewReport: React.FC = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [reportData, setReportData] = useState<ReportData | null>(null);

//   useEffect(() => {
//     fetchReportData();
//   }, []);

// const fetchReportData = async () => {
//   try {
//     setLoading(true);
//     setError(null);

//     // Fetch all report data in parallel
//     const [summaryRes, subjectsRes, historyRes, insightsRes] = await Promise.all([
//       API.get('/reports/summary'),
//       API.get('/reports/subject-performance'),
//       API.get('/reports/quiz-history'),
//       API.get('/reports/ai-insights'),
//     ]);

//     console.log('Summary:', summaryRes.data);
//     console.log('Subjects:', subjectsRes.data);
//     console.log('History:', historyRes.data);
//     console.log('Insights:', insightsRes.data);

//     setReportData({
//       summary: summaryRes.data,
//       subjectPerformance: subjectsRes.data,
//       quizHistory: historyRes.data,
//       aiInsights: insightsRes.data,
//     });
//   } catch (err: any) {
//     console.error('Error fetching report data:', err);
//     console.error('Response data:', err.response?.data);
//     console.error('Status code:', err.response?.status);
//     setError(err.response?.data?.message || 'Failed to load report data. Please try again.');
//   } finally {
//     setLoading(false);
//   }
// };

//   // Format time
//   const formatTime = (minutes: number) => {
//     if (minutes < 60) return `${minutes}m`;
//     const hours = Math.floor(minutes / 60);
//     const mins = minutes % 60;
//     return `${hours}h ${mins}m`;
//   };

//   if (loading) {
//     return (
//       <Layout title="Reports" sidebar={<StudentSidebar />}>
//         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
//           <CircularProgress sx={{ color: '#7C3AED' }} />
//           <Typography sx={{ mt: 2, color: '#64748B' }}>Loading your reports...</Typography>
//         </Box>
//       </Layout>
//     );
//   }

//   if (error) {
//     return (
//       <Layout title="Reports" sidebar={<StudentSidebar />}>
//         <Alert severity="error" sx={{ mb: 2 }}>
//           {error}
//         </Alert>
//         <Button variant="contained" onClick={fetchReportData} sx={{ bgcolor: '#7C3AED' }}>
//           Retry
//         </Button>
//       </Layout>
//     );
//   }

//   if (!reportData) {
//     return (
//       <Layout title="Reports" sidebar={<StudentSidebar />}>
//         <Alert severity="info">No report data available. Take some quizzes to see your progress!</Alert>
//       </Layout>
//     );
//   }

//   const { summary, subjectPerformance, quizHistory, aiInsights } = reportData;

//   // Calculate summary stats for display
//   const summaryStats = [
//     { 
//       title: 'Total Quizzes', 
//       value: summary.totalQuizzes.toString(), 
//       icon: <Assignment sx={{ color: '#7C3AED' }} />, 
//       bgColor: '#F5F3FF' 
//     },
//     { 
//       title: 'Average Score', 
//       value: `${Math.round(summary.averageScore)}%`, 
//       icon: <TrendingUp sx={{ color: '#10B981' }} />, 
//       bgColor: '#ECFDF5' 
//     },
//     { 
//       title: 'Best Score', 
//       value: `${Math.round(summary.bestScore)}%`, 
//       icon: <EmojiEvents sx={{ color: '#F59E0B' }} />, 
//       bgColor: '#FFFBEB' 
//     },
//     { 
//       title: 'Total Time', 
//       value: formatTime(summary.totalTimeSpent), 
//       icon: <AccessTime sx={{ color: '#3B82F6' }} />, 
//       bgColor: '#EFF6FF' 
//     },
//   ];

//   return (
//     <Layout title="Reports" sidebar={<StudentSidebar />}>
//       {/* Header */}
//       <Box sx={{ mb: 4 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
//           <Typography variant="h4" sx={{ fontWeight: 700, color: '#1A202C' }}>
//             📊 Performance Reports
//           </Typography>
//           <Button
//             startIcon={<ArrowBack />}
//             onClick={() => navigate('/student/dashboard')}
//             sx={{ color: '#7C3AED' }}
//           >
//             Back to Dashboard
//           </Button>
//         </Box>
//         <Typography variant="body1" sx={{ color: '#475569', mt: 1 }}>
//           Detailed analysis of your quiz performance and learning progress.
//         </Typography>
//       </Box>

//       {/* Summary Stats */}
//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         {summaryStats.map((stat, index) => (
//           <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
//             <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
//               <CardContent>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <Box>
//                     <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 500 }}>
//                       {stat.title}
//                     </Typography>
//                     <Typography variant="h4" sx={{ fontWeight: 700, color: '#1A202C', mt: 1 }}>
//                       {stat.value}
//                     </Typography>
//                   </Box>
//                   <Avatar sx={{ bgcolor: stat.bgColor, width: 48, height: 48, borderRadius: 2 }}>
//                     {stat.icon}
//                   </Avatar>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Subject Performance */}
//       <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)', mb: 4 }}>
//         <CardContent>
//           <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A202C' }} gutterBottom>
//             Subject Performance
//           </Typography>
//           {subjectPerformance.length === 0 ? (
//             <Typography color="text.secondary">No subject data available yet.</Typography>
//           ) : (
//             <Grid container spacing={2}>
//               {subjectPerformance.map((subject, index) => (
//                 <Grid key={index} size={{ xs: 12, md: 6 }}>
//                   <Box sx={{ mb: 2 }}>
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
//                       <Box>
//                         <Typography variant="body2" sx={{ fontWeight: 600, color: '#1A202C' }}>
//                           {subject.name}
//                         </Typography>
//                         <Typography variant="caption" color="text.secondary">
//                           {subject.totalQuizzes} quizzes taken
//                         </Typography>
//                       </Box>
//                       <Box sx={{ textAlign: 'right' }}>
//                         <Typography variant="body2" sx={{ fontWeight: 700, color: '#7C3AED' }}>
//                           {Math.round(subject.averageScore)}%
//                         </Typography>
//                         <Typography variant="caption" color="text.secondary">
//                           Best: {Math.round(subject.bestScore)}%
//                         </Typography>
//                       </Box>
//                     </Box>
//                     <LinearProgress
//                       variant="determinate"
//                       value={subject.progress}
//                       sx={{
//                         height: 8,
//                         borderRadius: 4,
//                         bgcolor: '#F5F3FF',
//                         '& .MuiLinearProgress-bar': {
//                           borderRadius: 4,
//                           background: subject.progress >= 70 
//                             ? 'linear-gradient(90deg, #7C3AED, #8B5CF6)' 
//                             : 'linear-gradient(90deg, #F59E0B, #F97316)',
//                         },
//                       }}
//                     />
//                   </Box>
//                 </Grid>
//               ))}
//             </Grid>
//           )}
//         </CardContent>
//       </Card>

//       {/* Quiz History */}
//       <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)', mb: 4 }}>
//         <CardContent>
//           <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A202C' }} gutterBottom>
//             Quiz History
//           </Typography>
//           {quizHistory.length === 0 ? (
//             <Typography color="text.secondary">No quizzes taken yet.</Typography>
//           ) : (
//             <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
//               <Table>
//                 <TableHead>
//                   <TableRow sx={{ bgcolor: '#F5F3FF' }}>
//                     <TableCell>Date</TableCell>
//                     <TableCell>Subject</TableCell>
//                     <TableCell>Lesson</TableCell>
//                     <TableCell align="center">Score</TableCell>
//                     <TableCell align="center">Status</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {quizHistory.map((row) => (
//                     <TableRow key={row._id} hover>
//                       <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
//                       <TableCell>{row.subject}</TableCell>
//                       <TableCell>{row.lesson}</TableCell>
//                       <TableCell align="center">
//                         <Typography
//                           variant="body2"
//                           sx={{ fontWeight: 700, color: row.status === 'Passed' ? '#10B981' : '#EF4444' }}
//                         >
//                           {Math.round(row.percentage)}%
//                         </Typography>
//                       </TableCell>
//                       <TableCell align="center">
//                         <Chip
//                           label={row.status}
//                           size="small"
//                           sx={{
//                             bgcolor: row.status === 'Passed' ? '#ECFDF5' : '#FEF2F2',
//                             color: row.status === 'Passed' ? '#10B981' : '#EF4444',
//                           }}
//                         />
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}
//         </CardContent>
//       </Card>

//       {/* AI Insights */}
//       <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
//         <CardContent>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
//             <Psychology sx={{ color: '#7C3AED' }} />
//             <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A202C' }}>
//               AI Learning Insights
//             </Typography>
//           </Box>
          
//           <Typography variant="body1" sx={{ color: '#475569', mb: 2 }}>
//             {aiInsights.summary || 'Complete more quizzes to receive personalized insights.'}
//           </Typography>
          
//           {aiInsights.nextSteps && (
//             <Typography variant="body2" sx={{ color: '#7C3AED', fontWeight: 500, mb: 2 }}>
//               📌 Recommended next steps: {aiInsights.nextSteps}
//             </Typography>
//           )}

//           {(aiInsights.strengths?.length > 0 || aiInsights.weaknesses?.length > 0) && (
//             <Box sx={{ mt: 2 }}>
//               {aiInsights.strengths?.length > 0 && (
//                 <>
//                   <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#10B981' }}>
//                     Strengths
//                   </Typography>
//                   <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
//                     {aiInsights.strengths.map((item) => (
//                       <Chip key={item} label={item} sx={{ bgcolor: '#ECFDF5', color: '#10B981' }} />
//                     ))}
//                   </Box>
//                 </>
//               )}
              
//               {aiInsights.weaknesses?.length > 0 && (
//                 <>
//                   <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#EF4444' }}>
//                     Areas to Improve
//                   </Typography>
//                   <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//                     {aiInsights.weaknesses.map((item) => (
//                       <Chip key={item} label={item} sx={{ bgcolor: '#FEF2F2', color: '#EF4444' }} />
//                     ))}
//                   </Box>
//                 </>
//               )}
//             </Box>
//           )}

//           {aiInsights.recommendedLessons?.length > 0 && (
//             <Box sx={{ mt: 2 }}>
//               <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#7C3AED' }}>
//                 Recommended Lessons
//               </Typography>
//               <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//                 {aiInsights.recommendedLessons.map((item) => (
//                   <Chip 
//                     key={item} 
//                     label={item} 
//                     sx={{ bgcolor: '#F5F3FF', color: '#7C3AED' }}
//                     icon={<School sx={{ fontSize: 16 }} />}
//                   />
//                 ))}
//               </Box>
//             </Box>
//           )}
//         </CardContent>
//       </Card>
//     </Layout>
//   );
// };

// export default ViewReport;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  TrendingUp,
  Assignment,
  EmojiEvents,
  AccessTime,
  Psychology,
  ArrowBack,
  School,
  Grade as GradeIcon,
} from '@mui/icons-material';
import Layout from '../common/component/layout';
import StudentSidebar from './components/Sidebar';
import API from '../common/services/api';

// ===== INTERFACES =====
interface QuizHistoryItem {
  _id: string;
  quizId: number;
  grade: number;
  subject: string;
  lesson: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  status: 'Passed' | 'Failed';
  createdAt: string;
}

interface SubjectPerformance {
  subjectId: number;
  name: string;
  gradeId: number;
  averageScore: number;
  totalQuizzes: number;
  bestScore: number;
  progress: number;
}

interface GradePerformance {
  gradeId: number;
  gradeLevel: number;
  subjects: SubjectPerformance[];
  averageScore: number;
}

interface SummaryStats {
  totalQuizzes: number;
  averageScore: number;
  bestScore: number;
  totalTimeSpent: number;
  totalQuestionsAnswered: number;
  passRate: number;
  gradesStudied: { gradeId: number; level: number }[];
}

interface AIInsights {
  summary: string;
  nextSteps: string;
  strengths: string[];
  weaknesses: string[];
  recommendedLessons: string[];
  gradeRecommendations: string[];
}

interface ReportData {
  summary: SummaryStats;
  subjectPerformance: GradePerformance[];
  quizHistory: QuizHistoryItem[];
  aiInsights: AIInsights;
}

// Default/Empty data for initial state
const defaultSummary: SummaryStats = {
  totalQuizzes: 0,
  averageScore: 0,
  bestScore: 0,
  totalTimeSpent: 0,
  totalQuestionsAnswered: 0,
  passRate: 0,
  gradesStudied: [],
};

const defaultAIInsights: AIInsights = {
  summary: 'Complete more quizzes to receive personalized insights.',
  nextSteps: 'Start taking quizzes to get recommendations.',
  strengths: [],
  weaknesses: [],
  recommendedLessons: [],
  gradeRecommendations: [],
};

const ViewReport: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reportData, setReportData] = useState<ReportData | null>(null);

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all report data in parallel
      const [summaryRes, subjectsRes, historyRes, insightsRes] = await Promise.all([
        API.get('/reports/summary'),
        API.get('/reports/subject-performance'),
        API.get('/reports/quiz-history'),
        API.get('/reports/ai-insights'),
      ]);

      console.log('📊 Summary:', summaryRes.data);
      console.log('📚 Subjects by Grade:', subjectsRes.data);
      console.log('📝 History:', historyRes.data);
      console.log('🤖 Insights:', insightsRes.data);

      // Ensure we have valid data with fallbacks
      setReportData({
        summary: summaryRes.data || defaultSummary,
        subjectPerformance: Array.isArray(subjectsRes.data) ? subjectsRes.data : [],
        quizHistory: Array.isArray(historyRes.data) ? historyRes.data : [],
        aiInsights: insightsRes.data || defaultAIInsights,
      });
    } catch (err: any) {
      console.error('❌ Error fetching report data:', err);
      console.error('📦 Response data:', err.response?.data);
      console.error('📦 Status code:', err.response?.status);
      setError(err.response?.data?.message || 'Failed to load report data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Format time
  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (loading) {
    return (
      <Layout title="Reports" sidebar={<StudentSidebar />}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
          <CircularProgress sx={{ color: '#7C3AED' }} />
          <Typography sx={{ mt: 2, color: '#64748B' }}>Loading your reports...</Typography>
        </Box>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Reports" sidebar={<StudentSidebar />}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={fetchReportData} sx={{ bgcolor: '#7C3AED' }}>
          Retry
        </Button>
      </Layout>
    );
  }

  if (!reportData) {
    return (
      <Layout title="Reports" sidebar={<StudentSidebar />}>
        <Alert severity="info">No report data available. Take some quizzes to see your progress!</Alert>
      </Layout>
    );
  }

  // Safe destructuring with fallbacks
  const summary = reportData.summary || defaultSummary;
  const subjectPerformance = Array.isArray(reportData.subjectPerformance) ? reportData.subjectPerformance : [];
  const quizHistory = Array.isArray(reportData.quizHistory) ? reportData.quizHistory : [];
  const aiInsights = reportData.aiInsights || defaultAIInsights;

  // Calculate summary stats for display
  const summaryStats = [
    { 
      title: 'Total Quizzes', 
      value: summary.totalQuizzes?.toString() || '0', 
      icon: <Assignment sx={{ color: '#7C3AED' }} />, 
      bgColor: '#F5F3FF' 
    },
    { 
      title: 'Average Score', 
      value: `${Math.round(summary.averageScore || 0)}%`, 
      icon: <TrendingUp sx={{ color: '#10B981' }} />, 
      bgColor: '#ECFDF5' 
    },
    { 
      title: 'Best Score', 
      value: `${Math.round(summary.bestScore || 0)}%`, 
      icon: <EmojiEvents sx={{ color: '#F59E0B' }} />, 
      bgColor: '#FFFBEB' 
    },
    { 
      title: 'Total Time', 
      value: formatTime(summary.totalTimeSpent || 0), 
      icon: <AccessTime sx={{ color: '#3B82F6' }} />, 
      bgColor: '#EFF6FF' 
    },
  ];

  return (
    <Layout title="Reports" sidebar={<StudentSidebar />}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1A202C' }}>
            📊 Performance Reports
          </Typography>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/student/dashboard')}
            sx={{ color: '#7C3AED' }}
          >
            Back to Dashboard
          </Button>
        </Box>
        <Typography variant="body1" sx={{ color: '#475569', mt: 1 }}>
          Detailed analysis of your quiz performance across all grades.
        </Typography>
        
        {/* Show grades studied */}
        {summary.gradesStudied && summary.gradesStudied.length > 0 && (
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#64748B' }}>
              Grades studied:
            </Typography>
            {summary.gradesStudied.map((g) => (
              <Chip
                key={g.gradeId}
                label={`Grade ${g.level}`}
                size="small"
                sx={{ bgcolor: '#F5F3FF', color: '#7C3AED' }}
              />
            ))}
          </Box>
        )}
      </Box>

      {/* Summary Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {summaryStats.map((stat, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 500 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#1A202C', mt: 1 }}>
                      {stat.value}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: stat.bgColor, width: 48, height: 48, borderRadius: 2 }}>
                    {stat.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Subject Performance by Grade */}
      <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A202C', mb: 2 }}>
        Subject Performance by Grade
      </Typography>
      
      {!subjectPerformance || subjectPerformance.length === 0 ? (
        <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)', mb: 4 }}>
          <CardContent>
            <Typography color="text.secondary">No subject data available yet. Take some quizzes!</Typography>
          </CardContent>
        </Card>
      ) : (
        subjectPerformance.map((gradeData) => (
          <Card key={gradeData.gradeId} sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)', mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <GradeIcon sx={{ color: '#7C3AED' }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1A202C' }}>
                  Grade {gradeData.gradeLevel}
                </Typography>
                <Chip
                  label={`Avg: ${Math.round(gradeData.averageScore || 0)}%`}
                  size="small"
                  sx={{ 
                    bgcolor: (gradeData.averageScore || 0) >= 70 ? '#ECFDF5' : '#FEF2F2',
                    color: (gradeData.averageScore || 0) >= 70 ? '#10B981' : '#EF4444',
                  }}
                />
              </Box>
              <Grid container spacing={2}>
                {gradeData.subjects && gradeData.subjects.length > 0 ? (
                  gradeData.subjects.map((subject) => (
                    <Grid key={subject.subjectId} size={{ xs: 12, md: 6 }}>
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#1A202C' }}>
                              {subject.name || 'Unknown Subject'}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {subject.totalQuizzes || 0} quizzes
                            </Typography>
                          </Box>
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="body2" sx={{ fontWeight: 700, color: '#7C3AED' }}>
                              {Math.round(subject.averageScore || 0)}%
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Best: {Math.round(subject.bestScore || 0)}%
                            </Typography>
                          </Box>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={subject.progress || 0}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: '#F5F3FF',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 4,
                              background: (subject.progress || 0) >= 70 
                                ? 'linear-gradient(90deg, #7C3AED, #8B5CF6)' 
                                : 'linear-gradient(90deg, #F59E0B, #F97316)',
                            },
                          }}
                        />
                      </Box>
                    </Grid>
                  ))
                ) : (
                  <Typography color="text.secondary" sx={{ p: 2 }}>
                    No subjects available for this grade yet.
                  </Typography>
                )}
              </Grid>
            </CardContent>
          </Card>
        ))
      )}

      {/* Quiz History */}
      <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)', mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A202C' }} gutterBottom>
            Recent Quiz History
          </Typography>
          {!quizHistory || quizHistory.length === 0 ? (
            <Typography color="text.secondary">No quizzes taken yet.</Typography>
          ) : (
            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#F5F3FF' }}>
                    <TableCell>Date</TableCell>
                    <TableCell>Grade</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Lesson</TableCell>
                    <TableCell align="center">Score</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {quizHistory.map((row) => (
                    <TableRow key={row._id} hover>
                      <TableCell>{row.createdAt ? new Date(row.createdAt).toLocaleDateString() : 'N/A'}</TableCell>
                      <TableCell>Grade {row.grade || 'N/A'}</TableCell>
                      <TableCell>{row.subject || 'Unknown'}</TableCell>
                      <TableCell>{row.lesson || 'Unknown'}</TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 700, color: row.status === 'Passed' ? '#10B981' : '#EF4444' }}
                        >
                          {Math.round(row.percentage || 0)}%
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={row.status || 'Unknown'}
                          size="small"
                          sx={{
                            bgcolor: row.status === 'Passed' ? '#ECFDF5' : '#FEF2F2',
                            color: row.status === 'Passed' ? '#10B981' : '#EF4444',
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Psychology sx={{ color: '#7C3AED' }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A202C' }}>
              AI Learning Insights
            </Typography>
          </Box>
          
          <Typography variant="body1" sx={{ color: '#475569', mb: 2 }}>
            {aiInsights.summary || 'Complete more quizzes to receive personalized insights.'}
          </Typography>
          
          {aiInsights.nextSteps && (
            <Typography variant="body2" sx={{ color: '#7C3AED', fontWeight: 500, mb: 2 }}>
              📌 {aiInsights.nextSteps}
            </Typography>
          )}

          {aiInsights.gradeRecommendations && aiInsights.gradeRecommendations.length > 0 && (
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#7C3AED' }}>
                🎯 Ready for Next Grade
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {aiInsights.gradeRecommendations.map((item) => (
                  <Chip 
                    key={item} 
                    label={item} 
                    sx={{ bgcolor: '#F5F3FF', color: '#7C3AED' }}
                    icon={<School sx={{ fontSize: 16 }} />}
                  />
                ))}
              </Box>
            </Box>
          )}

          {(aiInsights.strengths && aiInsights.strengths.length > 0 || 
            aiInsights.weaknesses && aiInsights.weaknesses.length > 0) && (
            <Box sx={{ mt: 2 }}>
              {aiInsights.strengths && aiInsights.strengths.length > 0 && (
                <>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#10B981' }}>
                    Strengths
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {aiInsights.strengths.map((item) => (
                      <Chip key={item} label={item} sx={{ bgcolor: '#ECFDF5', color: '#10B981' }} />
                    ))}
                  </Box>
                </>
              )}
              
              {aiInsights.weaknesses && aiInsights.weaknesses.length > 0 && (
                <>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#EF4444' }}>
                    Areas to Improve
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {aiInsights.weaknesses.map((item) => (
                      <Chip key={item} label={item} sx={{ bgcolor: '#FEF2F2', color: '#EF4444' }} />
                    ))}
                  </Box>
                </>
              )}
            </Box>
          )}

          {aiInsights.recommendedLessons && aiInsights.recommendedLessons.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#7C3AED' }}>
                Recommended Lessons
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {aiInsights.recommendedLessons.map((item) => (
                  <Chip 
                    key={item} 
                    label={item} 
                    sx={{ bgcolor: '#F5F3FF', color: '#7C3AED' }}
                    icon={<School sx={{ fontSize: 16 }} />}
                  />
                ))}
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Layout>
  );
};

export default ViewReport;