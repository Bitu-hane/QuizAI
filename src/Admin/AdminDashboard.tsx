// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Avatar,
//   Button,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemAvatar,
//   Divider,
//   Chip,
// } from '@mui/material';   // removed Paper (not used)
// import {
//   School,
//   Book,
//   Quiz,
//   People,
//   TrendingUp,
//   ArrowForward,
//   AccessTime,
//   CheckCircle,
//   Cancel,
// } from '@mui/icons-material';
// import Layout from '../common/component/layout';
// import AdminSidebar from './components/Sidebar';

// // Mock data
// const stats = [
//   { title: 'Total Students', value: '128', icon: <People sx={{ color: '#7C3AED' }} />, bgColor: '#F5F3FF', change: '+12' },
//   { title: 'Total Grades', value: '7', icon: <School sx={{ color: '#3B82F6' }} />, bgColor: '#EFF6FF', change: '+0' },
//   { title: 'Total Subjects', value: '28', icon: <Book sx={{ color: '#10B981' }} />, bgColor: '#ECFDF5', change: '+3' },
//   { title: 'Total Quizzes', value: '156', icon: <Quiz sx={{ color: '#F59E0B' }} />, bgColor: '#FFFBEB', change: '+18' },
// ];

// const recentActivity = [
//   { id: 1, user: 'Abebe Kebede', action: 'completed quiz', subject: 'Mathematics', time: '5 min ago', status: 'Passed' },
//   { id: 2, user: 'Tigist Alemu', action: 'started quiz', subject: 'Physics', time: '15 min ago', status: 'In Progress' },
//   { id: 3, user: 'Mulugeta Hailu', action: 'completed quiz', subject: 'Chemistry', time: '1 hour ago', status: 'Failed' },
//   { id: 4, user: 'Selam Tesfaye', action: 'registered', subject: '', time: '2 hours ago', status: 'New' },
// ];

// const AdminDashboard: React.FC = () => {
//   const navigate = useNavigate();

//   return (
//     <Layout title="Admin Dashboard" sidebar={<AdminSidebar />}>
//       <Box sx={{ mb: 4 }}>
//         <Typography variant="h4" sx={{ fontWeight: 700, color: '#1A202C' }} gutterBottom>
//           Welcome back, Admin! 👋
//         </Typography>
//         <Typography variant="body1" sx={{ color: '#475569' }}>
//           Here's what's happening with your platform today.
//         </Typography>
//       </Box>

//       {/* Stats */}
//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         {stats.map((stat, index) => (
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
//                     <Typography variant="caption" sx={{ color: '#10B981' }}>
//                       +{stat.change} this month
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

//       {/* Recent Activity */}
//       <Grid container spacing={3}>
//         <Grid size={{ xs: 12, md: 8 }}>
//           <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
//             <CardContent>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                 <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A202C' }}>
//                   Recent Activity
//                 </Typography>
//                 <Button endIcon={<ArrowForward />} sx={{ color: '#7C3AED' }}>
//                   View All
//                 </Button>
//               </Box>
//               <List>
//                 {recentActivity.map((item, index) => (
//                   <React.Fragment key={item.id}>
//                     <ListItem sx={{ px: 0, py: 1.5 }}>
//                       <ListItemAvatar>
//                         <Avatar sx={{ bgcolor: '#F5F3FF', color: '#7C3AED' }}>
//                           <School />
//                         </Avatar>
//                       </ListItemAvatar>
//                       <ListItemText
//                         primary={
//                           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                             <Typography variant="body2" sx={{fontWeight: 600}}>
//                               {item.user}
//                             </Typography>
//                             <Typography variant="body2" color="text.secondary">
//                               {item.action}
//                             </Typography>
//                             {item.subject && (
//                               <Chip label={item.subject} size="small" sx={{ bgcolor: '#F5F3FF', color: '#7C3AED' }} />
//                             )}
//                           </Box>
//                         }
//                         secondary={item.time}
//                       />
//                       {item.status === 'Passed' && <CheckCircle sx={{ color: '#10B981' }} />}
//                       {item.status === 'Failed' && <Cancel sx={{ color: '#EF4444' }} />}
//                       {item.status === 'In Progress' && <AccessTime sx={{ color: '#F59E0B' }} />}
//                       {item.status === 'New' && <Chip label="New" size="small" sx={{ bgcolor: '#EFF6FF', color: '#3B82F6' }} />}
//                     </ListItem>
//                     {index < recentActivity.length - 1 && <Divider sx={{ borderColor: '#F1F5F9' }} />}
//                   </React.Fragment>
//                 ))}
//               </List>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Quick Actions */}
//         <Grid size={{ xs: 12, md: 4 }}>
//           <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)', height: '100%' }}>
//             <CardContent>
//               <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A202C' }} gutterBottom>
//                 Quick Actions
//               </Typography>
//               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                 <Button
//                   variant="contained"
//                   fullWidth
//                   startIcon={<Quiz />}
//                   sx={{ bgcolor: '#7C3AED', '&:hover': { bgcolor: '#6D28D9' } }}
//                   onClick={() => navigate('/admin/quizzes')}
//                 >
//                   Manage Quiz
//                 </Button>
//                 <Button
//                   variant="contained"
//                   fullWidth
//                   startIcon={<School />}
//                   sx={{ bgcolor: '#3B82F6', '&:hover': { bgcolor: '#2563EB' } }}
//                   onClick={() => navigate('/admin/grades')}
//                 >
//                   Manage Grades
//                 </Button>
//                 <Button
//                   variant="contained"
//                   fullWidth
//                   startIcon={<People />}
//                   sx={{ bgcolor: '#10B981', '&:hover': { bgcolor: '#059669' } }}
//                   onClick={() => navigate('/admin/users')}
//                 >
//                   Manage Students
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   fullWidth
//                   startIcon={<TrendingUp />}
//                   sx={{ borderColor: '#F59E0B', color: '#F59E0B' }}
//                 >
//                   View Reports
//                 </Button>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Layout>
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
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
  School,
  Book,
  MenuBook,
  Quiz,
  People,
  TrendingUp,
  ArrowForward,
  AccessTime,
  CheckCircle,
  Cancel,
  QuestionAnswer,
} from '@mui/icons-material';
import Layout from '../common/component/layout';
import AdminSidebar from './components/Sidebar';
import API from '../common/services/api';

