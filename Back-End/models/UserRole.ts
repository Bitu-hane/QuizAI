import mongoose, { Document, Schema } from 'mongoose';

export interface IUserRole extends Document {
  roleId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  created_at: Date;
}

const UserRoleSchema = new Schema<IUserRole>({
  roleId: { type: Schema.Types.ObjectId, required: true, ref: 'Role', index: true },
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User', index: true },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model<IUserRole>('UserRole', UserRoleSchema);