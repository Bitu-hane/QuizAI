
import { Request, Response } from 'express';
import Grade from '../models/Grade';
import Subject from '../models/Subject';
import Lesson from '../models/Lesson';
import Quiz from '../models/Quiz';
import Question from '../models/Question'; 
import User from '../models/User';
import Credentials from '../models/Credentials';
import UserRole from '../models/UserRole';
import Role from '../models/Role';
import QuizResult from '../models/QuizResult';
import Permission from '../models/Permission';
import StudentProgress from '../models/StudentProgress';

// ===========================
// Grades
// ===========================
export const getGrades = async (req: Request, res: Response) => {
  try {
    const grades = await Grade.find().sort({ level: 1 });
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createGrade = async (req: Request, res: Response) => {
  try {
    const { level } = req.body;
    if (!level || level < 1 || level > 12) {
      return res.status(400).json({ message: 'Valid grade level (1-12) is required' });
    }
    const existing = await Grade.findOne({ level });
    if (existing) return res.status(400).json({ message: 'Grade already exists' });
    const grade = await Grade.create({ gradeId: Date.now(), level });
    res.status(201).json(grade);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateGrade = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { level } = req.body;
    if (!level || level < 1 || level > 12) {
      return res.status(400).json({ message: 'Valid grade level (1-12) is required' });
    }
    const grade = await Grade.findByIdAndUpdate(id, { level }, { new: true });
    if (!grade) return res.status(404).json({ message: 'Grade not found' });
    res.json(grade);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteGrade = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const grade = await Grade.findByIdAndDelete(id);
    if (!grade) return res.status(404).json({ message: 'Grade not found' });
    res.json({ message: 'Grade deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ===========================
// Subjects
// ===========================
export const getSubjects = async (req: Request, res: Response) => {
  try {
    const { gradeId } = req.query;
    const filter = gradeId ? { gradeId: Number(gradeId) } : {};
    const subjects = await Subject.find(filter).sort({ name: 1 });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createSubject = async (req: Request, res: Response) => {
  try {
    const { name, gradeId } = req.body;
    if (!name || !gradeId) {
      return res.status(400).json({ message: 'Name and gradeId are required' });
    }
    const existing = await Subject.findOne({ name, gradeId });
    if (existing) return res.status(400).json({ message: 'Subject already exists in this grade' });
    const subject = await Subject.create({ subjectId: Date.now(), name, gradeId });
    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateSubject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, gradeId } = req.body;
    const subject = await Subject.findByIdAndUpdate(id, { name, gradeId }, { new: true });
    if (!subject) return res.status(404).json({ message: 'Subject not found' });
    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteSubject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findByIdAndDelete(id);
    if (!subject) return res.status(404).json({ message: 'Subject not found' });
    res.json({ message: 'Subject deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ===========================
// Lessons
// ===========================
export const getLessons = async (req: Request, res: Response) => {
  try {
    const { subjectId } = req.query;
    const filter = subjectId ? { subjectId: Number(subjectId) } : {};
    const lessons = await Lesson.find(filter).sort({ title: 1 });
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createLesson = async (req: Request, res: Response) => {
  try {
    const { title, description, subjectId, gradeId } = req.body;
    if (!title || !subjectId || !gradeId) {
      return res.status(400).json({ message: 'Title, subjectId, and gradeId are required' });
    }
    const lesson = await Lesson.create({ lessonId: Date.now(), title, description, subjectId, gradeId });
    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateLesson = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, subjectId, gradeId } = req.body;
    const lesson = await Lesson.findByIdAndUpdate(id, { title, description, subjectId, gradeId }, { new: true });
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteLesson = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const lesson = await Lesson.findByIdAndDelete(id);
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
    res.json({ message: 'Lesson deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ===========================
// Quizzes
// ===========================
export const getQuizzes = async (req: Request, res: Response) => {
  try {
    const { lessonId } = req.query;
    const filter = lessonId ? { lessonId: Number(lessonId) } : {};
    const quizzes = await Quiz.find(filter).sort({ title: 1 });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const { title, lessonId, timelimit, difficulty, questions } = req.body;
    if (!title || !lessonId) {
      return res.status(400).json({ message: 'Title and lessonId are required' });
    }
    const quiz = await Quiz.create({
      quizId: Date.now(),
      title,
      lessonId,
      timelimit: timelimit || 10,
      difficulty: difficulty || 1,
      questions: questions || [],
    });
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, lessonId, timelimit, difficulty, questions } = req.body;
    const quiz = await Quiz.findByIdAndUpdate(id, { title, lessonId, timelimit, difficulty, questions }, { new: true });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findByIdAndDelete(id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json({ message: 'Quiz deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ===========================
// Users (Admin only)
// ===========================
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-__v');
    const usersWithRoles = await Promise.all(
      users.map(async (user) => {
        const userRoles = await UserRole.find({ userId: user._id }).populate('roleId');
        const roles = userRoles.map(ur => (ur.roleId as any).name);
        return { ...user.toObject(), roles };
      })
    );
    res.json(usersWithRoles);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, role } = req.body;
    const user = await User.findByIdAndUpdate(id, { status }, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (role) {
      const roleDoc = await Role.findOne({ name: role });
      if (roleDoc) {
        await UserRole.findOneAndUpdate(
          { userId: user._id },
          { roleId: roleDoc._id },
          { upsert: true }
        );
      }
    }
    res.json({ message: 'User updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await Credentials.deleteOne({ userId: user._id });
    await UserRole.deleteOne({ userId: user._id });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
export const getQuestionsByQuiz = async (req: Request, res: Response) => {
  try {
    const quizId = req.params.quizId as string; // ✅ Force to string

    let quiz;
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(quizId);
    if (isObjectId) {
      quiz = await Quiz.findById(quizId);
    } else {
      const numericId = Number(quizId);
      if (!isNaN(numericId)) {
        quiz = await Quiz.findOne({ quizId: numericId });
      }
    }

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    if (!quiz.questions || quiz.questions.length === 0) {
      return res.json([]);
    }

    const questions = await Question.find({
      questionId: { $in: quiz.questions }
    });

    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
export const addQuestionToQuiz = async (req: Request, res: Response) => {
  try {
    const quizId = req.params.quizId as string; // ✅ Force to string
    const { question, options, correct, explanation, topic } = req.body;

    console.log('📥 Adding question to quizId:', quizId);

    // Find quiz by either _id or quizId
    let quiz;
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(quizId);
    if (isObjectId) {
      quiz = await Quiz.findById(quizId);
    } else {
      const numericId = Number(quizId);
      if (!isNaN(numericId)) {
        quiz = await Quiz.findOne({ quizId: numericId });
      }
    }

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Create question (rest of code unchanged)
    const newQuestion = await Question.create({
      questionId: Date.now(),
      question,
      options: JSON.stringify(options || []),
      correct,
      explanation: explanation || '',
      topic: topic || '',
      aiExplain: '',
    });

    if (!quiz.questions) quiz.questions = [];
    quiz.questions.push(newQuestion.questionId);
    await quiz.save();

    res.status(201).json(newQuestion);
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { question, options, correct, explanation, topic } = req.body;

    const updated = await Question.findByIdAndUpdate(
      id,
      {
        question,
        options: JSON.stringify(options),
        correct,
        explanation,
        topic,
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Question not found' });
    res.json(updated);
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const question = await Question.findByIdAndDelete(id);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    // Remove question ID from any quiz that references it
    await Quiz.updateMany(
      { questions: question.questionId },
      { $pull: { questions: question.questionId } }
    );

    res.json({ message: 'Question deleted' });
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getQuizById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string; // ✅ Force to string
    
    let quiz;
    
    // Check if id is a valid MongoDB ObjectId (24 hex chars)
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    
    if (isObjectId) {
      quiz = await Quiz.findById(id);
    } else {
      const numericId = Number(id);
      if (!isNaN(numericId)) {
        quiz = await Quiz.findOne({ quizId: numericId });
      }
    }
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    
    res.json(quiz);
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// ===========================
// Dashboard Stats
// ===========================
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    console.log('📊 Fetching dashboard stats...');
    
    const [totalStudents, totalQuizzes, totalLessons, totalSubjects, totalGrades] = await Promise.all([
      User.countDocuments({ status: 'active' }),
      Quiz.countDocuments(),
      Lesson.countDocuments(),
      Subject.countDocuments(),
      Grade.countDocuments(),
    ]);
    
    // Get recent activity (last 5 quiz results)
    const recentActivity = await QuizResult.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('studentId', 'FName LName email')
      .lean();
    
    res.json({
      totalStudents,
      totalQuizzes,
      totalLessons,
      totalSubjects,
      totalGrades,
      recentActivity: recentActivity.map((activity: any) => ({
        studentName: activity.studentId 
          ? `${activity.studentId.FName || 'Unknown'} ${activity.studentId.LName || ''}`.trim() || 'Unknown Student'
          : 'Unknown Student',
        score: activity.score || 0,
        totalQuestions: activity.totalQuestions || 0,
        date: activity.createdAt || activity.takeTime || new Date(),
      })),
    });
  } catch (error) {
    console.error('❌ Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ===========================
// Admin: Get all quiz results (across all students)
// ===========================
export const getAllResults = async (req: Request, res: Response) => {
  try {
    const results = await QuizResult.find({}).sort({ takeTime: -1 });
    res.json(results);
  } catch (error) {
    console.error('Error fetching all results:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ===========================
// Admin: Get all student progress
// ===========================
export const getAllProgress = async (req: Request, res: Response) => {
  try {
    const progress = await StudentProgress.find({});
    res.json(progress);
  } catch (error) {
    console.error('Error fetching all progress:', error);
    res.status(500).json({ message: 'Server error' });
  }
};