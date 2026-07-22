// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import User from '../models/User';
// import UserRole from '../models/UserRole';
// import Role from '../models/Role';

// export interface AuthRequest extends Request {
//   user?: any;
// }
// export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
//   let token;
//   if (req.headers.authorization?.startsWith('Bearer')) {
//     token = req.headers.authorization.split(' ')[1];
//   }
//   if (!token) {
//     return res.status(401).json({ message: 'Not authorized, no token' });
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
//     const user = await User.findById(decoded.id).select('-password');
//     if (!user) {
//       return res.status(401).json({ message: 'User not found' });
//     }
//     req.user = user; // ✅ This is critical
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Not authorized, token failed' });
//   }
// };

// export const authorize = (...roles: string[]) => {
//   return async (req: AuthRequest, res: Response, next: NextFunction) => {
//     if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
//     // Get user roles
//     const userRoles = await UserRole.find({ userId: req.user._id }).populate('roleId');
//     const userRoleNames = userRoles.map(ur => (ur.roleId as any).name);
//     const hasRole = roles.some(role => userRoleNames.includes(role));
//     if (!hasRole) {
//       return res.status(403).json({ message: 'Forbidden' });
//     }
//     next();
//   };
// };

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import UserRole from '../models/UserRole';
import Role from '../models/Role';

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  console.log('🔐 protect middleware called');
  console.log('📝 Query params:', req.query);
  console.log('📝 Body:', req.body);
  
  let token;
  
  // ✅ Check for JWT token in headers
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // ✅ If JWT token exists, verify it
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
      req.user = user;
      console.log('✅ JWT authentication successful');
      return next();
    } catch (error) {
      console.log('❌ JWT verification failed:', error);
    }
  }

  // ✅ If no valid JWT, check for Telegram ID in query or body
// ✅ If no valid JWT, check for Telegram ID in query or body
const telegramId = req.query.telegramId || req.body.telegramId;
console.log(`📝 Telegram ID found: ${telegramId}`);

if (!telegramId) {
  console.log('❌ No Telegram ID provided');
  return res.status(401).json({ 
    message: 'Not authorized, no token or Telegram ID provided' 
  });
}

  try {
    const numericTelegramId = Number(telegramId);
    if (isNaN(numericTelegramId)) {
      console.log('❌ Invalid Telegram ID (not a number):', telegramId);
      return res.status(400).json({ message: 'Invalid Telegram ID' });
    }
    
    console.log(`🔍 Looking for user with telegramId: ${numericTelegramId}`);
    
    let user = await User.findOne({ telegramId: numericTelegramId });
    
    // ✅ If user doesn't exist, create one automatically
    if (!user) {
      console.log(`🆕 Creating new user for Telegram ID: ${numericTelegramId}`);
      
      user = await User.create({
        FName: 'Telegram',
        MName: '',
        LName: 'User',
        gender: 'male',
        dateOfBirth: new Date('2000-01-01'),
        email: `telegram_${numericTelegramId}@gmail.com`, // ✅ Fixed email domain
        telegramId: numericTelegramId,
        telegramUsername: 'telegram_user',
        status: 'active',
        gradeId: 6,
        purchasedDifficulties: [],
        isPremium: false,
        onboardingCompleted: true,
      });
      console.log(`✅ User created for Telegram ID: ${numericTelegramId}`);
      
      // ✅ Assign student role
      try {
        const studentRole = await Role.findOne({ name: 'student' });
        if (studentRole) {
          await UserRole.create({ userId: user._id, roleId: studentRole._id });
          console.log('✅ Student role assigned to Telegram user');
        }
      } catch (roleError) {
        console.error('❌ Error assigning student role:', roleError);
      }
    } else {
      console.log(`✅ User found for Telegram ID: ${numericTelegramId}`);
    }
    
    req.user = user;
    console.log('✅ Authentication successful (Telegram ID)');
    return next();
    
  } catch (error: any) {
    console.error('❌ Telegram ID lookup/creation failed:', error);
    console.error('❌ Error stack:', error.stack);
    return res.status(500).json({ 
      message: 'Authentication failed: ' + (error.message || 'Unknown error') 
    });
  }
};

export const authorize = (...roles: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    const userRoles = await UserRole.find({ userId: req.user._id }).populate('roleId');
    const userRoleNames = userRoles.map(ur => (ur.roleId as any).name);
    const hasRole = roles.some(role => userRoleNames.includes(role));
    if (!hasRole) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};