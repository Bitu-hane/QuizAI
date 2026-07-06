import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Button,
  Chip,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
} from '@mui/material';
import {
  People,
  BarChart,
  PieChart as PieChartIcon,
  ArrowBack,
  Download,
} from '@mui/icons-material';
import Layout from '../common/component/layout';
import AdminSidebar from './components/Sidebar';
import API from '../common/services/api';

// ----- Types -----
interface ReportStats {
  totalStudents: number;
  totalQuizzes: number;
  totalAttempts: number;
  averageScore: number;
  passRate: number;
  activeStudents: number;
}

interface SubjectPerformance {
  subject: string;
  averageScore: number;
  attempts: number;
  passRate: number;
}

interface RecentActivity {
  id: string;
  student: string;
  quiz: string;
  score: number;
  date: string;
  status: 'Passed' | 'Failed';
}

const AdminReports: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<ReportStats>({
    totalStudents: 0,
    totalQuizzes: 0,
    totalAttempts: 0,
    averageScore: 0,
    passRate: 0,
    activeStudents: 0,
  });
  const [subjectPerformance, setSubjectPerformance] = useState<SubjectPerformance[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    setLoading(true);
    try {
      const [
        usersRes,
        quizzesRes,
        resultsRes,
        progressRes,
        subjectsRes,
      ] = await Promise.all([
        API.get('/admin/users'),
        API.get('/admin/quizzes'),
        API.get('/results'),
        API.get('/progress'),
        API.get('/admin/subjects'),
      ]);

      const students = usersRes.data.filter((u: any) => u.roles?.includes('student'));
      const results = resultsRes.data || [];
      const totalAttempts = results.length;
      const avgScore = totalAttempts > 0 
        ? Math.round(results.reduce((acc: number, r: any) => acc + r.score, 0) / totalAttempts)
        : 0;
      const passed = results.filter((r: any) => r.score >= 70).length;
      const passRate = totalAttempts > 0 ? Math.round((passed / totalAttempts) * 100) : 0;

      setStats({
        totalStudents: students.length,
        totalQuizzes: quizzesRes.data.length,
        totalAttempts,
        averageScore: avgScore,
        passRate,
        activeStudents: students.filter((s: any) => s.status === 'active').length,
      });

      const subjectNames: { [key: number]: string } = {};
      subjectsRes.data.forEach((s: any) => {
        subjectNames[s.subjectId] = s.name;
      });

      const subjectMap: { [key: number]: { subject: string; total: number; score: number; attempts: number } } = {};
      
      progressRes.data.forEach((p: any) => {
        const name = subjectNames[p.subjectId] || `Subject ${p.subjectId}`;
        if (!subjectMap[p.subjectId]) {
          subjectMap[p.subjectId] = { subject: name, total: 0, score: 0, attempts: 0 };
        }
        subjectMap[p.subjectId].total += p.quizPassed || 0;
        subjectMap[p.subjectId].score += p.highScore || 0;
        subjectMap[p.subjectId].attempts += p.quizTaken || 0;
      });

      const perf = Object.values(subjectMap).map((s) => ({
        subject: s.subject,
        attempts: s.attempts,
        averageScore: s.attempts > 0 ? Math.round(s.score / s.attempts) : 0,
        passRate: s.attempts > 0 ? Math.round((s.total / s.attempts) * 100) : 0,
      }));

      setSubjectPerformance(perf);

      const recent = results
        .slice(-5)
        .reverse()
        .map((r: any) => {
          const student = students.find((s: any) => s._id === r.studentId);
          const quiz = quizzesRes.data.find((q: any) => q.quizId === r.quizId);
          return {
            id: r._id,
            student: student ? `${student.FName} ${student.LName}` : 'Student',
            quiz: quiz ? quiz.title : `Quiz ${r.quizId}`,
            score: r.score,
            date: new Date(r.takeTime).toLocaleDateString(),
            status: r.score >= 70 ? 'Passed' : 'Failed' as 'Passed' | 'Failed',
          };
        });

      setRecentActivity(recent);
    } catch (error) {
      console.error('Error fetching report data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout title="Reports" sidebar={<AdminSidebar />}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout title="Reports" sidebar={<AdminSidebar />}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            📊 Reports & Analytics
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B' }}>
            Overview of your platform's performance
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Download />}
            sx={{ borderColor: '#7C3AED', color: '#7C3AED' }}
          >
            Export Report
          </Button>
          <Button
            variant="contained"
            startIcon={<ArrowBack />}
            onClick={() => navigate('/admin/dashboard')}
            sx={{ bgcolor: '#7C3AED' }}
          >
            Back to Dashboard
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 500 }}>Total Students</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#1A202C' }}>{stats.totalStudents}</Typography>
                  <Typography variant="caption" sx={{ color: '#10B981' }}>
                    {stats.activeStudents} active
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#F5F3FF', width: 48, height: 48, borderRadius: 2 }}>
                  <People sx={{ color: '#7C3AED' }} />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 500 }}>Average Score</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#1A202C' }}>{stats.averageScore}%</Typography>
                  <Typography variant="caption" sx={{ color: '#10B981' }}>
                    {stats.totalAttempts} attempts
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#ECFDF5', width: 48, height: 48, borderRadius: 2 }}>
                  <BarChart sx={{ color: '#10B981' }} />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 500 }}>Pass Rate</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#1A202C' }}>{stats.passRate}%</Typography>
                  <Typography variant="caption" sx={{ color: '#10B981' }}>
                    {stats.totalQuizzes} quizzes
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: '#FFFBEB', width: 48, height: 48, borderRadius: 2 }}>
                  <PieChartIcon sx={{ color: '#F59E0B' }} />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Subject Performance */}
      <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)', mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Subject Performance</Typography>
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead sx={{ bgcolor: '#F5F3FF' }}>
                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell align="center">Attempts</TableCell>
                  <TableCell align="center">Average Score</TableCell>
                  <TableCell align="center">Pass Rate</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subjectPerformance.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">No subject data available</TableCell>
                  </TableRow>
                ) : (
                  subjectPerformance.map((subject) => (
                    <TableRow key={subject.subject} hover>
                      <TableCell sx={{ fontWeight: 600 }}>{subject.subject}</TableCell>
                      <TableCell align="center">{subject.attempts}</TableCell>
                      <TableCell align="center">
                        <Chip
                          label={`${subject.averageScore}%`}
                          size="small"
                          color={subject.averageScore >= 70 ? 'success' : 'warning'}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={`${subject.passRate}%`}
                          size="small"
                          color={subject.passRate >= 70 ? 'success' : 'warning'}
                        />
                      </TableCell>
                      <TableCell align="center">
                        {subject.averageScore >= 70 ? (
                          <Chip label="Good" size="small" sx={{ bgcolor: '#ECFDF5', color: '#10B981' }} />
                        ) : (
                          <Chip label="Needs Improvement" size="small" sx={{ bgcolor: '#FEF2F2', color: '#EF4444' }} />
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card sx={{ borderRadius: 3, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Recent Quiz Activity</Typography>
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead sx={{ bgcolor: '#F5F3FF' }}>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell>Quiz</TableCell>
                  <TableCell align="center">Score</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentActivity.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">No recent activity</TableCell>
                  </TableRow>
                ) : (
                  recentActivity.map((activity) => (
                    <TableRow key={activity.id} hover>
                      <TableCell>{activity.student}</TableCell>
                      <TableCell>{activity.quiz}</TableCell>
                      <TableCell align="center">
                        <Typography

  sx={{

    fontWeight: 600,

    color: activity.score >= 70 ? '#10B981' : '#EF4444',

  }}

>
                          {activity.score}%
                        </Typography>
                      </TableCell>
                      <TableCell>{activity.date}</TableCell>
                      <TableCell align="center">
                        <Chip
                          label={activity.status}
                          size="small"
                          sx={{
                            bgcolor: activity.status === 'Passed' ? '#ECFDF5' : '#FEF2F2',
                            color: activity.status === 'Passed' ? '#10B981' : '#EF4444',
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default AdminReports;