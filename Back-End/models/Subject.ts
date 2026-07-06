import mongoose, { Document, Schema } from 'mongoose';

export interface ISubject extends Document {
  subjectId: number;
  name: string;
  gradeId: number;
}

const SubjectSchema = new Schema<ISubject>({
  subjectId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  gradeId: { type: Number, required: true, ref: 'Grade' }
});

export default mongoose.model<ISubject>('Subject', SubjectSchema);