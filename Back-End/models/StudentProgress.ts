import mongoose, { Document, Schema } from 'mongoose';

export interface IStudentProgress extends Document {
  progressId: number;
  studentId: number;
  subjectId: number;
gradeId: number
  lessonId: number;
  quizPassed: number;
  quizTaken: number;
    lastQuizDate?: Date; 
  highScore: number;
  lowScore: number;
}

const StudentProgressSchema = new Schema<IStudentProgress>({
  progressId: { type: Number, required: true, unique: true },
  studentId: { type: Number, ref: 'User', required: true, index: true },
  subjectId: { type: Number, ref: 'Subject', required: true },
  lessonId: { type: Number, ref: 'Lesson', required: true },
  quizPassed: { type: Number, default: 0 },
    gradeId: { type: Number, ref: 'Grade', required: true }, 
      lastQuizDate: { type: Date, default: null },
// ✅ Track which grade
  quizTaken: { type: Number, default: 0 },
  highScore: { type: Number, default: 0 },
  lowScore: { type: Number, default: 0 }
});

export default mongoose.model<IStudentProgress>('StudentProgress', StudentProgressSchema);