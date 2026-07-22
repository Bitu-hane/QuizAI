


// import { Request, Response } from 'express';
// import Quiz from '../models/Quiz';
// import Question from '../models/Question';
// import QuizResult from '../models/QuizResult';
// import User from '../models/User';
// import Role from '../models/Role';
// import UserRole from '../models/UserRole';
// import { generateFeedback, generateQuestionExplanation } from '../services/ai';
// import { AuthRequest } from '../middleware/auth';

// export const getQuizzes = async (req: Request, res: Response) => {
//   try {
//     const quizzes = await Quiz.find({});
//     res.json(quizzes);
//   } catch (error) {
//     console.error('Error fetching quizzes:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const getQuizByLesson = async (req: Request, res: Response) => {
//   try {
//     const { lessonId } = req.params;
//     const quiz = await Quiz.findOne({ lessonId: Number(lessonId) });
//     if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

//     const questions = await Question.find({ questionId: { $in: quiz.questions } });
    
//     // ✅ Parse options from string to array and hide correct answers
//     const sanitized = questions.map(q => ({
//       questionId: q.questionId,
//       question: q.question,
//       options: JSON.parse(q.options || '[]'), // <-- Parse the string to array
//       topic: q.topic || '',
//     }));

//     res.json({ 
//       quiz: { ...quiz.toObject(), questions: sanitized }, 
//       timelimit: quiz.timelimit 
//     });
//   } catch (error) {
//     console.error('Error fetching quiz:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// interface AnswerInput {
//   questionId: number;
//   selectedAnswer: string;
// }

// type TelegramUserInput = {
//   telegramId?: number;
//   firstName?: string;
//   lastName?: string;
//   username?: string;
//   grade?: number;
// };
// const getOrCreateTelegramStudent = async (telegramUser?: any, queryTelegramId?: unknown) => {
//   // Support both 'id' (from bot) and 'telegramId' (from web)
//   const telegramId = Number(telegramUser?.id || telegramUser?.telegramId || queryTelegramId);
//   if (!telegramId) {
//     console.error('❌ No valid telegramId found:', { telegramUser, queryTelegramId });
//     return null;
//   }

//   const generatedEmail = `telegram-${telegramId}@telegram.local`;
//   const firstName = telegramUser?.firstName?.trim() || 'Telegram';
//   const lastName = telegramUser?.lastName?.trim() || telegramUser?.username?.trim() || 'Student';

//   let user = await User.findOne({
//     $or: [
//       { telegramId },
//       { email: generatedEmail },
//     ],
//   });

//   if (user) {
//     user.telegramId = telegramId;
//     user.telegramUsername = telegramUser?.username || user.telegramUsername;
//     user.telegramFirstName = firstName;
//     user.telegramLastName = lastName;
//     user.FName = user.FName || firstName;
//     user.LName = user.LName || lastName;
//     if (telegramUser?.grade) user.gradeId = telegramUser.grade;
//     user.updatedAt = new Date();
//     await user.save();
//   } else {
//     user = await User.create({
//       FName: firstName,
//       MName: '',
//       LName: lastName,
//       gender: 'male',
//       dateOfBirth: new Date('2000-01-01'),
//       email: generatedEmail,
//       gradeId: telegramUser?.grade || undefined,
//       status: 'active',
//       PImage: [],
//       onboardingCompleted: true,
//       telegramId,
//       telegramUsername: telegramUser?.username || '',
//       telegramFirstName: firstName,
//       telegramLastName: lastName,
//     });
//   }

//   const studentRole = await Role.findOne({ name: 'student' });
//   if (studentRole) {
//     await UserRole.findOneAndUpdate(
//       { userId: user._id, roleId: studentRole._id },
//       { userId: user._id, roleId: studentRole._id },
//       { upsert: true, new: true, setDefaultsOnInsert: true }
//     );
//   }

//   return user;
// };
// export const submitQuiz = async (req: AuthRequest, res: Response) => {
//   try {
//     const { quizId, answers, timeTaken, telegramUser } = req.body;
//     console.log('📝 Received telegramUser:', telegramUser);
//     console.log('📝 req.query.telegramId:', req.query.telegramId);
//     const telegramStudent = req.user ? null : await getOrCreateTelegramStudent(telegramUser, req.query.telegramId);
    
