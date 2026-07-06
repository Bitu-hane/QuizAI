import { Request, Response } from 'express';
import StudentProgress from '../models/StudentProgress';
import { AuthRequest } from '../middleware/auth';

export const getProgress = async (req: AuthRequest, res: Response) => {
  try {
    const studentId = req.user._id;
    const progress = await StudentProgress.find({ studentId });
    // You can also compute strengths/weaknesses here
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

