// import { Request, Response } from 'express';
// import QuizResult from '../models/QuizResult';
// import { AuthRequest } from '../middleware/auth';

// /**
//  * Get a specific quiz result by resultId
//  * GET /api/results/:resultId
//  */
// export const getResultById = async (req: Request, res: Response) => {
//   try {
//     const { resultId } = req.params;
//     const result = await QuizResult.findOne({ resultId: Number(resultId) });
//     if (!result) {
//       return res.status(404).json({ message: 'Result not found' });
//     }
//     res.json(result);
//   } catch (error) {
//     console.error('Error fetching result by ID:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// /**
//  * Get all results for the authenticated student
//  * GET /api/results
//  */
// export const getUserResults = async (req: AuthRequest, res: Response) => {
//   try {
//     const studentId = req.user._id;
//     const results = await QuizResult.find({ studentId }).sort({ takeTime: -1 });
//     res.json(results || []);
//   } catch (error: any) {
//     console.error('Error fetching user results:', error);
//     // Return empty array instead of error
//     res.json([]);
//   }
// };



import { Request, Response } from 'express';
import mongoose from 'mongoose';
import QuizResult from '../models/QuizResult';
import Quiz from '../models/Quiz';
import Lesson from '../models/Lesson';
import Subject from '../models/Subject';
import Question from '../models/Question';
import Grade from '../models/Grade';
import { AuthRequest } from '../middleware/auth';

/**
 * Get a specific quiz result – works with both resultId (number) and _id (ObjectId)
 */
export const getResultById = async (req: Request, res: Response) => {
  try {
    // Safely extract the resultId parameter (it could be string | string[])
    const param = req.params.resultId;
    const resultId = Array.isArray(param) ? param[0] : param;

    if (!resultId) {
      return res.status(400).json({ message: 'Missing result ID' });
    }

    let result;

    // Try numeric resultId first
    if (!isNaN(Number(resultId))) {
      result = await QuizResult.findOne({ resultId: Number(resultId) });
    }
    // Otherwise, try as ObjectId
    else if (mongoose.Types.ObjectId.isValid(resultId)) {
      result = await QuizResult.findById(resultId);
    } else {
      return res.status(400).json({ message: 'Invalid result ID format' });
    }

    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }

    // Enrich answers with question text and correct answer
    const enrichedAnswers = await Promise.all(
      result.answers.map(async (ans: any) => {
        const question = await Question.findOne({ questionId: ans.questionId });
        return {
          questionId: ans.questionId,
          selectedAnswer: ans.selectedAnswer,
          isCorrect: ans.isCorrect,
          explanation: ans.explanation || 'No explanation available.',
          aiGenerated: ans.aiGenerated || false,
          correctAnswer: question?.correct || 'N/A',
          questionText: question?.question || 'Unknown question',
        };
      })
    );

    // Get quiz, lesson, subject, and grade names
    const quiz = await Quiz.findOne({ quizId: result.quizId });
    let lesson = null;
    let subject = null;
    let gradeLevel = null;
    if (quiz) {
      lesson = await Lesson.findOne({ lessonId: quiz.lessonId });
      if (lesson) {
        subject = await Subject.findOne({ subjectId: lesson.subjectId });
        const grade = await Grade.findOne({ gradeId: lesson.gradeId });
        if (grade) gradeLevel = grade.level;
      }
    }

    const responseData = {
      resultId: result.resultId,
      quizId: result.quizId,
      quizTitle: quiz?.title || 'Unknown Quiz',
      subject: subject?.name || 'Unknown Subject',
      lesson: lesson?.title || 'Unknown Lesson',
      grade: gradeLevel,
      score: result.score,
      totalQuestions: result.totalQuestions,
      percentage: Math.round((result.score / result.totalQuestions) * 100),
      aiFeedback: result.aiFeedback || 'No feedback available.',
      recommendLesson: result.recommendLesson || '',
      answers: enrichedAnswers,
      takeTime: result.takeTime,
      createdAt: result.createdAt || result.takeTime,
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error fetching result by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get all results for the authenticated student
 */
export const getUserResults = async (req: AuthRequest, res: Response) => {
  try {
    const studentId = req.user._id;
    const results = await QuizResult.find({ studentId }).sort({ takeTime: -1 });
    res.json(results || []);
  } catch (error) {
    console.error('Error fetching user results:', error);
    res.json([]);
  }
};