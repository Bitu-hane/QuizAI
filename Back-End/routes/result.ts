import express from 'express';
import { getResultById, getUserResults } from '../Controller/result';
import { protect } from '../middleware/auth';

const router = express.Router();
router.get('/:resultId', getResultById);
router.get('/', getUserResults);
export default router;