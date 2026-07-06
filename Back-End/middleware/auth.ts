import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import UserRole from '../models/UserRole';
import Role from '../models/Role';

export interface AuthRequest extends Request {
  user?: any;
}
export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    req.user = user; // ✅ This is critical
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export const authorize = (...roles: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    // Get user roles
    const userRoles = await UserRole.find({ userId: req.user._id }).populate('roleId');
    const userRoleNames = userRoles.map(ur => (ur.roleId as any).name);
    const hasRole = roles.some(role => userRoleNames.includes(role));
    if (!hasRole) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};