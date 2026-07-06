// import mongoose, { Document, Schema } from 'mongoose';

// export interface IQuizResult extends Document {
//   resultId: number;
//   studentId: number;
//   quizId: number;
//   score: number;
//   aiFeedback?: string;
//   recommendLesson: string;
//   takeTime: Date;
//   answers: Array<{
//     questionId: number;
//     selectedAnswer: string;
//     isCorrect: boolean;
//   }>;
//   totalQuestions: number;
// }

// const QuizResultSchema = new Schema<IQuizResult>({
//   resultId: { type: Number, required: true, unique: true },
//   studentId: { type: Number, ref: 'User', required: true },
//   quizId: { type: Number, ref: 'Quiz', required: true },
//   score: { type: Number, required: true },
//   aiFeedback: { type: String },
//   recommendLesson: { type: String, required: true },
//   takeTime: { type: Date, required: true },
//   answers: [{
//     questionId: { type: Number, required: true },
//     selectedAnswer: { type: String, required: true },
//     isCorrect: { type: Boolean, required: true }
//   }],
//   totalQuestions: { type: Number, required: true }
// });

// export default mongoose.model<IQuizResult>('QuizResult', QuizResultSchema);

// import mongoose, { Document, Schema } from 'mongoose';

// export interface IQuizResult extends Document {
//   resultId: number;
//   studentId: mongoose.Types.ObjectId; // ✅ change to ObjectId
//   quizId: number;
//   score: number;
//   aiFeedback?: string;
//   recommendLesson: string;
//   takeTime: Date;
//   answers: Array<{
//     questionId: number;
//     selectedAnswer: string;
//     isCorrect: boolean;
//   }>;
//   totalQuestions: number;
// }

// const QuizResultSchema = new Schema<IQuizResult>({
//   resultId: { type: Number, required: true, unique: true },
//   studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // ✅ change here
//   quizId: { type: Number, ref: 'Quiz', required: true },
//   score: { type: Number, required: true },
//   aiFeedback: { type: String },
//   recommendLesson: { type: String, required: true },
//   takeTime: { type: Date, required: true },
//   answers: [{
//     questionId: { type: Number, required: true },
//     selectedAnswer: { type: String, required: true },
//     isCorrect: { type: Boolean, required: true },
//   }],
//   totalQuestions: { type: Number, required: true },
// });

// export default mongoose.model<IQuizResult>('QuizResult', QuizResultSchema);


import mongoose, { Document, Schema } from 'mongoose';

export interface IQuizResult extends Document {
  resultId: number;
  studentId: mongoose.Types.ObjectId;
  quizId: number;
  score: number;
  aiFeedback?: string;
  recommendLesson: string;
  takeTime: Date;
  answers: Array<{
    questionId: number;
    selectedAnswer: string;
    isCorrect: boolean;
    explanation: string;      // ✅ added
    aiGenerated: boolean;     // ✅ added
  }>;
  totalQuestions: number;
  createdAt?: Date;           // ✅ optional, for sorting
}

const QuizResultSchema = new Schema<IQuizResult>({
  resultId: { type: Number, required: true, unique: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  quizId: { type: Number, ref: 'Quiz', required: true },
  score: { type: Number, required: true },
  aiFeedback: { type: String },
  recommendLesson: { type: String, required: true },
  takeTime: { type: Date, required: true },
  answers: [{
    questionId: { type: Number, required: true },
    selectedAnswer: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
    explanation: { type: String, default: '' },      // ✅ new field
    aiGenerated: { type: Boolean, default: false }, // ✅ new field
  }],
  totalQuestions: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },      // ✅ for sorting history
});

export default mongoose.model<IQuizResult>('QuizResult', QuizResultSchema);