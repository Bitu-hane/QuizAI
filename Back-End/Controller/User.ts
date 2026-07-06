// import { Request, Response } from 'express';
// import { AuthRequest } from '../middleware/auth';
// import User from '../models/User';

// export const completeOnboarding = async (req: AuthRequest, res: Response) => {
//   try {
//     const { gradeId, subjects } = req.body; // subjects optional
//     const userId = req.user._id;

//     const user = await User.findByIdAndUpdate(
//       userId,
//       { gradeId, onboardingCompleted: true },
//       { new: true }
//     );
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.json({ user });
//   } catch (error) {
//     console.error('Onboarding error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import User from '../models/User';

export const completeOnboarding = async (req: AuthRequest, res: Response) => {
  try {
    const { gradeId } = req.body;
    const userId = req.user._id;

    if (!gradeId) {
      return res.status(400).json({ message: 'Grade ID is required' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { gradeId, onboardingCompleted: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Onboarding error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};