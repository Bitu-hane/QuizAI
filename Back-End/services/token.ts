import jwt from 'jsonwebtoken';
import { env } from '../config/env';

if (!env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export const generateTokens = (userId: string, role: string = 'student') => {
  const accessToken = jwt.sign(
    { id: userId, role },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRE || '7d' } as jwt.SignOptions
  );
  const refreshToken = jwt.sign(
    { id: userId },
    env.JWT_SECRET,
    { expiresIn: '30d' } as jwt.SignOptions
  );
  return { accessToken, refreshToken };
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const decodeToken = (token: string) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    return null;
  }
};