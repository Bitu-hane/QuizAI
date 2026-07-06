// import express from 'express';
// import { getReport } from '../Controller/report';
// import { protect } from '../middleware/auth';

// const router = express.Router();
// router.get('/', protect, getReport);
// export default router;


import express from 'express';
import { protect } from '../middleware/auth';
import {
  getSummaryStats,
  getSubjectPerformance,
  getQuizHistory,
  getAIInsights,
} from '../Controller/report';

const router = express.Router();

// All report routes require authentication
router.use(protect);

// Report endpoints
router.get('/summary', getSummaryStats);
router.get('/subject-performance', getSubjectPerformance);
router.get('/quiz-history', getQuizHistory);
router.get('/ai-insights', getAIInsights);

export default router;