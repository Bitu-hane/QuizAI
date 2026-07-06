import { Request, Response } from 'express';
import QuizResult from '../models/QuizResult';
import { AuthRequest } from '../middleware/auth';

/**
 * Get a specific quiz result by resultId
 * GET /api/results/:resultId
 */
export const getResultById = async (req: Request, res: Response) => {
  try {
    const { resultId } = req.params;
    const result = await QuizResult.findOne({ resultId: Number(resultId) });
    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }
    res.json(result);
  } catch (error) {
    console.error('Error fetching result by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get all results for the authenticated student
 * GET /api/results
 */
export const getUserResults = async (req: AuthRequest, res: Response) => {
  try {
    const studentId = req.user._id;
    const results = await QuizResult.find({ studentId }).sort({ takeTime: -1 });
    res.json(results || []);
  } catch (error: any) {
    console.error('Error fetching user results:', error);
    // Return empty array instead of error
    res.json([]);
  }
};