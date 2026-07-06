import { Request, Response } from 'express';
import Grade from '../models/Grade';

export const getGrades = async (req: Request, res: Response) => {
  try {
    const grades = await Grade.find().sort({ level: 1 });
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};