


// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   LinearProgress,
//   Avatar,
//   Button,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemAvatar,
//   Divider,
//   Chip,
//   Paper,
// } from '@mui/material';
// import Grid from '@mui/material/Grid';
// import {
//   TrendingUp,
//   School,
//   Assignment,
//   EmojiEvents,
//   ArrowForward,
//   AccessTime,
//   CheckCircle,
//   Cancel,
//   Psychology,
//   Lightbulb,
//   TrendingDown,
// } from '@mui/icons-material';
// import Layout from '../common/component/layout';  
// import StudentSidebar from './components/Sidebar';
   
// // ===== MOCK DATA (unchanged) =====
// const stats = [
//   {
//     title: 'Total Quizzes',
//     value: '24',
//     icon: <Assignment sx={{ color: '#7C3AED' }} />,
//     bgColor: '#F5F3FF',
//     change: '+12%',
//     trend: 'up',
//   },
//   {
//     title: 'Average Score',
//     value: '78%',
//     icon: <TrendingUp sx={{ color: '#10B981' }} />,
//     bgColor: '#ECFDF5',
//     change: '+5%',
//     trend: 'up',
//   },
//   {
//     title: 'Subjects Passed',
//     value: '6/8',
//     icon: <School sx={{ color: '#3B82F6' }} />,
//     bgColor: '#EFF6FF',
//     change: '+2',
//     trend: 'up',
//   },
//   {
//     title: 'Study Streak',
//     value: '12',
//     icon: <EmojiEvents sx={{ color: '#F59E0B' }} />,
//     bgColor: '#FFFBEB',
//     change: '🔥 5 days',
//     trend: 'up',
//   },
// ];

// const recentQuizzes = [
//   { id: 1, subject: 'Mathematics', score: 85, date: '2024-01-15', lesson: 'Algebra', time: '15 min' },
//   { id: 2, subject: 'Physics', score: 72, date: '2024-01-14', lesson: 'Mechanics', time: '12 min' },
//   { id: 3, subject: 'Chemistry', score: 90, date: '2024-01-13', lesson: 'Organic Chemistry', time: '18 min' },
//   { id: 4, subject: 'Biology', score: 65, date: '2024-01-12', lesson: 'Cell Biology', time: '10 min' },
// ];

// const subjectPerformance = [
//   { name: 'Mathematics', progress: 85, color: '#7C3AED', trend: 'up', lastScore: 85 },
//   { name: 'Physics', progress: 70, color: '#8B5CF6', trend: 'down', lastScore: 72 },
//   { name: 'Chemistry', progress: 90, color: '#10B981', trend: 'up', lastScore: 90 },
//   { name: 'Biology', progress: 60, color: '#F59E0B', trend: 'down', lastScore: 65 },
//   { name: 'English', progress: 75, color: '#3B82F6', trend: 'up', lastScore: 78 },
// ];

// const strengths = ['Algebra', 'Chemistry Reactions', 'Reading Comprehension'];
// const weaknesses = ['Mechanics', 'Cell Biology', 'Geometry'];

// const aiRecommendations = [
//   {
//     title: 'Review Cell Biology',
//     description: 'Your score in Cell Biology was 60%. Focus on understanding cell structure and functions.',
//     priority: 'High',
//   },
//   {
//     title: 'Practice Mechanics',
//     description: 'Mechanics needs improvement. Practice Newton\'s laws and force calculations.',
//     priority: 'Medium',
//   },
//   {
//     title: 'Complete Geometry Module',
//     description: 'You haven\'t completed Geometry. Start with basic shapes and progress to theorems.',
//     priority: 'Low',
//   },
// ];

// // ===== COMPONENT =====
// const Dashboard: React.FC = () => {
//   const navigate = useNavigate();

//   return (
//     <Layout title="Dashboard" sidebar={<StudentSidebar />}>
//       {/* Welcome */}
//       <Box sx={{ mb: 4 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
//           <Box>
//             <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1A202C' }} gutterBottom>
//               Welcome back, Student! 👋
//             </Typography>
//             <Typography variant="body1" sx={{ color: '#475569' }}>
//               Here's your comprehensive learning progress overview.
//             </Typography>
//           </Box>
//           <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: { xs: 2, sm: 0 } }}>
//             <Paper
//               sx={{
//                 px: 2,
//                 py: 1,
//                 borderRadius: 2,
//                 bgcolor: '#F5F3FF',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 1,
//               }}
//             >
//               <AccessTime sx={{ color: '#7C3AED', fontSize: 20 }} />
//               <Typography variant="body2" sx={{ color: '#7C3AED', fontWeight: 500 }}>
//                 Last active: Today, 2:30 PM
//               </Typography>
//             </Paper>
//           </Box>
//         </Box>
//       </Box>

