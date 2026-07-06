// import { Request, Response, NextFunction } from 'express';
// import passport from 'passport';
// import bcrypt from 'bcryptjs';
// import { OAuth2Client } from 'google-auth-library';
// import User from '../models/User';
// import Credentials from '../models/Credentials';
// import Authentication from '../models/Authentication';
// import Role from '../models/Role';
// import UserRole from '../models/UserRole';
// import { generateTokens } from '../services/token';
// import { env } from '../config/env';
// import ResetOTP from '../models/ResetOTP';


// // Initialize Google OAuth client
// const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

// // ==========================
// // 1. Register (email/password)
// // ==========================
// export const register = async (req: Request, res: Response) => {
//   try {
//     console.log('📝 Registration data:', req.body);
//     const { FName, MName, LName, gender, dateOfBirth, email, password, gradeId } = req.body;

//     if (!FName || !MName || !LName || !gender || !dateOfBirth || !email || !password) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already registered' });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = await User.create({
//       FName,
//       MName,
//       LName,
//       gender,
//       dateOfBirth: new Date(dateOfBirth),
//       email,
//       gradeId: gradeId || undefined,
//       status: 'active',
//       PImage: [],
//     });
//     console.log('✅ User created:', user._id);

//     // ✅ CREATE CREDENTIALS – THIS IS CRITICAL
//     const credentials = await Credentials.create({
//       userId: user._id,
//       type: 'password',
//       email,
//       secret: hashedPassword,
//       loginAttempt: 0,
//     });
//     console.log('✅ Credentials created:', credentials._id);

//     const studentRole = await Role.findOne({ name: 'student' });
//     if (studentRole) {
//       await UserRole.create({ userId: user._id, roleId: studentRole._id });
//     }

//     await Authentication.create({
//       userId: user._id,
//       credentialId: credentials._id,
//       type: 'Login_Success',
//       ip: req.ip || req.socket.remoteAddress || '',
//       userAgent: req.headers['user-agent'] || '',
//     });

//     const { accessToken, refreshToken } = generateTokens(user._id.toString());

//     // ✅ SEND RESPONSE – THIS ALSO WAS MISSING
//     res.status(201).json({
//       user: {
//         id: user._id,
//         email: user.email,
//         FName: user.FName,
//         LName: user.LName,
//         roles: ['student'],
//       },
//       accessToken,
//       refreshToken,
//     });
//   } catch (error: any) {
//     console.error('❌ Registration error:', error);
//     if (error.name === 'ValidationError') {
//       console.error('Validation errors:', error.errors);
//     }
//     res.status(500).json({ message: error.message || 'Server error' });
//   }
// };
// // ==========================
// // 2. Login (email/password)
// // ==========================
// export const login = (req: Request, res: Response, next: NextFunction) => {
//   passport.authenticate('local', async (err: any, user: any, info: any) => {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res.status(401).json({ message: info?.message || 'Invalid credentials' });
//     }

//     try {
//       const cred = await Credentials.findOne({ userId: user._id, type: 'password' });
//       if (cred) {
//         cred.loginAttempt += 1;
//         cred.lastLoginAt = new Date().toISOString();
//         cred.lastIp = req.ip || req.socket.remoteAddress || '';
//         await cred.save();
//       }

//       await Authentication.create({
//         userId: user._id,
//         credentialId: cred?._id,
//         type: 'Login_Success',
//         ip: req.ip || req.socket.remoteAddress || '',
//         userAgent: req.headers['user-agent'] || '',
//       });

//       // ✅ Fix: Properly typed populate
//       const userRoles = await UserRole.find({ userId: user._id }).populate<{ roleId: { name: string } }>('roleId');
//       const roles = userRoles.map(ur => ur.roleId.name);

//       const { accessToken, refreshToken } = generateTokens(user._id.toString(), roles[0] || 'student');

//       res.json({
//         user: {
//           id: user._id,
//           email: user.email,
//           FName: user.FName,
//           LName: user.LName,
//           roles,
//         },
//         accessToken,
//         refreshToken,
//       });
//     } catch (error) {
//       console.error('Login error:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   })(req, res, next);
// };

// // ==========================
// // 3. Google Login
// // ==========================
// export const googleLogin = async (req: Request, res: Response) => {
//   try {
//     console.log('📥 Google login request received');
//     const { token } = req.body;
//     if (!token) {
//       console.log('❌ No token provided');
//       return res.status(400).json({ message: 'Google token required' });
//     }
//     console.log('✅ Token received (length: ' + token.length + ')');

