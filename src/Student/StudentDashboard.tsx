


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

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Chip,
  Paper,
  CircularProgress,
} from '@mui/material';
import {
  TrendingUp,
  School,
  Assignment,
  EmojiEvents,
  ArrowForward,
  AccessTime,
  CheckCircle,
  Cancel,
  Psychology,
  Lightbulb,
  TrendingDown,
} from '@mui/icons-material';
import Layout from '../common/component/layout';
import StudentSidebar from './components/Sidebar';
import API from '../common/services/api';

// ----- Types -----
interface User {
  _id: string;
  FName: string;
  MName: string;
  LName: string;
  email: string;
  gradeId: number;
}

interface QuizResult {
  _id: string;
  resultId: number;
  quizId: number;
  score: number;
  totalQuestions: number;
  takeTime: string;
}

// ----- Component -----
const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<User | null>(null);
  const [results, setResults] = useState<QuizResult[]>([]);

  const [stats, setStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    subjectsPassed: 0,
    studyStreak: 0,
  });
  const [recentQuizzes, setRecentQuizzes] = useState<QuizResult[]>([]);
  const [subjectPerformance, setSubjectPerformance] = useState<
    { name: string; progress: number; color: string; trend: 'up' | 'down' }[]
  >([]);
  const [strengths, setStrengths] = useState<string[]>([]);
  const [weaknesses, setWeaknesses] = useState<string[]>([]);