//       {/* Stats Cards */}
//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         {stats.map((stat, index) => (
//           <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
//             <Card
//               sx={{
//                 borderRadius: 3,
//                 boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
//                 transition: 'transform 0.2s ease, box-shadow 0.2s ease',
//                 '&:hover': {
//                   transform: 'translateY(-4px)',
//                   boxShadow: '0 10px 40px 0 rgb(124, 58, 237, 0.15)',
//                 },
//               }}
//             >
//               <CardContent>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//                   <Box>
//                     <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 500 }}>
//                       {stat.title}
//                     </Typography>
//                     <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1A202C', mt: 1 }}>
//                       {stat.value}
//                     </Typography>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
//                       <Typography
//                         variant="caption"
//                         sx={{
//                           color: stat.trend === 'up' ? '#10B981' : '#EF4444',
//                           fontWeight: 600,
//                         }}
//                       >
//                         {stat.change}
//                       </Typography>
//                       <Typography variant="caption" sx={{ color: '#64748B' }}>
//                         vs last month
//                       </Typography>
//                     </Box>
//                   </Box>
//                   <Avatar sx={{ bgcolor: stat.bgColor, width: 52, height: 52, borderRadius: 2 }}>
//                     {stat.icon}
//                   </Avatar>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Main Content */}
//       <Grid container spacing={3}>
//         {/* Left column */}
//         <Grid size={{ xs: 12, lg: 8 }}>
//           {/* Subject Performance */}
//           <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)', mb: 3 }}>
//             <CardContent>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//                 <Box>
//                   <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1A202C' }}>
//                     Subject Performance
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: '#64748B' }}>
//                     Track your progress across all subjects
//                   </Typography>
//                 </Box>
//                 <Button endIcon={<ArrowForward />} sx={{ color: '#7C3AED' }} onClick={() => navigate('/Student/ViewReport')}>
//                   View All
//                 </Button>
//               </Box>
//               <Grid container spacing={2}>
//                 {subjectPerformance.map((subject, index) => (
//                   <Grid key={index} size={{ xs: 12, md: 6 }}>
//                     <Box sx={{ mb: 2 }}>
//                       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                           <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: subject.color }} />
//                           <Typography variant="body2" sx={{ fontWeight: 600, color: '#1A202C' }}>
//                             {subject.name}
//                           </Typography>
//                         </Box>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                           <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#7C3AED' }}>
//                             {subject.progress}%
//                           </Typography>
//                           {subject.trend === 'up' ? (
//                             <TrendingUp sx={{ color: '#10B981', fontSize: 16 }} />
//                           ) : (
//                             <TrendingDown sx={{ color: '#EF4444', fontSize: 16 }} />
//                           )}
//                         </Box>
//                       </Box>
//                       <LinearProgress
//                         variant="determinate"
//                         value={subject.progress}
//                         sx={{
//                           height: 8,
//                           borderRadius: 4,
//                           bgcolor: '#F5F3FF',
//                           '& .MuiLinearProgress-bar': {
//                             borderRadius: 4,
//                             background: `linear-gradient(90deg, ${subject.color}, ${subject.color}dd)`,
//                           },
//                         }}
//                       />
//                     </Box>
//                   </Grid>
//                 ))}
//               </Grid>
//             </CardContent>
//           </Card>

//           {/* Recent Quizzes */}
//           <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
//             <CardContent>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                 <Box>
//                   <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1A202C' }}>
//                     Recent Quizzes
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: '#64748B' }}>
//                     Your latest quiz attempts
//                   </Typography>
//                 </Box>
//                 <Button endIcon={<ArrowForward />} sx={{ color: '#7C3AED' }} onClick={() => navigate('/student/reports')}>
//                   View All
//                 </Button>
//               </Box>
//               <List>
//                 {recentQuizzes.map((quiz, index) => (
//                   <React.Fragment key={quiz.id}>
//                     <ListItem
//                       sx={{
//                         px: 0,
//                         py: 2,
//                         '&:hover': { bgcolor: '#F5F3FF', borderRadius: 2, px: 1 },
//                       }}
//                     >
//                       <ListItemAvatar>
//                         <Avatar sx={{ bgcolor: '#F5F3FF', color: '#7C3AED' }}>
//                           <School />
//                         </Avatar>
//                       </ListItemAvatar>
//                       <ListItemText
//                         primary={
//                           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                             <Typography variant="body1" sx={{ fontWeight: 600, color: '#1A202C' }}>
//                               {quiz.subject}
//                             </Typography>
//                             <Chip
//                               label={quiz.lesson}
//                               size="small"
//                               sx={{
//                                 bgcolor: '#F5F3FF',
//                                 color: '#7C3AED',
//                                 height: 20,
//                                 '& .MuiChip-label': { fontSize: '0.65rem', px: 1 },
//                               }}
//                             />
//                           </Box>
//                         }
//               secondary={
//   <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
//     <Typography variant="caption" sx={{ color: '#64748B' }}>
//       {quiz.date}
//     </Typography>
//     <Typography variant="caption" sx={{ color: '#64748B' }}>
//       ⏱ {quiz.time}
//     </Typography>
//   </Box>
// }
//                       />
//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                         <Typography
//                           variant="h6"
//                           sx={{
//                             fontWeight: 'bold',
//                             color: quiz.score >= 70 ? '#10B981' : '#EF4444',
//                           }}
//                         >
//                           {quiz.score}%
//                         </Typography>
//                         {quiz.score >= 70 ? <CheckCircle sx={{ color: '#10B981' }} /> : <Cancel sx={{ color: '#EF4444' }} />}
//                       </Box>
//                     </ListItem>
//                     {index < recentQuizzes.length - 1 && <Divider sx={{ borderColor: '#F1F5F9' }} />}
//                   </React.Fragment>
//                 ))}
//               </List>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Right column */}
//         <Grid size={{ xs: 12, lg: 4 }}>
//           {/* Strengths & Weaknesses */}
//           <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)', mb: 3, bgcolor: '#F8FAFC' }}>
//             <CardContent>
//               <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1A202C' }} gutterBottom>
//                 Learning Analysis
//               </Typography>
//               <Box sx={{ mb: 3 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
//                   <TrendingUp sx={{ color: '#10B981' }} />
//                   <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#10B981' }}>
//                     Strengths
//                   </Typography>
//                 </Box>
//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//                   {strengths.map((item) => (
//                     <Chip
//                       key={item}
//                       label={item}
//                       sx={{ bgcolor: '#ECFDF5', color: '#10B981', fontWeight: 500 }}
//                     />
//                   ))}
//                 </Box>
//               </Box>
//               <Box>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
//                   <TrendingDown sx={{ color: '#EF4444' }} />
//                   <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#EF4444' }}>
//                     Areas to Improve
//                   </Typography>
//                 </Box>
//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//                   {weaknesses.map((item) => (
//                     <Chip
//                       key={item}
//                       label={item}
//                       sx={{ bgcolor: '#FEF2F2', color: '#EF4444', fontWeight: 500 }}
//                     />
//                   ))}
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>

