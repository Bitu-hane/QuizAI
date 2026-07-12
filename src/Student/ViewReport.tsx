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


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Chip,
//   LinearProgress,
//   Alert,
//   CircularProgress,
// } from '@mui/material';
// import {
//   TrendingUp,
//   Assignment,
//   EmojiEvents,
//   AccessTime,
//   Grade as GradeIcon,
// } from '@mui/icons-material';
// import Layout from '../common/component/layout';
// import StudentSidebar from './components/Sidebar';
// import API from '../common/services/api';
// import './ViewReport.css';

// // ===== INTERFACES (unchanged) =====
// interface QuizHistoryItem {
//   _id: string;
//   quizId: number;
//   grade: number;
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
//   gradeId: number;
//   averageScore: number;
//   totalQuizzes: number;
//   bestScore: number;
//   progress: number;
// }

// interface GradePerformance {
//   gradeId: number;
//   gradeLevel: number;
//   subjects: SubjectPerformance[];
//   averageScore: number;
// }

// interface SummaryStats {
//   totalQuizzes: number;
//   averageScore: number;
//   bestScore: number;
//   totalTimeSpent: number;
//   totalQuestionsAnswered: number;
//   passRate: number;
//   gradesStudied: { gradeId: number; level: number }[];
// }

// interface AIInsights {
//   summary: string;
//   nextSteps: string;
//   strengths: string[];
//   weaknesses: string[];
//   recommendedLessons: string[];
//   gradeRecommendations: string[];
// }

// interface ReportData {
//   summary: SummaryStats;
//   subjectPerformance: GradePerformance[];
//   quizHistory: QuizHistoryItem[];
//   aiInsights: AIInsights;
// }

// const defaultSummary: SummaryStats = {
//   totalQuizzes: 0,
//   averageScore: 0,
//   bestScore: 0,
//   totalTimeSpent: 0,
//   totalQuestionsAnswered: 0,
//   passRate: 0,
//   gradesStudied: [],
// };

// const defaultAIInsights: AIInsights = {
//   summary: 'Complete more quizzes to receive personalized insights.',
//   nextSteps: 'Start taking quizzes to get recommendations.',
//   strengths: [],
//   weaknesses: [],
//   recommendedLessons: [],
//   gradeRecommendations: [],
// };

// const ViewReport: React.FC = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [reportData, setReportData] = useState<ReportData | null>(null);

//   useEffect(() => {
//     fetchReportData();
//   }, []);

//   const fetchReportData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const [summaryRes, subjectsRes, historyRes, insightsRes] = await Promise.all([
//         API.get('/reports/summary'),
//         API.get('/reports/subject-performance'),
//         API.get('/reports/quiz-history'),
//         API.get('/reports/ai-insights'),
//       ]);
//       setReportData({
//         summary: summaryRes.data || defaultSummary,
//         subjectPerformance: Array.isArray(subjectsRes.data) ? subjectsRes.data : [],
//         quizHistory: Array.isArray(historyRes.data) ? historyRes.data : [],
//         aiInsights: insightsRes.data || defaultAIInsights,
//       });
//     } catch (err: any) {
//       console.error('Error fetching report data:', err);
//       setError(err.response?.data?.message || 'Failed to load report data.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatTime = (minutes: number) => {
//     if (minutes < 60) return `${minutes}m`;
//     const hours = Math.floor(minutes / 60);
//     const mins = minutes % 60;
//     return `${hours}h ${mins}m`;
//   };

//   // ----- Loading / Error -----
//   if (loading) {
//     return (
//       <Layout title="Reports" sidebar={<StudentSidebar />}>
//         <div className="report-loading">
//           <CircularProgress sx={{ color: '#7C3AED' }} />
//           <p>Loading your reports...</p>
//         </div>
//       </Layout>
//     );
//   }

//   if (error) {
//     return (
//       <Layout title="Reports" sidebar={<StudentSidebar />}>
//         <div className="report-error">
//           <Alert severity="error">{error}</Alert>
//           <button className="quiz-btn-outline" onClick={fetchReportData}>Retry</button>
//         </div>
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

//   const summary = reportData.summary || defaultSummary;
//   const subjectPerformance = Array.isArray(reportData.subjectPerformance) ? reportData.subjectPerformance : [];
//   const quizHistory = Array.isArray(reportData.quizHistory) ? reportData.quizHistory : [];
//   const aiInsights = reportData.aiInsights || defaultAIInsights;

