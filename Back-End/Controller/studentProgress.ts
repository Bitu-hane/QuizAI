// backend/src/controllers/studentProgress.controller.ts
import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import StudentProgress from '../models/StudentProgress';
import Subject from '../models/Subject';
import Grade from '../models/Grade';
import Lesson from '../models/Lesson';
import QuizResult from '../models/QuizResult';

// ✅ Update or create student progress after a quiz
export const updateProgress = async (req: AuthRequest, res: Response) => {
  try {
    const studentId = req.user._id;
    const { subjectId, gradeId, lessonId, score, totalQuestions, passed } = req.body;

    // Validate required fields
    if (!subjectId || !gradeId || !lessonId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Find existing progress or create new
    const progress = await StudentProgress.findOneAndUpdate(
      { 
        studentId, 
        subjectId, 
        gradeId, 
        lessonId 
      },
      {
        $inc: { 
          quizTaken: 1,
          quizPassed: passed ? 1 : 0,
        },
        $max: { highScore: score },
        $min: { lowScore: score },
        $set: { 
          lastQuizDate: new Date(),
          updatedAt: new Date(),
        },
      },
      { 
        new: true, 
        upsert: true, 
        setDefaultsOnInsert: true 
      }
    );

    // If new, set progressId
    if (progress.progressId === undefined) {
      const lastProgress = await StudentProgress.findOne().sort({ progressId: -1 });
      progress.progressId = lastProgress ? lastProgress.progressId + 1 : 1;
      await progress.save();
    }

    res.json({
      message: 'Progress updated successfully',
      progress,
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get progress by student and grade
export const getProgressByGrade = async (req: AuthRequest, res: Response) => {
  try {
    const studentId = req.user._id;
    const { gradeId } = req.params;

    const progress = await StudentProgress.find({ 
      studentId, 
      gradeId: Number(gradeId) 
    }).sort({ subjectId: 1 });

    // Get subject names
    const subjectIds = progress.map(p => p.subjectId);
    const subjects = await Subject.find({ subjectId: { $in: subjectIds } });
    const subjectMap = subjects.reduce((map, s) => {
      map[s.subjectId] = s.name;
      return map;
    }, {} as { [key: number]: string });

    const formattedProgress = progress.map(p => ({
      ...p.toObject(),
      subjectName: subjectMap[p.subjectId] || 'Unknown',
    }));

    res.json(formattedProgress);
  } catch (error) {
    console.error('Error fetching progress by grade:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get overall progress summary
export const getOverallProgress = async (req: AuthRequest, res: Response) => {
  try {
    const studentId = req.user._id;

    const progress = await StudentProgress.find({ studentId });

    const totalQuizzes = progress.reduce((sum, p) => sum + p.quizTaken, 0);
    const totalPassed = progress.reduce((sum, p) => sum + p.quizPassed, 0);
    const averageScore = progress.reduce((sum, p) => sum + p.highScore, 0) / (progress.length || 1);

    // Get grades the student has studied
    const gradeIds = [...new Set(progress.map(p => p.gradeId))];
    const grades = await Grade.find({ gradeId: { $in: gradeIds } });

    res.json({
      totalQuizzes,
      totalPassed,
      averageScore: Math.round(averageScore),
      passRate: totalQuizzes > 0 ? Math.round((totalPassed / totalQuizzes) * 100) : 0,
      gradesStudied: grades.map(g => ({ gradeId: g.gradeId, level: g.level })),
      totalLessons: progress.length,
    });
  } catch (error) {
    console.error('Error fetching overall progress:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get progress by subject across all grades
export const getProgressBySubject = async (req: AuthRequest, res: Response) => {
  try {
    const studentId = req.user._id;
    const { subjectId } = req.params;

    const progress = await StudentProgress.find({ 
      studentId, 
      subjectId: Number(subjectId) 
    }).sort({ gradeId: 1 });

    // Get grade names
    const gradeIds = [...new Set(progress.map(p => p.gradeId))];
    const grades = await Grade.find({ gradeId: { $in: gradeIds } });
    const gradeMap = grades.reduce((map, g) => {
      map[g.gradeId] = g.level;
      return map;
    }, {} as { [key: number]: number });

    const formattedProgress = progress.map(p => ({
      ...p.toObject(),
      gradeLevel: gradeMap[p.gradeId] || p.gradeId,
    }));

    res.json(formattedProgress);
  } catch (error) {
    console.error('Error fetching progress by subject:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get recent quiz history with progress data
export const getRecentQuizHistory = async (req: AuthRequest, res: Response) => {
  try {
    const studentId = req.user._id;

    const results = await QuizResult.find({ studentId })
      .sort({ createdAt: -1 })
      .limit(20);

    if (results.length === 0) {
      return res.json([]);
    }

    const history = await Promise.all(results.map(async (result) => {
      try {
        // Get progress for this quiz
        const progress = await StudentProgress.findOne({
          studentId,
          // We need to find the right progress entry
        });

        return {
          _id: result._id,
          quizId: result.quizId,
          score: result.score,
          totalQuestions: result.totalQuestions,
          percentage: Math.round((result.score / result.totalQuestions) * 100),
          status: (result.score / result.totalQuestions) >= 0.7 ? 'Passed' : 'Failed',
        };
      } catch (err) {
        console.error('Error processing history item:', err);
        return null;
      }
    }));

    res.json(history.filter(item => item !== null));
  } catch (error) {
    console.error('Error fetching recent quiz history:', error);
    res.status(500).json({ message: 'Server error' });
  }
};