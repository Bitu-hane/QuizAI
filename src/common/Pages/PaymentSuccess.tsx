// import React, { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { CircularProgress, Alert, Button, Box, Typography } from '@mui/material';
// import { CheckCircle, Error, Payment } from '@mui/icons-material';
// import API from '../../common/services/api';

// const PaymentSuccess: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     const verifyPayment = async () => {
//       try {
//         // Get tx_ref from URL or sessionStorage
//         let tx_ref = new URLSearchParams(location.search).get('tx_ref');
//         if (!tx_ref) {
//           tx_ref = sessionStorage.getItem('pending_tx_ref');
//         }
        
//         // Get the difficulty that was being unlocked
//         const difficulty = sessionStorage.getItem('pending_difficulty') || '';

//         if (tx_ref) {
//           await API.post('/payment/verify', { tx_ref, status: 'success' });
//           setSuccess(true);
//         } else {
//           // If no tx_ref, assume success (Test Mode fallback)
//           setSuccess(true);
//         }

//         // ✅ Redirect to the quiz page after 2 seconds
//         setTimeout(() => {
//           sessionStorage.removeItem('pending_tx_ref');
//           sessionStorage.removeItem('pending_difficulty');
          
//           // ✅ Redirect to the quiz page with the lesson that was unlocked
//           navigate(`/student/quiz?difficulty=${difficulty}&unlocked=true`);
//         }, 2500);

//       } catch (err: any) {
//         console.error('Verification error:', err);
//         setError(err.response?.data?.message || 'Verification failed. Please contact support.');
//         // Redirect to dashboard after 3 seconds if verification fails
//         setTimeout(() => {
//           sessionStorage.removeItem('pending_tx_ref');
//           sessionStorage.removeItem('pending_difficulty');
//           navigate('/student/dashboard');
//         }, 3000);
//       } finally {
//         setLoading(false);
//       }
//     };

//     verifyPayment();
//   }, [navigate, location]);

//   // ----- LOADING STATE -----
//   if (loading) {
//     return (
//       <Box sx={{ 
//         display: 'flex', 
//         flexDirection: 'column',
//         justifyContent: 'center', 
//         alignItems: 'center', 
//         minHeight: '80vh',
//         padding: '20px',
//         textAlign: 'center'
//       }}>
//         <CircularProgress size={56} sx={{ color: '#7C3AED' }} />
//         <Typography variant="h5" sx={{ mt: 3, fontWeight: 600 }}>
//           Verifying your payment...
//         </Typography>
//         <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//           Please wait while we confirm your transaction.
//         </Typography>
//       </Box>
//     );
//   }

//   // ----- ERROR STATE -----
//   if (error) {
//     return (
//       <Box sx={{ 
//         display: 'flex', 
//         flexDirection: 'column',
//         justifyContent: 'center', 
//         alignItems: 'center', 
//         minHeight: '80vh',
//         padding: '20px',
//         textAlign: 'center'
//       }}>
//         <Box sx={{ 
//           width: 80, 
//           height: 80, 
//           borderRadius: '50%', 
//           bgcolor: '#FBEDEB',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           mb: 3
//         }}>
//           <Error sx={{ fontSize: 48, color: '#C0392B' }} />
//         </Box>
//         <Typography variant="h5" sx={{ fontWeight: 600, color: '#C0392B' }}>
//           Payment Verification Failed
//         </Typography>
//         <Alert severity="error" sx={{ maxWidth: '500px', width: '100%', mt: 2, borderRadius: '8px' }}>
//           {error}
//         </Alert>
//         <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
//           Redirecting to dashboard in a few seconds...
//         </Typography>
//         <Button 
//           variant="contained" 
//           onClick={() => navigate('/student/dashboard')}
//           sx={{ 
//             bgcolor: '#7C3AED', 
//             mt: 3,
//             borderRadius: '8px',
//             textTransform: 'none',
//             fontWeight: 600,
//             '&:hover': { bgcolor: '#6D28D9' }
//           }}
//         >
//           Return to Dashboard
//         </Button>
//       </Box>
//     );
//   }

//   // ----- SUCCESS STATE -----
//   return (
//     <Box sx={{ 
//       display: 'flex', 
//       flexDirection: 'column',
//       justifyContent: 'center', 
//       alignItems: 'center', 
//       minHeight: '80vh',
//       padding: '20px',
//       textAlign: 'center'
//     }}>
//       <Box sx={{ 
//         width: 80, 
//         height: 80, 
//         borderRadius: '50%', 
//         bgcolor: '#E9F3EC',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         mb: 3
//       }}>
//         <CheckCircle sx={{ fontSize: 48, color: '#2E7D52' }} />
//       </Box>
//       <Typography variant="h4" sx={{ fontWeight: 700, color: '#2E7D52' }}>
//         Payment Successful! 🎉
//       </Typography>
//       <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: '450px' }}>
//         Your payment has been confirmed. You now have access to all quizzes at this difficulty level.
//       </Typography>
//       <Box sx={{ 
//         mt: 3, 
//         p: 3, 
//         bgcolor: '#F5F3FF', 
//         borderRadius: '12px', 
//         maxWidth: '400px',
//         width: '100%',
//         border: '1px solid #EDE9FE'
//       }}>
//         <Typography variant="body2" color="text.secondary">
//           <strong>✨ What's next?</strong>
//         </Typography>
//         <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
//           Redirecting you to the quiz page to start learning...
//         </Typography>
//       </Box>
//       <Button 
//         variant="contained" 
//         onClick={() => navigate('/student/quiz')}
//         sx={{ 
//           bgcolor: '#7C3AED', 
//           mt: 3,
//           borderRadius: '8px',
//           textTransform: 'none',
//           fontWeight: 600,
//           px: 4,
//           py: 1.5,
//           '&:hover': { bgcolor: '#6D28D9' }
//         }}
//       >
//         Go to Quizzes
//       </Button>
//     </Box>
//   );
// };