//   // ---- stats cards ----
//   const stats = [
//     {
//       label: 'Total Quizzes',
//       value: summary.totalQuizzes?.toString() || '0',
//       icon: <Assignment sx={{ color: '#C0392B' }} />,
//       iconClass: 'ic-red',
//     },
//     {
//       label: 'Average Score',
//       value: `${Math.round(summary.averageScore || 0)}%`,
//       icon: <TrendingUp sx={{ color: '#2E7D52' }} />,
//       iconClass: 'ic-green',
//     },
//     {
//       label: 'Best Score',
//       value: `${Math.round(summary.bestScore || 0)}%`,
//       icon: <EmojiEvents sx={{ color: '#C99A2E' }} />,
//       iconClass: 'ic-gold',
//     },
//     {
//       label: 'Total Time',
//       value: formatTime(summary.totalTimeSpent || 0),
//       icon: <AccessTime sx={{ color: '#3B6EA5' }} />,
//       iconClass: 'ic-blue',
//     },
//   ];

//   return (
//     <Layout title="Reports" sidebar={<StudentSidebar />}>
//       <div className="report-content">
     
//         <div className="page-head">
//           <div className="head-left">
//             <div className="page-icon">
//               <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//                 <path d="M4 20V4M4 20H20" stroke="#C0392B" strokeWidth="1.8" strokeLinecap="round" />
//                 <rect x="7" y="13" width="2.6" height="5" fill="#C0392B" />
//                 <rect x="11.7" y="9" width="2.6" height="9" fill="#C0392B" />
//                 <rect x="16.4" y="6" width="2.6" height="12" fill="#C0392B" />
//               </svg>
//             </div>
//             <h1>Performance Reports</h1>
//           </div>
//           <a className="back-link" onClick={() => navigate('/student/dashboard')}>← BACK TO DASHBOARD</a>
//         </div>
//         <p className="sub">Detailed analysis of your quiz performance across all grades.</p>

 
//         <div className="stats">
//           {stats.map((stat, idx) => (
//             <div className="stat-card" key={idx}>
//               <div className="stat-top">
//                 <span className="stat-label">{stat.label}</span>
//                 <div className={`stat-icon ${stat.iconClass}`}>{stat.icon}</div>
//               </div>
//               <div className="stat-num">{stat.value}</div>
//             </div>
//           ))}
//         </div>


//         <h3 className="section">Subject Performance by Grade</h3>
//         {!subjectPerformance || subjectPerformance.length === 0 ? (
//           <div className="panel">
//             <div className="empty">
//               <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
//                 <path d="M4 19L4.6 15.6L15 5L19 9L8.6 19.4L4 19Z" stroke="#9AA3AE" strokeWidth="1.6" strokeLinejoin="round" />
//               </svg>
//               No subject data available yet. Take some quizzes!
//             </div>
//           </div>
//         ) : (
//           subjectPerformance.map((gradeData) => (
//             <div className="panel" key={gradeData.gradeId}>
//               <div className="grade-header">
//                 <GradeIcon sx={{ color: '#7C3AED' }} />
//                 <h4>Grade {gradeData.gradeLevel}</h4>
//                 <Chip
//                   label={`Avg: ${Math.round(gradeData.averageScore || 0)}%`}
//                   size="small"
//                   sx={{
//                     bgcolor: (gradeData.averageScore || 0) >= 70 ? '#E9F3EC' : '#FBEDEB',
//                     color: (gradeData.averageScore || 0) >= 70 ? '#2E7D52' : '#C0392B',
//                   }}
//                 />
//               </div>
//               <div className="subject-grid">
//                 {gradeData.subjects?.map((subj) => (
//                   <div className="subject-row" key={subj.subjectId}>
//                     <span>{subj.name}</span>
//                     <div className="subject-stats">
//                       <span>{Math.round(subj.averageScore || 0)}%</span>
//                       <LinearProgress
//                         variant="determinate"
//                         value={subj.progress || 0}
//                         sx={{
//                           width: 120,
//                           height: 6,
//                           borderRadius: 3,
//                           bgcolor: '#F1F1EF',
//                           '& .MuiLinearProgress-bar': {
//                             borderRadius: 3,
//                             background: (subj.progress || 0) >= 70
//                               ? 'linear-gradient(90deg, #7C3AED, #8B5CF6)'
//                               : 'linear-gradient(90deg, #F59E0B, #F97316)',
//                           },
//                         }}
//                       />
//                       <span className="best-score">Best: {Math.round(subj.bestScore || 0)}%</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))
//         )}

  
//         <h3 className="section">Recent Quiz History</h3>
//         <div className="panel">
//           {!quizHistory || quizHistory.length === 0 ? (
//             <div className="empty">
//               <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
//                 <rect x="5" y="3" width="14" height="18" rx="1.5" stroke="#9AA3AE" strokeWidth="1.6" strokeDasharray="3 3" />
//               </svg>
//               No quizzes taken yet.
//             </div>
//           ) : (
//             <div className="history-table">
//               <div className="history-head">
//                 <span>Date</span>
//                 <span>Grade</span>
//                 <span>Subject</span>
//                 <span>Lesson</span>
//                 <span style={{ textAlign: 'center' }}>Score</span>
//                 <span style={{ textAlign: 'center' }}>Status</span>
//               </div>
//               {quizHistory.map((row) => (
//                 <div className="history-row" key={row._id}>
//                   <span>{row.createdAt ? new Date(row.createdAt).toLocaleDateString() : 'N/A'}</span>
//                   <span>Grade {row.grade || 'N/A'}</span>
//                   <span>{row.subject || 'Unknown'}</span>
//                   <span>{row.lesson || 'Unknown'}</span>
//                   <span className={`score ${row.status === 'Passed' ? 'passed' : 'failed'}`}>
//                     {Math.round(row.percentage || 0)}%
//                   </span>
//                   <span className={`status ${row.status === 'Passed' ? 'passed' : 'failed'}`}>
//                     {row.status || 'Unknown'}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>


