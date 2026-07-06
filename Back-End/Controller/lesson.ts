// import { Request, Response } from 'express';
// import Lesson from '../models/Lesson';
// interface AuthRequest extends Request {
//   user?: any;
// }
// // controllers/lessonController.ts
// export const getLessons = async (req: AuthRequest, res: Response): Promise<void> => {
//   try {
//     const { subjectId, gradeId } = req.query;
//     const filter: any = {};

//     // Add filters if provided
//     if (subjectId) {
//       filter.subjectId = parseInt(subjectId as string);
//     }
    
//     if (gradeId) {
//       filter.gradeId = parseInt(gradeId as string); // ✅ Filter by student's grade
//     }

//     const lessons = await Lesson.find(filter).sort({ lessonId: 1 });
//     res.json(lessons);
//   } catch (error: unknown) {
//     console.error('Error fetching lessons:', error);
//     res.status(500).json({ 
//       message: error instanceof Error ? error.message : 'Failed to fetch lessons' 
//     });
//   }
// };
import { Request, Response } from 'express';
import Lesson from '../models/Lesson';

export const getLessonsByGradeAndSubject = async (req: Request, res: Response) => {
  try {
    const { gradeId, subjectId } = req.query;
    
    console.log('📚 Fetching lessons with:', { gradeId, subjectId }); // Debug log
    
    const filter: any = {};
    if (gradeId) filter.gradeId = Number(gradeId);
    if (subjectId) filter.subjectId = Number(subjectId);
    
    const lessons = await Lesson.find(filter).sort({ lessonId: 1 });
    
    console.log('📚 Found lessons:', lessons.length); // Debug log
    
    res.json(lessons);
  } catch (error) {
    console.error('Error fetching lessons:', error);
    res.status(500).json({ message: 'Server error' });
  }
};