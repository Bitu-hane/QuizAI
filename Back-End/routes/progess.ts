import express from 'express';
import { getProgress } from '../Controller/progress';
import { protect } from '../middleware/auth';

const router = express.Router();
router.get('/', protect, getProgress);
export default router;