//         <div className="ai-card">
//           <div className="ai-head">
//             <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//               <path d="M9 18H15M10 21H14" stroke="#E8735F" strokeWidth="1.7" strokeLinecap="round" />
//               <path d="M12 3C8.5 3 6 5.7 6 9C6 11.5 7.3 13 8.3 14C9 14.7 9 15.3 9 16H15C15 15.3 15 14.7 15.7 14C16.7 13 18 11.5 18 9C18 5.7 15.5 3 12 3Z" stroke="#E8735F" strokeWidth="1.7" strokeLinejoin="round" />
//             </svg>
//             <h3>AI Learning Insights</h3>
//           </div>
//           <p>{aiInsights.summary}</p>
//           {aiInsights.nextSteps && (
//             <div className="pin-note">
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
//                 <path d="M12 2L14 9L21 10L16 15L17 22L12 18.5L7 22L8 15L3 10L10 9L12 2Z" stroke="#F3B7AE" strokeWidth="1.4" strokeLinejoin="round" />
//               </svg>
//               {aiInsights.nextSteps}
//             </div>
//           )}
//           {(aiInsights.strengths?.length > 0 || aiInsights.weaknesses?.length > 0) && (
//             <div className="ai-tags">
//               {aiInsights.strengths?.length > 0 && (
//                 <div>
//                   <span style={{ fontWeight: 600, color: '#2E7D52' }}>Strengths:</span>
//                   <div className="tag-group">
//                     {aiInsights.strengths.map((s) => (
//                       <Chip key={s} label={s} size="small" sx={{ bgcolor: '#E9F3EC', color: '#2E7D52' }} />
//                     ))}
//                   </div>
//                 </div>
//               )}
//               {aiInsights.weaknesses?.length > 0 && (
//                 <div>
//                   <span style={{ fontWeight: 600, color: '#C0392B' }}>Areas to Improve:</span>
//                   <div className="tag-group">
//                     {aiInsights.weaknesses.map((w) => (
//                       <Chip key={w} label={w} size="small" sx={{ bgcolor: '#FBEDEB', color: '#C0392B' }} />
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//           {aiInsights.gradeRecommendations?.length > 0 && (
//             <div className="pin-note" style={{ marginTop: '12px' }}>
//               🎯 Ready for next grade: {aiInsights.gradeRecommendations.join(', ')}
//             </div>
//           )}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default ViewReport;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Chip,
  LinearProgress,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import {
  TrendingUp,
  Assignment,
  EmojiEvents,
  AccessTime,
  Grade as GradeIcon,
  ExpandMore,
  CheckCircle,
  Cancel,
} from '@mui/icons-material';
import Layout from '../common/component/layout';
import StudentSidebar from './components/Sidebar';
import API from '../common/services/api';
import './ViewReport.css';

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

// Detailed result interface – added questionText
interface DetailedAnswer {
  questionId: number;
  selectedAnswer: string;
  isCorrect: boolean;
  explanation?: string;
  correctAnswer?: string;
  aiGenerated?: boolean;
  questionText?: string; // ✅ added
}

