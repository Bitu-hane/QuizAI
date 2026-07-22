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

// import { Response } from 'express';
// import { AuthRequest } from '../middleware/auth';
// import QuizResult from '../models/QuizResult';
// import StudentProgress from '../models/StudentProgress';
// import Subject from '../models/Subject';
// import Lesson from '../models/Lesson';
// import Quiz from '../models/Quiz';

// // Get summary stats
// export const getSummaryStats = async (req: AuthRequest, res: Response) => {
//   try {
//     const studentId = req.user._id;
    
//     const results = await QuizResult.find({ studentId });
//     const totalQuizzes = results.length;
    
//     if (totalQuizzes === 0) {
//       return res.json({
//         totalQuizzes: 0,
//         averageScore: 0,
//         bestScore: 0,
//         totalTimeSpent: 0,
//         totalQuestionsAnswered: 0,
//         passRate: 0,
//       });
//     }

//     const scores = results.map(r => (r.score / r.totalQuestions) * 100);
//     const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
//     const bestScore = Math.max(...scores);
//     const passed = results.filter(r => (r.score / r.totalQuestions) >= 0.7).length;
//     const passRate = (passed / totalQuizzes) * 100;
//     const totalTimeSpent = results.reduce((acc, r) => acc + (r.takeTime ? 1 : 0), 0);
//     const totalQuestionsAnswered = results.reduce((acc, r) => acc + r.totalQuestions, 0);

//     res.json({
//       totalQuizzes,
//       averageScore: Math.round(averageScore),
//       bestScore: Math.round(bestScore),
//       totalTimeSpent,
//       totalQuestionsAnswered,
//       passRate: Math.round(passRate),
//     });
//   } catch (error) {
//     console.error('Error fetching summary stats:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Get subject performance
// export const getSubjectPerformance = async (req: AuthRequest, res: Response) => {
//   try {
//     const studentId = req.user._id;
    
//     const results = await QuizResult.find({ studentId });
    
//     if (results.length === 0) {
//       return res.json([]);
//     }

//     // Get all subjects from the database
//     const subjects = await Subject.find();
    
//     // Calculate performance per subject
//     const subjectPerformance = await Promise.all(subjects.map(async (subject) => {
//       // Find all quizzes for this subject
//       const lessons = await Lesson.find({ subjectId: subject.subjectId });
//       const lessonIds = lessons.map(l => l.lessonId);
//       const quizzes = await Quiz.find({ lessonId: { $in: lessonIds } });
//       const quizIds = quizzes.map(q => q.quizId);
//       const subjectResults = results.filter(r => quizIds.includes(r.quizId));
      
//       if (subjectResults.length === 0) {
//         return {
//           subjectId: subject.subjectId,
//           name: subject.name,
//           averageScore: 0,
//           totalQuizzes: 0,
//           bestScore: 0,
//           progress: 0,
//         };
//       }

//       const scores = subjectResults.map(r => (r.score / r.totalQuestions) * 100);
//       const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
//       const bestScore = Math.max(...scores);
//       const progress = Math.min(avgScore + 10, 100);

//       return {
//         subjectId: subject.subjectId,
//         name: subject.name,
//         averageScore: Math.round(avgScore),
//         totalQuizzes: subjectResults.length,
//         bestScore: Math.round(bestScore),
//         progress: Math.round(progress),
//       };
//     }));

//     res.json(subjectPerformance.sort((a, b) => b.averageScore - a.averageScore));
//   } catch (error) {
//     console.error('Error fetching subject performance:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Get quiz history
// export const getQuizHistory = async (req: AuthRequest, res: Response) => {
//   try {
//     const studentId = req.user._id;
    
//     const results = await QuizResult.find({ studentId })
//       .sort({ createdAt: -1 })
//       .limit(20);
    
//     if (results.length === 0) {
//       return res.json([]);
//     }

//     const history = await Promise.all(results.map(async (result) => {
//       try {
//         const quiz = await Quiz.findOne({ quizId: result.quizId });
//         if (!quiz) return null;

//         const lesson = await Lesson.findOne({ lessonId: quiz.lessonId });
//         if (!lesson) return null;

//         const subject = await Subject.findOne({ subjectId: lesson.subjectId });

//         const percentage = (result.score / result.totalQuestions) * 100;

