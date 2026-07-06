import mongoose, { Document, Schema } from 'mongoose';

export interface IGrade extends Document {
  gradeId: number;
  level: number;
}

const GradeSchema = new Schema<IGrade>({
  gradeId: { type: Number, required: true, unique: true },
  level: { type: Number, required: true }
});

export default mongoose.model<IGrade>('Grade', GradeSchema);