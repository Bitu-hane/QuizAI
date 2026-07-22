// import dotenv from 'dotenv';
// dotenv.config();
// import './config/passport';
// import express from 'express';
// import cors from 'cors';
// import { connectDB } from './config/db';
// import authRoutes from './routes/auth';
// import gradeRoutes from './routes/grade';
// import subjectRoutes from './routes/subject';
// import lessonRoutes from './routes/lesson';
// import quizRoutes from './routes/quiz';
// import resultRoutes from './routes/result';
// import progressRoutes from './routes/progess';
// import adminRoutes from './routes/admin';
// import { errorHandler } from './middleware/errorHandler';
// import userRoutes from './routes/User';

// // --- Global error handlers (catch startup errors) ---
// process.on('uncaughtException', (err) => {
//   console.error('❌ Uncaught Exception:', err);
//   process.exit(1);
// });
// process.on('unhandledRejection', (reason, promise) => {
//   console.error('❌ Unhandled Rejection:', reason);
//   process.exit(1);
// });

// const app = express();
// app.get('/ping', (req, res) => res.send('pong'));
// app.use(cors());
// app.use('/api/users', userRoutes);
// app.use(express.json());
// app.use((req, res, next) => {
//   console.log(`📥 ${req.method} ${req.url}`);
//   next();
// });

// // --- Connect to DB and start server ---
// const startServer = async () => {
//   try {
//     await connectDB(); // 👈 must wait for DB connection
//     console.log('✅ MongoDB connected');

//     // Routes
//     app.use('/api/auth', authRoutes);
//     app.use('/api/grades', gradeRoutes);
//     app.use('/api/subjects', subjectRoutes);
//     app.use('/api/lessons', lessonRoutes);
//     app.use('/api/quizzes', quizRoutes);
//     app.use('/api/results', resultRoutes);
//     app.use('/api/progress', progressRoutes);
//     app.use('/api/admin', adminRoutes);

//     app.use(errorHandler);

//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });
//   } catch (err) {
//     console.error('❌ Failed to start server:', err);
//     process.exit(1);
//   }
// };



// startServer();

import dotenv from 'dotenv';
dotenv.config();
import './config/passport';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import authRoutes from './routes/auth';
import gradeRoutes from './routes/grade';
import subjectRoutes from './routes/subject';
import lessonRoutes from './routes/lesson';
import quizRoutes from './routes/quiz';
import resultRoutes from './routes/result';
import reportRoutes from './routes/report'; 
import progressRoutes from './routes/progess';  // ✅ fixed typo
import adminRoutes from './routes/admin';
import paymentRoutes from './routes/Payment';  // ✅ added payment routes
import { errorHandler } from './utils/errorHandler';
import userRoutes from './routes/User';

// --- Global error handlers ---
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection:', reason);
  process.exit(1);
});

const app = express();

// ✅ CORS first
app.use(cors());

// ✅ JSON parser BEFORE routes
app.use(express.json());

// ✅ Logger AFTER JSON parser
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url}`);
  next();
});


// Test route
app.get('/ping', (req, res) => res.send('pong'));

// --- Connect to DB and start server ---
const startServer = async () => {
  try {
    await connectDB();
    console.log('✅ MongoDB connected');

    // Routes (all AFTER middleware)
    app.use('/api/auth', authRoutes);
    app.use('/api/grades', gradeRoutes);
    app.use('/api/subjects', subjectRoutes);
    app.use('/api/lessons', lessonRoutes);
    app.use('/api/quizzes', quizRoutes);
    app.use('/api/results', resultRoutes);
    app.use('/api/progress', progressRoutes);
    app.use('/api/admin', adminRoutes);
    app.use('/api/users', userRoutes);  
    app.use('/api/reports', reportRoutes);
    app.use('/api/payment', paymentRoutes);

app.post('/api/users/onboarding', (req, res) => {
  console.log('✅ Onboarding route hit!', req.body);
  res.json({ message: 'Onboarding works!' });
});
    app.use(errorHandler);

    const PORT = process.env.PORT || 5001;
     const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    server.on('error', (err) => {
      console.error('❌ Server failed to start:', err);
      process.exit(1);
    });

  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
