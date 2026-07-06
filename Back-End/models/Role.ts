import mongoose, { Document, Schema } from 'mongoose';

export interface IRole extends Document {
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const RoleSchema = new Schema<IRole>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IRole>('Role', RoleSchema);