//     console.log('🔑 Verifying with client ID:', env.GOOGLE_CLIENT_ID);
//     const ticket = await googleClient.verifyIdToken({
//       idToken: token,
//       audience: env.GOOGLE_CLIENT_ID,
//     });
//     console.log('✅ Token verified');
//     const payload = ticket.getPayload();
//     if (!payload) {
//       console.log('❌ No payload');
//       return res.status(401).json({ message: 'Invalid Google token' });
//     }
//     console.log('✅ Payload received for email:', payload.email);

//     const { email, given_name, family_name, picture, sub: googleId } = payload;
//     if (!email) {
//       console.log('❌ No email');
//       return res.status(400).json({ message: 'Email not provided by Google' });
//     }

//     console.log('👤 Looking up user:', email);
//     let user = await User.findOne({ email });
//     let cred = await Credentials.findOne({ email, type: 'google' });

//     if (!user) {
//       console.log('🆕 Creating new user...');
//       user = await User.create({
//         FName: given_name || '',
//         MName: '',
//         LName: family_name || '',
//         gender: 'male',
//         dateOfBirth: new Date('2000-01-01'),
//         email,
//         PImage: picture ? [picture] : [],
//         status: 'active',
//         gradeId: undefined,
//       });

//       const studentRole = await Role.findOne({ name: 'student' });
//       if (studentRole) {
//         await UserRole.create({ userId: user._id, roleId: studentRole._id });
//         console.log('✅ Student role assigned');
//       }
//     }

//     if (!cred) {
//       console.log('🆕 Creating Google credentials...');
//       cred = await Credentials.create({
//         userId: user._id,
//         type: 'google',
//         email,
//         secret: googleId,
//         loginAttempt: 0,
//       });
//     } else {
//       console.log('🔄 Updating existing credentials...');
//       cred.lastLoginAt = new Date().toISOString();
//       cred.lastIp = req.ip || req.socket.remoteAddress || '';
//       await cred.save();
//     }

//     await Authentication.create({
//       userId: user._id,
//       credentialId: cred._id,
//       type: 'Login_Success',
//       ip: req.ip || req.socket.remoteAddress || '',
//       userAgent: req.headers['user-agent'] || '',
//     });

//     const userRoles = await UserRole.find({ userId: user._id }).populate<{ roleId: { name: string } }>('roleId');
//     const roles = userRoles.map(ur => ur.roleId.name);

//     const { accessToken, refreshToken } = generateTokens(user._id.toString(), roles[0] || 'student');

//     console.log('✅ Login successful for:', email);
//     res.json({
//       user: {
//         id: user._id,
//         email: user.email,
//         FName: user.FName,
//         LName: user.LName,
//         roles,
//       },
//       accessToken,
//       refreshToken,
//     });
//   } catch (error: any) {
//     console.error('❌ Google login error:', error.message);
//     if (error.response) console.error('Error details:', error.response.data);
//     res.status(500).json({ message: error.message || 'Server error' });
//   }
// };

// // ==========================
// // 4. Get current user
// // ==========================
// export const getMe = async (req: any, res: Response) => {
//   try {
//     const user = await User.findById(req.user._id).select('-__v');
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const userRoles = await UserRole.find({ userId: user._id }).populate<{ roleId: { name: string } }>('roleId');
//     const roles = userRoles.map(ur => ur.roleId.name);

//     res.json({
//       id: user._id,
//       FName: user.FName,
//       MName: user.MName,
//       LName: user.LName,
//       email: user.email,
//       gender: user.gender,
//       dateOfBirth: user.dateOfBirth,
//       status: user.status,
//       gradeId: user.gradeId,
//       roles,
//       PImage: user.PImage,
//     });
//   } catch (error) {
//     console.error('Get me error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// // ==========================
// // 5. Forgot Password (Request OTP)
// // ==========================
// export const forgotPassword = async (req: Request, res: Response) => {
//   try {
//     const { email } = req.body;
//     if (!email) {
//       return res.status(400).json({ message: 'Email is required' });
//     }

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Check if user has a password credential
//     const cred = await Credentials.findOne({ email, type: 'password' });
//     if (!cred) {
//       return res.status(400).json({
//         message: 'This account uses Google login. Please use Google to sign in.',
//       });
//     }

//     // Generate 6-digit OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