//     const studentId = req.user?._id || telegramStudent?._id;

//     // Validate
//     if (!quizId || !answers || !Array.isArray(answers)) {
//       return res.status(400).json({ message: 'Invalid request body' });
//     }

//     // Fetch quiz and questions
//     const quiz = await Quiz.findOne({ quizId: Number(quizId) });
//     if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

//     const questions = await Question.find({ questionId: { $in: quiz.questions } });
//     if (questions.length === 0) {
//       return res.status(404).json({ message: 'No questions found' });
//     }

//     // ✅ Build detailed answers with AI explanations for ALL wrong answers
//     const detailedAnswers = await Promise.all(
//       answers.map(async (a: any) => {
//         const q = questions.find(q => q.questionId === a.questionId);
//         const isCorrect = q && q.correct === a.selectedAnswer;

//         let explanation = '';
//         let aiGenerated = false;

//         if (!isCorrect) {
//           // ALWAYS generate AI explanation for wrong answers
//           try {
//             // HIGHLIGHT: Backend asks Groq to create the explanation for a wrong answer.
//             explanation = await generateQuestionExplanation(
//               q?.question || 'Unknown question',
//               a.selectedAnswer,
//               q?.correct || 'N/A'
//             );
//             aiGenerated = true;
//           } catch (err) {
//             console.error('AI explanation error:', err);
//             // Fallback: use manual explanation if available
//             explanation = q?.explanation || `The correct answer is "${q?.correct || 'N/A'}". Review the material.`;
//           }
//         } else {
//           explanation = '✅ Correct! Well done!';
//         }

//         return {
//           questionId: a.questionId,
//           selectedAnswer: a.selectedAnswer,
//           correctAnswer: q?.correct || 'N/A',
//           isCorrect: !!isCorrect,
//           explanation,
//           aiGenerated,
//         };
//       })
//     );

//     // Calculate score
//     const correctCount = detailedAnswers.filter(a => a.isCorrect).length;
//     const totalQuestions = questions.length;
//     const score = correctCount;

//     // Generate overall feedback
//     const wrongQuestions = detailedAnswers
//       .filter(a => !a.isCorrect)
//       .map(a => ({
//         question: questions.find(q => q.questionId === a.questionId)?.question || '',
//         selectedAnswer: a.selectedAnswer,
//         correctAnswer: questions.find(q => q.questionId === a.questionId)?.correct || '',
//         explanation: a.explanation,
//       }));

//     const { feedback, recommendation } = await generateFeedback(score, totalQuestions, wrongQuestions);

//     // Save web and Telegram results when we can identify a student user.
//     const resultId = Date.now();
//     if (studentId) {
//       await QuizResult.create({
//         resultId,
//         studentId,
//         quizId: quiz.quizId,
//         score,
//         aiFeedback: feedback,
//         recommendLesson: recommendation,
//         takeTime: new Date(timeTaken || Date.now()),
//         answers: detailedAnswers.map(a => ({
//           questionId: a.questionId,
//           selectedAnswer: a.selectedAnswer,
//           isCorrect: a.isCorrect,
//           explanation: a.explanation,
//           aiGenerated: a.aiGenerated,
//         })),
//         totalQuestions,
//       });
//     }

//     // Return full result including explanations
//     res.status(201).json({
//       resultId,
//       score,
//       totalQuestions,
//       percentage: Math.round((score / totalQuestions) * 100),
//       feedback,
//       recommendation,
//       answers: detailedAnswers,
//     });

//   } catch (error) {
//     console.error('Submit quiz error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const getQuizById = async (req: Request, res: Response) => {
//   try {
//     const { quizId } = req.params;
//     const quiz = await Quiz.findOne({ quizId: Number(quizId) });
//     if (!quiz) {
//       return res.status(404).json({ message: 'Quiz not found' });
//     }

//     // Fetch questions (include all fields for admin editing)
//     const questions = await Question.find({ questionId: { $in: quiz.questions } });

