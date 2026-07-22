// import { Request, Response } from 'express';
// import axios from 'axios';
// import { AuthRequest } from '../middleware/auth';
// import User from '../models/User';

// // ========== HELPER: Get price for difficulty ==========
// const getPriceForDifficulty = (difficulty: number): number => {
//   const prices: { [key: number]: number } = {
//     3: 500,
//     4: 700,
//     5: 1000,
//   };
//   return prices[difficulty] || 0;
// };

// // ========== PREMIUM SUBSCRIPTION ==========
// export const initializePayment = async (req: AuthRequest, res: Response) => {
//   try {
//     const { amount, email, firstName, lastName, phone } = req.body;
//     const studentId = req.user._id;

//     // Validate required fields
//     if (!amount || !email) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Amount and email are required' 
//       });
//     }

//     const txRef = `premium-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

//     const response = await axios.post(
//       `${process.env.CHAPA_API_URL}/transaction/initialize`,
//       {
//         amount: Number(amount),
//         currency: 'ETB',
//         email: email,
//         first_name: firstName || 'Student',
//         last_name: lastName || 'User',
//         phone_number: phone || '0912345678',
//         tx_ref: txRef,
//         return_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment/success`,
//         callback_url: `${process.env.BACKEND_URL || 'http://localhost:5001'}/api/payment/webhook`,
//         customization: {
//           title: 'QuizAI Premium Subscription',
//           description: 'Unlock premium quizzes, AI recommendations, and advanced analytics',
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     res.json({
//       success: true,
//       checkout_url: response.data.data.checkout_url,
//       tx_ref: txRef,
//     });
//   } catch (error: any) {
//     console.error('Chapa initialization error:', error.response?.data || error.message);
//     res.status(500).json({ 
//       success: false, 
//       message: error.response?.data?.message || 'Payment initialization failed' 
//     });
//   }
// };export const purchaseDifficulty = async (req: AuthRequest, res: Response) => {
//   console.log('🔥 purchaseDifficulty called');
//   console.log('📝 req.body:', req.body);
//   console.log('👤 req.user:', req.user);
  
//   try {
//     const { difficulty, phone } = req.body;
//     const userId = req.user._id;


//     console.log('📝 Difficulty:', difficulty);
//     console.log('📝 Phone:', phone);

//     // Validate difficulty
//     if (![3, 4, 5].includes(difficulty)) {
//       console.log('❌ Invalid difficulty:', difficulty);
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Invalid difficulty level. Only 3, 4, and 5 can be unlocked.' 
//       });
//     }

//     const amount = getPriceForDifficulty(difficulty);
//     if (!amount) {
//       console.log('❌ Amount not found for difficulty:', difficulty);
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Invalid difficulty level' 
//       });
//     }

//     const txRef = `unlock-${difficulty}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
//     console.log('📝 txRef:', txRef);

//     // Check if CHAPA_SECRET_KEY exists
//     if (!process.env.CHAPA_SECRET_KEY) {
//       console.error('❌ CHAPA_SECRET_KEY is missing in .env');
//       return res.status(500).json({ 
//         success: false, 
//         message: 'Payment configuration error. Please contact support.' 
//       });
//     }

//     if (!process.env.CHAPA_API_URL) {
//       console.error('❌ CHAPA_API_URL is missing in .env');
//       return res.status(500).json({ 
//         success: false, 
//         message: 'Payment configuration error. Please contact support.' 
//       });
//     }

//     console.log('🔑 CHAPA_SECRET_KEY present:', process.env.CHAPA_SECRET_KEY.substring(0, 10) + '...');
//     console.log('🌐 CHAPA_API_URL:', process.env.CHAPA_API_URL);

//     const payload = {
//       amount: amount,
//       currency: 'ETB',
//       email: req.user.email,
//       first_name: req.user.FName || 'Student',
//       last_name: req.user.LName || 'User',
//       phone_number: phone || '0912345678',
//       tx_ref: txRef,
//       return_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment/success?difficulty=${difficulty}`,
//       callback_url: `${process.env.BACKEND_URL || 'http://localhost:5001'}/api/payment/webhook`,
//      customization: {
//   title: `Level ${difficulty} Unlock`,  // ✅ 16 characters max
//   description: `Access all quizzes at difficulty level ${difficulty}`,
// },
//     };

//     console.log('📤 Sending to Chapa:', JSON.stringify(payload, null, 2));

//     const response = await axios.post(
//       `${process.env.CHAPA_API_URL}/transaction/initialize`,
//       payload,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     console.log('✅ Chapa response:', response.data);

//     res.json({
//       success: true,
//       checkout_url: response.data.data.checkout_url,
//       tx_ref: txRef,
//       difficulty,
//     });
//   } catch (error: any) {
//     console.error('❌ Chapa API Error:');
//     console.error('  - Status:', error.response?.status);
//     console.error('  - Data:', JSON.stringify(error.response?.data, null, 2));
//     console.error('  - Message:', error.message);
    
//     res.status(500).json({ 
//       success: false, 
//       message: error.response?.data?.message || 'Payment failed. Please try again.',
//     });
//   }
// };
// // ========== VERIFY PAYMENT ==========
// export const verifyPayment = async (req: Request, res: Response) => {
//   try {
//     const { tx_ref, status, transaction_id } = req.body;

//     // Verify with Chapa API to confirm
//     const verifyResponse = await axios.get(
//       `${process.env.CHAPA_API_URL}/transaction/verify/${tx_ref}`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
//         },
//       }
//     );

//     const paymentData = verifyResponse.data.data;
//     if (paymentData.status === 'success') {
//       // Check if it's a difficulty unlock
//       if (tx_ref?.startsWith('unlock-')) {
//         // Extract difficulty from tx_ref
//         const parts = tx_ref.split('-');
//         const difficulty = parseInt(parts[1]);
        
//         // Find user by tx_ref (you need to store tx_ref -> userId mapping)
//         // For now, we'll update the user who initiated the payment
//         // You should store tx_ref with userId in a Payment model for production
        
//         console.log(`✅ Difficulty ${difficulty} unlocked for transaction: ${tx_ref}`);
//       } else if (tx_ref?.startsWith('premium-')) {
//         // Premium subscription
//         console.log(`✅ Premium subscription activated for transaction: ${tx_ref}`);
//       }
      
//       return res.json({ 
//         success: true, 
//         message: 'Payment verified successfully',
//         data: paymentData
//       });
//     } else {
//       return res.json({ 
//         success: false, 
//         message: 'Payment verification failed' 
//       });
//     }
//   } catch (error: any) {
//     console.error('Verification error:', error.response?.data || error.message);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Verification failed' 
//     });
//   }
// };

// // ========== WEBHOOK HANDLER ==========
// export const webhookHandler = async (req: Request, res: Response) => {
//   try {
//     const { tx_ref, status } = req.body;

//     if (status === 'success') {
//       if (tx_ref?.startsWith('unlock-')) {
//         // Extract difficulty from tx_ref
//         const parts = tx_ref.split('-');
//         const difficulty = parseInt(parts[1]);
        
//         // ⚠️ IMPORTANT: You need to store tx_ref -> userId mapping
//         // For now, this is a placeholder
//         // In production, you should have a Payment model that stores tx_ref, userId, and difficulty
//         // Then: await User.findByIdAndUpdate(userId, { $addToSet: { purchasedDifficulties: difficulty } });
        
//         console.log(`✅ Difficulty ${difficulty} unlocked for transaction: ${tx_ref}`);
//       } else if (tx_ref?.startsWith('premium-')) {
//         // Premium subscription
//         // await User.findByIdAndUpdate(userId, { 
//         //   isPremium: true, 
//         //   premiumExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) 
//         // });
//         console.log(`✅ Premium subscription activated for transaction: ${tx_ref}`);
//       }
//     } else {
//       console.log(`❌ Payment failed for transaction: ${tx_ref}`);
//     }

//     res.json({ success: true });
//   } catch (error) {
//     console.error('Webhook error:', error);
//     res.status(500).json({ success: false, message: 'Webhook processing failed' });
//   }
// };




// import { Request, Response } from 'express';
// import axios from 'axios';
// import { AuthRequest } from '../middleware/auth';
// import User from '../models/User';

// // ========== HELPER: Get price for difficulty ==========
// const getPriceForDifficulty = (difficulty: number): number => {
//   const prices: { [key: number]: number } = {
//     3: 500,
//     4: 700,
//     5: 1000,
//   };
//   return prices[difficulty] || 0;
// };

// // ========== PREMIUM SUBSCRIPTION ==========
// export const initializePayment = async (req: AuthRequest, res: Response) => {
//   try {
//     const { amount, email, firstName, lastName, phone } = req.body;
//     const userId = req.user._id;

//     // Validate required fields
//     if (!amount || !email) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Amount and email are required' 
//       });
//     }

//     // ✅ Include userId in tx_ref
//     const txRef = `premium-${userId}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

//     const response = await axios.post(
//       `${process.env.CHAPA_API_URL}/transaction/initialize`,
//       {
//         amount: Number(amount),
//         currency: 'ETB',
//         email: email,
//         first_name: firstName || 'Student',
//         last_name: lastName || 'User',
//         phone_number: phone || '0912345678',
//         tx_ref: txRef,
//         return_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment/success`,
//         callback_url: `${process.env.BACKEND_URL || 'http://localhost:5001'}/api/payment/webhook`,
//         customization: {
//           title: 'Premium Access',
//           description: 'Unlock premium quizzes, AI recommendations, and advanced analytics',
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     res.json({
//       success: true,
//       checkout_url: response.data.data.checkout_url,
//       tx_ref: txRef,
//     });
//   } catch (error: any) {
//     console.error('Chapa initialization error:', error.response?.data || error.message);
//     res.status(500).json({ 
//       success: false, 
//       message: error.response?.data?.message || 'Payment initialization failed' 
//     });
//   }
// };

// // ========== PURCHASE DIFFICULTY LEVEL ==========
// export const purchaseDifficulty = async (req: AuthRequest, res: Response) => {
//   console.log('🔥 purchaseDifficulty called');
//   console.log('📝 req.body:', req.body);
//   console.log('👤 req.user:', req.user);
  
//   try {
//     const { difficulty, phone } = req.body;
//     const userId = req.user._id;

//     console.log('📝 Difficulty:', difficulty);
//     console.log('📝 Phone:', phone);

//     // Validate difficulty
//     if (![3, 4, 5].includes(difficulty)) {
//       console.log('❌ Invalid difficulty:', difficulty);
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Invalid difficulty level. Only 3, 4, and 5 can be unlocked.' 
//       });
//     }

//     const amount = getPriceForDifficulty(difficulty);
//     if (!amount) {
//       console.log('❌ Amount not found for difficulty:', difficulty);
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Invalid difficulty level' 
//       });
//     }

//     // ✅ Include userId in tx_ref so webhook knows which user
//     const txRef = `unlock-${difficulty}-${userId}-${Date.now()}`;
//     console.log('📝 txRef:', txRef);

//     // Check if CHAPA_SECRET_KEY exists
//     if (!process.env.CHAPA_SECRET_KEY) {
//       console.error('❌ CHAPA_SECRET_KEY is missing in .env');
//       return res.status(500).json({ 
//         success: false, 
//         message: 'Payment configuration error. Please contact support.' 
//       });
//     }

//     if (!process.env.CHAPA_API_URL) {
//       console.error('❌ CHAPA_API_URL is missing in .env');
//       return res.status(500).json({ 
//         success: false, 
//         message: 'Payment configuration error. Please contact support.' 
//       });
//     }

//     console.log('🔑 CHAPA_SECRET_KEY present:', process.env.CHAPA_SECRET_KEY.substring(0, 10) + '...');
//     console.log('🌐 CHAPA_API_URL:', process.env.CHAPA_API_URL);

//     const payload = {
//       amount: amount,
//       currency: 'ETB',
//       email: req.user.email,
//       first_name: req.user.FName || 'Student',
//       last_name: req.user.LName || 'User',
//       phone_number: phone || '0912345678',
//       tx_ref: txRef,
//       return_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment/success?difficulty=${difficulty}`,
//       callback_url: `${process.env.BACKEND_URL || 'http://localhost:5001'}/api/payment/webhook`,
//       customization: {
//         title: `Level ${difficulty} Unlock`,  // ✅ 16 characters max
//         description: `Access all quizzes at difficulty level ${difficulty}`,
//       },
//     };

//     console.log('📤 Sending to Chapa:', JSON.stringify(payload, null, 2));

//     const response = await axios.post(
//       `${process.env.CHAPA_API_URL}/transaction/initialize`,
//       payload,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     console.log('✅ Chapa response:', response.data);

//     res.json({
//       success: true,
//       checkout_url: response.data.data.checkout_url,
//       tx_ref: txRef,
//       difficulty,
//     });
//   } catch (error: any) {
//     console.error('❌ Chapa API Error:');
//     console.error('  - Status:', error.response?.status);
//     console.error('  - Data:', JSON.stringify(error.response?.data, null, 2));
//     console.error('  - Message:', error.message);
    
//     res.status(500).json({ 
//       success: false, 
//       message: error.response?.data?.message || 'Payment failed. Please try again.',
//     });
//   }
// };

// // ========== VERIFY PAYMENT ==========
// export const verifyPayment = async (req: Request, res: Response) => {
//   try {
//     const { tx_ref, status, transaction_id } = req.body;

//     if (!tx_ref) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Transaction reference is required' 
//       });
//     }

//     // Verify with Chapa API to confirm
//     const verifyResponse = await axios.get(
//       `${process.env.CHAPA_API_URL}/transaction/verify/${tx_ref}`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
//         },
//       }
//     );

//     const paymentData = verifyResponse.data.data;
//     if (paymentData.status === 'success') {
//       // Check if it's a difficulty unlock
//       if (tx_ref?.startsWith('unlock-')) {
//         const parts = tx_ref.split('-');
//         const difficulty = parseInt(parts[1]);
//         const userId = parts[2];
        
//         // ✅ Update user's purchased difficulties
//         await User.findByIdAndUpdate(userId, {
//           $addToSet: { purchasedDifficulties: difficulty }
//         });
        
//         console.log(`✅ Difficulty ${difficulty} unlocked for user ${userId}`);
//       } else if (tx_ref?.startsWith('premium-')) {
//         const parts = tx_ref.split('-');
//         const userId = parts[1];
        
//         // ✅ Activate premium subscription
//         await User.findByIdAndUpdate(userId, {
//           isPremium: true,
//           premiumExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
//         });
        
//         console.log(`✅ Premium subscription activated for user ${userId}`);
//       }
      
//       return res.json({ 
//         success: true, 
//         message: 'Payment verified successfully',
//         data: paymentData
//       });
//     } else {
//       return res.json({ 
//         success: false, 
//         message: 'Payment verification failed' 
//       });
//     }
//   } catch (error: any) {
//     console.error('Verification error:', error.response?.data || error.message);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Verification failed' 
//     });
//   }
// };

// // ========== WEBHOOK HANDLER ==========
// export const webhookHandler = async (req: Request, res: Response) => {
//   try {
//     const { tx_ref, status } = req.body;

//     console.log('📥 Webhook received:', { tx_ref, status });

//     if (status === 'success') {
//       if (tx_ref?.startsWith('unlock-')) {
//         const parts = tx_ref.split('-');
//         const difficulty = parseInt(parts[1]);
//         const userId = parts[2];
        
//         // ✅ Update user's purchased difficulties
//         if (userId) {
//           await User.findByIdAndUpdate(userId, {
//             $addToSet: { purchasedDifficulties: difficulty }
//           });
//           console.log(`✅ Difficulty ${difficulty} unlocked for user ${userId}`);
//         } else {
//           console.log(`⚠️ No userId found in tx_ref: ${tx_ref}`);
//         }
//       } else if (tx_ref?.startsWith('premium-')) {
//         const parts = tx_ref.split('-');
//         const userId = parts[1];
        
//         if (userId) {
//           // ✅ Activate premium subscription
//           await User.findByIdAndUpdate(userId, {
//             isPremium: true,
//             premiumExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
//           });
//           console.log(`✅ Premium subscription activated for user ${userId}`);
//         } else {
//           console.log(`⚠️ No userId found in tx_ref: ${tx_ref}`);
//         }
//       }
//     } else {
//       console.log(`❌ Payment failed for transaction: ${tx_ref}`);
//     }

//     res.json({ success: true });
//   } catch (error) {
//     console.error('Webhook error:', error);
//     res.status(500).json({ success: false, message: 'Webhook processing failed' });
//   }
// };



import { Request, Response } from 'express';
import axios from 'axios';
import { AuthRequest } from '../middleware/auth';
import User from '../models/User';
import Role from '../models/Role';
import UserRole from '../models/UserRole';

// ========== HELPER: Get price for difficulty ==========
const getPriceForDifficulty = (difficulty: number): number => {
  const prices: { [key: number]: number } = {
    3: 500,
    4: 700,
    5: 1000,
  };
  return prices[difficulty] || 0;
};

// ========== HELPER: Get or create user from Telegram ID ==========
const getOrCreateUserByTelegramId = async (telegramId: number, username?: string) => {
  // ✅ Validate telegramId
  if (!telegramId || isNaN(telegramId)) {
    console.error('❌ Invalid telegramId:', telegramId);
    return null;
  }
  
  let user = await User.findOne({ telegramId: Number(telegramId) });
  
  if (!user) {
    console.log(`🆕 Creating new user for Telegram ID: ${telegramId}`);
    user = await User.create({
      FName: 'Telegram',
      MName: '',
      LName: 'User',
      gender: 'male',
      dateOfBirth: new Date('2000-01-01'),
      email: `telegram_${telegramId}@gmail.com`,
      telegramId: Number(telegramId),
      telegramUsername: username || 'telegram_user',
      status: 'active',
      gradeId: 6,
      purchasedDifficulties: [],
      isPremium: false,
      onboardingCompleted: true,
    });
    console.log(`✅ User created for Telegram ID: ${telegramId}`);
    
    // Assign student role
    try {
      const studentRole = await Role.findOne({ name: 'student' });
      if (studentRole) {
        await UserRole.create({ userId: user._id, roleId: studentRole._id });
        console.log('✅ Student role assigned to Telegram user');
      }
    } catch (roleError) {
      console.error('❌ Error assigning student role:', roleError);
    }
  }
  
  return user;
};
// ========== PREMIUM SUBSCRIPTION ==========
export const initializePayment = async (req: AuthRequest, res: Response) => {
  try {
    const { amount, email, firstName, lastName, phone } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: 'User not authenticated' 
      });
    }

    // Validate required fields
    if (!amount || !email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Amount and email are required' 
      });
    }

    const txRef = `premium-${userId}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

    const response = await axios.post(
      `${process.env.CHAPA_API_URL}/transaction/initialize`,
      {
        amount: Number(amount),
        currency: 'ETB',
        email: email,
        first_name: firstName || 'Student',
        last_name: lastName || 'User',
        phone_number: phone || '0912345678',
        tx_ref: txRef,
        return_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment/success`,
        callback_url: `${process.env.BACKEND_URL || 'http://localhost:5001'}/api/payment/webhook`,
        customization: {
          title: 'Premium Access',
          description: 'Unlock premium quizzes, AI recommendations, and advanced analytics',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({
      success: true,
      checkout_url: response.data.data.checkout_url,
      tx_ref: txRef,
    });
  } catch (error: any) {
    console.error('Chapa initialization error:', error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      message: error.response?.data?.message || 'Payment initialization failed' 
    });
  }
};