useEffect(() => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user && !user.onboardingCompleted) {
    navigate('/onboarding');
  }
}, []);
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // 1. User profile
        const userRes = await API.get('/auth/me');
        const userData = userRes.data;
        setProfile(userData);

        // 2. Quiz results
        const resultsRes = await API.get('/results');
        const resultsData = resultsRes.data;
        setResults(resultsData);

        // 3. Progress
        const progressRes = await API.get('/progress');
        const progressData = progressRes.data;

        // ----- Compute stats -----
        const total = resultsData.length;
        const avg = total > 0 ? resultsData.reduce((acc: number, r: any) => acc + r.score, 0) / total : 0;
        const passed = resultsData.filter((r: any) => r.score >= 70).length;

        // Recent (last 4)
        const sorted = [...resultsData].sort(
          (a, b) => new Date(b.takeTime).getTime() - new Date(a.takeTime).getTime()
        );
        const recent = sorted.slice(0, 4);

        // Subject performance from progress
        const subjectMap: Record<number, string> = {
          1: 'Mathematics',
          2: 'English',
          3: 'Physics',
          4: 'Chemistry',
          5: 'Biology',
          6: 'History',
        };
        const colors = ['#7C3AED', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
        const perf = progressData.map((p: any) => {
          const name = subjectMap[p.subjectId] || `Subject ${p.subjectId}`;
          const progressVal = p.quizTaken > 0 ? Math.round((p.quizPassed / p.quizTaken) * 100) : 0;
          const trend = progressVal >= 70 ? 'up' : 'down';
          const color = colors[(p.subjectId - 1) % colors.length] || '#7C3AED';
          return { name, progress: progressVal, color, trend };
        });

        // Strengths / Weaknesses
        const str: string[] = [];
        const weak: string[] = [];
        progressData.forEach((p: any) => {
          const name = subjectMap[p.subjectId] || `Subject ${p.subjectId}`;
          if (p.highScore >= 70) str.push(name);
          if (p.lowScore <= 50) weak.push(name);
        });

        setStats({
          totalQuizzes: total,
          averageScore: Math.round(avg),
          subjectsPassed: passed,
          studyStreak: 12, // placeholder
        });
        setRecentQuizzes(recent);
        setSubjectPerformance(perf);
        setStrengths(str.length ? str : ['No strengths recorded yet']);
        setWeaknesses(weak.length ? weak : ['No weaknesses recorded yet']);
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
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  if (!profile) {
    return (
      <Layout title="Dashboard" sidebar={<StudentSidebar />}>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" color="error">Failed to load profile. Please log in again.</Typography>
        </Box>
      </Layout>
    );
  }

  // ----- Stats cards -----
  const statsCards = [
    {
      title: 'Total Quizzes',
      value: String(stats.totalQuizzes),
      icon: <Assignment sx={{ color: '#7C3AED' }} />,
      bgColor: '#F5F3FF',
      change: '+12%',
      trend: 'up' as const,
    },
    {
      title: 'Average Score',
      value: `${stats.averageScore}%`,
      icon: <TrendingUp sx={{ color: '#10B981' }} />,
      bgColor: '#ECFDF5',
      change: '+5%',
      trend: 'up' as const,
    },
    {
      title: 'Subjects Passed',
      value: `${stats.subjectsPassed}/${subjectPerformance.length}`,
      icon: <School sx={{ color: '#3B82F6' }} />,
      bgColor: '#EFF6FF',
      change: '+2',
      trend: 'up' as const,
    },
    {
      title: 'Study Streak',
      value: String(stats.studyStreak),
      icon: <EmojiEvents sx={{ color: '#F59E0B' }} />,
      bgColor: '#FFFBEB',
      change: '🔥 days',
      trend: 'up' as const,
    },
  ];

  return (
    <Layout title="Dashboard" sidebar={<StudentSidebar />}>
      {/* ----- Welcome ----- */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1A202C' }} gutterBottom>
              Welcome back, {profile.FName}! 👋
            </Typography>
            <Typography variant="body1" sx={{ color: '#475569' }}>
              Here's your comprehensive learning progress overview.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: { xs: 2, sm: 0 } }}>
            <Paper sx={{ px: 2, py: 1, borderRadius: 2, bgcolor: '#F5F3FF', display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessTime sx={{ color: '#7C3AED', fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: '#7C3AED', fontWeight: 500 }}>
                Last active: Today
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Box>

      {/* ----- Stats Cards ----- */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsCards.map((stat, idx) => (
          <Grid key={idx} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)', transition: 'transform 0.2s ease', '&:hover': { transform: 'translateY(-4px)' } }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 500 }}>{stat.title}</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1A202C', mt: 1 }}>{stat.value}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                      <Typography variant="caption" sx={{ color: stat.trend === 'up' ? '#10B981' : '#EF4444', fontWeight: 600 }}>
                        {stat.change}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748B' }}>vs last month</Typography>
                    </Box>
                  </Box>
                  <Avatar sx={{ bgcolor: stat.bgColor, width: 52, height: 52, borderRadius: 2 }}>{stat.icon}</Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ----- Main Content ----- */}
      <Grid container spacing={3}>
        {/* Left column */}
        <Grid size={{ xs: 12, lg: 8 }}>
          {/* Subject Performance */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)', mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1A202C' }}>Subject Performance</Typography>
                  <Typography variant="body2" sx={{ color: '#64748B' }}>Track your progress across all subjects</Typography>
                </Box>
                <Button endIcon={<ArrowForward />} sx={{ color: '#7C3AED' }} onClick={() => navigate('/student/reports')}>
                  View All
                </Button>
              </Box>
              <Grid container spacing={2}>
                {subjectPerformance.map((subj, idx) => (
                  <Grid key={idx} size={{ xs: 12, md: 6 }}>
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: subj.color }} />
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#1A202C' }}>{subj.name}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#7C3AED' }}>{subj.progress}%</Typography>
                          {subj.trend === 'up' ? (
                            <TrendingUp sx={{ color: '#10B981', fontSize: 16 }} />
                          ) : (
                            <TrendingDown sx={{ color: '#EF4444', fontSize: 16 }} />
                          )}
                        </Box>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={subj.progress}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: '#F5F3FF',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 4,
                            background: `linear-gradient(90deg, ${subj.color}, ${subj.color}dd)`,
                          },
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Recent Quizzes */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1A202C' }}>Recent Quizzes</Typography>
                  <Typography variant="body2" sx={{ color: '#64748B' }}>Your latest quiz attempts</Typography>
                </Box>
                <Button endIcon={<ArrowForward />} sx={{ color: '#7C3AED' }} onClick={() => navigate('/student/reports')}>
                  View All
                </Button>
              </Box>
              {recentQuizzes.length === 0 ? (
                <Typography variant="body2" color="text.secondary">No quizzes taken yet. Start a quiz now!</Typography>
              ) : (
                <List>
                  {recentQuizzes.map((q, idx) => {
                    const passed = q.score >= 70;
                    return (
                      <React.Fragment key={q._id}>
                        <ListItem sx={{ px: 0, py: 2, '&:hover': { bgcolor: '#F5F3FF', borderRadius: 2, px: 1 } }}>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: '#F5F3FF', color: '#7C3AED' }}><School /></Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body1" sx={{ fontWeight: 600, color: '#1A202C' }}>Quiz {q.quizId}</Typography>
                                <Chip
                                  label={`Score: ${q.score}%`}
                                  size="small"
                                  sx={{ bgcolor: passed ? '#ECFDF5' : '#FEF2F2', color: passed ? '#10B981' : '#EF4444' }}
                                />
                              </Box>
                            }
                            secondary={new Date(q.takeTime).toLocaleDateString()}
                          />
                          <Box>{passed ? <CheckCircle sx={{ color: '#10B981' }} /> : <Cancel sx={{ color: '#EF4444' }} />}</Box>
                        </ListItem>
                        {idx < recentQuizzes.length - 1 && <Divider sx={{ borderColor: '#F1F5F9' }} />}
                      </React.Fragment>
                    );
                  })}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Right column */}
        <Grid size={{ xs: 12, lg: 4 }}>
          {/* Learning Analysis */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)', mb: 3, bgcolor: '#F8FAFC' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1A202C' }} gutterBottom>Learning Analysis</Typography>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <TrendingUp sx={{ color: '#10B981' }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#10B981' }}>Strengths</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {strengths.map((item) => (
                    <Chip key={item} label={item} sx={{ bgcolor: '#ECFDF5', color: '#10B981', fontWeight: 500 }} />
                  ))}
                </Box>
              </Box>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <TrendingDown sx={{ color: '#EF4444' }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#EF4444' }}>Areas to Improve</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {weaknesses.map((item) => (
                    <Chip key={item} label={item} sx={{ bgcolor: '#FEF2F2', color: '#EF4444', fontWeight: 500 }} />
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
              mb: 3,
              background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
              color: 'white',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Psychology sx={{ color: 'white' }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>AI Recommendations</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                Based on your performance, we suggest you review the topics where you scored below 70%.
                Practice more and try again.
              </Typography>
              {/* <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2, bgcolor: 'white', color: '#7C3AED', '&:hover': { bgcolor: '#F5F3FF' } }}
                onClick={() => navigate('/student/quiz')}
              >
                Start Recommended Quiz
              </Button> */}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1A202C' }} gutterBottom>Quick Stats</Typography>
              <Grid container spacing={1.5}>
                <Grid size={{ xs: 6 }}>
                  <Box sx={{ bgcolor: '#F5F3FF', borderRadius: 2, p: 2, textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#7C3AED', fontWeight: 500 }}>Best Score</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#7C3AED' }}>
                      {results.length > 0 ? `${Math.max(...results.map(r => r.score))}%` : 'N/A'}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Box sx={{ bgcolor: '#FEF2F2', borderRadius: 2, p: 2, textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#EF4444', fontWeight: 500 }}>To Improve</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#EF4444' }}>
                      {results.length > 0 ? `${Math.min(...results.map(r => r.score))}%` : 'N/A'}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Box sx={{ bgcolor: '#ECFDF5', borderRadius: 2, p: 2, textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 500 }}>Pass Rate</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#10B981' }}>
                      {results.length > 0 ? `${Math.round((results.filter(r => r.score >= 70).length / results.length) * 100)}%` : 'N/A'}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Box sx={{ bgcolor: '#FFFBEB', borderRadius: 2, p: 2, textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#F59E0B', fontWeight: 500 }}>Total Time</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#F59E0B' }}>
                      {results.length > 0
                        ? `${Math.round(results.reduce((acc, r) => acc + (r.takeTime ? new Date(r.takeTime).getTime() : 0), 0) / (1000 * 60))}m`
                        : 'N/A'}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mt: 3 }}>
        <Card
          sx={{
            borderRadius: 3,
            bgcolor: '#F5F3FF',
            border: '2px solid #E9D5FF',
            background: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
          }}
        >
          <CardContent>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
              <Grid size={{ xs: 12, md: 7 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: '#7C3AED', width: 56, height: 56 }}>
                    <Lightbulb sx={{ color: 'white' }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1A202C' }}>
                      Ready to learn something new?
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#475569' }}>
                      Take a quiz and improve your skills. AI will recommend the best next topic.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                  <Button
                    variant="contained"
                    sx={{ bgcolor: '#7C3AED', '&:hover': { bgcolor: '#6D28D9' }, px: 4, py: 1.5, borderRadius: 2 }}
                    onClick={() => navigate('/student/quiz')}
                  >
                    Start Quiz
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ borderColor: '#7C3AED', color: '#7C3AED', '&:hover': { borderColor: '#6D28D9', bgcolor: '#F5F3FF' }, px: 3, py: 1.5, borderRadius: 2 }}
                    onClick={() => navigate('/student/reports')}
                  >
                    View Reports
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
};

export default Dashboard;