//         return {
//           _id: result._id,
//           quizId: result.quizId,
//           subject: subject?.name || 'Unknown Subject',
//           lesson: lesson.title || 'Unknown Lesson',
//           score: result.score,
//           totalQuestions: result.totalQuestions,
//           percentage: Math.round(percentage),
//           status: percentage >= 70 ? 'Passed' : 'Failed',
//         };
//       } catch (err) {
//         console.error('Error processing quiz history item:', err);
//         return null;
//       }
//     }));

//     res.json(history.filter(item => item !== null));
//   } catch (error) {
//     console.error('Error fetching quiz history:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Get AI insights
// export const getAIInsights = async (req: AuthRequest, res: Response) => {
//   try {
//     const studentId = req.user._id;
    
//     const results = await QuizResult.find({ studentId });
    
//     if (results.length === 0) {
//       return res.json({
//         summary: 'Complete your first quiz to get AI-powered insights!',
//         nextSteps: 'Take a quiz to start your learning journey.',
//         strengths: [],
//         weaknesses: [],
//         recommendedLessons: [],
//       });
//     }

//     const subjectScores: { [key: string]: { scores: number[], total: number } } = {};
    
//     for (const result of results) {
//       try {
//         const quiz = await Quiz.findOne({ quizId: result.quizId });
//         if (!quiz) continue;
        
//         const lesson = await Lesson.findOne({ lessonId: quiz.lessonId });
//         if (!lesson) continue;
        
//         const subject = await Subject.findOne({ subjectId: lesson.subjectId });
//         if (!subject) continue;
        
//         const score = (result.score / result.totalQuestions) * 100;
        
//         if (!subjectScores[subject.name]) {
//           subjectScores[subject.name] = { scores: [], total: 0 };
//         }
//         subjectScores[subject.name].scores.push(score);
//         subjectScores[subject.name].total++;
//       } catch (err) {
//         console.error('Error processing AI insight item:', err);
//       }
//     }

//     const strengths: string[] = [];
//     const weaknesses: string[] = [];
    
//     Object.entries(subjectScores).forEach(([subject, data]) => {
//       const avgScore = data.scores.reduce((a, b) => a + b, 0) / data.scores.length;
//       if (avgScore >= 70) strengths.push(subject);
//       else if (avgScore < 50) weaknesses.push(subject);
//     });

//     let summary = '';
//     if (strengths.length > 0 && weaknesses.length > 0) {
//       summary = `You are performing well in ${strengths.join(', ')}. Focus on improving in ${weaknesses.join(', ')}.`;
//     } else if (strengths.length > 0) {
//       summary = `Great job! You're excelling in ${strengths.join(', ')}. Keep up the good work!`;
//     } else if (weaknesses.length > 0) {
//       summary = `Focus on improving in ${weaknesses.join(', ')}. Practice these subjects more.`;
//     } else {
//       summary = 'Keep practicing to build your knowledge across all subjects!';
//     }

//     let nextSteps = '';
//     if (weaknesses.length > 0) {
//       nextSteps = `Review ${weaknesses.slice(0, 2).join(' and ')} modules and practice more questions.`;
//     } else if (strengths.length > 0) {
//       nextSteps = `Continue with advanced topics in ${strengths[0]}.`;
//     } else {
//       nextSteps = 'Start with any subject you find interesting.';
//     }

//     const recommendedLessons = weaknesses.length > 0 
//       ? await Lesson.find({ 
//           subjectId: { 
//             $in: await Subject.find({ name: { $in: weaknesses } }).distinct('subjectId') 
//           } 
//         }).limit(3).distinct('title')
//       : ['Algebra Basics', 'Introduction to Physics', 'Cell Biology'];