// ========== PURCHASE DIFFICULTY LEVEL ==========
// ========== PURCHASE DIFFICULTY LEVEL ==========
export const purchaseDifficulty = async (req: AuthRequest, res: Response) => {
  console.log('🔥 purchaseDifficulty called');
  console.log('📝 req.body:', req.body);
  console.log('👤 req.user:', req.user);
  
  try {
    const { difficulty, phone, telegramId } = req.body;
    
    // ✅ Get user from JWT first (web frontend)
    let user = req.user;
    
    // ✅ If no JWT user, try to find by telegramId (Telegram bot)
    if (!user && telegramId && !isNaN(telegramId)) {
      console.log(`🔍 Looking for user by telegramId: ${telegramId}`);
      user = await getOrCreateUserByTelegramId(telegramId);
    }
    
    // ✅ If still no user, try query param
    if (!user && req.query.telegramId && !isNaN(Number(req.query.telegramId))) {
      console.log(`🔍 Looking for user by telegramId (query): ${req.query.telegramId}`);
      user = await getOrCreateUserByTelegramId(Number(req.query.telegramId));
    }

    if (!user) {
      console.error('❌ No user found');
      return res.status(401).json({ 
        success: false, 
        message: 'User not authenticated. Please log in.' 
      });
    }

    const userId = user._id;
    console.log(`👤 User found: ${userId}`);
    console.log('📝 Difficulty:', difficulty);
    console.log('📝 Phone:', phone);

    // ✅ Validate difficulty
    if (![3, 4, 5].includes(difficulty)) {
      console.log('❌ Invalid difficulty:', difficulty);
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid difficulty level. Only 3, 4, and 5 can be unlocked.' 
      });
    }

    const amount = getPriceForDifficulty(difficulty);
    if (!amount) {
      console.log('❌ Amount not found for difficulty:', difficulty);
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid difficulty level' 
      });
    }

    // ✅ Include userId in tx_ref so webhook knows which user
    const txRef = `unlock-${difficulty}-${userId}-${Date.now()}`;
    console.log('📝 txRef:', txRef);

    // ✅ Check if CHAPA_SECRET_KEY exists
    if (!process.env.CHAPA_SECRET_KEY) {
      console.error('❌ CHAPA_SECRET_KEY is missing in .env');
      return res.status(500).json({ 
        success: false, 
        message: 'Payment configuration error. Please contact support.' 
      });
    }

    if (!process.env.CHAPA_API_URL) {
      console.error('❌ CHAPA_API_URL is missing in .env');
      return res.status(500).json({ 
        success: false, 
        message: 'Payment configuration error. Please contact support.' 
      });
    }

    console.log('🔑 CHAPA_SECRET_KEY present:', process.env.CHAPA_SECRET_KEY?.substring(0, 10) + '...');
    console.log('🌐 CHAPA_API_URL:', process.env.CHAPA_API_URL);

    // ✅ Use a valid email format
    let userEmail = user.email;
    if (!userEmail || !userEmail.includes('@') || userEmail.includes('@telegram.local')) {
      const id = user.telegramId || userId;
      userEmail = `user_${id}@gmail.com`;
      console.log(`📝 Using valid email: ${userEmail}`);
    }

    const payload = {
      amount: amount,
      currency: 'ETB',
      email: userEmail,
      first_name: user.FName || 'User',
      last_name: user.LName || 'User',
      phone_number: phone || '0912345678',
      tx_ref: txRef,
      return_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment/success?difficulty=${difficulty}`,
      callback_url: `${process.env.BACKEND_URL || 'http://localhost:5001'}/api/payment/webhook`,
      customization: {
        title: `Level ${difficulty} Unlock`,
        description: `Access all quizzes at difficulty level ${difficulty}`,
      },
    };

    console.log('📤 Sending to Chapa:', JSON.stringify(payload, null, 2));

    const response = await axios.post(
      `${process.env.CHAPA_API_URL}/transaction/initialize`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('✅ Chapa response:', response.data);

    res.json({
      success: true,
      checkout_url: response.data.data.checkout_url,
      tx_ref: txRef,
      difficulty,
    });
  } catch (error: any) {
    console.error('❌ Chapa API Error:');
    console.error('  - Status:', error.response?.status);
    console.error('  - Data:', JSON.stringify(error.response?.data, null, 2));
    console.error('  - Message:', error.message);
    
    const errorMessage = error.response?.data?.message || error.message || 'Payment failed. Please try again.';
    res.status(500).json({ 
      success: false, 
      message: errorMessage,
    });
  }
};
// ========== VERIFY PAYMENT ==========
export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { tx_ref, status, transaction_id } = req.body;

    if (!tx_ref) {
      return res.status(400).json({ 
        success: false, 
        message: 'Transaction reference is required' 
      });
    }

    const verifyResponse = await axios.get(
      `${process.env.CHAPA_API_URL}/transaction/verify/${tx_ref}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        },
      }
    );

    const paymentData = verifyResponse.data.data;
    if (paymentData.status === 'success') {
      if (tx_ref?.startsWith('unlock-')) {
        const parts = tx_ref.split('-');
        const difficulty = parseInt(parts[1]);
        const userId = parts[2];
        
        await User.findByIdAndUpdate(userId, {
          $addToSet: { purchasedDifficulties: difficulty }
        });
        
        console.log(`✅ Difficulty ${difficulty} unlocked for user ${userId}`);
      } else if (tx_ref?.startsWith('premium-')) {
        const parts = tx_ref.split('-');
        const userId = parts[1];
        
        await User.findByIdAndUpdate(userId, {
          isPremium: true,
          premiumExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        });
        
        console.log(`✅ Premium subscription activated for user ${userId}`);
      }
      
      return res.json({ 
        success: true, 
        message: 'Payment verified successfully',
        data: paymentData
      });
    } else {
      return res.json({ 
        success: false, 
        message: 'Payment verification failed' 
      });
    }
  } catch (error: any) {
    console.error('Verification error:', error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Verification failed' 
    });
  }
};