interface DetailedResult {
  resultId: number;
  quizTitle: string;
  subject: string;
  lesson: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  aiFeedback: string;
  recommendLesson: string;
  answers: DetailedAnswer[];
  takeTime: string;
  createdAt: string;
}

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

  // State for detailed quiz modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [selectedResult, setSelectedResult] = useState<DetailedResult | null>(null);

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [summaryRes, subjectsRes, historyRes, insightsRes] = await Promise.all([
        API.get('/reports/summary'),
        API.get('/reports/subject-performance'),
        API.get('/reports/quiz-history'),
        API.get('/reports/ai-insights'),
      ]);
      setReportData({
        summary: summaryRes.data || defaultSummary,
        subjectPerformance: Array.isArray(subjectsRes.data) ? subjectsRes.data : [],
        quizHistory: Array.isArray(historyRes.data) ? historyRes.data : [],
        aiInsights: insightsRes.data || defaultAIInsights,
      });
    } catch (err: any) {
      console.error('Error fetching report data:', err);
      setError(err.response?.data?.message || 'Failed to load report data.');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Handler to view detailed quiz
  const handleViewQuiz = async (resultId: string) => {
    setModalLoading(true);
    setModalOpen(true);
    try {
      const res = await API.get(`/results/${resultId}`);
      setSelectedResult(res.data);
    } catch (err) {
      console.error('Error fetching quiz details:', err);
      setSelectedResult(null);
    } finally {
      setModalLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedResult(null);
  };

  // ----- Loading / Error -----
  if (loading) {
    return (
      <Layout title="Reports" sidebar={<StudentSidebar />}>
        <div className="report-loading">
          <CircularProgress sx={{ color: '#7C3AED' }} />
          <p>Loading your reports...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Reports" sidebar={<StudentSidebar />}>
        <div className="report-error">
          <Alert severity="error">{error}</Alert>
          <button className="quiz-btn-outline" onClick={fetchReportData}>Retry</button>
        </div>
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

  const summary = reportData.summary || defaultSummary;
  const subjectPerformance = Array.isArray(reportData.subjectPerformance) ? reportData.subjectPerformance : [];
  const quizHistory = Array.isArray(reportData.quizHistory) ? reportData.quizHistory : [];
  const aiInsights = reportData.aiInsights || defaultAIInsights;

  // ---- stats cards ----
  const stats = [
    {
      label: 'Total Quizzes',
      value: summary.totalQuizzes?.toString() || '0',
      icon: <Assignment sx={{ color: '#C0392B' }} />,
      iconClass: 'ic-red',
    },
    {
      label: 'Average Score',
      value: `${Math.round(summary.averageScore || 0)}%`,
      icon: <TrendingUp sx={{ color: '#2E7D52' }} />,
      iconClass: 'ic-green',
    },
    {
      label: 'Best Score',
      value: `${Math.round(summary.bestScore || 0)}%`,
      icon: <EmojiEvents sx={{ color: '#C99A2E' }} />,
      iconClass: 'ic-gold',
    },
    {
      label: 'Total Time',
      value: formatTime(summary.totalTimeSpent || 0),
      icon: <AccessTime sx={{ color: '#3B6EA5' }} />,
      iconClass: 'ic-blue',
    },
  ];

  return (
    <Layout title="Reports" sidebar={<StudentSidebar />}>
      <div className="report-content">
     
        <div className="page-head">
          <div className="head-left">
            <div className="page-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M4 20V4M4 20H20" stroke="#C0392B" strokeWidth="1.8" strokeLinecap="round" />
                <rect x="7" y="13" width="2.6" height="5" fill="#C0392B" />
                <rect x="11.7" y="9" width="2.6" height="9" fill="#C0392B" />
                <rect x="16.4" y="6" width="2.6" height="12" fill="#C0392B" />
              </svg>
            </div>
            <h1>Performance Reports</h1>
          </div>
          <a className="back-link" onClick={() => navigate('/student/dashboard')}>← BACK TO DASHBOARD</a>
        </div>
        <p className="sub">Detailed analysis of your quiz performance across all grades.</p>

        <div className="stats">
          {stats.map((stat, idx) => (
            <div className="stat-card" key={idx}>
              <div className="stat-top">
                <span className="stat-label">{stat.label}</span>
                <div className={`stat-icon ${stat.iconClass}`}>{stat.icon}</div>
              </div>
              <div className="stat-num">{stat.value}</div>
            </div>
          ))}
        </div>

        <h3 className="section">Subject Performance by Grade</h3>
        {!subjectPerformance || subjectPerformance.length === 0 ? (
          <div className="panel">
            <div className="empty">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path d="M4 19L4.6 15.6L15 5L19 9L8.6 19.4L4 19Z" stroke="#9AA3AE" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
              No subject data available yet. Take some quizzes!
            </div>
          </div>
        ) : (
          subjectPerformance.map((gradeData) => (
            <div className="panel" key={gradeData.gradeId}>
              <div className="grade-header">
                <GradeIcon sx={{ color: '#7C3AED' }} />
                <h4>Grade {gradeData.gradeLevel}</h4>
                <Chip
                  label={`Avg: ${Math.round(gradeData.averageScore || 0)}%`}
                  size="small"
                  sx={{
                    bgcolor: (gradeData.averageScore || 0) >= 70 ? '#E9F3EC' : '#FBEDEB',
                    color: (gradeData.averageScore || 0) >= 70 ? '#2E7D52' : '#C0392B',
                  }}
                />
              </div>
              <div className="subject-grid">
                {gradeData.subjects?.map((subj) => (
                  <div className="subject-row" key={subj.subjectId}>
                    <span>{subj.name}</span>
                    <div className="subject-stats">
                      <span>{Math.round(subj.averageScore || 0)}%</span>
                      <LinearProgress
                        variant="determinate"
                        value={subj.progress || 0}
                        sx={{
                          width: 120,
                          height: 6,
                          borderRadius: 3,
                          bgcolor: '#F1F1EF',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 3,
                            background: (subj.progress || 0) >= 70
                              ? 'linear-gradient(90deg, #7C3AED, #8B5CF6)'
                              : 'linear-gradient(90deg, #F59E0B, #F97316)',
                          },
                        }}
                      />
                      <span className="best-score">Best: {Math.round(subj.bestScore || 0)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}

        {/* ======== RECENT QUIZ HISTORY WITH VIEW QUESTIONS ======== */}
        <h3 className="section">Recent Quiz History</h3>
        <div className="panel">
          {!quizHistory || quizHistory.length === 0 ? (
            <div className="empty">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="3" width="14" height="18" rx="1.5" stroke="#9AA3AE" strokeWidth="1.6" strokeDasharray="3 3" />
              </svg>
              No quizzes taken yet.
            </div>
          ) : (
            <div className="quiz-attempts-list">
              {quizHistory.map((row) => (
                <div className="attempt-item" key={row._id}>
                  <div className="attempt-info">
                    <div className="attempt-title">
                      <span>{row.subject}</span>
                      <span className="attempt-lesson">{row.lesson}</span>
                    </div>
                    <div className="attempt-meta">
                      <span>{new Date(row.createdAt).toLocaleDateString()}</span>
                      <span>Score: <strong className={row.status === 'Passed' ? 'passed' : 'failed'}>{row.score}/{row.totalQuestions}</strong></span>
                      <Chip label={row.status} size="small" color={row.status === 'Passed' ? 'success' : 'error'} />
                    </div>
                  </div>
                  <button className="quiz-btn" onClick={() => handleViewQuiz(row._id)}>
                    View Questions
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ======== OLD HISTORY TABLE (optional, you can keep or remove) ======== */}
        <h3 className="section">History Summary</h3>
        <div className="panel">
          <div className="history-table">
            <div className="history-head">
              <span>Date</span>
              <span>Grade</span>
              <span>Subject</span>
              <span>Lesson</span>
              <span style={{ textAlign: 'center' }}>Score</span>
              <span style={{ textAlign: 'center' }}>Status</span>
            </div>
            {quizHistory.map((row) => (
              <div className="history-row" key={row._id}>
                <span>{row.createdAt ? new Date(row.createdAt).toLocaleDateString() : 'N/A'}</span>
                <span>Grade {row.grade || 'N/A'}</span>
                <span>{row.subject || 'Unknown'}</span>
                <span>{row.lesson || 'Unknown'}</span>
                <span className={`score ${row.status === 'Passed' ? 'passed' : 'failed'}`}>
                  {Math.round(row.percentage || 0)}%
                </span>
                <span className={`status ${row.status === 'Passed' ? 'passed' : 'failed'}`}>
                  {row.status || 'Unknown'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="ai-card">
          <div className="ai-head">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M9 18H15M10 21H14" stroke="#E8735F" strokeWidth="1.7" strokeLinecap="round" />
              <path d="M12 3C8.5 3 6 5.7 6 9C6 11.5 7.3 13 8.3 14C9 14.7 9 15.3 9 16H15C15 15.3 15 14.7 15.7 14C16.7 13 18 11.5 18 9C18 5.7 15.5 3 12 3Z" stroke="#E8735F" strokeWidth="1.7" strokeLinejoin="round" />
            </svg>
            <h3>AI Learning Insights</h3>
          </div>
          <p>{aiInsights.summary}</p>
          {aiInsights.nextSteps && (
            <div className="pin-note">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L14 9L21 10L16 15L17 22L12 18.5L7 22L8 15L3 10L10 9L12 2Z" stroke="#F3B7AE" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
              {aiInsights.nextSteps}
            </div>
          )}
          {(aiInsights.strengths?.length > 0 || aiInsights.weaknesses?.length > 0) && (
            <div className="ai-tags">
              {aiInsights.strengths?.length > 0 && (
                <div>
                  <span style={{ fontWeight: 600, color: '#2E7D52' }}>Strengths:</span>
                  <div className="tag-group">
                    {aiInsights.strengths.map((s) => (
                      <Chip key={s} label={s} size="small" sx={{ bgcolor: '#E9F3EC', color: '#2E7D52' }} />
                    ))}
                  </div>
                </div>
              )}
              {aiInsights.weaknesses?.length > 0 && (
                <div>
                  <span style={{ fontWeight: 600, color: '#C0392B' }}>Areas to Improve:</span>
                  <div className="tag-group">
                    {aiInsights.weaknesses.map((w) => (
                      <Chip key={w} label={w} size="small" sx={{ bgcolor: '#FBEDEB', color: '#C0392B' }} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          {aiInsights.gradeRecommendations?.length > 0 && (
            <div className="pin-note" style={{ marginTop: '12px' }}>
              🎯 Ready for next grade: {aiInsights.gradeRecommendations.join(', ')}
            </div>
          )}
        </div>
      </div>

      {/* ===== DETAILED QUIZ MODAL ===== */}
      <Dialog open={modalOpen} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedResult ? `${selectedResult.subject} – ${selectedResult.lesson}` : 'Quiz Details'}
        </DialogTitle>
        <DialogContent dividers>
          {modalLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : selectedResult ? (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap' }}>
                <Typography variant="h6">Score: {selectedResult.score} / {selectedResult.totalQuestions} ({Math.round(selectedResult.percentage)}%)</Typography>
                <Chip label={selectedResult.percentage >= 70 ? '✅ Passed' : '❌ Needs Improvement'} color={selectedResult.percentage >= 70 ? 'success' : 'error'} />
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>AI Feedback:</strong> {selectedResult.aiFeedback}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" gutterBottom>Detailed Answers</Typography>
              {selectedResult.answers.map((ans, idx) => (
                <Accordion key={idx} sx={{ mb: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                      {ans.isCorrect ? <CheckCircle sx={{ color: '#2E7D52' }} /> : <Cancel sx={{ color: '#C0392B' }} />}
                      <Typography variant="body2" sx={{ fontWeight: 500, flex: 1 }}>
                        {ans.questionText ? `Q${idx+1}: ${ans.questionText}` : `Q${idx + 1}`}
                      </Typography>
                      <Chip label={ans.isCorrect ? 'Correct' : 'Incorrect'} size="small" color={ans.isCorrect ? 'success' : 'error'} />
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2"><strong>Your answer:</strong> {ans.selectedAnswer || 'Not answered'}</Typography>
                    {!ans.isCorrect && ans.correctAnswer && (
                      <Typography variant="body2" color="success.main"><strong>Correct answer:</strong> {ans.correctAnswer}</Typography>
                    )}
                    <Box sx={{ bgcolor: '#F5F3FF', p: 2, borderRadius: 2, mt: 1 }}>
                      <Typography variant="body2" color="text.secondary"><strong>Explanation:</strong></Typography>
                      <Typography variant="body2">{ans.explanation || 'No explanation available.'}</Typography>
                      {ans.aiGenerated && (
                        <Chip label="🤖 AI Generated" size="small" sx={{ mt: 1, bgcolor: '#EDE9FE', color: '#7C3AED' }} />
                      )}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
            </>
          ) : (
            <Alert severity="error">Failed to load quiz details.</Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default ViewReport;