// import { Response, NextFunction } from 'express';
// import UserRole from '../models/UserRole';
// import { AuthRequest } from './auth';

// export const authorize = (...roles: string[]) => {
//   return async (req: AuthRequest, res: Response, next: NextFunction) => {
//     if (!req.user) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }
//     try {
//       const userRoles = await UserRole.find({ userId: req.user._id }).populate<{ roleId: { name: string } }>('roleId');
//       const userRoleNames = userRoles.map(ur => ur.roleId.name);
//       const hasRole = roles.some(role => userRoleNames.includes(role));
//       if (!hasRole) {
//         return res.status(403).json({ message: 'Forbidden' });
//       }
//       next();
//     } catch (error) {
//       console.error('Role check error:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   };
// };

import { Response, NextFunction } from 'express';
import UserRole from '../models/UserRole';
import { AuthRequest } from './auth';

export const authorize = (...roles: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      const userRoles = await UserRole.find({ userId: req.user._id }).populate('roleId');
      const userRoleNames = userRoles.map(ur => (ur.roleId as any).name);
      const hasRole = roles.some(role => userRoleNames.includes(role));
      if (!hasRole) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    } catch (error) {
      console.error('Role check error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
};