//           {/* AI Recommendations */}
//           <Card
//             sx={{
//               borderRadius: 3,
//               boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
//               mb: 3,
//               background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
//               color: 'white',
//             }}
//           >
//             <CardContent>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
//                 <Psychology sx={{ color: 'white' }} />
//                 <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
//                   AI Recommendations
//                 </Typography>
//               </Box>
//               {aiRecommendations.map((rec, index) => (
//                 <Box
//                   key={index}
//                   sx={{
//                     mb: index < aiRecommendations.length - 1 ? 2 : 0,
//                     pb: index < aiRecommendations.length - 1 ? 2 : 0,
//                     borderBottom:
//                       index < aiRecommendations.length - 1 ? '1px solid rgba(255,255,255,0.15)' : 'none',
//                   }}
//                 >
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//                     <Box sx={{ flex: 1 }}>
//                       <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'white' }}>
//                         {rec.title}
//                       </Typography>
//                       <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
//                         {rec.description}
//                       </Typography>
//                     </Box>
//                     <Chip
//                       label={rec.priority}
//                       size="small"
//                       sx={{
//                         bgcolor:
//                           rec.priority === 'High'
//                             ? '#FEF2F2'
//                             : rec.priority === 'Medium'
//                             ? '#FFFBEB'
//                             : '#F5F3FF',
//                         color:
//                           rec.priority === 'High'
//                             ? '#EF4444'
//                             : rec.priority === 'Medium'
//                             ? '#F59E0B'
//                             : '#7C3AED',
//                         ml: 1,
//                         '& .MuiChip-label': { fontSize: '0.6rem', fontWeight: 600 },
//                       }}
//                     />
//                   </Box>
//                 </Box>
//               ))}
//               <Button
//                 variant="contained"
//                 fullWidth
//                 sx={{ mt: 2, bgcolor: 'white', color: '#7C3AED', '&:hover': { bgcolor: '#F5F3FF' } }}
//                 onClick={() => navigate('/student/quiz')}
//               >
//                 Start Recommended Quiz
//               </Button>
//             </CardContent>
//           </Card>

//           {/* Quick Stats */}
//           <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
//             <CardContent>
//               <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1A202C' }} gutterBottom>
//                 Quick Stats
//               </Typography>
//               <Grid container spacing={1.5}>
//                 <Grid size={{ xs: 6 }}>
//                   <Box sx={{ bgcolor: '#F5F3FF', borderRadius: 2, p: 2, textAlign: 'center' }}>
//                     <Typography variant="caption" sx={{ color: '#7C3AED', fontWeight: 500 }}>
//                       Best Score
//                     </Typography>
//                     <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#7C3AED' }}>
//                       92%
//                     </Typography>
//                   </Box>
//                 </Grid>
//                 <Grid size={{ xs: 6 }}>
//                   <Box sx={{ bgcolor: '#FEF2F2', borderRadius: 2, p: 2, textAlign: 'center' }}>
//                     <Typography variant="caption" sx={{ color: '#EF4444', fontWeight: 500 }}>
//                       To Improve
//                     </Typography>
//                     <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#EF4444' }}>
//                       12%
//                     </Typography>
//                   </Box>
//                 </Grid>
//                 <Grid size={{ xs: 6 }}>
//                   <Box sx={{ bgcolor: '#ECFDF5', borderRadius: 2, p: 2, textAlign: 'center' }}>
//                     <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 500 }}>
//                       Pass Rate
//                     </Typography>
//                     <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#10B981' }}>
//                       78%
//                     </Typography>
//                   </Box>
//                 </Grid>
//                 <Grid size={{ xs: 6 }}>
//                   <Box sx={{ bgcolor: '#FFFBEB', borderRadius: 2, p: 2, textAlign: 'center' }}>
//                     <Typography variant="caption" sx={{ color: '#F59E0B', fontWeight: 500 }}>
//                       Total Time
//                     </Typography>
//                     <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#F59E0B' }}>
//                       4.5h
//                     </Typography>
//                   </Box>
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Quick Actions */}
//       <Box sx={{ mt: 3 }}>
//         <Card
//           sx={{
//             borderRadius: 3,
//             bgcolor: '#F5F3FF',
//             border: '2px solid #E9D5FF',
//             background: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
//           }}
//         >
//           <CardContent>
//             <Grid container spacing={2} sx={{ alignItems: 'center' }}>
//               <Grid size={{ xs: 12, md: 7 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                   <Avatar sx={{ bgcolor: '#7C3AED', width: 56, height: 56 }}>
//                     <Lightbulb sx={{ color: 'white' }} />
//                   </Avatar>
//                   <Box>
//                     <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1A202C' }}>
//                       Ready to learn something new?
//                     </Typography>
//                     <Typography variant="body2" sx={{ color: '#475569' }}>
//                       Take a quiz and improve your skills. AI will recommend the best next topic.
//                     </Typography>
//                   </Box>
//                 </Box>
//               </Grid>
//               <Grid size={{ xs: 12, md: 5 }}>
//                 <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
//                   <Button
//                     variant="contained"
//                     sx={{ bgcolor: '#7C3AED', '&:hover': { bgcolor: '#6D28D9' }, px: 4, py: 1.5, borderRadius: 2 }}
//                     onClick={() => navigate('/Student/Quiz')}
//                   >
//                     Start Quiz
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     sx={{ borderColor: '#7C3AED', color: '#7C3AED', '&:hover': { borderColor: '#6D28D9', bgcolor: '#F5F3FF' }, px: 3, py: 1.5, borderRadius: 2 }}
//                     onClick={() => navigate('/student/reports')}
//                   >
//                     View Reports
//                   </Button>
//                 </Box>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>
//       </Box>
//     </Layout>
//   );
// };

