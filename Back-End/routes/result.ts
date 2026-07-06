import express from 'express';
import { getResultById, getUserResults } from '../Controller/result';
import { protect } from '../middleware/auth';

const router = express.Router();
router.get('/:resultId', protect, getResultById);
router.get('/', protect, getUserResults);
export default router;