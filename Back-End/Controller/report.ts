// import { Request, Response } from 'express';
// import { AuthRequest } from '../middleware/auth';
// import QuizResult from '../models/QuizResult';
// import StudentProgress from '../models/StudentProgress';

// export const getReport = async (req: AuthRequest, res: Response) => {
//   try {
//     const studentId = req.user._id;
//     const results = await QuizResult.find({ studentId });
//     const progress = await StudentProgress.find({ studentId });
//     // Calculate stats
//     const totalQuizzes = results.length;
//     const avgScore = results.reduce((acc, r) => acc + r.score, 0) / (totalQuizzes || 1);
//     const strengths = progress.filter(p => p.highScore > 70).map(p => p.subjectId);
//     const weaknesses = progress.filter(p => p.lowScore < 50).map(p => p.subjectId);

//     res.json({
//       totalQuizzes,
//       avgScore: Math.round(avgScore),
//       strengths,
//       weaknesses,
//       recent: results.slice(0, 5),
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import QuizResult from '../models/QuizResult';
import StudentProgress from '../models/StudentProgress';
import Subject from '../models/Subject';
import Lesson from '../models/Lesson';
import Quiz from '../models/Quiz';

// Get summary stats
export const getSummaryStats = async (req: AuthRequest, res: Response) => {
  try {
    const studentId = req.user._id;
    
    const results = await QuizResult.find({ studentId });
    const totalQuizzes = results.length;
    
    if (totalQuizzes === 0) {
      return res.json({
        totalQuizzes: 0,
        averageScore: 0,
        bestScore: 0,
        totalTimeSpent: 0,
        totalQuestionsAnswered: 0,
        passRate: 0,
      });
    }

    const scores = results.map(r => (r.score / r.totalQuestions) * 100);
    const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    const bestScore = Math.max(...scores);
    const passed = results.filter(r => (r.score / r.totalQuestions) >= 0.7).length;
    const passRate = (passed / totalQuizzes) * 100;
    const totalTimeSpent = results.reduce((acc, r) => acc + (r.takeTime ? 1 : 0), 0);
    const totalQuestionsAnswered = results.reduce((acc, r) => acc + r.totalQuestions, 0);

    res.json({
      totalQuizzes,
      averageScore: Math.round(averageScore),
      bestScore: Math.round(bestScore),
      totalTimeSpent,
      totalQuestionsAnswered,
      passRate: Math.round(passRate),
    });
  } catch (error) {
    console.error('Error fetching summary stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get subject performance
export const getSubjectPerformance = async (req: AuthRequest, res: Response) => {
  try {
    const studentId = req.user._id;
    
    const results = await QuizResult.find({ studentId });
    
    if (results.length === 0) {
      return res.json([]);
    }

    // Get all subjects from the database
    const subjects = await Subject.find();
    
    // Calculate performance per subject
    const subjectPerformance = await Promise.all(subjects.map(async (subject) => {
      // Find all quizzes for this subject
      const lessons = await Lesson.find({ subjectId: subject.subjectId });
      const lessonIds = lessons.map(l => l.lessonId);
      const quizzes = await Quiz.find({ lessonId: { $in: lessonIds } });
      const quizIds = quizzes.map(q => q.quizId);
      const subjectResults = results.filter(r => quizIds.includes(r.quizId));
      
      if (subjectResults.length === 0) {
        return {
          subjectId: subject.subjectId,
          name: subject.name,
          averageScore: 0,
          totalQuizzes: 0,
          bestScore: 0,
          progress: 0,
        };
      }

      const scores = subjectResults.map(r => (r.score / r.totalQuestions) * 100);
      const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      const bestScore = Math.max(...scores);
      const progress = Math.min(avgScore + 10, 100);

      return {
        subjectId: subject.subjectId,
        name: subject.name,
        averageScore: Math.round(avgScore),
        totalQuizzes: subjectResults.length,
        bestScore: Math.round(bestScore),
        progress: Math.round(progress),
      };
    }));

    res.json(subjectPerformance.sort((a, b) => b.averageScore - a.averageScore));
  } catch (error) {
    console.error('Error fetching subject performance:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get quiz history
export const getQuizHistory = async (req: AuthRequest, res: Response) => {
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
        const quiz = await Quiz.findOne({ quizId: result.quizId });
        if (!quiz) return null;

        const lesson = await Lesson.findOne({ lessonId: quiz.lessonId });
        if (!lesson) return null;

        const subject = await Subject.findOne({ subjectId: lesson.subjectId });

        const percentage = (result.score / result.totalQuestions) * 100;

        return {
          _id: result._id,
          quizId: result.quizId,
          subject: subject?.name || 'Unknown Subject',
          lesson: lesson.title || 'Unknown Lesson',
          score: result.score,
          totalQuestions: result.totalQuestions,
          percentage: Math.round(percentage),
          status: percentage >= 70 ? 'Passed' : 'Failed',
        };
      } catch (err) {
        console.error('Error processing quiz history item:', err);
        return null;
      }
    }));

    res.json(history.filter(item => item !== null));
  } catch (error) {
    console.error('Error fetching quiz history:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get AI insights
export const getAIInsights = async (req: AuthRequest, res: Response) => {
  try {
    const studentId = req.user._id;
    
    const results = await QuizResult.find({ studentId });
    
    if (results.length === 0) {
      return res.json({
        summary: 'Complete your first quiz to get AI-powered insights!',
        nextSteps: 'Take a quiz to start your learning journey.',
        strengths: [],
        weaknesses: [],
        recommendedLessons: [],
      });
    }

    const subjectScores: { [key: string]: { scores: number[], total: number } } = {};
    
    for (const result of results) {
      try {
        const quiz = await Quiz.findOne({ quizId: result.quizId });
        if (!quiz) continue;
        
        const lesson = await Lesson.findOne({ lessonId: quiz.lessonId });
        if (!lesson) continue;
        
        const subject = await Subject.findOne({ subjectId: lesson.subjectId });
        if (!subject) continue;
        
        const score = (result.score / result.totalQuestions) * 100;
        
        if (!subjectScores[subject.name]) {
          subjectScores[subject.name] = { scores: [], total: 0 };
        }
        subjectScores[subject.name].scores.push(score);
        subjectScores[subject.name].total++;
      } catch (err) {
        console.error('Error processing AI insight item:', err);
      }
    }

    const strengths: string[] = [];
    const weaknesses: string[] = [];
    
    Object.entries(subjectScores).forEach(([subject, data]) => {
      const avgScore = data.scores.reduce((a, b) => a + b, 0) / data.scores.length;
      if (avgScore >= 70) strengths.push(subject);
      else if (avgScore < 50) weaknesses.push(subject);
    });

    let summary = '';
    if (strengths.length > 0 && weaknesses.length > 0) {
      summary = `You are performing well in ${strengths.join(', ')}. Focus on improving in ${weaknesses.join(', ')}.`;
    } else if (strengths.length > 0) {
      summary = `Great job! You're excelling in ${strengths.join(', ')}. Keep up the good work!`;
    } else if (weaknesses.length > 0) {
      summary = `Focus on improving in ${weaknesses.join(', ')}. Practice these subjects more.`;
    } else {
      summary = 'Keep practicing to build your knowledge across all subjects!';
    }

    let nextSteps = '';
    if (weaknesses.length > 0) {
      nextSteps = `Review ${weaknesses.slice(0, 2).join(' and ')} modules and practice more questions.`;
    } else if (strengths.length > 0) {
      nextSteps = `Continue with advanced topics in ${strengths[0]}.`;
    } else {
      nextSteps = 'Start with any subject you find interesting.';
    }

    const recommendedLessons = weaknesses.length > 0 
      ? await Lesson.find({ 
          subjectId: { 
            $in: await Subject.find({ name: { $in: weaknesses } }).distinct('subjectId') 
          } 
        }).limit(3).distinct('title')
      : ['Algebra Basics', 'Introduction to Physics', 'Cell Biology'];

    res.json({
      summary,
      nextSteps,
      strengths: strengths.slice(0, 3),
      weaknesses: weaknesses.slice(0, 3),
      recommendedLessons: recommendedLessons.slice(0, 3),
    });
  } catch (error) {
    console.error('Error fetching AI insights:', error);
    res.status(500).json({ message: 'Server error' });
  }
};