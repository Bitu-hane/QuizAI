import mongoose, { Document, Schema } from 'mongoose';

export interface IRolePermission extends Document {
  roleId: mongoose.Types.ObjectId;
  permitId: mongoose.Types.ObjectId;
  assigned_at: Date;
}

const RolePermissionSchema = new Schema<IRolePermission>({
  roleId: { type: Schema.Types.ObjectId, required: true, ref: 'Role', index: true },
  permitId: { type: Schema.Types.ObjectId, required: true, ref: 'Permission', index: true },
  assigned_at: { type: Date, default: Date.now }
});

export default mongoose.model<IRolePermission>('RolePermission', RolePermissionSchema);