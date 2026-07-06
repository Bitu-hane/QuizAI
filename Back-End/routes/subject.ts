import express from 'express';
import { getSubjects } from '../Controller/subject';
import { protect } from '../middleware/auth';

const router = express.Router();
router.get('/', protect, getSubjects);
export default router;