// ========== WEBHOOK HANDLER ==========


export const webhookHandler = async (req: Request, res: Response) => {
  try {
    const { tx_ref, status } = req.body;

    console.log('📥 Webhook received:', { tx_ref, status });

    if (status === 'success') {
      if (tx_ref?.startsWith('unlock-')) {
        const parts = tx_ref.split('-');
        const difficulty = parseInt(parts[1]);
        const userId = parts[2];
        
        if (userId) {
          // ✅ Update user's purchased difficulties
          await User.findByIdAndUpdate(userId, {
            $addToSet: { purchasedDifficulties: difficulty }
          });
          console.log(`✅ Difficulty ${difficulty} unlocked for user ${userId}`);

          // ✅ Send Telegram notification
          try {
            const user = await User.findById(userId);
            if (user && user.telegramId) {
              const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
              const chatId = user.telegramId;
              
              // Get the lessonId and quizId from the transaction
              // Since we don't have them in the webhook, we'll send a general success message
              const message = 
`✅ **Payment Successful!** 🎉

Difficulty Level ${difficulty} has been unlocked successfully.

You can now access all quizzes at this difficulty level. 
Use /start to continue learning!`;

              await axios.post(
                `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
                {
                  chat_id: chatId,
                  text: message,
                  parse_mode: 'Markdown'
                }
              );
              console.log(`✅ Telegram notification sent to user ${userId} (chatId: ${chatId})`);
            } else {
              console.log(`⚠️ User ${userId} has no telegramId or not found`);
            }
          } catch (telegramError: any) {
            console.error('❌ Failed to send Telegram notification:', telegramError.response?.data || telegramError.message);
            // Don't fail the webhook if notification fails
          }
        } else {
          console.log(`⚠️ No userId found in tx_ref: ${tx_ref}`);
        }
      } else if (tx_ref?.startsWith('premium-')) {
        const parts = tx_ref.split('-');
        const userId = parts[1];
        
        if (userId) {
          await User.findByIdAndUpdate(userId, {
            isPremium: true,
            premiumExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          });
          console.log(`✅ Premium subscription activated for user ${userId}`);

          // ✅ Send Telegram notification for premium
          try {
            const user = await User.findById(userId);
            if (user && user.telegramId) {
              const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
              const chatId = user.telegramId;
              
              const message = 
`✅ **Premium Subscription Activated!** 🎉

You now have access to all premium content for 30 days.

Enjoy learning with QuizAI! 🚀`;

              await axios.post(
                `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
                {
                  chat_id: chatId,
                  text: message,
                  parse_mode: 'Markdown'
                }
              );
              console.log(`✅ Telegram notification sent to user ${userId}`);
            }
          } catch (telegramError) {
            console.error('❌ Failed to send Telegram notification:', telegramError);
          }
        } else {
          console.log(`⚠️ No userId found in tx_ref: ${tx_ref}`);
        }
      }
    } else {
      console.log(`❌ Payment failed for transaction: ${tx_ref}`);
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ success: false, message: 'Webhook processing failed' });
  }
};