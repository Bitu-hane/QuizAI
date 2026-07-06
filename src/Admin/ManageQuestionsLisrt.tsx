import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  CircularProgress,
} from '@mui/material';
import { Quiz as QuizIcon } from '@mui/icons-material';
import Layout from '../common/component/layout';
import AdminSidebar from './components/Sidebar';
import API from '../common/services/api';

interface Quiz {
  _id: string;
  quizId: number;
  title: string;
  lessonId: number;
  questions: number[];
}

const ManageQuestionsList: React.FC = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const res = await API.get('/admin/quizzes');
      setQuizzes(res.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout title="Manage Questions" sidebar={<AdminSidebar />}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout title="Manage Questions" sidebar={<AdminSidebar />}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          📝 Questions Management
        </Typography>
      </Box>

      <Typography variant="body1" sx={{ color: '#64748B', mb: 3 }}>
        Select a quiz to view and manage its questions.
      </Typography>

      <Grid container spacing={3}>
        {quizzes.length === 0 ? (
          <Grid size={{ xs: 12 }}>
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
              No quizzes found. Create a quiz first.
            </Typography>
          </Grid>
        ) : (
          quizzes.map((quiz) => (
            <Grid key={quiz._id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 10px 40px 0 rgb(0 0 0 / 0.15)',
                  },
                }}
                onClick={() => navigate(`/admin/quizzes/${quiz.quizId}/questions`)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        bgcolor: '#F5F3FF',
                        borderRadius: 2,
                        p: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <QuizIcon sx={{ color: '#7C3AED' }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {quiz.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <Chip
                          label={`${quiz.questions?.length || 0} questions`}
                          size="small"
                          sx={{ bgcolor: '#F5F3FF', color: '#7C3AED' }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Layout>
  );
};

export default ManageQuestionsList;