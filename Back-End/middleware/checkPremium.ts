import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';
import User from '../models/User';
import Quiz from '../models/Quiz';

// Price mapping based on difficulty
export const getPriceForDifficulty = (difficulty: number): number => {
  const prices: { [key: number]: number } = {
    3: 500,
    4: 700,
    5: 1000,
  };
  return prices[difficulty] || 0;
};

/**
 * Middleware to check if a user has access to a quiz based on difficulty.
 * - Difficulty 1-2: Free (always accessible)
 * - Difficulty 3-5: Locked (requires purchase or premium subscription)
 */
// In middleware/checkPremium.ts
export const checkPremium = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // ✅ req.user is already set by the protect middleware
    const user = req.user;
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // ✅ Check if user has active premium subscription
    if (user.isPremium && user.premiumExpiry && new Date() < user.premiumExpiry) {
      return next();
    }

    // ✅ Extract quizId from various sources
    const quizId = Number(req.params.quizId) || 
                   Number(req.params.id) || 
                   Number(req.query.quizId) || 
                   req.body.quizId;

    if (!quizId) {
      return next();
    }

    const quiz = await Quiz.findOne({ quizId });
    if (!quiz) {
      return res.status(404).json({ 
        success: false,
        message: 'Quiz not found' 
      });
    }

    const difficulty = quiz.difficulty || 1;
    
    if (difficulty >= 3) {
      const purchasedDifficulties = user.purchasedDifficulties || [];
      const hasAccess = purchasedDifficulties.includes(difficulty);
      
      if (!hasAccess) {
        return res.status(403).json({ 
          success: false,
          message: 'This quiz is locked. Please purchase access.',
          locked: true,
          difficulty: difficulty,
          price: getPriceForDifficulty(difficulty),
          title: quiz.title,
          quizId: quiz.quizId,
        });
      }
    }

    next();
  } catch (error) {
    console.error('❌ Premium check error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during premium check' 
    });
  }
};

/**
 * Middleware to check if a user can access a specific difficulty level
 * Used for bulk operations or difficulty-based checks
 */
export const checkDifficultyAccess = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // ✅ Check if user has active premium subscription
    if (user.isPremium && user.premiumExpiry && new Date() < user.premiumExpiry) {
      return next();
    }

    // ✅ Get difficulty from request
    const difficulty = Number(req.params.difficulty) || 
                      Number(req.query.difficulty) || 
                      req.body.difficulty;

    // ✅ If no difficulty specified, skip
    if (!difficulty) {
      return next();
    }

    // ✅ Only lock difficulties 3, 4, and 5
    if (difficulty >= 3) {
      const purchasedDifficulties = user.purchasedDifficulties || [];
      const hasAccess = purchasedDifficulties.includes(difficulty);
      
      if (!hasAccess) {
        return res.status(403).json({ 
          success: false,
          message: `Difficulty level ${difficulty} is locked. Please purchase access.`,
          locked: true,
          difficulty: difficulty,
          price: getPriceForDifficulty(difficulty),
        });
      }
    }

    next();
  } catch (error) {
    console.error('❌ Difficulty check error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error during difficulty check' 
    });
  }
};