//     // Save OTP
//     await ResetOTP.create({ email, otp, expiresAt });

//     // In development, log OTP to console
//     console.log(`🔑 OTP for ${email}: ${otp}`);

//     // TODO: In production, send email using nodemailer
//     res.json({ message: 'OTP sent to your email' });
//   } catch (error) {
//     console.error('Forgot password error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // ==========================
// // 6. Verify OTP
// // ==========================
// export const verifyOtp = async (req: Request, res: Response) => {
//   try {
//     const { email, otp } = req.body;
//     if (!email || !otp) {
//       return res.status(400).json({ message: 'Email and OTP are required' });
//     }

//     const record = await ResetOTP.findOne({ email, otp, used: false });
//     if (!record) {
//       return res.status(400).json({ message: 'Invalid OTP' });
//     }
//     if (record.expiresAt < new Date()) {
//       return res.status(400).json({ message: 'OTP expired' });
//     }

//     // OTP is valid – we don't mark it as used yet; that will happen on password reset.
//     res.json({ message: 'OTP verified' });
//   } catch (error) {
//     console.error('Verify OTP error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // ==========================
// // 7. Reset Password
// // ==========================
// export const resetPassword = async (req: Request, res: Response) => {
//   try {
//     const { email, otp, newPassword } = req.body;
//     if (!email || !otp || !newPassword) {
//       return res.status(400).json({ message: 'Email, OTP, and new password are required' });
//     }
//     if (newPassword.length < 6) {
//       return res.status(400).json({ message: 'Password must be at least 6 characters' });
//     }

//     const record = await ResetOTP.findOne({ email, otp, used: false });
//     if (!record) {
//       return res.status(400).json({ message: 'Invalid OTP' });
//     }
//     if (record.expiresAt < new Date()) {
//       return res.status(400).json({ message: 'OTP expired' });
//     }

//     // Update password in Credentials
//     const cred = await Credentials.findOne({ email, type: 'password' });
//     if (!cred) {
//       return res.status(400).json({ message: 'No password credential found for this account' });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(newPassword, salt);
//     cred.secret = hashedPassword;
//     await cred.save();

//     // Mark OTP as used
//     record.used = true;
//     await record.save();

//     res.json({ message: 'Password reset successful' });
//   } catch (error) {
//     console.error('Reset password error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User';
import Credentials from '../models/Credentials';
import Authentication from '../models/Authentication';
import Role from '../models/Role';
import UserRole from '../models/UserRole';
import RolePermission from '../models/RolePermission';
import Permission from '../models/Permission'; // ✅ ADD THIS
import { generateTokens } from '../services/token';
import { env } from '../config/env';
import ResetOTP from '../models/ResetOTP';