// export default Dashboard;


// // import React from 'react';

// // const Dashboard: React.FC = () => {
// //   return (
// //     <div style={{ padding: '2rem', background: '#f0f0f0' }}>
// //       <h1>✅ Dashboard is rendering!</h1>
// //       <p>If you see this, the problem is in the Layout or Sidebar components.</p>
// //     </div>
// //   );
// // };

// // export default Dashboard;





// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Typography,
//   CircularProgress,
// } from '@mui/material';
// import {
//   TrendingUp,
//   School,
//   Assignment,
//   EmojiEvents,
//   TrendingDown,
// } from '@mui/icons-material';
// import Layout from '../common/component/layout'; // ✅ Import Layout
// import StudentSidebar from './components/Sidebar';
// import API from '../common/services/api';
// import './StudentDashboard.css';

// // ----- Types -----
// interface User {
//   _id: string;
//   FName: string;
//   MName: string;
//   LName: string;
//   email: string;
//   gradeId: number;
// }

// interface QuizResult {
//   _id: string;
//   resultId: number;
//   quizId: number;
//   score: number;
//   totalQuestions: number;
//   takeTime: string;
//   subject?: string;
//   lesson?: string;
// }



// // ----- Component -----
// const Dashboard: React.FC = () => {
//   const navigate = useNavigate();

//   // Data state
//   const [loading, setLoading] = useState(true);
//   const [profile, setProfile] = useState<User | null>(null);
//   const [results, setResults] = useState<QuizResult[]>([]);

//   const [stats, setStats] = useState({
//     totalQuizzes: 0,
//     averageScore: 0,
//     subjectsPassed: 0,
//     studyStreak: 0,
//   });
//   const [recentQuizzes, setRecentQuizzes] = useState<QuizResult[]>([]);
//   const [subjectPerformance, setSubjectPerformance] = useState<
//     { name: string; progress: number; color: string; trend: 'up' | 'down' }[]
//   >([]);
//   const [strengths, setStrengths] = useState<string[]>([]);
//   const [weaknesses, setWeaknesses] = useState<string[]>([]);

//   // Redirect if onboarding not completed
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     if (user && !user.onboardingCompleted) {
//       navigate('/onboarding');
//     }
//   }, []);

//   // Fetch dashboard data
//   useEffect(() => {
//    const fetchDashboardData = async () => {
//   setLoading(true);
//   try {
//     // 1. User profile
//     const userRes = await API.get('/auth/me');
//     const userData = userRes.data;
//     setProfile(userData);

//     // 2. Get overall progress summary
//     const summaryRes = await API.get('/progress/overall');
//     const summary = summaryRes.data;

//     // 3. Get subject performance (all subjects the student has studied)
//     const subjectRes = await API.get('/progress/subjects');
//     const subjectData = subjectRes.data;

//     // 4. Get recent quiz history
//     const historyRes = await API.get('/progress/history');
//     const historyData = historyRes.data;

//     // ----- Compute stats from real data -----
//     const totalQuizzes = summary.totalQuizzes || 0;
//     const avgScore = summary.averageScore || 0;
//     const subjectsPassed = subjectData.filter((s: any) => s.quizPassed > 0 && s.quizPassed / s.quizTaken >= 0.7).length;
//     const studyStreak = calculateStudyStreak(historyData);

//     // Subject performance with trends
//     const perf = await Promise.all(subjectData.map(async (s: any) => {
//       // Get subject name
//       let subjectName = `Subject ${s.subjectId}`;
//       try {
//         const subjectRes = await API.get(`/subjects/${s.subjectId}`);
//         subjectName = subjectRes.data.name || subjectName;
//       } catch (e) {
//         // Fallback
//       }
      
//       const progress = s.quizTaken > 0 ? Math.round((s.quizPassed / s.quizTaken) * 100) : 0;
//       const colors = ['#C0392B', '#3B6EA5', '#2E7D52', '#C99A2E', '#7C3AED', '#E8735F'];
//       const color = colors[(s.subjectId - 1) % colors.length];
//       const trend: 'up' | 'down' = progress >= 70 ? 'up' : 'down';
      
//       return { name: subjectName, progress, color, trend };
//     }));

//     // Strengths & Weaknesses from subject data
//     const strengths: string[] = [];
//     const weaknesses: string[] = [];
//     subjectData.forEach((s: any) => {
//       const progress = s.quizTaken > 0 ? (s.quizPassed / s.quizTaken) * 100 : 0;
//       if (progress >= 70) strengths.push(`Subject ${s.subjectId}`);
//       if (progress < 50) weaknesses.push(`Subject ${s.subjectId}`);
//     });

//     // Recent quizzes from history
//     const recent = historyData.slice(0, 4).map((h: any) => ({
//       _id: h._id,
//       quizId: h.quizId,
//       score: h.percentage,
//       totalQuestions: h.totalQuestions,
//       takeTime: h.createdAt || new Date().toISOString(),
//       status: h.status === 'Passed' ? 'passed' : 'failed',
//     }));

//     setStats({
//       totalQuizzes,
//       averageScore: avgScore,
//       subjectsPassed,
//       studyStreak,
//     });
//     setRecentQuizzes(recent);
//     setSubjectPerformance(perf);
//     setStrengths(strengths.length ? strengths : ['No strengths recorded yet']);
//     setWeaknesses(weaknesses.length ? weaknesses : ['No weaknesses recorded yet']);

//   } catch (error) {
//     console.error('Error loading dashboard:', error);
//   } finally {
//     setLoading(false);
//   }
// };

// // Helper: Calculate study streak from history
// const calculateStudyStreak = (history: any[]) => {
//   if (!history || history.length === 0) return 0;
  
//   let streak = 0;
//   let currentDate = new Date();
//   currentDate.setHours(0, 0, 0, 0);
  
//   // Get unique dates when quizzes were taken
//   const dates = history.map((h: any) => {
//     const d = new Date(h.createdAt || h.takeTime);
//     d.setHours(0, 0, 0, 0);
//     return d.getTime();
//   });
//   const uniqueDates = [...new Set(dates)].sort((a, b) => b - a);
  
//   // Check if today or yesterday was the last activity
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);
//   const yesterday = new Date(today);
//   yesterday.setDate(yesterday.getDate() - 1);
  
