// import express from 'express';
// import { getReport } from '../Controller/report';
// import { protect } from '../middleware/auth';

// const router = express.Router();
// router.get('/', protect, getReport);
// export default router;


import express from 'express';
import { protect } from '../middleware/auth';
import { getStudentReportByTelegram } from '../Controller/report';
import { getStudentSubjects,
  getStudentLessonsBySubject,
  getStudentQuizzesByLesson,
} from '../Controller/report';
import {
  getSummaryStats,
  getSubjectPerformance,
  getQuizHistory,
  getAIInsights,
} from '../Controller/report';

const router = express.Router();
router.get('/student/:telegramId', getStudentReportByTelegram);
// Public routes (for bot)
router.get('/student/:telegramId/subjects', getStudentSubjects);
router.get('/student/:telegramId/subject/:subjectId/lessons', getStudentLessonsBySubject);
router.get('/student/:telegramId/lesson/:lessonId/quizzes', getStudentQuizzesByLesson);
// All report routes require authentication
router.use(protect);

// Report endpoints
router.get('/summary', getSummaryStats);
router.get('/subject-performance', getSubjectPerformance);
router.get('/quiz-history', getQuizHistory);
router.get('/ai-insights', getAIInsights);

export default router;