// Initialize Google OAuth client
const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);
export interface AuthRequest extends Request {
  user?: any;
  file?: any;
}
// ==========================
// 1. Register (email/password)
// ==========================
export const register = async (req: Request, res: Response) => {
  try {
    console.log('📝 Registration data:', req.body);
    let { FName, MName, LName, gender, dateOfBirth, email, password, gradeId } = req.body;

    if (!FName || !MName || !LName || !gender || !dateOfBirth || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    email = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      FName,
      MName,
      LName,
      gender,
      dateOfBirth: new Date(dateOfBirth),
      email,
      gradeId: gradeId || undefined,
      status: 'active',
      PImage: [],
    });
    console.log('✅ User created:', user._id);

    // ✅ Create credentials
    const credentials = await Credentials.create({
      userId: user._id,
      type: 'password',
      email,
      secret: hashedPassword,
      loginAttempt: 0,
    });
    console.log('✅ Credentials created:', credentials._id);

    // ✅ Assign default role 'student'
    const studentRole = await Role.findOne({ name: 'student' });
    if (studentRole) {
      await UserRole.create({ userId: user._id, roleId: studentRole._id });
      console.log('✅ Student role assigned');
    }

    // ✅ Log authentication
    await Authentication.create({
      userId: user._id,
      credentialId: credentials._id,
      type: 'Login_Success',
      ip: req.ip || req.socket.remoteAddress || '',
      userAgent: req.headers['user-agent'] || '',
    });

    const { accessToken, refreshToken } = generateTokens(user._id.toString());

    res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        FName: user.FName,
        LName: user.LName,
        roles: ['student'],
      },
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    console.error('❌ Registration error:', error);
    if (error.name === 'ValidationError') {
      console.error('Validation errors:', error.errors);
    }
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// ==========================
// 2. Login (email/password)
// ==========================
export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', async (err: any, user: any, info: any) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info?.message || 'Invalid credentials' });
    }

    try {
      const cred = await Credentials.findOne({ userId: user._id, type: 'password' });
      if (cred) {
        cred.loginAttempt += 1;
        cred.lastLoginAt = new Date().toISOString();
        cred.lastIp = req.ip || req.socket.remoteAddress || '';
        await cred.save();
      }

      await Authentication.create({
        userId: user._id,
        credentialId: cred?._id,
        type: 'Login_Success',
        ip: req.ip || req.socket.remoteAddress || '',
        userAgent: req.headers['user-agent'] || '',
      });

      // ✅ Fetch roles
      const userRoles = await UserRole.find({ userId: user._id }).populate<{ roleId: { _id: string; name: string } }>('roleId');
      const roles = userRoles.map((ur) => ur.roleId.name);

      // ✅ Fetch permissions with try/catch
      let permissions: string[] = [];
      try {
        for (const ur of userRoles) {
          const rolePerms = await RolePermission.find({ roleId: ur.roleId._id }).populate<{ permitId: { _id: string; name: string } }>('permitId');
          permissions.push(...rolePerms.map((rp) => rp.permitId.name));
        }
      } catch (permError: any) {
        console.error('❌ Permission fetch error:', permError);
      }

      const { accessToken, refreshToken } = generateTokens(user._id.toString(), roles[0] || 'student');

      res.json({
        user: {
          id: user._id,
          email: user.email,
          FName: user.FName,
          LName: user.LName,
          roles,
          permissions,
        },
        accessToken,
        refreshToken,
      });
    } catch (error: any) {
      console.error('❌ Login error:', error);
      console.error('Error stack:', error.stack);
      res.status(500).json({ message: 'Server error' });
    }
  })(req, res, next);
};

