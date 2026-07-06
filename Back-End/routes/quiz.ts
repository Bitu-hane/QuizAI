import express from 'express';
import { getQuizByLesson, submitQuiz, getQuizzes, getQuizById} from '../Controller/quiz';
import { protect } from '../middleware/auth';

const router = express.Router();
router.get('/', protect, getQuizzes);
router.get('/lesson/:lessonId', protect, getQuizByLesson);
router.post('/submit', protect, submitQuiz);
router.get('/:quizId', protect, getQuizById);
export default router;