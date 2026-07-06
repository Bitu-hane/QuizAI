// backend/src/routes/studentProgress.routes.ts
import express from 'express';
import { protect } from '../middleware/auth';
import {
  updateProgress,
  getProgressByGrade,
  getOverallProgress,
  getProgressBySubject,
  getRecentQuizHistory,
} from '../Controller/studentProgress';

const router = express.Router();

// All progress routes require authentication
router.use(protect);

// ✅ Update progress (called after quiz submission)
router.post('/update', updateProgress);

// ✅ Get progress by grade
router.get('/grade/:gradeId', getProgressByGrade);

// ✅ Get overall progress summary
router.get('/overall', getOverallProgress);

// ✅ Get progress by subject
router.get('/subject/:subjectId', getProgressBySubject);

// ✅ Get recent quiz history
router.get('/recent-history', getRecentQuizHistory);

export default router;