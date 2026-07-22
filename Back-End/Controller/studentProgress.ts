// // backend/src/controllers/studentProgress.controller.ts
// import { Response } from 'express';
// import { AuthRequest } from '../middleware/auth';
// import StudentProgress from '../models/StudentProgress';
// import Subject from '../models/Subject';
// import Grade from '../models/Grade';
// import Lesson from '../models/Lesson';
// import QuizResult from '../models/QuizResult';

// // ✅ Update or create student progress after a quiz
// export const updateProgress = async (req: AuthRequest, res: Response) => {
//   try {
//     const studentId = req.user._id;
//     const { subjectId, gradeId, lessonId, score, totalQuestions, passed } = req.body;

//     // Validate required fields
//     if (!subjectId || !gradeId || !lessonId) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     // Find existing progress or create new
//     const progress = await StudentProgress.findOneAndUpdate(
//       { 
//         studentId, 
//         subjectId, 
//         gradeId, 
//         lessonId 
//       },
//       {
//         $inc: { 
//           quizTaken: 1,
//           quizPassed: passed ? 1 : 0,
//         },
//         $max: { highScore: score },
//         $min: { lowScore: score },
//         $set: { 
//           lastQuizDate: new Date(),
//           updatedAt: new Date(),
//         },
//       },
//       { 
//         new: true, 
//         upsert: true, 
//         setDefaultsOnInsert: true 
//       }
//     );

//     // If new, set progressId
//     if (progress.progressId === undefined) {
//       const lastProgress = await StudentProgress.findOne().sort({ progressId: -1 });
//       progress.progressId = lastProgress ? lastProgress.progressId + 1 : 1;
//       await progress.save();
//     }

//     res.json({
//       message: 'Progress updated successfully',
//       progress,
//     });
//   } catch (error) {
//     console.error('Error updating progress:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // ✅ Get progress by student and grade
// export const getProgressByGrade = async (req: AuthRequest, res: Response) => {
//   try {
//     const studentId = req.user._id;
//     const { gradeId } = req.params;

//     const progress = await StudentProgress.find({ 
//       studentId, 
//       gradeId: Number(gradeId) 
//     }).sort({ subjectId: 1 });

//     // Get subject names
//     const subjectIds = progress.map(p => p.subjectId);
//     const subjects = await Subject.find({ subjectId: { $in: subjectIds } });
//     const subjectMap = subjects.reduce((map, s) => {
//       map[s.subjectId] = s.name;
//       return map;
//     }, {} as { [key: number]: string });

//     const formattedProgress = progress.map(p => ({
//       ...p.toObject(),
//       subjectName: subjectMap[p.subjectId] || 'Unknown',
//     }));

//     res.json(formattedProgress);
//   } catch (error) {
//     console.error('Error fetching progress by grade:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // ✅ Get overall progress summary
// export const getOverallProgress = async (req: AuthRequest, res: Response) => {
//   try {
//     const studentId = req.user._id;

//     const progress = await StudentProgress.find({ studentId });

//     const totalQuizzes = progress.reduce((sum, p) => sum + p.quizTaken, 0);
//     const totalPassed = progress.reduce((sum, p) => sum + p.quizPassed, 0);
//     const averageScore = progress.reduce((sum, p) => sum + p.highScore, 0) / (progress.length || 1);

//     // Get grades the student has studied
//     const gradeIds = [...new Set(progress.map(p => p.gradeId))];
//     const grades = await Grade.find({ gradeId: { $in: gradeIds } });

//     res.json({
//       totalQuizzes,
//       totalPassed,
//       averageScore: Math.round(averageScore),
//       passRate: totalQuizzes > 0 ? Math.round((totalPassed / totalQuizzes) * 100) : 0,
//       gradesStudied: grades.map(g => ({ gradeId: g.gradeId, level: g.level })),
//       totalLessons: progress.length,
//     });
//   } catch (error) {
//     console.error('Error fetching overall progress:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // ✅ Get progress by subject across all grades
// export const getProgressBySubject = async (req: AuthRequest, res: Response) => {
//   try {
//     const studentId = req.user._id;
//     const { subjectId } = req.params;

//     const progress = await StudentProgress.find({ 
//       studentId, 
//       subjectId: Number(subjectId) 
//     }).sort({ gradeId: 1 });

//     // Get grade names
//     const gradeIds = [...new Set(progress.map(p => p.gradeId))];
//     const grades = await Grade.find({ gradeId: { $in: gradeIds } });
//     const gradeMap = grades.reduce((map, g) => {
//       map[g.gradeId] = g.level;
//       return map;
//     }, {} as { [key: number]: number });

//     const formattedProgress = progress.map(p => ({
//       ...p.toObject(),
//       gradeLevel: gradeMap[p.gradeId] || p.gradeId,
//     }));

