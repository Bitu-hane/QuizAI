import express from 'express';
import { protect } from '../middleware/auth';
import { completeOnboarding } from '../Controller/User';

const router = express.Router();

// Test route (to verify the file is loaded)
router.get('/test', (req, res) => {
  res.json({ message: 'User route works!' });
});

// Onboarding route
router.post('/onboarding', protect, completeOnboarding);

export default router;