//     res.json({
//       ...quiz.toObject(),
//       questions: questions.map(q => ({
//         questionId: q.questionId,
//         question: q.question,
//         options: JSON.parse(q.options || '[]'),
//         correct: q.correct,        // ✅ Include correct answer for admin
//         explanation: q.explanation,
//         topic: q.topic,
//       })),
//     });
//   } catch (error) {
//     console.error('Error fetching quiz by ID:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };




import { Request, Response } from 'express';
import Quiz from '../models/Quiz';
import Question from '../models/Question';
import QuizResult from '../models/QuizResult';
import User from '../models/User';
import Role from '../models/Role';
import UserRole from '../models/UserRole';
import { generateFeedback, generateQuestionExplanation } from '../services/ai';
import { AuthRequest } from '../middleware/auth';

// ========== HELPER: Get price based on difficulty ==========
const getPriceForDifficulty = (difficulty: number): number => {
  const prices: { [key: number]: number } = {
    3: 500,
    4: 700,
    5: 1000,
  };
  return prices[difficulty] || 0;
};

// ========== GET ALL QUIZZES ==========
// In Controller/quiz.ts
export const getQuizzes = async (req: AuthRequest, res: Response) => {
  try {
    // ✅ req.user is already set by protect middleware
    const user = req.user;
    const quizzes = await Quiz.find({});
    
    const quizzesWithLockStatus = quizzes.map((quiz: any) => {
      const difficulty = quiz.difficulty || 1;
      const isLocked = difficulty >= 3 && 
                       !user?.isPremium && 
                       !(user?.purchasedDifficulties || []).includes(difficulty);
      
      return {
        ...quiz.toObject(),
        isLocked,
        price: isLocked ? getPriceForDifficulty(difficulty) : 0,
      };
    });
    
    res.json(quizzesWithLockStatus);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// ========== GET QUIZ BY LESSON (with lock status) ==========
export const getQuizByLesson = async (req: AuthRequest, res: Response) => {
  try {
    const { lessonId } = req.params;
    const user = await User.findById(req.user._id);
    
    const quiz = await Quiz.findOne({ lessonId: Number(lessonId) });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    const difficulty = quiz.difficulty || 1;
    const isLocked = difficulty >= 3 && 
                     !user?.isPremium && 
                     !(user?.purchasedDifficulties || []).includes(difficulty);

    const questions = await Question.find({ questionId: { $in: quiz.questions } });
    
    const sanitized = questions.map(q => ({
      questionId: q.questionId,
      question: q.question,
      options: JSON.parse(q.options || '[]'),
      topic: q.topic || '',
    }));

    res.json({ 
      quiz: { 
        ...quiz.toObject(), 
        questions: sanitized,
        isLocked,
        price: isLocked ? getPriceForDifficulty(difficulty) : 0,
      }, 
      timelimit: quiz.timelimit 
    });
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ========== GET QUIZZES BY LESSON (with lock status) ==========
export const getQuizzesByLesson = async (req: AuthRequest, res: Response) => {
  try {
    const { lessonId } = req.params;
    const user = await User.findById(req.user._id);
    
    const quizzes = await Quiz.find({ lessonId: Number(lessonId) });
    
    const quizzesWithLockStatus = quizzes.map((quiz: any) => {
      const difficulty = quiz.difficulty || 1;
      const isLocked = difficulty >= 3 && 
                       !user?.isPremium && 
                       !(user?.purchasedDifficulties || []).includes(difficulty);
      
      return {
        quizId: quiz.quizId,
        title: quiz.title,
        lessonId: quiz.lessonId,
        timelimit: quiz.timelimit,
        difficulty: quiz.difficulty,
        questions: quiz.questions,
        isLocked,
        price: isLocked ? getPriceForDifficulty(difficulty) : 0,
      };
    });
    
    res.json(quizzesWithLockStatus);
  } catch (error) {
    console.error('Error fetching quizzes by lesson:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ========== GET QUIZ BY ID (with lock status) ==========
export const getQuizById = async (req: AuthRequest, res: Response) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findOne({ quizId: Number(quizId) });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const user = await User.findById(req.user._id);
    const difficulty = quiz.difficulty || 1;
    const isLocked = difficulty >= 3 && 
                     !user?.isPremium && 
                     !(user?.purchasedDifficulties || []).includes(difficulty);

    const questions = await Question.find({ questionId: { $in: quiz.questions } });

    res.json({
      ...quiz.toObject(),
      questions: questions.map(q => ({
        questionId: q.questionId,
        question: q.question,
        options: JSON.parse(q.options || '[]'),
        correct: q.correct,
        explanation: q.explanation,
        topic: q.topic,
      })),
      isLocked,
      price: isLocked ? getPriceForDifficulty(difficulty) : 0,
    });
  } catch (error) {
    console.error('Error fetching quiz by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ========== GET OR CREATE TELEGRAM STUDENT ==========
const getOrCreateTelegramStudent = async (telegramUser?: any, queryTelegramId?: unknown) => {
  const telegramId = Number(telegramUser?.id || telegramUser?.telegramId || queryTelegramId);
  if (!telegramId) {
    console.error('❌ No valid telegramId found:', { telegramUser, queryTelegramId });
    return null;
  }

  // ✅ Use a more realistic email format that Chapa accepts
const generatedEmail = `telegram_${telegramId}@gmail.com`;
  const firstName = telegramUser?.firstName?.trim() || 'Telegram';
  const lastName = telegramUser?.lastName?.trim() || telegramUser?.username?.trim() || 'Student';

  let user = await User.findOne({
    $or: [
      { telegramId },
      { email: generatedEmail },
    ],
  });

  if (user) {
    user.telegramId = telegramId;
    user.telegramUsername = telegramUser?.username || user.telegramUsername;
    user.telegramFirstName = firstName;
    user.telegramLastName = lastName;
    user.FName = user.FName || firstName;
    user.LName = user.LName || lastName;
    if (telegramUser?.grade) user.gradeId = telegramUser.grade;
    user.updatedAt = new Date();
    await user.save();
  } else {
    user = await User.create({
      FName: firstName,
      MName: '',
      LName: lastName,
      gender: 'male',
      dateOfBirth: new Date('2000-01-01'),
      email: generatedEmail,
      gradeId: telegramUser?.grade || undefined,
      status: 'active',
      PImage: [],
      onboardingCompleted: true,
      telegramId,
      telegramUsername: telegramUser?.username || '',
      telegramFirstName: firstName,
      telegramLastName: lastName,
    });
  }

  const studentRole = await Role.findOne({ name: 'student' });
  if (studentRole) {
    await UserRole.findOneAndUpdate(
      { userId: user._id, roleId: studentRole._id },
      { userId: user._id, roleId: studentRole._id },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  }

  return user;
};

// ========== SUBMIT QUIZ (with lock check and progress update) ==========
export const submitQuiz = async (req: AuthRequest, res: Response) => {
  try {
    const { quizId, answers, timeTaken, telegramUser } = req.body;
    console.log('📝 Received telegramUser:', telegramUser);
    console.log('📝 req.query.telegramId:', req.query.telegramId);

    // ✅ Check if user is authenticated or Telegram user
    const telegramStudent = req.user ? null : await getOrCreateTelegramStudent(telegramUser, req.query.telegramId);
    const studentId = req.user?._id || telegramStudent?._id;

    if (!studentId) {
      return res.status(401).json({ message: 'User not identified' });
    }

    // ✅ Validate request
    if (!quizId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    // ✅ Fetch quiz and check if it's locked
    const quiz = await Quiz.findOne({ quizId: Number(quizId) });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    // ✅ CHECK IF QUIZ IS LOCKED (IMPORTANT)
    const user = req.user || await User.findById(studentId);
    if (user) {
      const difficulty = quiz.difficulty || 1;
      const isLocked = difficulty >= 3 && 
                       !user?.isPremium && 
                       !(user?.purchasedDifficulties || []).includes(difficulty);

      if (isLocked) {
        return res.status(403).json({
          message: 'This quiz is locked. Please purchase access.',
          locked: true,
          difficulty: difficulty,
          price: getPriceForDifficulty(difficulty),
          quizId: quiz.quizId,
        });
      }
    }

    // ✅ Fetch questions
    const questions = await Question.find({ questionId: { $in: quiz.questions } });
    if (questions.length === 0) {
      return res.status(404).json({ message: 'No questions found' });
    }

    // ✅ Build detailed answers with AI explanations
    const detailedAnswers = await Promise.all(
      answers.map(async (a: any) => {
        const q = questions.find(q => q.questionId === a.questionId);
        const isCorrect = q && q.correct === a.selectedAnswer;

        let explanation = '';
        let aiGenerated = false;

        if (!isCorrect) {
          try {
            explanation = await generateQuestionExplanation(
              q?.question || 'Unknown question',
              a.selectedAnswer,
              q?.correct || 'N/A'
            );
            aiGenerated = true;
          } catch (err) {
            console.error('AI explanation error:', err);
            explanation = q?.explanation || `The correct answer is "${q?.correct || 'N/A'}". Review the material.`;
          }
        } else {
          explanation = '✅ Correct! Well done!';
        }

        return {
          questionId: a.questionId,
          selectedAnswer: a.selectedAnswer,
          correctAnswer: q?.correct || 'N/A',
          isCorrect: !!isCorrect,
          explanation,
          aiGenerated,
        };
      })
    );

    const correctCount = detailedAnswers.filter(a => a.isCorrect).length;
    const totalQuestions = questions.length;
    const score = correctCount;

    // Generate overall feedback
    const wrongQuestions = detailedAnswers
      .filter(a => !a.isCorrect)
      .map(a => ({
        question: questions.find(q => q.questionId === a.questionId)?.question || '',
        selectedAnswer: a.selectedAnswer,
        correctAnswer: questions.find(q => q.questionId === a.questionId)?.correct || '',
        explanation: a.explanation,
      }));

    const { feedback, recommendation } = await generateFeedback(score, totalQuestions, wrongQuestions);

    // ✅ Save quiz result
    const resultId = Date.now();
    if (studentId) {
      await QuizResult.create({
        resultId,
        studentId,
        quizId: quiz.quizId,
        score,
        aiFeedback: feedback,
        recommendLesson: recommendation,
        takeTime: new Date(timeTaken || Date.now()),
        answers: detailedAnswers.map(a => ({
          questionId: a.questionId,
          selectedAnswer: a.selectedAnswer,
          isCorrect: a.isCorrect,
          explanation: a.explanation,
          aiGenerated: a.aiGenerated,
        })),
        totalQuestions,
      });
    }

    // ✅ Update StudentProgress
    try {
      const Lesson = require('../models/Lesson').default;
      const StudentProgress = require('../models/StudentProgress').default;
      
      const quizDoc = await Quiz.findOne({ quizId: Number(quizId) });
      if (quizDoc) {
        const lesson = await Lesson.findOne({ lessonId: quizDoc.lessonId });
        if (lesson) {
          const passed = (correctCount / totalQuestions) >= 0.7;
          
          await StudentProgress.findOneAndUpdate(
            {
              studentId,
              subjectId: lesson.subjectId,
              gradeId: lesson.gradeId,
              lessonId: lesson.lessonId,
            },
            {
              $inc: {
                quizTaken: 1,
                quizPassed: passed ? 1 : 0,
              },
              $max: { highScore: correctCount },
              $min: { lowScore: correctCount },
              $set: {
                lastQuizDate: new Date(),
                updatedAt: new Date(),
              },
            },
            {
              new: true,
              upsert: true,
              setDefaultsOnInsert: true,
            }
          );
          console.log('✅ StudentProgress updated for student:', studentId);
        }
      }
    } catch (progressError) {
      console.error('❌ Error updating student progress:', progressError);
    }

    // ✅ Return full result
    res.status(201).json({
      resultId,
      score,
      totalQuestions,
      percentage: Math.round((score / totalQuestions) * 100),
      feedback,
      recommendation,
      answers: detailedAnswers,
    });

  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};