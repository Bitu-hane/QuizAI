// import { Request, Response } from 'express';
// import Subject from '../models/Subject';

// export const getSubjects = async (req: Request, res: Response) => {
//   try {
//     const { gradeId } = req.query;
//     const filter = gradeId ? { gradeId: Number(gradeId) } : {};
//     const subjects = await Subject.find(filter).sort({ name: 1 });
//     res.json(subjects);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };
// backend/src/controllers/subject.controller.ts


import { Request, Response } from 'express';
import Subject from '../models/Subject';
import Grade from '../models/Grade';

export const getSubjects = async (req: Request, res: Response) => {
  try {
    const { gradeId } = req.query;
    console.log('📚 Fetching subjects for gradeId:', gradeId);
    
    let filter: any = {};
    if (gradeId) {
      // First, find the grade document to get the actual gradeId
      const grade = await Grade.findOne({ level: Number(gradeId) });
      if (grade) {
        filter.gradeId = grade.gradeId;
      } else {
        // If no grade found, try direct match
        filter.gradeId = Number(gradeId);
      }
    }
    
    console.log('🔍 Filter:', filter);
    
    const subjects = await Subject.find(filter).sort({ subjectId: 1 });
    console.log('✅ Found subjects:', subjects.length);
    
    res.json(subjects);
  } catch (error) {
    console.error('❌ Error fetching subjects:', error);
    res.status(500).json({ message: 'Server error' });
  }
};