// ==========================
// 3. Google Login
// ==========================
export const googleLogin = async (req: Request, res: Response) => {
  try {
    console.log('📥 Google login request received');
    const { token } = req.body;
    if (!token) {
      console.log('❌ No token provided');
      return res.status(400).json({ message: 'Google token required' });
    }
    console.log('✅ Token received (length: ' + token.length + ')');

    console.log('🔑 Verifying with client ID:', env.GOOGLE_CLIENT_ID);
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: env.GOOGLE_CLIENT_ID,
    });
    console.log('✅ Token verified');
    const payload = ticket.getPayload();
    if (!payload) {
      console.log('❌ No payload');
      return res.status(401).json({ message: 'Invalid Google token' });
    }
    console.log('✅ Payload received for email:', payload.email);

    const { email, given_name, family_name, picture, sub: googleId } = payload;
    if (!email) {
      console.log('❌ No email');
      return res.status(400).json({ message: 'Email not provided by Google' });
    }

    console.log('👤 Looking up user:', email);
    let user = await User.findOne({ email });
    let cred = await Credentials.findOne({ email, type: 'google' });

    if (!user) {
      console.log('🆕 Creating new user...');
      user = await User.create({
        FName: given_name || '',
        MName: '',
        LName: family_name || '',
        gender: 'male',
        dateOfBirth: new Date('2000-01-01'),
        email,
        PImage: picture ? [picture] : [],
        status: 'active',
        gradeId: undefined,
      });

      const studentRole = await Role.findOne({ name: 'student' });
      if (studentRole) {
        await UserRole.create({ userId: user._id, roleId: studentRole._id });
        console.log('✅ Student role assigned');
      }
    }

    if (!cred) {
      console.log('🆕 Creating Google credentials...');
      cred = await Credentials.create({
        userId: user._id,
        type: 'google',
        email,
        secret: googleId,
        loginAttempt: 0,
      });
    } else {
      console.log('🔄 Updating existing credentials...');
      cred.lastLoginAt = new Date().toISOString();
      cred.lastIp = req.ip || req.socket.remoteAddress || '';
      await cred.save();
    }

    await Authentication.create({
      userId: user._id,
      credentialId: cred._id,
      type: 'Login_Success',
      ip: req.ip || req.socket.remoteAddress || '',
      userAgent: req.headers['user-agent'] || '',
    });

    // ✅ Fetch roles with proper typing
    const userRoles = await UserRole.find({ userId: user._id }).populate<{ roleId: { _id: string; name: string } }>('roleId');
    const roles = userRoles.map((ur) => ur.roleId.name);

    // ✅ Fetch permissions
    const permissions: string[] = [];
    for (const ur of userRoles) {
      const rolePerms = await RolePermission.find({ roleId: ur.roleId._id }).populate<{ permitId: { _id: string; name: string } }>('permitId');
      permissions.push(...rolePerms.map((rp) => rp.permitId.name));
    }

    const { accessToken, refreshToken } = generateTokens(user._id.toString(), roles[0] || 'student');

    console.log('✅ Login successful for:', email);
    res.json({
      user: {
        id: user._id,
        email: user.email,
        FName: user.FName,
        LName: user.LName,
        roles,
        permissions,
      },
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    console.error('❌ Google login error:', error.message);
    if (error.response) console.error('Error details:', error.response.data);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// ==========================
// 4. Get current user
// ==========================
export const getMe = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user._id).select('-__v');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // ✅ Fetch roles with proper typing
    const userRoles = await UserRole.find({ userId: user._id }).populate<{ roleId: { _id: string; name: string } }>('roleId');
    const roles = userRoles.map((ur) => ur.roleId.name);

    // ✅ Fetch permissions
    const permissions: string[] = [];
    for (const ur of userRoles) {
      const rolePerms = await RolePermission.find({ roleId: ur.roleId._id }).populate<{ permitId: { _id: string; name: string } }>('permitId');
      permissions.push(...rolePerms.map((rp) => rp.permitId.name));
    }

    res.json({
      id: user._id,
      FName: user.FName,
      MName: user.MName,
      LName: user.LName,
      email: user.email,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      status: user.status,
      gradeId: user.gradeId,
      roles,
      permissions,
      PImage: user.PImage,
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ==========================
// 5. Forgot Password (Request OTP)
// ==========================
import { sendOTPEmail } from '../services/email';

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const cred = await Credentials.findOne({ email, type: 'password' });
    if (!cred) {
      return res.status(400).json({
        message: 'This account uses Google login. Please use Google to sign in.',
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await ResetOTP.create({ email, otp, expiresAt });

    // ✅ Send email
    await sendOTPEmail(email, otp);

    console.log(`🔑 OTP for ${email}: ${otp}`);

    res.json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// ==========================
// 6. Verify OTP
// ==========================
export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const record = await ResetOTP.findOne({ email, otp, used: false });
    if (!record) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
    if (record.expiresAt < new Date()) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    res.json({ message: 'OTP verified' });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ==========================
// 7. Reset Password
// ==========================
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: 'Email, OTP, and new password are required' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const record = await ResetOTP.findOne({ email, otp, used: false });
    if (!record) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
    if (record.expiresAt < new Date()) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    const cred = await Credentials.findOne({ email, type: 'password' });
    if (!cred) {
      return res.status(400).json({ message: 'No password credential found for this account' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    cred.secret = hashedPassword;
    await cred.save();

    record.used = true;
    await record.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// auth.controller.ts – add these functions

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const { FName, MName, LName, gender, dateOfBirth, gradeId } = req.body;
    // Update user
    const updated = await User.findByIdAndUpdate(
      userId,
      { FName, MName, LName, gender, dateOfBirth, gradeId, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).select('-password');
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const changePassword = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const { currentPassword, newPassword } = req.body;
    const credentials = await Credentials.findOne({ userId });
    if (!credentials) return res.status(404).json({ message: 'Credentials not found' });
    const isMatch = await bcrypt.compare(currentPassword, credentials.secret);
    if (!isMatch) return res.status(401).json({ message: 'Current password is incorrect' });
    credentials.secret = await bcrypt.hash(newPassword, 10);
    credentials.updatedAt = new Date();
    await credentials.save();
    res.json({ message: 'Password changed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const uploadAvatar = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const userId = req.user._id;
    // In a real app, you'd save the file to a cloud storage and get a URL
    // For simplicity, store the buffer as a base64 string (not recommended for production)
    const avatarData = req.file.buffer.toString('base64');
    await User.findByIdAndUpdate(userId, { 
      $push: { PImage: avatarData },
      updatedAt: new Date()
    });
    res.json({ message: 'Avatar uploaded' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteAccount = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user._id;
    await User.findByIdAndUpdate(userId, { 
      deleteAt: new Date(), 
      status: 'deleted',
      updatedAt: new Date()
    });
    await Credentials.findOneAndUpdate({ userId }, { deleteAt: new Date() });
    res.json({ message: 'Account deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};