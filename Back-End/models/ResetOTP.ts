import mongoose, { Document, Schema } from 'mongoose';

export interface IResetOTP extends Document {
  email: string;
  otp: string;
  expiresAt: Date;
  used: boolean;
  createdAt: Date;
}

const ResetOTPSchema = new Schema<IResetOTP>({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  used: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Auto-expire after 10 minutes (MongoDB TTL index)
ResetOTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model<IResetOTP>('ResetOTP', ResetOTPSchema);