// export default PaymentSuccess;


import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CircularProgress, Alert, Button, Box, Typography } from '@mui/material';
import { CheckCircle, Error } from '@mui/icons-material';
import API from '../../common/services/api';
import { useAuth } from '../../common/contexts/AuthContext'; // ✅ Import the AuthContext
const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
 const { refreshUser } = useAuth();
  useEffect(() => {
  const verifyPayment = async () => {
  try {
    // Get tx_ref from URL or sessionStorage
    let tx_ref = new URLSearchParams(location.search).get('tx_ref');
    if (!tx_ref) {
      tx_ref = sessionStorage.getItem('pending_tx_ref');
    }
    
    // ✅ Get the difficulty AND lessonId that was being unlocked
    const difficulty = sessionStorage.getItem('pending_difficulty') || '';
    const lessonId = sessionStorage.getItem('pending_lesson_id') || '';

    if (tx_ref) {
      await API.post('/payment/verify', { tx_ref, status: 'success' });
      setSuccess(true);
    } else {
      // If no tx_ref, assume success (Test Mode fallback)
      setSuccess(true);
    }

    // ✅ REFRESH USER DATA TO UPDATE PURCHASED DIFFICULTIES
    try {
      await refreshUser(); // Call the refresh function from AuthContext
      console.log('✅ User data refreshed after payment');
    } catch (refreshError) {
      console.error('⚠️ Failed to refresh user data:', refreshError);
      // Don't block the redirect even if refresh fails
    }

    // ✅ Redirect to the quiz attempt page after 2 seconds
    setTimeout(() => {
      sessionStorage.removeItem('pending_tx_ref');
      sessionStorage.removeItem('pending_difficulty');
      sessionStorage.removeItem('pending_lesson_id');
      
      // ✅ If we have a lessonId, go directly to the quiz attempt
      if (lessonId) {
        navigate(`/student/quiz/attempt/${lessonId}`);
      } else {
        // Fallback to quiz page
        navigate(`/student/quiz?difficulty=${difficulty}&unlocked=true`);
      }
    }, 2500);

  } catch (err: any) {
    console.error('Verification error:', err);
    setError(err.response?.data?.message || 'Verification failed. Please contact support.');
    setTimeout(() => {
      sessionStorage.removeItem('pending_tx_ref');
      sessionStorage.removeItem('pending_difficulty');
      sessionStorage.removeItem('pending_lesson_id');
      navigate('/student/dashboard');
    }, 3000);
  } finally {
    setLoading(false);
  }
};

    verifyPayment();
  }, [navigate, location]);

  // ----- LOADING STATE -----
  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '80vh',
        padding: '20px',
        textAlign: 'center'
      }}>
        <CircularProgress size={56} sx={{ color: '#7C3AED' }} />
        <Typography variant="h5" sx={{ mt: 3, fontWeight: 600 }}>
          Verifying your payment...
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Please wait while we confirm your transaction.
        </Typography>
      </Box>
    );
  }

  // ----- ERROR STATE -----
  if (error) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '80vh',
        padding: '20px',
        textAlign: 'center'
      }}>
        <Box sx={{ 
          width: 80, 
          height: 80, 
          borderRadius: '50%', 
          bgcolor: '#FBEDEB',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 3
        }}>
          <Error sx={{ fontSize: 48, color: '#C0392B' }} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#C0392B' }}>
          Payment Verification Failed
        </Typography>
        <Alert severity="error" sx={{ maxWidth: '500px', width: '100%', mt: 2, borderRadius: '8px' }}>
          {error}
        </Alert>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Redirecting to dashboard in a few seconds...
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/student/dashboard')}
          sx={{ 
            bgcolor: '#7C3AED', 
            mt: 3,
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': { bgcolor: '#6D28D9' }
          }}
        >
          Return to Dashboard
        </Button>
      </Box>
    );
  }

  // ----- SUCCESS STATE -----
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '80vh',
      padding: '20px',
      textAlign: 'center'
    }}>
      <Box sx={{ 
        width: 80, 
        height: 80, 
        borderRadius: '50%', 
        bgcolor: '#E9F3EC',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mb: 3
      }}>
        <CheckCircle sx={{ fontSize: 48, color: '#2E7D52' }} />
      </Box>
      <Typography variant="h4" sx={{ fontWeight: 700, color: '#2E7D52' }}>
        Payment Successful! 🎉
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: '450px' }}>
        Your payment has been confirmed. You now have access to all quizzes at this difficulty level.
      </Typography>
      <Box sx={{ 
        mt: 3, 
        p: 3, 
        bgcolor: '#F5F3FF', 
        borderRadius: '12px', 
        maxWidth: '400px',
        width: '100%',
        border: '1px solid #EDE9FE'
      }}>
        <Typography variant="body2" color="text.secondary">
          <strong>✨ What's next?</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Redirecting you to the quiz to start learning...
        </Typography>
      </Box>
      <Button 
        variant="contained" 
        onClick={() => navigate('/student/quiz')}
        sx={{ 
          bgcolor: '#7C3AED', 
          mt: 3,
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
          px: 4,
          py: 1.5,
          '&:hover': { bgcolor: '#6D28D9' }
        }}
      >
        Go to Quizzes
      </Button>
    </Box>
  );
};

export default PaymentSuccess;