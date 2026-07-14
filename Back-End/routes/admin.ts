// import { Request, Response } from 'express';
// import { AuthRequest } from '../middleware/auth';
// import Grade from '../models/Grade';
// import Subject from '../models/Subject';
// import Lesson from '../models/Lesson';
// import Quiz from '../models/Quiz';
// import User from '../models/User';
// import Credentials from '../models/Credentials';
// import UserRole from '../models/UserRole';

// // ===========================
// // Grades
// // ===========================
// export const getGrades = async (req: Request, res: Response) => {
//   try {
//     const grades = await Grade.find().sort({ level: 1 });
//     res.json(grades);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const createGrade = async (req: Request, res: Response) => {
//   try {
//     const { level } = req.body;
//     if (!level || level < 1 || level > 12) {
//       return res.status(400).json({ message: 'Valid grade level (1-12) is required' });
//     }
//     const existing = await Grade.findOne({ level });
//     if (existing) return res.status(400).json({ message: 'Grade already exists' });
//     const grade = await Grade.create({ gradeId: Date.now(), level });
//     res.status(201).json(grade);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const updateGrade = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { level } = req.body;
//     if (!level || level < 1 || level > 12) {
//       return res.status(400).json({ message: 'Valid grade level (1-12) is required' });
//     }
//     const grade = await Grade.findByIdAndUpdate(id, { level }, { new: true });
//     if (!grade) return res.status(404).json({ message: 'Grade not found' });
//     res.json(grade);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const deleteGrade = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const grade = await Grade.findByIdAndDelete(id);
//     if (!grade) return res.status(404).json({ message: 'Grade not found' });
//     res.json({ message: 'Grade deleted' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // ===========================
// // Subjects
// // ===========================
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

// export const createSubject = async (req: Request, res: Response) => {
//   try {
//     const { name, gradeId } = req.body;
//     if (!name || !gradeId) {
//       return res.status(400).json({ message: 'Name and gradeId are required' });
//     }
//     const existing = await Subject.findOne({ name, gradeId });
//     if (existing) return res.status(400).json({ message: 'Subject already exists in this grade' });
//     const subject = await Subject.create({ subjectId: Date.now(), name, gradeId });
//     res.status(201).json(subject);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const updateSubject = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { name, gradeId } = req.body;
//     const subject = await Subject.findByIdAndUpdate(id, { name, gradeId }, { new: true });
//     if (!subject) return res.status(404).json({ message: 'Subject not found' });
//     res.json(subject);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const deleteSubject = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const subject = await Subject.findByIdAndDelete(id);
//     if (!subject) return res.status(404).json({ message: 'Subject not found' });
//     res.json({ message: 'Subject deleted' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // ===========================
// // Lessons
// // ===========================
// export const getLessons = async (req: Request, res: Response) => {
//   try {
//     const { subjectId } = req.query;
//     const filter = subjectId ? { subjectId: Number(subjectId) } : {};
//     const lessons = await Lesson.find(filter).sort({ title: 1 });
//     res.json(lessons);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const createLesson = async (req: Request, res: Response) => {
//   try {
//     const { title, description, subjectId, gradeId } = req.body;
//     if (!title || !subjectId || !gradeId) {
//       return res.status(400).json({ message: 'Title, subjectId, and gradeId are required' });
//     }
//     const lesson = await Lesson.create({ lessonId: Date.now(), title, description, subjectId, gradeId });
//     res.status(201).json(lesson);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const updateLesson = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { title, description, subjectId, gradeId } = req.body;
//     const lesson = await Lesson.findByIdAndUpdate(id, { title, description, subjectId, gradeId }, { new: true });
//     if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
//     res.json(lesson);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const deleteLesson = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const lesson = await Lesson.findByIdAndDelete(id);
//     if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
//     res.json({ message: 'Lesson deleted' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // ===========================
// // Quizzes
// // ===========================
// export const getQuizzes = async (req: Request, res: Response) => {
//   try {
//     const { lessonId } = req.query;
//     const filter = lessonId ? { lessonId: Number(lessonId) } : {};
//     const quizzes = await Quiz.find(filter).sort({ title: 1 });
//     res.json(quizzes);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const createQuiz = async (req: Request, res: Response) => {
//   try {
//     const { title, lessonId, timelimit, difficulty, questions } = req.body;
//     if (!title || !lessonId) {
//       return res.status(400).json({ message: 'Title and lessonId are required' });
//     }
//     const quiz = await Quiz.create({
//       quizId: Date.now(),
//       title,
//       lessonId,
//       timelimit: timelimit || 10,
//       difficulty: difficulty || 1,
//       questions: questions || [],
//     });
//     res.status(201).json(quiz);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const updateQuiz = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { title, lessonId, timelimit, difficulty, questions } = req.body;
//     const quiz = await Quiz.findByIdAndUpdate(id, { title, lessonId, timelimit, difficulty, questions }, { new: true });
//     if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
//     res.json(quiz);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const deleteQuiz = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const quiz = await Quiz.findByIdAndDelete(id);
//     if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
//     res.json({ message: 'Quiz deleted' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // ===========================
// // Users (Admin only)
// // ===========================
// export const getUsers = async (req: Request, res: Response) => {
//   try {
//     const users = await User.find().select('-__v');
//     const usersWithRoles = await Promise.all(
//       users.map(async (user) => {
//         const userRoles = await UserRole.find({ userId: user._id }).populate('roleId');
//         const roles = userRoles.map(ur => (ur.roleId as any).name);
//         return { ...user.toObject(), roles };
//       })
//     );
//     res.json(usersWithRoles);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const updateUser = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { status, role } = req.body;
//     const user = await User.findByIdAndUpdate(id, { status }, { new: true });
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     // Update role if provided
//     if (role) {
//       const roleDoc = await import('../models/Role').then(m => m.default.findOne({ name: role }));
//       if (roleDoc) {
//         await UserRole.findOneAndUpdate(
//           { userId: user._id },
//           { roleId: roleDoc._id },
//           { upsert: true }
//         );
//       }
//     }
//     res.json({ message: 'User updated' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const deleteUser = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findByIdAndDelete(id);
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     await Credentials.deleteOne({ userId: user._id });
//     await UserRole.deleteOne({ userId: user._id });
//     res.json({ message: 'User deleted' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };



