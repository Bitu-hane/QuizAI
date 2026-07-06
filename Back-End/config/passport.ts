import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Credentials from '../models/Credentials';
import Role from '../models/Role';
import UserRole from '../models/UserRole';
import { env } from './env';


passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        email = email.trim().toLowerCase();
        console.log('🔍 Login attempt for:', email);
        const cred = await Credentials.findOne({ email, type: 'password' });
        if (!cred) {
          console.log('❌ No password credentials for:', email);
          return done(null, false, { message: 'Invalid email or password' });
        }
        console.log('✅ Credentials found for:', email);

        const user = await User.findById(cred.userId);
        if (!user) {
          console.log('❌ User not found for credentials:', email);
          return done(null, false, { message: 'Invalid email or password' });
        }
        console.log('✅ User found:', user.email);

        const isMatch = await bcrypt.compare(password, cred.secret);
        if (!isMatch) {
          console.log('❌ Password mismatch for:', email);
          return done(null, false, { message: 'Invalid email or password' });
        }
        console.log('✅ Password matches for:', email);
        return done(null, user);
      } catch (err) {
        console.error('❌ Local strategy error:', err);
        return done(err);
      }
    }
  )
);

// =====================
// Google OAuth Strategy
// =====================
if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) {
  console.warn('⚠️ Google OAuth client ID or secret missing. Google strategy disabled.');
} else {
  const CALLBACK_URL = `http://localhost:${env.PORT}/api/auth/google/callback`;

  passport.use(
    new GoogleStrategy(
      {
        clientID: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        callbackURL: CALLBACK_URL,
        scope: ['profile', 'email'],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
          if (!email) {
            return done(new Error('No email received from Google'), undefined);
          }

          // Find or create user
          let user = await User.findOne({ email });
          if (!user) {
            // Split display name into parts (simple fallback)
            const fullName = profile.displayName || 'Google User';
            const nameParts = fullName.split(' ');
            const FName = nameParts[0] || '';
            const LName = nameParts.slice(1).join(' ') || '';

            user = await User.create({
              FName,
              MName: '',
              LName,
              gender: 'male', // default
              dateOfBirth: new Date('2000-01-01'), // placeholder
              email,
              PImage: profile.photos?.[0]?.value ? [profile.photos[0].value] : [],
              status: 'active',
              gradeId: undefined,
            });

            // Assign default role 'student'
            const studentRole = await Role.findOne({ name: 'student' });
            if (studentRole) {
              await UserRole.create({ userId: user._id, roleId: studentRole._id });
            }

            // Create credentials entry for Google
            await Credentials.create({
              userId: user._id,
              type: 'google',
              email,
              secret: profile.id, // store Google ID
              loginAttempt: 0,
            });

            console.log(`🆕 New Google user created: ${email}`);
          } else {
            // Update existing credentials if needed
            const cred = await Credentials.findOne({ email, type: 'google' });
            if (cred) {
              cred.lastLoginAt = new Date().toISOString();
              await cred.save();
            }
            console.log(`🔐 Existing Google user logged in: ${email}`);
          }

          return done(null, user);
        } catch (err) {
          console.error('❌ Google OAuth error:', err);
          return done(err, undefined);
        }
      }
    )
  );

  console.log(`✅ Google OAuth configured with callback: ${CALLBACK_URL}`);
}

// =====================
// Serialization (not used with JWT, but kept for compatibility)
// =====================
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }

});


// import passport from 'passport';
// import { Strategy as LocalStrategy } from 'passport-local';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import bcrypt from 'bcryptjs';
// import User from '../models/User';
// import Credentials from '../models/Credentials';
// import { env } from './env';

// // Local strategy
// passport.use(
//   new LocalStrategy(
//     { usernameField: 'email', passwordField: 'password' },
//     async (email, password, done) => {
//       try {
//         const cred = await Credentials.findOne({ email, type: 'password' });
//         if (!cred) return done(null, false, { message: 'Invalid email or password' });
//         const user = await User.findById(cred.userId);
//         if (!user) return done(null, false, { message: 'User not found' });
//         const isMatch = await bcrypt.compare(password, cred.secret);
//         if (!isMatch) return done(null, false, { message: 'Invalid email or password' });
//         return done(null, user);
//       } catch (err) {
//         return done(err);
//       }
//     }
//   )
// );

// // Google strategy (optional)
// if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) {
//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: env.GOOGLE_CLIENT_ID,
//         clientSecret: env.GOOGLE_CLIENT_SECRET,
//         callbackURL: `http://localhost:${env.PORT}/api/auth/google/callback`,
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         // ... (your existing Google strategy code)
//       }
//     )
//   );
// }