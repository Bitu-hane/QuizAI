import mongoose, { Document, Schema } from 'mongoose';

export interface IQuestion extends Document {
  questionId: number;
  options: string; // Could be a stringified array
  question: string;
  correct: string;
  explanation?: string;
  aiExplain?: string; // required but we'll make optional with default
  topic?: string;
}

const QuestionSchema = new Schema<IQuestion>({
  questionId: { type: Number, required: true },
  options: { type: String },
  question: { type: String, required: true },
  correct: { type: String, required: true },
  explanation: { type: String },
  aiExplain: { type: String, default: '' },
  topic: { type: String }
});

export default mongoose.model<IQuestion>('Question', QuestionSchema);