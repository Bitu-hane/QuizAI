import mongoose, { Document, Schema } from 'mongoose';

export interface IPermission extends Document {
  name: string;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete';
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PermissionSchema = new Schema<IPermission>({
  name: { type: String, required: true, unique: true },
  resource: { type: String, required: true },
  action: { type: String, required: true, enum: ['create', 'read', 'update', 'delete'] },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IPermission>('Permission', PermissionSchema);