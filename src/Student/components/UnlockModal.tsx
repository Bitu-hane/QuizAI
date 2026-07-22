
// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   CircularProgress,
//   Alert,
//   Typography,
//   TextField,
//   Box,
//   Divider,
//   InputAdornment,
// } from '@mui/material';
// import { Lock, Phone } from '@mui/icons-material';
// import API from '../../common/services/api';

// interface UnlockModalProps {
//   open: boolean;
//   onClose: () => void;
//   difficulty: number;
//   price: number;
//   onSuccess: () => void;
// }

// const UnlockModal: React.FC<UnlockModalProps> = ({
//   open,
//   onClose,
//   difficulty,
//   price,
//   onSuccess,
// }) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [phone, setPhone] = useState('');

//   const handleUnlock = async () => {
//     console.log('🔥 Unlock button clicked!');
//     console.log('📤 Sending to backend:', { 
//       difficulty, 
//       phone: phone || '0912345678' 
//     });
    
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await API.post('/payment/purchase-difficulty', {
//         difficulty: difficulty,
//         phone: phone || '0912345678',
//       });

//       console.log('✅ Response from backend:', response.data);

//       if (response.data.success) {
//         console.log('🔀 Redirecting to Chapa:', response.data.checkout_url);
//         window.location.href = response.data.checkout_url;
//       } else {
//         setError(response.data.message || 'Payment initialization failed');
//       }
//     } catch (err: any) {
//       console.error('❌ Unlock error:', err);
//       console.error('❌ Error response:', err.response?.data);
//       console.error('❌ Error status:', err.response?.status);
      
//       if (err.response?.status === 401) {
//         setError('Your session has expired. Please log in again.');
//       } else {
//         setError(err.response?.data?.message || 'Payment failed. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Get difficulty label
//   const getDifficultyLabel = (diff: number): string => {
//     const labels: { [key: number]: string } = {
//       3: 'Hard',
//       4: 'Very Hard',
//       5: 'Expert',
//     };
//     return labels[diff] || `Level ${diff}`;
//   };

//   // Get star rating
//   const getStars = (diff: number): string => {
//     return '⭐'.repeat(diff);
//   };

//   return (
//     <Dialog 
//       open={open} 
//       onClose={onClose} 
//       maxWidth="sm" 
//       fullWidth
//       slotProps={{
//         paper: {
//           sx: {
//             borderRadius: '12px',
//             overflow: 'hidden',
//           }
//         }
//       }}
//     >
//       {/* Header */}
//       <DialogTitle 
//         sx={{ 
//           bgcolor: '#7C3AED', 
//           color: 'white',
//           py: 2.5,
//           px: 3,
//           display: 'flex',
//           alignItems: 'center',
//           gap: 2,
//         }}
//       >
//         <Lock sx={{ fontSize: 24 }} />
//         <Typography variant="h6" sx={{ fontWeight: 600 }}>
//           Unlock Difficulty Level {difficulty}
//         </Typography>
//       </DialogTitle>

//       <DialogContent sx={{ p: 3, mt: 1 }}>
//         {/* Info Alert */}
//         <Alert 
//           severity="info" 
//           sx={{ 
//             mb: 3,
//             borderRadius: '8px',
//             bgcolor: '#F5F3FF',
//             border: '1px solid #EDE9FE',
//             '& .MuiAlert-icon': { color: '#7C3AED' }
//           }}
//         >
//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
//             <Typography variant="body2" sx={{ fontWeight: 500 }}>
//               This quiz requires <strong>Difficulty Level {difficulty}</strong> access.
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {getStars(difficulty)} {getDifficultyLabel(difficulty)}
//             </Typography>
//             <Typography variant="h5" sx={{ mt: 1, color: '#F59E0B', fontWeight: 700 }}>
//               {price} ETB
//             </Typography>
//             <Typography variant="caption" color="text.secondary">
//               One‑time payment – unlocks <strong>all</strong> quizzes at this difficulty level.
//             </Typography>
//           </Box>
//         </Alert>

//         <Divider sx={{ my: 2.5 }} />

//         {/* Phone Number Field */}
//         <Box sx={{ mb: 1 }}>
//           <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500, color: '#1B2430' }}>
//             Phone Number <span style={{ color: '#C0392B' }}>*</span>
//           </Typography>
//           <TextField
//             fullWidth
//             placeholder="Enter your phone number (e.g., 0912345678)"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             slotProps={{
//               input: {
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Phone sx={{ color: '#9AA3AE', fontSize: 20 }} />
//                   </InputAdornment>
//                 ),
//                 sx: {
//                   borderRadius: '8px',
//                   bgcolor: '#FAFAFA',
//                   '&:hover': { bgcolor: '#F5F5F5' },
//                   '& fieldset': { borderColor: 'rgba(27,36,48,0.12)' },
//                 }
//               }
//             }}
//             helperText="Enter your phone number to receive payment confirmation"
//           />
//         </Box>

//         {/* Error Message */}
//         {error && (
//           <Alert 
//             severity="error" 
//             sx={{ 
//               mt: 2,
//               borderRadius: '8px',
//               '& .MuiAlert-icon': { color: '#C0392B' }
//             }}
//           >
//             {error}
//           </Alert>
//         )}
//       </DialogContent>

//       {/* Actions */}
//       <DialogActions 
//         sx={{ 
//           p: 3, 
//           pt: 0,
//           gap: 2,
//           borderTop: '1px solid rgba(27,36,48,0.06)',
//           bgcolor: '#FAFAFA',
//         }}
//       >
//         <Button 
//           onClick={onClose} 
//           variant="outlined"
//           sx={{
//             borderRadius: '8px',
//             textTransform: 'none',
//             fontWeight: 500,
//             color: '#4B5563',
//             borderColor: '#D1D5DB',
//             '&:hover': { borderColor: '#9CA3AF', bgcolor: 'transparent' }
//           }}
//         >
//           Cancel
//         </Button>
//         <Button
//           variant="contained"
//           onClick={handleUnlock}
//           disabled={loading}
//           sx={{
//             bgcolor: '#7C3AED',
//             borderRadius: '8px',
//             textTransform: 'none',
//             fontWeight: 600,
//             px: 3,
//             minWidth: '140px',
//             height: '48px',
//             '&:hover': { bgcolor: '#6D28D9' },
//             '&:disabled': { bgcolor: '#C4B5FD' }
//           }}
//         >
//           {loading ? <CircularProgress size={24} color="inherit" /> : `Pay ${price} ETB`}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default UnlockModal;


import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Alert,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import { Lock } from '@mui/icons-material';
import API from '../../common/services/api';

interface UnlockModalProps {
  open: boolean;
  onClose: () => void;
  difficulty: number;
  price: number;
   lessonId?: number;
  onSuccess: () => void;
}

const UnlockModal: React.FC<UnlockModalProps> = ({
  open,
  onClose,
  difficulty,
  price,
  lessonId,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleUnlock = async () => {
    console.log('🔥 Unlock button clicked!');
    console.log('📤 Sending to backend:', { 
      difficulty, 
      lessonId 
    });
    
    setLoading(true);
    setError(null);

    try {
      const response = await API.post('/payment/purchase-difficulty', {
        difficulty: difficulty,
        lessonId: lessonId, // ✅ SEND LESSON ID TO BACKEND
      });

      console.log('✅ Response from backend:', response.data);

      if (response.data.success) {
        // ✅ Store in sessionStorage
        sessionStorage.setItem('pending_tx_ref', response.data.tx_ref);
        sessionStorage.setItem('pending_difficulty', String(difficulty));
        
        // ✅ Store lessonId for redirect after payment
        if (lessonId) {
          sessionStorage.setItem('pending_lesson_id', String(lessonId));
        }
        
        window.location.href = response.data.checkout_url;
      } else {
        setError(response.data.message || 'Payment initialization failed');
      }
    } catch (err: any) {
      // ... error handling
    } finally {
      setLoading(false);
    }
  };
  const getDifficultyLabel = (diff: number): string => {
    const labels: { [key: number]: string } = {
      3: 'Hard',
      4: 'Very Hard',
      5: 'Expert',
    };
    return labels[diff] || `Level ${diff}`;
  };

  const getStars = (diff: number): string => {
    return '⭐'.repeat(diff);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ bgcolor: '#7C3AED', color: 'white', py: 2.5, px: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Lock sx={{ fontSize: 24 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Unlock Difficulty Level {difficulty}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 3, mt: 1 }}>
        <Alert severity="info" sx={{ mb: 3, borderRadius: '8px', bgcolor: '#F5F3FF' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              This quiz requires <strong>Difficulty Level {difficulty}</strong> access.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {getStars(difficulty)} {getDifficultyLabel(difficulty)}
            </Typography>
            <Typography variant="h5" sx={{ mt: 1, color: '#F59E0B', fontWeight: 700 }}>
              {price} ETB
            </Typography>
            <Typography variant="caption" color="text.secondary">
              One‑time payment – unlocks <strong>all</strong> quizzes at this difficulty level.
            </Typography>
          </Box>
        </Alert>

        <Divider sx={{ my: 2.5 }} />

        {error && (
          <Alert severity="error" sx={{ mt: 2, borderRadius: '8px' }}>
            {error}
          </Alert>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0, gap: 2, bgcolor: '#FAFAFA' }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleUnlock}
          disabled={loading}
          sx={{
            bgcolor: '#7C3AED',
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            minWidth: '140px',
            height: '48px',
            '&:hover': { bgcolor: '#6D28D9' },
            '&:disabled': { bgcolor: '#C4B5FD' }
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : `Pay ${price} ETB`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UnlockModal;