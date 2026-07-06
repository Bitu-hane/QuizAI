// // import express from 'express';
// // import { register, login, googleLogin, getMe } from '../Controller/auth';
// // import { protect } from '../middleware/auth';

// // const router = express.Router();

// // router.post('/register', register);
// // router.post('/login', login);
// // router.post('/google', googleLogin);
// // router.get('/me', protect, getMe);

// // export default router;


// import express from 'express';
// import {
//   register,
//   login,
//   googleLogin,
//   getMe,
//   forgotPassword,
//   verifyOtp,
//   resetPassword,
// } from '../Controller/auth';
// import { protect } from '../middleware/auth';

// const router = express.Router();

// router.post('/register', register);
// router.post('/login', login);
// router.post('/google', googleLogin);
// router.get('/me', protect, getMe);

// // New password reset routes
// router.post('/forgot-password', forgotPassword);
// router.post('/verify-otp', verifyOtp);
// router.post('/reset-password', resetPassword);

// export default router;



import express from 'express';
import multer, { FileFilterCallback } from 'multer';
import {
  register,
  login,
  googleLogin,
  getMe,
  forgotPassword,
  verifyOtp,
  resetPassword,
  updateProfile,
  changePassword,
  uploadAvatar,
  deleteAccount,
} from '../Controller/auth';
import { protect } from '../middleware/auth';

const router = express.Router();

// Configure multer
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (
    req: express.Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed') as any);
    }
  },
});

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/google', googleLogin);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);
router.post('/avatar', protect, upload.single('avatar'), uploadAvatar);
router.delete('/delete-account', protect, deleteAccount);

export default router;