//     res.json({
//       summary,
//       nextSteps,
//       strengths: strengths.slice(0, 3),
//       weaknesses: weaknesses.slice(0, 3),
//       recommendedLessons: recommendedLessons.slice(0, 3),
//     });
//   } catch (error) {
//     console.error('Error fetching AI insights:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import QuizResult from '../models/QuizResult';
import StudentProgress from '../models/StudentProgress';
import Subject from '../models/Subject';
import Lesson from '../models/Lesson';
import Quiz from '../models/Quiz';
import Grade from '../models/Grade';
import User from '../models/User';
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

    // 1. Get all subjects (or only those the student has taken)
    const allSubjects = await Subject.find();
    const gradeIds = [...new Set(allSubjects.map(s => s.gradeId))];
    const grades = await Grade.find({ gradeId: { $in: gradeIds } });

    // 2. Build performance per subject
    const subjectPerf = await Promise.all(allSubjects.map(async (subject) => {
      const lessons = await Lesson.find({ subjectId: subject.subjectId });
      const lessonIds = lessons.map(l => l.lessonId);
      const quizzes = await Quiz.find({ lessonId: { $in: lessonIds } });
      const quizIds = quizzes.map(q => q.quizId);
      const subjectResults = results.filter(r => quizIds.includes(r.quizId));
      
      if (subjectResults.length === 0) return null;

      const scores = subjectResults.map(r => (r.score / r.totalQuestions) * 100);
      const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      const bestScore = Math.max(...scores);
      const progress = Math.min(avgScore + 10, 100);

      return {
        subjectId: subject.subjectId,
        name: subject.name,
        gradeId: subject.gradeId,
        averageScore: Math.round(avgScore),
        totalQuizzes: subjectResults.length,
        bestScore: Math.round(bestScore),
        progress: Math.round(progress),
      };
    }));

    // Remove nulls and group by grade
    const valid = subjectPerf.filter(p => p !== null) as any[];
    if (valid.length === 0) return res.json([]);

    const grouped: { [gradeId: number]: any[] } = {};
    valid.forEach(item => {
      if (!grouped[item.gradeId]) grouped[item.gradeId] = [];
      grouped[item.gradeId].push(item);
    });

    const result = Object.entries(grouped).map(([gradeId, subjects]) => {
      const grade = grades.find(g => g.gradeId === Number(gradeId));
      const avg = subjects.reduce((acc, s) => acc + s.averageScore, 0) / subjects.length;
      return {
        gradeId: Number(gradeId),
        gradeLevel: grade?.level || Number(gradeId),
        subjects: subjects.sort((a, b) => b.averageScore - a.averageScore),
        averageScore: Math.round(avg),
      };
    });

    res.json(result.sort((a, b) => a.gradeLevel - b.gradeLevel));
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
        const grade = await Grade.findOne({ gradeId: lesson.gradeId });

        const percentage = (result.score / result.totalQuestions) * 100;

        return {
          _id: result._id,
          resultId: result.resultId,
          quizId: result.quizId,
          grade: grade?.level || lesson.gradeId,
          subject: subject?.name || 'Unknown Subject',
          lesson: lesson.title || 'Unknown Lesson',
          score: result.score,
          totalQuestions: result.totalQuestions,
          percentage: Math.round(percentage),
          status: percentage >= 70 ? 'Passed' : 'Failed',
          createdAt: result.createdAt || result.takeTime || new Date(),
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


export const getStudentReportByTelegram = async (req: Request, res: Response) => {
  try {
    const telegramId = Number(req.params.telegramId);
    if (!telegramId) {
      return res.status(400).json({ message: 'Missing telegramId' });
    }

    // Find user by telegramId
    const user = await User.findOne({ telegramId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get all quiz results for this user
    const results = await QuizResult.find({ studentId: user._id }).sort({ takeTime: -1 });

    if (results.length === 0) {
      return res.json({
        user: {
          name: `${user.FName} ${user.LName}`.trim() || user.telegramUsername || 'Student',
          telegramUsername: user.telegramUsername,
        },
        totalQuizzes: 0,
        averageScore: 0,
        bestScore: 0,
        passRate: 0,
        recentHistory: [],
      });
    }

    // Summary stats
    const totalQuizzes = results.length;
    const scores = results.map(r => (r.score / r.totalQuestions) * 100);
    const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    const bestScore = Math.max(...scores);
    const passed = results.filter(r => (r.score / r.totalQuestions) >= 0.7).length;
    const passRate = (passed / totalQuizzes) * 100;

    // Recent history (last 5)
  const recent = results.slice(0, 10).map(r => ({
  resultId: r._id.toString(),   // <-- add this
  quizId: r.quizId,
  score: r.score,
  total: r.totalQuestions,
  percentage: Math.round((r.score / r.totalQuestions) * 100),
  date: r.createdAt || r.takeTime,
}));

    res.json({
      user: {
        name: `${user.FName} ${user.LName}`.trim() || user.telegramUsername || 'Student',
        telegramUsername: user.telegramUsername,
      },
      totalQuizzes,
      averageScore: Math.round(averageScore),
      bestScore: Math.round(bestScore),
      passRate: Math.round(passRate),
      recentHistory: recent,
    });
  } catch (error) {
    console.error('Error fetching student report:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getStudentSubjects = async (req: Request, res: Response) => {
  try {
    const telegramId = Number(req.params.telegramId);
    const user = await User.findOne({ telegramId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const results = await QuizResult.find({ studentId: user._id });
    if (results.length === 0) return res.json([]);

    const quizIds = [...new Set(results.map(r => r.quizId))];
    const quizzes = await Quiz.find({ quizId: { $in: quizIds } });
    const lessonIds = [...new Set(quizzes.map(q => q.lessonId))];
    const lessons = await Lesson.find({ lessonId: { $in: lessonIds } });
    const subjectIds = [...new Set(lessons.map(l => l.subjectId))];
    const subjects = await Subject.find({ subjectId: { $in: subjectIds } });

    // Pre-fetch grades
    const grades = await Grade.find();
    const gradeMap = new Map(grades.map(g => [g.gradeId, g.level]));

    const subjectStats = subjects.map(subject => {
      const subjectLessons = lessons.filter(l => l.subjectId === subject.subjectId);
      const subjectLessonIds = subjectLessons.map(l => l.lessonId);
      const subjectQuizIds = quizzes.filter(q => subjectLessonIds.includes(q.lessonId)).map(q => q.quizId);
      const subjectResults = results.filter(r => subjectQuizIds.includes(r.quizId));
      
      if (subjectResults.length === 0) return null;
      const scores = subjectResults.map(r => (r.score / r.totalQuestions) * 100);
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      const best = Math.max(...scores);
      return {
        subjectId: subject.subjectId,
        name: subject.name,
        gradeId: subject.gradeId,
        gradeLevel: gradeMap.get(subject.gradeId) || subject.gradeId,
        averageScore: Math.round(avg),
        bestScore: Math.round(best),
        totalQuizzes: subjectResults.length,
      };
    }).filter(s => s !== null);

    res.json(subjectStats);
  } catch (error) {
    console.error('Error fetching student subjects:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get lessons for a subject (with stats)
export const getStudentLessonsBySubject = async (req: Request, res: Response) => {
  try {
    const telegramId = Number(req.params.telegramId);
    const subjectId = Number(req.params.subjectId);
    const user = await User.findOne({ telegramId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const results = await QuizResult.find({ studentId: user._id });
    if (results.length === 0) return res.json([]);

    const quizIds = [...new Set(results.map(r => r.quizId))];
    const quizzes = await Quiz.find({ quizId: { $in: quizIds } });
    const lessons = await Lesson.find({ subjectId });
    const lessonIds = lessons.map(l => l.lessonId);
    const lessonQuizIds = quizzes.filter(q => lessonIds.includes(q.lessonId)).map(q => q.quizId);
    const lessonResults = results.filter(r => lessonQuizIds.includes(r.quizId));

    const lessonStats = lessons.map(lesson => {
      const lessonQuizzes = quizzes.filter(q => q.lessonId === lesson.lessonId);
      const lessonQuizIds = lessonQuizzes.map(q => q.quizId);
      const lessonResults = results.filter(r => lessonQuizIds.includes(r.quizId));
      if (lessonResults.length === 0) return null;
      const scores = lessonResults.map(r => (r.score / r.totalQuestions) * 100);
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      const best = Math.max(...scores);
      return {
        lessonId: lesson.lessonId,
        title: lesson.title,
        averageScore: Math.round(avg),
        bestScore: Math.round(best),
        totalQuizzes: lessonResults.length,
      };
    }).filter(l => l !== null);

    res.json(lessonStats);
  } catch (error) {
    console.error('Error fetching student lessons:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get quizzes taken for a lesson (with result IDs)
export const getStudentQuizzesByLesson = async (req: Request, res: Response) => {
  try {
    const telegramId = Number(req.params.telegramId);
    const lessonId = Number(req.params.lessonId);
    const user = await User.findOne({ telegramId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const results = await QuizResult.find({ studentId: user._id });
    if (results.length === 0) return res.json([]);

    const quizzes = await Quiz.find({ lessonId });
    const quizIds = quizzes.map(q => q.quizId);
    const lessonResults = results.filter(r => quizIds.includes(r.quizId));

    const quizStats = lessonResults.map(r => ({
      quizId: r.quizId,
      resultId: r._id.toString(),
      score: r.score,
      total: r.totalQuestions,
      percentage: Math.round((r.score / r.totalQuestions) * 100),
      date: r.createdAt || r.takeTime,
      title: quizzes.find(q => q.quizId === r.quizId)?.title || 'Quiz',
    }));

    res.json(quizStats);
  } catch (error) {
    console.error('Error fetching student quizzes:', error);
    res.status(500).json({ message: 'Server error' });
  }
};