//   const lastDate = new Date(uniqueDates[0]);
//   lastDate.setHours(0, 0, 0, 0);
  
//   if (lastDate.getTime() === today.getTime() || lastDate.getTime() === yesterday.getTime()) {
//     // Count consecutive days
//     let expectedDate = new Date(lastDate);
//     for (const date of uniqueDates) {
//       const d = new Date(date);
//       d.setHours(0, 0, 0, 0);
//       if (d.getTime() === expectedDate.getTime()) {
//         streak++;
//         expectedDate.setDate(expectedDate.getDate() - 1);
//       } else {
//         break;
//       }
//     }
//   }
//   return streak;
// };

//     fetchDashboardData();
//   }, []);

//   if (loading) {
//     return (
//       <Layout title="Dashboard" sidebar={<StudentSidebar />}>
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
//           <CircularProgress />
//         </div>
//       </Layout>
//     );
//   }

//   if (!profile) {
//     return (
//       <Layout title="Dashboard" sidebar={<StudentSidebar />}>
//         <Typography variant="h6" color="error">Failed to load profile. Please log in again.</Typography>
//       </Layout>
//     );
//   }


  

//   // ----- Stats cards -----
//   const statsCards = [
//     {
//       title: 'Total Quizzes',
//       value: String(stats.totalQuizzes),
//       icon: <Assignment sx={{ color: '#C0392B' }} />,
//       bgColor: 'ic-red',
//       change: '+12%',
//     },
//     {
//       title: 'Average Score',
//       value: `${stats.averageScore}%`,
//       icon: <TrendingUp sx={{ color: '#2E7D52' }} />,
//       bgColor: 'ic-green',
//       change: '+5%',
//     },
//     {
//       title: 'Subjects Passed',
//       value: `${stats.subjectsPassed}/${subjectPerformance.length}`,
//       icon: <School sx={{ color: '#3B6EA5' }} />,
//       bgColor: 'ic-blue',
//       change: '+2',
//     },
//     {
//       title: 'Study Streak',
//       value: String(stats.studyStreak),
//       icon: <EmojiEvents sx={{ color: '#C99A2E' }} />,
//       bgColor: 'ic-gold',
//       change: '🔥 days',
//     },
//   ];

//   return (
//     <Layout title="Dashboard" sidebar={<StudentSidebar />}>
//       {/* ----- Welcome ----- */}
//       <div className="page-head">
//         <div>
//           <h1>Welcome back, {profile.FName}! 👋</h1>
//           <p>Here's your comprehensive learning progress overview.</p>
//         </div>
//         <div className="pill">
//           <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
//             <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
//             <path d="M12 7V12L15 14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
//           </svg>
//           Last active: Today
//         </div>
//       </div>

//       {/* ----- Stats Cards ----- */}
//       <div className="stats">
//         {statsCards.map((stat, idx) => (
//           <div className="stat-card" key={idx}>
//             <div className="stat-top">
//               <span className="stat-label">{stat.title}</span>
//               <div className={`stat-icon ${stat.bgColor}`}>
//                 {stat.icon}
//               </div>
//             </div>
//             <div className="stat-num">{stat.value}</div>
//             <div className="stat-delta up">
//               {stat.change} <span className="flat">vs last month</span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ----- Main Content ----- */}
//       <div className="two-col">
//         {/* Left column */}
//         <div className="stack">
//           {/* Subject Performance */}
//           <div className="panel">
//             <div className="panel-head">
//               <h3>Subject Performance</h3>
//               <a href="#" onClick={() => navigate('/student/reports')}>VIEW ALL →</a>
//             </div>
//             <p className="sub">Track your progress across all subjects</p>
//             <div className="subject-grid">
//               {subjectPerformance.map((subj, idx) => (
//                 <div className="subject-row" key={idx}>
//                   <div className="subject-name">
//                     <span className="dot" style={{ background: subj.color }}></span>
//                     <span>{subj.name}</span>
//                   </div>
//                   <div className="subject-score">
//                     <span>{subj.progress}%</span>
//                     {subj.trend === 'up' ? (
//                       <TrendingUp sx={{ color: '#2E7D52', fontSize: 16 }} />
//                     ) : (
//                       <TrendingDown sx={{ color: '#C0392B', fontSize: 16 }} />
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Recent Quizzes */}
//           <div className="panel">
//             <div className="panel-head">
//               <h3>Recent Quizzes</h3>
//               <a href="#" onClick={() => navigate('/student/reports')}>VIEW ALL →</a>
//             </div>
//             <p className="sub">Your latest quiz attempts</p>
//             {recentQuizzes.length === 0 ? (
//               <div className="empty">
//                 <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
//                   <rect x="5" y="3" width="14" height="18" rx="1.5" stroke="#9AA3AE" strokeWidth="1.6" strokeDasharray="3 3" />
//                 </svg>
//                 No quizzes taken yet. Start a quiz now!
//               </div>
//             ) : (
//               <div className="quiz-list">
//                 {recentQuizzes.map((q) => {
//                   const passed = q.score >= 70;
//                   return (
//                     <div className="quiz-item" key={q._id}>
//                       <div className="quiz-icon">
//                         <School />
//                       </div>
//                       <div className="quiz-info">
//                         <div className="quiz-title">
//                           <span>Quiz {q.quizId}</span>
//                           <span className="quiz-score" style={{ color: passed ? '#2E7D52' : '#C0392B' }}>
//                             {q.score}%
//                           </span>
//                         </div>
//                         <div className="quiz-meta">
//                           {new Date(q.takeTime).toLocaleDateString()}
//                           <span className={`quiz-status ${passed ? 'passed' : 'failed'}`}>
//                             {passed ? '✅ Passed' : '❌ Failed'}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Right column */}
//         <div className="stack">
//           {/* Learning Analysis */}
//           <div className="panel">
//             <div className="panel-head">
//               <h3>Learning Analysis</h3>
//             </div>
//             <div className="analysis-row" style={{ color: '#2E7D52' }}>
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                 <path d="M4 17L10 11L14 15L20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//               Strengths
//               <span style={{ marginLeft: 'auto', fontWeight: 400, color: '#4B5563' }}>
//                 {strengths.join(', ') || 'None yet'}
//               </span>
//             </div>
//             <div className="analysis-row" style={{ color: '#C0392B' }}>
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                 <path d="M4 7L10 13L14 9L20 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//               Areas to Improve
//               <span style={{ marginLeft: 'auto', fontWeight: 400, color: '#4B5563' }}>
//                 {weaknesses.join(', ') || 'None yet'}
//               </span>
//             </div>
//           </div>

