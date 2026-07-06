import mongoose, { Document, Schema } from 'mongoose';

export interface IAuthentication extends Document {
  userId: mongoose.Types.ObjectId;
  credentialId?: mongoose.Types.ObjectId;
  type: 'Login_Success' | 'Login_Failed' | 'Password_reset' | 'Password_change';
  ip: string;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const AuthenticationSchema = new Schema<IAuthentication>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User', index: true },
  credentialId: { type: Schema.Types.ObjectId, ref: 'Credentials', index: true },
  type: { type: String, required: true, enum: ['Login_Success', 'Login_Failed', 'Password_reset', 'Password_change'] },
  ip: { type: String, required: true },
  userAgent: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IAuthentication>('Authentication', AuthenticationSchema);