// import express from 'express';
// import {
//   getGrades, createGrade, updateGrade, deleteGrade,
//   getSubjects, createSubject, updateSubject, deleteSubject,
//   getLessons, createLesson, updateLesson, deleteLesson,
//   getQuizzes, createQuiz, updateQuiz, deleteQuiz,
//   getUsers, updateUser, deleteUser,
// } from '../Controller/admin';
// import { protect } from '../middleware/auth';
// import { authorize } from '../middleware/role';

// const router = express.Router();

// router.use(protect);
// router.use(authorize('admin'));

// // Grades
// router.get('/grades', getGrades);
// router.post('/grades', createGrade);
// router.put('/grades/:id', updateGrade);
// router.delete('/grades/:id', deleteGrade);

// // Subjects
// router.get('/subjects', getSubjects);
// router.post('/subjects', createSubject);
// router.put('/subjects/:id', updateSubject);
// router.delete('/subjects/:id', deleteSubject);

// // Lessons
// router.get('/lessons', getLessons);
// router.post('/lessons', createLesson);
// router.put('/lessons/:id', updateLesson);
// router.delete('/lessons/:id', deleteLesson);

// // Quizzes
// router.get('/quizzes', getQuizzes);
// router.post('/quizzes', createQuiz);
// router.put('/quizzes/:id', updateQuiz);
// router.delete('/quizzes/:id', deleteQuiz);

// // Users
// router.get('/users', getUsers);
// router.put('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);

// router.get('/quizzes/:quizId/questions', getQuestionsByQuiz);
// router.post('/quizzes/:quizId/questions', addQuestionToQuiz);
// export default router;



import express from 'express';
import {
  getDashboardStats,  // ← Add this import
  getGrades, createGrade, updateGrade, deleteGrade,
  getSubjects, createSubject, updateSubject, deleteSubject,
  getLessons, createLesson, updateLesson, deleteLesson,
  getQuizzes, createQuiz, updateQuiz, deleteQuiz,
  getUsers, updateUser, deleteUser,
  getQuestionsByQuiz,
  addQuestionToQuiz,
  updateQuestion,
  deleteQuestion,
  getQuizById,
} from '../Controller/admin';
import { protect } from '../middleware/auth';
import { authorize } from '../middleware/role';
import {
  // ... existing imports ...
  getAllResults,
  getAllProgress
} from '../Controller/admin';
const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

// ===== DASHBOARD =====
router.get('/dashboard', getDashboardStats);  // ← ADD THIS LINE

// Grades
router.get('/grades', getGrades);
router.post('/grades', createGrade);
router.put('/grades/:id', updateGrade);
router.delete('/grades/:id', deleteGrade);

// Subjects
router.get('/subjects', getSubjects);
router.post('/subjects', createSubject);
router.put('/subjects/:id', updateSubject);
router.delete('/subjects/:id', deleteSubject);

// Lessons
router.get('/lessons', getLessons);
router.post('/lessons', createLesson);
router.put('/lessons/:id', updateLesson);
router.delete('/lessons/:id', deleteLesson);

// Quizzes
router.get('/quizzes', getQuizzes);
router.post('/quizzes', createQuiz);
router.put('/quizzes/:id', updateQuiz);
router.delete('/quizzes/:id', deleteQuiz);
router.get('/quizzes/:id', getQuizById);

// Questions
router.get('/quizzes/:quizId/questions', getQuestionsByQuiz);
router.post('/quizzes/:quizId/questions', addQuestionToQuiz);
router.put('/questions/:id', updateQuestion);
router.delete('/questions/:id', deleteQuestion);
router.get('/results', getAllResults);
router.get('/progress', getAllProgress);
// Users
router.get('/users', getUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;