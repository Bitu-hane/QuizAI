import express from 'express';
import { 
  getQuizzes, 
  getQuizByLesson, 
  getQuizById, 
  submitQuiz 
} from '../Controller/quiz';
import { protect } from '../middleware/auth';
import { checkPremium } from '../middleware/checkPremium';

const router = express.Router();

// ===== PUBLIC ROUTES (no auth) =====
router.get('/', getQuizzes);

// ===== PROTECTED ROUTES (require authentication) =====
router.use(protect);

// ✅ Get quiz by lesson (with lock status)
router.get('/lesson/:lessonId', getQuizByLesson);

// ✅ Get quiz by ID (with premium check)
router.get('/:quizId', checkPremium, getQuizById);

// ✅ Submit quiz (with premium check)
router.post('/submit', checkPremium, submitQuiz);

export default router;