//     res.json(formattedProgress);
//   } catch (error) {
//     console.error('Error fetching progress by subject:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // ✅ Get recent quiz history with progress data
// export const getRecentQuizHistory = async (req: AuthRequest, res: Response) => {
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
//         // Get progress for this quiz
//         const progress = await StudentProgress.findOne({
//           studentId,
//           // We need to find the right progress entry
//         });

//         return {
//           _id: result._id,
//           quizId: result.quizId,
//           score: result.score,
//           totalQuestions: result.totalQuestions,
//           percentage: Math.round((result.score / result.totalQuestions) * 100),
//           status: (result.score / result.totalQuestions) >= 0.7 ? 'Passed' : 'Failed',
//         };
//       } catch (err) {
//         console.error('Error processing history item:', err);
//         return null;
//       }
//     }));

//     res.json(history.filter(item => item !== null));
//   } catch (error) {
//     console.error('Error fetching recent quiz history:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };



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
    const subjectMap = subjects.reduce((map: { [key: number]: string }, s: any) => {
      map[s.subjectId] = s.name;
      return map;
    }, {});

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

    const totalQuizzes = progress.reduce((sum: number, p: any) => sum + p.quizTaken, 0);
    const totalPassed = progress.reduce((sum: number, p: any) => sum + p.quizPassed, 0);
    const averageScore = progress.reduce((sum: number, p: any) => sum + p.highScore, 0) / (progress.length || 1);

    // Get grades the student has studied
    const gradeIds = [...new Set(progress.map(p => p.gradeId))];
    const grades = await Grade.find({ gradeId: { $in: gradeIds } });

    res.json({
      totalQuizzes,
      totalPassed,
      averageScore: Math.round(averageScore),
      passRate: totalQuizzes > 0 ? Math.round((totalPassed / totalQuizzes) * 100) : 0,
      gradesStudied: grades.map((g: any) => ({ gradeId: g.gradeId, level: g.level })),
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
    const gradeMap = grades.reduce((map: { [key: number]: number }, g: any) => {
      map[g.gradeId] = g.level;
      return map;
    }, {});

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

// ✅ Get all subjects the student has progress in (aggregated by subject)
export const getAllSubjectsProgress = async (req: AuthRequest, res: Response) => {
  try {
    const studentId = req.user._id;

    const progress = await StudentProgress.find({ studentId });

    if (progress.length === 0) {
      return res.json([]);
    }

    // Get all subject IDs from progress
    const subjectIds = [...new Set(progress.map(p => p.subjectId))];
    const subjects = await Subject.find({ subjectId: { $in: subjectIds } });
    const subjectMap = subjects.reduce((map: { [key: number]: string }, s: any) => {
      map[s.subjectId] = s.name;
      return map;
    }, {});

    // Aggregate progress by subject
    const subjectAggregation: { [key: number]: any } = {};
    
    progress.forEach((p: any) => {
      if (!subjectAggregation[p.subjectId]) {
        subjectAggregation[p.subjectId] = {
          subjectId: p.subjectId,
          totalQuizzes: 0,
          totalPassed: 0,
          highScore: 0,
          lowScore: 100,
          lastQuizDate: null,
        };
      }
      
      const agg = subjectAggregation[p.subjectId];
      agg.totalQuizzes += p.quizTaken;
      agg.totalPassed += p.quizPassed;
      agg.highScore = Math.max(agg.highScore, p.highScore);
      agg.lowScore = Math.min(agg.lowScore, p.lowScore);
      if (p.lastQuizDate && (!agg.lastQuizDate || p.lastQuizDate > agg.lastQuizDate)) {
        agg.lastQuizDate = p.lastQuizDate;
      }
    });

    // Format response
    const formatted = Object.values(subjectAggregation).map((agg: any) => {
      const name = subjectMap[agg.subjectId] || `Subject ${agg.subjectId}`;
      const progressRate = agg.totalQuizzes > 0 
        ? Math.round((agg.totalPassed / agg.totalQuizzes) * 100) 
        : 0;
      
      return {
        subjectId: agg.subjectId,
        subjectName: name,
        totalQuizzes: agg.totalQuizzes,
        totalPassed: agg.totalPassed,
        highScore: agg.highScore,
        lowScore: agg.lowScore === 100 ? 0 : agg.lowScore,
        progressRate,
        lastQuizDate: agg.lastQuizDate,
      };
    });

    // Sort by progress rate descending
    formatted.sort((a, b) => b.progressRate - a.progressRate);

    res.json(formatted);
  } catch (error) {
    console.error('Error fetching all subjects progress:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get dashboard stats for the student
export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const studentId = req.user._id;

    // Get all progress
    const progress = await StudentProgress.find({ studentId });
    
    if (progress.length === 0) {
      return res.json({
        totalQuizzes: 0,
        averageScore: 0,
        subjectsPassed: 0,
        studyStreak: 0,
        strengths: [],
        weaknesses: [],
        recentHistory: [],
      });
    }

    // Get recent quiz results (last 5)
    const recentResults = await QuizResult.find({ studentId })
      .sort({ createdAt: -1 })
      .limit(5);

    // Get subject names
    const subjectIds = [...new Set(progress.map(p => p.subjectId))];
    const subjects = await Subject.find({ subjectId: { $in: subjectIds } });
    const subjectMap = subjects.reduce((map: { [key: number]: string }, s: any) => {
      map[s.subjectId] = s.name;
      return map;
    }, {});

    // Calculate total quizzes and average score
    let totalQuizzes = 0;
    let totalScoreSum = 0;
    let totalQuestionsSum = 0;

    // Get all quiz results for average
    const allResults = await QuizResult.find({ studentId });
    allResults.forEach((r: any) => {
      totalScoreSum += r.score;
      totalQuestionsSum += r.totalQuestions;
    });

    const avgScore = totalQuestionsSum > 0 
      ? Math.round((totalScoreSum / totalQuestionsSum) * 100) 
      : 0;

    // Calculate subjects passed (progress rate >= 70%)
    const subjectAggregation: { [key: number]: any } = {};
    progress.forEach((p: any) => {
      if (!subjectAggregation[p.subjectId]) {
        subjectAggregation[p.subjectId] = { totalQuizzes: 0, totalPassed: 0 };
      }
      subjectAggregation[p.subjectId].totalQuizzes += p.quizTaken;
      subjectAggregation[p.subjectId].totalPassed += p.quizPassed;
    });

    const subjectsPassed = Object.values(subjectAggregation).filter((agg: any) => {
      const rate = agg.totalQuizzes > 0 ? (agg.totalPassed / agg.totalQuizzes) * 100 : 0;
      return rate >= 70;
    }).length;

    // Calculate study streak (consecutive days with quiz activity)
    const dates = await QuizResult.find({ studentId })
      .select('createdAt takeTime')
      .sort({ createdAt: -1 });
    
    let streak = 0;
    if (dates.length > 0) {
      const uniqueDates = dates.map((d: any) => {
        const date = new Date(d.createdAt || d.takeTime);
        date.setHours(0, 0, 0, 0);
        return date.getTime();
      });
      const unique = [...new Set(uniqueDates)].sort((a, b) => b - a);
      
      // Check if last activity was today or yesterday
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      const lastDate = new Date(unique[0]);
      lastDate.setHours(0, 0, 0, 0);
      
      if (lastDate.getTime() === today.getTime() || lastDate.getTime() === yesterday.getTime()) {
        let expectedDate = new Date(lastDate);
        for (const date of unique) {
          const d = new Date(date);
          d.setHours(0, 0, 0, 0);
          if (d.getTime() === expectedDate.getTime()) {
            streak++;
            expectedDate.setDate(expectedDate.getDate() - 1);
          } else {
            break;
          }
        }
      }
    }

    // Determine strengths and weaknesses
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    Object.entries(subjectAggregation).forEach(([subjectId, agg]: [string, any]) => {
      const rate = agg.totalQuizzes > 0 ? (agg.totalPassed / agg.totalQuizzes) * 100 : 0;
      const name = subjectMap[Number(subjectId)] || `Subject ${subjectId}`;
      if (rate >= 70) strengths.push(name);
      if (rate < 50 && agg.totalQuizzes > 0) weaknesses.push(name);
    });

    // Recent history format
    const recentHistory = recentResults.map((r: any) => ({
      _id: r._id,
      quizId: r.quizId,
      score: r.score,
      totalQuestions: r.totalQuestions,
      percentage: Math.round((r.score / r.totalQuestions) * 100),
      takeTime: r.createdAt || r.takeTime,
      status: (r.score / r.totalQuestions) >= 0.7 ? 'Passed' : 'Failed',
    }));

    res.json({
      totalQuizzes,
      averageScore: avgScore,
      subjectsPassed,
      studyStreak: streak,
      strengths: strengths.length > 0 ? strengths : ['Complete more quizzes to identify strengths'],
      weaknesses: weaknesses.length > 0 ? weaknesses : ['Complete more quizzes to identify areas for improvement'],
      recentHistory,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
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

    const history = results.map((result: any) => {
      const percentage = (result.score / result.totalQuestions) * 100;
      return {
        _id: result._id,
        quizId: result.quizId,
        score: result.score,
        totalQuestions: result.totalQuestions,
        percentage: Math.round(percentage),
        status: percentage >= 70 ? 'Passed' : 'Failed',
        createdAt: result.createdAt || result.takeTime,
        takeTime: result.takeTime,
      };
    });

    res.json(history);
  } catch (error) {
    console.error('Error fetching recent quiz history:', error);
    res.status(500).json({ message: 'Server error' });
  }
};