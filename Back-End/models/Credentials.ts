// import mongoose, { Document, Schema } from 'mongoose';

// export interface ICredentials extends Document {
//   userId: mongoose.Types.ObjectId;
//   type: 'google' | 'password';
//   email: string;
//   secret: string;
//   loginAttempt: number;
//   lastLoginAt?: string;
//   lastIp?: string;
//   refreshToken?: string;
//   accessToken?: string;
//   tokenExpired?: Date;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const CredentialsSchema = new Schema<ICredentials>({
//   userId: { type: Schema.Types.ObjectId, required: true, ref: 'User', index: true },
//   type: { type: String, required: true, enum: ['google', 'password'] },
//   email: { type: String, required: true, unique: true },
//   secret: { type: String, required: true },
//   loginAttempt: { type: Number, default: 0 },
//   lastLoginAt: { type: String },
//   lastIp: { type: String },
//   refreshToken: { type: String },
//   accessToken: { type: String },
//   tokenExpired: { type: Date },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// });

// export default mongoose.model<ICredentials>('Credentials', CredentialsSchema);


import mongoose, { Document, Schema } from 'mongoose';

export interface ICredentials extends Document {
  userId: mongoose.Types.ObjectId;
  type: 'google' | 'password';
  email: string;
  secret: string;
  loginAttempt: number;
  lastLoginAt?: string;
  lastIp?: string;
  refreshToken?: string;
  accessToken?: string;
  tokenExpired?: Date;
  deleteAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CredentialsSchema = new Schema<ICredentials>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User', index: true },
  type: { type: String, required: true, enum: ['google', 'password'] },
  email: { type: String, required: true },
  secret: { type: String, required: true },
  loginAttempt: { type: Number, default: 0 },
  lastLoginAt: { type: String },
  lastIp: { type: String },
  refreshToken: { type: String },
  accessToken: { type: String },
  tokenExpired: { type: Date },
  deleteAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// ✅ Compound unique index: email + type
CredentialsSchema.index({ email: 1, type: 1 }, { unique: true });

export default mongoose.model<ICredentials>('Credentials', CredentialsSchema);