//           {/* AI Recommendations */}
//           <div className="ai-card">
//             <div className="ai-head">
//               <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//                 <path d="M9 18H15M10 21H14" stroke="#E8735F" strokeWidth="1.7" strokeLinecap="round" />
//                 <path d="M12 3C8.5 3 6 5.7 6 9C6 11.5 7.3 13 8.3 14C9 14.7 9 15.3 9 16H15C15 15.3 15 14.7 15.7 14C16.7 13 18 11.5 18 9C18 5.7 15.5 3 12 3Z" stroke="#E8735F" strokeWidth="1.7" strokeLinejoin="round" />
//               </svg>
//               <h3>AI Recommendations</h3>
//             </div>
//             <p>Based on your performance, we suggest you review the topics where you scored below 70%. Practice more and try again.</p>
//           </div>

//           {/* Quick Stats */}
//           <div className="panel">
//             <h3 style={{ marginBottom: '16px' }}>Quick Stats</h3>
//             <div className="quick-grid">
//               <div className="quick-tile t-red">
//                 <div className="ql">Best Score</div>
//                 <div className="qv">
//                   {results.length > 0 ? `${Math.max(...results.map(r => r.score))}%` : 'N/A'}
//                 </div>
//               </div>
//               <div className="quick-tile t-red">
//                 <div className="ql">To Improve</div>
//                 <div className="qv">
//                   {results.length > 0 ? `${Math.min(...results.map(r => r.score))}%` : 'N/A'}
//                 </div>
//               </div>
//               <div className="quick-tile t-green">
//                 <div className="ql">Pass Rate</div>
//                 <div className="qv">
//                   {results.length > 0
//                     ? `${Math.round((results.filter(r => r.score >= 70).length / results.length) * 100)}%`
//                     : 'N/A'}
//                 </div>
//               </div>
//               <div className="quick-tile t-gold">
//                 <div className="ql">Total Time</div>
//                 <div className="qv">
//                   {results.length > 0
//                     ? `${Math.round(results.reduce((acc, r) => acc + (r.takeTime ? new Date(r.takeTime).getTime() : 0), 0) / (1000 * 60))}m`
//                     : 'N/A'}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* CTA Strip */}
//       <div className="cta-strip">
//         <div className="left">
//           <div className="cta-icon">
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//               <path d="M12 3C8.5 3 6 5.7 6 9C6 11.5 7.3 13 8.3 14C9 14.7 9 15.3 9 16H15C15 15.3 15 14.7 15.7 14C16.7 13 18 11.5 18 9C18 5.7 15.5 3 12 3Z" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round" />
//             </svg>
//           </div>
//           <div>
//             <h4>Ready to learn something new?</h4>
//             <p>Take a quiz and improve your skills. AI will recommend the best next topic.</p>
//           </div>
//         </div>
//         <div className="btn-row">
//           <button className="btn-primary" onClick={() => navigate('/student/quiz')}>Start Quiz</button>
//           <button className="btn-outline" onClick={() => navigate('/student/reports')}>View Reports</button>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Dashboard;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  CircularProgress,
} from '@mui/material';
import {
  TrendingUp,
  School,
  Assignment,
  EmojiEvents,
  TrendingDown,
} from '@mui/icons-material';
import Layout from '../common/component/layout';
import StudentSidebar from './components/Sidebar';
import API from '../common/services/api';
import './StudentDashboard.css';
import PaymentModal from './components/PaymentModal';

// ----- Types -----
interface User {
  _id: string;
  FName: string;
  MName: string;
  LName: string;
  email: string;
  gradeId: number;
  onboardingCompleted?: boolean;
}

interface QuizResult {
  _id: string;
  quizId: number;
  score: number;
  totalQuestions: number;
  percentage: number;
  takeTime: string;
  createdAt: string;
  status: 'Passed' | 'Failed';
}

interface SubjectPerformance {
  subjectId: number;
  subjectName: string;
  totalQuizzes: number;
  totalPassed: number;
  highScore: number;
  lowScore: number;
  progressRate: number;
  lastQuizDate: string | null;
}

interface DashboardStats {
  totalQuizzes: number;
  averageScore: number;
  subjectsPassed: number;
  studyStreak: number;
  strengths: string[];
  weaknesses: string[];
  recentHistory: QuizResult[];
}

