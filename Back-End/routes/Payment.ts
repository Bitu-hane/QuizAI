// import express from 'express';
// import { 
//   initializePayment, 
//   verifyPayment, 
//   webhookHandler 
// } from '../Controller/Payment';
// import { protect } from '../middleware/auth';

// const router = express.Router();

// // ✅ Public routes (webhook from Chapa)
// router.post('/webhook', webhookHandler);

// // ✅ Protected routes (require authentication)
// router.post('/initialize', protect, initializePayment);
// router.post('/verify', protect, verifyPayment);

// export default router;


// import express from 'express';
// import { 
//   initializePayment, 
//   purchaseDifficulty, 
//   verifyPayment, 
//   webhookHandler 
// } from '../Controller/Payment';
// import { protect } from '../middleware/auth';

// const router = express.Router();

// // ===== PUBLIC ROUTES (no auth) =====
// router.post('/webhook', webhookHandler);

// // ===== PROTECTED ROUTES (require authentication) =====
// router.use(protect);

// // ✅ Premium subscription
// router.post('/initialize', initializePayment);

// // ✅ Difficulty unlock (MUST EXIST)
// router.post('/purchase-difficulty', purchaseDifficulty);

// // ✅ Verify payment
// router.post('/verify', verifyPayment);

// export default router;

import express from 'express';
import { 
  initializePayment, 
  purchaseDifficulty, 
  verifyPayment, 
  webhookHandler 
} from '../Controller/Payment';
import { protect } from '../middleware/auth';

const router = express.Router();

// ===== PUBLIC ROUTES (no auth) =====
router.post('/webhook', webhookHandler);

// ===== PROTECTED ROUTES (require authentication) =====
router.use(protect);

// ✅ Premium subscription
router.post('/initialize', initializePayment);

// ✅ Difficulty unlock – requires authentication (JWT for web, telegramId for bot)
router.post('/purchase-difficulty', purchaseDifficulty);

// ✅ Verify payment
router.post('/verify', verifyPayment);

export default router;