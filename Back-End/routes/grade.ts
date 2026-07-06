import express from 'express';
import { getGrades } from '../Controller/grade';
import { protect } from '../middleware/auth';

const router = express.Router();
router.get('/', protect, getGrades);
export default router;