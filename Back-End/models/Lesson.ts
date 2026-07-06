import mongoose, { Document, Schema } from 'mongoose';

export interface ILesson extends Document {
  lessonId: number;
  title: string;
  description?: string;
  subjectId: number;
  gradeId: number;
}

const LessonSchema = new Schema<ILesson>({
  lessonId: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  subjectId: { type: Number, ref: 'Subject', required: true },
  gradeId: { type: Number, ref: 'Grade', required: true }
});

export default mongoose.model<ILesson>('Lesson', LessonSchema);