// Types
interface DashboardStats {
  totalStudents: number;
  totalGrades: number;
  totalSubjects: number;
  totalLessons: number;
  totalQuizzes: number;
}

interface Activity {
  id: string;
  user: string;
  action: string;
  subject?: string;
  time: string;
  status: 'Passed' | 'Failed' | 'In Progress' | 'New';
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalGrades: 0,
    totalSubjects: 0,
    totalLessons: 0,
    totalQuizzes: 0,
  });
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [
        studentsRes,
        gradesRes,
        subjectsRes,
        lessonsRes,
        quizzesRes,
        resultsRes,
      ] = await Promise.all([
        API.get('/admin/users'),
        API.get('/admin/grades'),
        API.get('/admin/subjects'),
        API.get('/admin/lessons'),
        API.get('/admin/quizzes'),
        API.get('/results?limit=5'),
      ]);

      const students = studentsRes.data.filter((user: any) => 
        user.roles?.includes('student')
      );

      const activity = resultsRes.data.map((result: any) => ({
        id: result._id,
        user: result.studentName || 'Student',
        action: 'completed quiz',
        subject: result.subjectName || 'Quiz',
        time: new Date(result.takeTime).toLocaleString(),
        status: result.score >= 70 ? 'Passed' : 'Failed',
      }));

      setStats({
        totalStudents: students.length,
        totalGrades: gradesRes.data.length,
        totalSubjects: subjectsRes.data.length,
        totalLessons: lessonsRes.data.length,
        totalQuizzes: quizzesRes.data.length,
      });
      setRecentActivity(activity.slice(0, 5));
    } catch (error) {
      console.error('Error fetching admin dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents,
      icon: <People sx={{ color: '#fff' }} />,
      bgColor: '#7C3AED',
      change: `+${stats.totalStudents > 0 ? Math.round(stats.totalStudents / 10) : 0}%`,
    },
    {
      title: 'Total Grades',
      value: stats.totalGrades,
      icon: <School sx={{ color: '#fff' }} />,
      bgColor: '#3B82F6',
      change: `+${stats.totalGrades > 0 ? Math.round(stats.totalGrades / 2) : 0}%`,
    },
    {
      title: 'Total Subjects',
      value: stats.totalSubjects,
      icon: <Book sx={{ color: '#fff' }} />,
      bgColor: '#10B981',
      change: `+${stats.totalSubjects > 0 ? Math.round(stats.totalSubjects / 3) : 0}%`,
    },
    {
      title: 'Total Lessons',
      value: stats.totalLessons,
      icon: <MenuBook sx={{ color: '#fff' }} />,
      bgColor: '#F59E0B',
      change: `+${stats.totalLessons > 0 ? Math.round(stats.totalLessons / 5) : 0}%`,
    },
    {
      title: 'Total Quizzes',
      value: stats.totalQuizzes,
      icon: <Quiz sx={{ color: '#fff' }} />,
      bgColor: '#EF4444',
      change: `+${stats.totalQuizzes > 0 ? Math.round(stats.totalQuizzes / 4) : 0}%`,
    },
  ];

  if (loading) {
    return (
      <Layout title="Admin Dashboard" sidebar={<AdminSidebar />}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout title="Admin Dashboard" sidebar={<AdminSidebar />}>
      {/* Hero Banner */}
      <Paper
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #7C3AED 0%, #1E293B 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
            Welcome back, Admin! 👋
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Here's what's happening with your platform today.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Chip label="Today" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
            <Chip label="This Week" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
            <Chip label="This Month" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
          </Box>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            right: -30,
            top: -30,
            fontSize: '12rem',
            opacity: 0.1,
            color: 'white',
            transform: 'rotate(15deg)',
          }}
        >
          <School sx={{ fontSize: '12rem' }} />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            left: '40%',
            bottom: -20,
            fontSize: '8rem',
            opacity: 0.08,
            color: 'white',
          }}
        >
          <Quiz sx={{ fontSize: '8rem' }} />
        </Box>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((stat, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 10px 40px 0 rgb(0 0 0 / 0.15)',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 500 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#1A202C', mt: 0.5 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#10B981' }}>
                      {stat.change} this month
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

      {/* Main Content: Activity & Quick Actions */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A202C' }}>
                  Recent Activity
                </Typography>
                <Button endIcon={<ArrowForward />} sx={{ color: '#7C3AED' }}>
                  View All
                </Button>
              </Box>
              {recentActivity.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
                  No recent activity found.
                </Typography>
              ) : (
                <List>
                  {recentActivity.map((item, index) => (
                    <React.Fragment key={item.id}>
                      <ListItem sx={{ px: 0, py: 1.5 }}>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: '#F5F3FF', color: '#7C3AED' }}>
                            <School />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {item.user}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {item.action}
                              </Typography>
                              {item.subject && (
                                <Chip label={item.subject} size="small" sx={{ bgcolor: '#F5F3FF', color: '#7C3AED' }} />
                              )}
                            </Box>
                          }
                          secondary={item.time}
                        />
                        {item.status === 'Passed' && <CheckCircle sx={{ color: '#10B981' }} />}
                        {item.status === 'Failed' && <Cancel sx={{ color: '#EF4444' }} />}
                        {item.status === 'In Progress' && <AccessTime sx={{ color: '#F59E0B' }} />}
                        {item.status === 'New' && (
                          <Chip label="New" size="small" sx={{ bgcolor: '#EFF6FF', color: '#3B82F6' }} />
                        )}
                      </ListItem>
                      {index < recentActivity.length - 1 && <Divider sx={{ borderColor: '#F1F5F9' }} />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
              height: '100%',
              background: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A202C' }} gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<Quiz />}
                  sx={{ bgcolor: '#7C3AED', '&:hover': { bgcolor: '#6D28D9' }, py: 1.5, borderRadius: 2 }}
                  onClick={() => navigate('/admin/quizzes')}
                >
                  Manage Quizzes
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<QuestionAnswer />}
                  sx={{ bgcolor: '#8B5CF6', '&:hover': { bgcolor: '#7C3AED' }, py: 1.5, borderRadius: 2 }}
                  onClick={() => navigate('/admin/questions')}
                >
                  Manage Questions
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<MenuBook />}
                  sx={{ bgcolor: '#F59E0B', '&:hover': { bgcolor: '#D97706' }, py: 1.5, borderRadius: 2 }}
                  onClick={() => navigate('/admin/lessons')}
                >
                  Manage Lessons
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<Book />}
                  sx={{ bgcolor: '#10B981', '&:hover': { bgcolor: '#059669' }, py: 1.5, borderRadius: 2 }}
                  onClick={() => navigate('/admin/subjects')}
                >
                  Manage Subjects
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<School />}
                  sx={{ bgcolor: '#3B82F6', '&:hover': { bgcolor: '#2563EB' }, py: 1.5, borderRadius: 2 }}
                  onClick={() => navigate('/admin/grades')}
                >
                  Manage Grades
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<People />}
                  sx={{ bgcolor: '#EF4444', '&:hover': { bgcolor: '#DC2626' }, py: 1.5, borderRadius: 2 }}
                  onClick={() => navigate('/admin/users')}
                >
                  Manage Users
                </Button>
               <Button
  variant="outlined"
  fullWidth
  startIcon={<TrendingUp />}
  sx={{ borderColor: '#7C3AED', color: '#7C3AED', py: 1.5, borderRadius: 2 }}
  onClick={() => navigate('/admin/reports')}
>
  View Reports
</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default AdminDashboard;