// ----- Component -----
const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Data state
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<User | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalQuizzes: 0,
    averageScore: 0,
    subjectsPassed: 0,
    studyStreak: 0,
    strengths: [],
    weaknesses: [],
    recentHistory: [],
  });
  const [subjectPerformance, setSubjectPerformance] = useState<SubjectPerformance[]>([]);
  const [lastActive, setLastActive] = useState<string>('Today');
const [paymentModalOpen, setPaymentModalOpen] = useState(false); // <-- ADD THIS
  // Redirect if onboarding not completed
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && !user.onboardingCompleted) {
      navigate('/onboarding');
    }
  }, [navigate]);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // 1. User profile
        const userRes = await API.get('/auth/me');
        const userData = userRes.data;
        setProfile(userData);

        // 2. Dashboard stats from backend
        const statsRes = await API.get('/progress/dashboard');
        const statsData: DashboardStats = statsRes.data;
        setStats(statsData);

        // 3. Subject performance
        const subjectRes = await API.get('/progress/subjects');
        const subjectData: SubjectPerformance[] = subjectRes.data;
        setSubjectPerformance(subjectData);

        // 4. Calculate last active from recent history
        if (statsData.recentHistory && statsData.recentHistory.length > 0) {
          const lastDate = new Date(statsData.recentHistory[0].createdAt || statsData.recentHistory[0].takeTime);
          const now = new Date();
          const diffDays = Math.floor((now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
          if (diffDays === 0) setLastActive('Today');
          else if (diffDays === 1) setLastActive('Yesterday');
          else setLastActive(`${diffDays} days ago`);
        }

      } catch (error) {
        console.error('Error loading dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Layout title="Dashboard" sidebar={<StudentSidebar />}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress />
        </div>
      </Layout>
    );
  }

  if (!profile) {
    return (
      <Layout title="Dashboard" sidebar={<StudentSidebar />}>
        <Typography variant="h6" color="error">Failed to load profile. Please log in again.</Typography>
      </Layout>
    );
  }

  // Calculate additional stats from data
  const totalSubjects = subjectPerformance.length;
  const bestScore = subjectPerformance.length > 0 
    ? Math.max(...subjectPerformance.map(s => s.highScore || 0))
    : 0;
  const lowestScore = subjectPerformance.length > 0 
    ? Math.min(...subjectPerformance.map(s => s.lowScore || 0))
    : 0;
  const passRate = stats.totalQuizzes > 0 
    ? Math.round((stats.subjectsPassed / totalSubjects) * 100)
    : 0;

  // ----- Stats cards with real data -----
  const statsCards = [
    {
      title: 'Total Quizzes',
      value: String(stats.totalQuizzes),
      icon: <Assignment sx={{ color: '#C0392B' }} />,
      bgColor: 'ic-red',
      change: stats.totalQuizzes > 0 ? `${Math.round((stats.totalQuizzes / 10) * 100)}%` : '0%',
    },
    {
      title: 'Average Score',
      value: `${stats.averageScore}%`,
      icon: <TrendingUp sx={{ color: '#2E7D52' }} />,
      bgColor: 'ic-green',
      change: stats.averageScore > 50 ? '+5%' : '+0%',
    },
    {
      title: 'Subjects Passed',
      value: `${stats.subjectsPassed}/${totalSubjects}`,
      icon: <School sx={{ color: '#3B6EA5' }} />,
      bgColor: 'ic-blue',
      change: stats.subjectsPassed > 0 ? `+${stats.subjectsPassed}` : '0',
    },
    {
      title: 'Study Streak',
      value: String(stats.studyStreak),
      icon: <EmojiEvents sx={{ color: '#C99A2E' }} />,
      bgColor: 'ic-gold',
      change: stats.studyStreak > 0 ? `${stats.studyStreak} days` : '0 days',
    },
  ];

  return (
    <Layout title="Dashboard" sidebar={<StudentSidebar />}>
      {/* ----- Welcome ----- */}
      <div className="page-head">
        <div>
          <h1>Welcome back, {profile.FName}! 👋</h1>
          <p>Here's your comprehensive learning progress overview.</p>
        </div>
        <div className="pill">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
            <path d="M12 7V12L15 14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          Last active: {lastActive}
        </div>
      </div>

      {/* ----- Stats Cards ----- */}
      <div className="stats">
        {statsCards.map((stat, idx) => (
          <div className="stat-card" key={idx}>
            <div className="stat-top">
              <span className="stat-label">{stat.title}</span>
              <div className={`stat-icon ${stat.bgColor}`}>
                {stat.icon}
              </div>
            </div>
            <div className="stat-num">{stat.value}</div>
            <div className="stat-delta up">
              {stat.change} <span className="flat">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* ----- Main Content ----- */}
      <div className="two-col">
        {/* Left column */}
        <div className="stack">
          {/* Subject Performance */}
          <div className="panel">
            <div className="panel-head">
              <h3>Subject Performance</h3>
              <a href="#" onClick={() => navigate('/student/reports')}>VIEW ALL →</a>
            </div>
            <p className="sub">Track your progress across all subjects</p>
            <div className="subject-grid">
              {subjectPerformance.length === 0 ? (
                <div className="empty">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                    <rect x="5" y="3" width="14" height="18" rx="1.5" stroke="#9AA3AE" strokeWidth="1.6" strokeDasharray="3 3" />
                  </svg>
                  No subjects yet. Complete a quiz to start tracking!
                </div>
              ) : (
                subjectPerformance.map((subj, idx) => {
                  const colors = ['#C0392B', '#3B6EA5', '#2E7D52', '#C99A2E', '#7C3AED', '#E8735F'];
                  const color = colors[idx % colors.length];
                  const trend = subj.progressRate >= 70 ? 'up' : 'down';
                  return (
                    <div className="subject-row" key={idx}>
                      <div className="subject-name">
                        <span className="dot" style={{ background: color }}></span>
                        <span>{subj.subjectName}</span>
                      </div>
                      <div className="subject-score">
                        <span>{subj.progressRate}%</span>
                        {trend === 'up' ? (
                          <TrendingUp sx={{ color: '#2E7D52', fontSize: 16 }} />
                        ) : (
                          <TrendingDown sx={{ color: '#C0392B', fontSize: 16 }} />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Recent Quizzes */}
          <div className="panel">
            <div className="panel-head">
              <h3>Recent Quizzes</h3>
              <a href="#" onClick={() => navigate('/student/reports')}>VIEW ALL →</a>
            </div>
            <p className="sub">Your latest quiz attempts</p>
            {stats.recentHistory.length === 0 ? (
              <div className="empty">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                  <rect x="5" y="3" width="14" height="18" rx="1.5" stroke="#9AA3AE" strokeWidth="1.6" strokeDasharray="3 3" />
                </svg>
                No quizzes taken yet. Start a quiz now!
              </div>
            ) : (
              <div className="quiz-list">
                {stats.recentHistory.slice(0, 4).map((q) => {
                  const passed = q.status === 'Passed';
                  return (
                    <div className="quiz-item" key={q._id}>
                      <div className="quiz-icon">
                        <School />
                      </div>
                      <div className="quiz-info">
                        <div className="quiz-title">
                          <span>Quiz {q.quizId}</span>
                          <span className="quiz-score" style={{ color: passed ? '#2E7D52' : '#C0392B' }}>
                            {q.percentage || q.score}%
                          </span>
                        </div>
                        <div className="quiz-meta">
                          {new Date(q.createdAt || q.takeTime).toLocaleDateString()}
                          <span className={`quiz-status ${passed ? 'passed' : 'failed'}`}>
                            {passed ? '✅ Passed' : '❌ Failed'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="stack">
          {/* Learning Analysis */}
          <div className="panel">
            <div className="panel-head">
              <h3>Learning Analysis</h3>
            </div>
            <div className="analysis-row" style={{ color: '#2E7D52' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M4 17L10 11L14 15L20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Strengths
              <span style={{ marginLeft: 'auto', fontWeight: 400, color: '#4B5563' }}>
                {stats.strengths.length > 0 ? stats.strengths.join(', ') : 'Complete more quizzes to identify strengths'}
              </span>
            </div>
            <div className="analysis-row" style={{ color: '#C0392B' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M4 7L10 13L14 9L20 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Areas to Improve
              <span style={{ marginLeft: 'auto', fontWeight: 400, color: '#4B5563' }}>
                {stats.weaknesses.length > 0 ? stats.weaknesses.join(', ') : 'No weaknesses identified yet'}
              </span>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="ai-card">
            <div className="ai-head">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M9 18H15M10 21H14" stroke="#E8735F" strokeWidth="1.7" strokeLinecap="round" />
                <path d="M12 3C8.5 3 6 5.7 6 9C6 11.5 7.3 13 8.3 14C9 14.7 9 15.3 9 16H15C15 15.3 15 14.7 15.7 14C16.7 13 18 11.5 18 9C18 5.7 15.5 3 12 3Z" stroke="#E8735F" strokeWidth="1.7" strokeLinejoin="round" />
              </svg>
              <h3>AI Recommendations</h3>
            </div>
            {stats.weaknesses.length > 0 ? (
              <p>
                Based on your performance, we suggest you review <strong>{stats.weaknesses.slice(0, 2).join(' and ')}</strong>.
                Practice more quizzes on these topics to improve your score.
              </p>
            ) : stats.totalQuizzes === 0 ? (
              <p>Complete your first quiz to get personalized AI recommendations!</p>
            ) : (
              <p>Great job! You're performing well across all subjects. Keep up the good work!</p>
            )}
          </div>

          {/* Quick Stats */}
          <div className="panel">
            <h3 style={{ marginBottom: '16px' }}>Quick Stats</h3>
            <div className="quick-grid">
              <div className="quick-tile t-red">
                <div className="ql">Best Score</div>
                <div className="qv">
                  {stats.totalQuizzes > 0 ? `${bestScore}%` : 'N/A'}
                </div>
              </div>
              <div className="quick-tile t-red">
                <div className="ql">To Improve</div>
                <div className="qv">
                  {stats.totalQuizzes > 0 ? `${lowestScore}%` : 'N/A'}
                </div>
              </div>
              <div className="quick-tile t-green">
                <div className="ql">Pass Rate</div>
                <div className="qv">
                  {stats.totalQuizzes > 0 ? `${passRate}%` : 'N/A'}
                </div>
              </div>
              <div className="quick-tile t-gold">
                <div className="ql">Total Time</div>
                <div className="qv">
                  {stats.totalQuizzes > 0 && stats.recentHistory.length > 0
                    ? `${Math.round(stats.recentHistory.length * 5)}m` // Estimate
                    : 'N/A'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Strip */}
      <div className="cta-strip">
        <div className="left">
          <div className="cta-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 3C8.5 3 6 5.7 6 9C6 11.5 7.3 13 8.3 14C9 14.7 9 15.3 9 16H15C15 15.3 15 14.7 15.7 14C16.7 13 18 11.5 18 9C18 5.7 15.5 3 12 3Z" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h4>Ready to learn something new?</h4>
            <p>Take a quiz and improve your skills. AI will recommend the best next topic.</p>
          </div>
        </div>
        <div className="btn-row">
          <button className="btn-primary" onClick={() => navigate('/student/quiz')}>Start Quiz</button>
          <button className="btn-outline" onClick={() => navigate('/student/reports')}>View Reports</button>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;