import express from 'express';
import { getSubjects } from '../Controller/subject';

const router = express.Router();
router.get('/', getSubjects);
export default router;