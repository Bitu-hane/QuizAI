// // backend/src/routes/studentProgress.routes.ts
// import express from 'express';
// import { protect } from '../middleware/auth';
// import {
//   updateProgress,
//   getProgressByGrade,
//   getOverallProgress,
//   getProgressBySubject,
//   getRecentQuizHistory,
// } from '../Controller/studentProgress';

// const router = express.Router();

// // All progress routes require authentication
// router.use(protect);

// // ✅ Update progress (called after quiz submission)
// router.post('/update', updateProgress);

// // ✅ Get progress by grade
// router.get('/grade/:gradeId', getProgressByGrade);

// // ✅ Get overall progress summary
// router.get('/overall', getOverallProgress);

// // ✅ Get progress by subject
// router.get('/subject/:subjectId', getProgressBySubject);

// // ✅ Get recent quiz history
// router.get('/recent-history', getRecentQuizHistory);

// export default router;


import express from 'express';
import { 
  updateProgress, 
  getProgressByGrade, 
  getOverallProgress, 
  getProgressBySubject,
  getRecentQuizHistory,
  getAllSubjectsProgress,
  getDashboardStats
} from '../Controller/studentProgress';
import { protect } from '../middleware/auth';

const router = express.Router();

// All progress routes require authentication
router.use(protect);

// Update progress after quiz
router.post('/update', updateProgress);

// Dashboard endpoints
router.get('/dashboard', getDashboardStats);
router.get('/subjects', getAllSubjectsProgress);
router.get('/overall', getOverallProgress);
router.get('/history', getRecentQuizHistory);

// Progress by grade
router.get('/grade/:gradeId', getProgressByGrade);

// Progress for a specific subject
router.get('/subject/:subjectId', getProgressBySubject);

export default router;