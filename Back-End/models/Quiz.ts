import mongoose, { Document, Schema } from 'mongoose';

export interface IQuiz extends Document {
  quizId: number;
  title: string;
  lessonId: number;
  timelimit?: number;
  difficulty?: number;
  questions: number[]; // Array of questionIds
}

const QuizSchema = new Schema<IQuiz>({
  quizId: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  lessonId: { type: Number, ref: 'Lesson', required: true },
  timelimit: { type: Number },
  difficulty: { type: Number, required: true },

  questions: { type: [Number], ref: 'Question' }
});

export default mongoose.model<IQuiz>('Quiz', QuizSchema);