// import mongoose, { Document, Schema } from 'mongoose';

// export interface IUser extends Document {
//   FName: string;
//   MName: string;
//   LName: string;
//   gender: 'male' | 'female';
//   dateOfBirth: Date;
//   createdAt: Date;
//   updatedAt: Date;
//   deleteAt?: Date;
//   PImage?: string[];
//   email: string;
//   status: 'active' | 'suspended';
//   gradeId?: number;
// }

// const UserSchema = new Schema<IUser>({
//   FName: { type: String, required: true },
//   MName: { type: String, default: '' },
//   LName: { type: String, required: true },
//   gender: { type: String, required: true, enum: ['male', 'female'] },
//   dateOfBirth: { type: Date, required: true },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
//   deleteAt: { type: Date },
//   PImage: { type: [String], default: [] },
//   email: { type: String, required: true, unique: true },
//   status: { type: String, enum: ['active', 'suspended'], default: 'active' },
//   gradeId: { type: Number, ref: 'Grade' }
// });

// export default mongoose.model<IUser>('User', UserSchema);

import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  FName: string;
  MName: string;
  LName: string;
  gender: 'male' | 'female';
  dateOfBirth: Date;
  createdAt: Date;
  updatedAt: Date;
  deleteAt?: Date;
  PImage?: string[];
  email: string;
  status: 'active' | 'suspended';
  gradeId?: number;
  onboardingCompleted?: boolean;  // ← add this
}

const UserSchema = new Schema<IUser>({
  FName: { type: String, required: true },
  MName: { type: String, default: '' },
  LName: { type: String, required: true },
  gender: { type: String, required: true, enum: ['male', 'female'] },
  dateOfBirth: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deleteAt: { type: Date },
  PImage: { type: [String], default: [] },
  email: { type: String, required: true, unique: true },
  status: { type: String, enum: ['active', 'suspended'], default: 'active' },
  gradeId: { type: Number, ref: 'Grade' },
  onboardingCompleted: { type: Boolean, default: false },  // ← add this
});

export default mongoose.model<IUser>('User', UserSchema);