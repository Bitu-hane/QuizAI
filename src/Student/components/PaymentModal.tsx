import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  Alert,
  Typography,
} from '@mui/material';
import API from '../../common/services/api';

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  user: any;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ open, onClose, onSuccess, user }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phone, setPhone] = useState('');
const handlePayment = async () => {
  console.log('🔥 Premium payment button clicked!');
  console.log('📤 Sending to backend:', { 
    amount: 100, 
    email: user?.email,
    firstName: user?.FName,
    lastName: user?.LName,
    phone: phone || '0912345678'
  });
  
  setLoading(true);
  setError(null);

  try {
    if (!user) {
      setError('Please log in to make a payment.');
      setLoading(false);
      return;
    }

    const response = await API.post('/payment/initialize', {
      amount: 100,
      email: user.email,
      firstName: user.FName,
      lastName: user.LName,
      phone: phone || '0912345678',
    });

    console.log('✅ Response from backend:', response.data);

    if (response.data.success) {
      console.log('🔀 Redirecting to Chapa:', response.data.checkout_url);
      window.location.href = response.data.checkout_url;
    } else {
      setError('Payment initialization failed');
    }
  } catch (err: any) {
    console.error('❌ Payment error:', err);
    console.error('❌ Error response:', err.response?.data);
    console.error('❌ Error status:', err.response?.status);
    
    if (err.response?.status === 401) {
      setError('Your session has expired. Please log in again.');
    } else {
      setError(err.response?.data?.message || 'Payment failed. Please try again.');
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ bgcolor: '#7C3AED', color: 'white' }}>
        ⭐ Upgrade to Premium
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          Get access to premium quizzes, AI recommendations, and advanced analytics for only <strong>100 ETB</strong>.
        </Alert>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <Typography variant="subtitle2" color="text.secondary">
              Student
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: '500' }}>
              {user?.FName} {user?.LName}
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle2" color="text.secondary">
              Email
            </Typography>
            <Typography variant="body1">
              {user?.email}
            </Typography>
          </div>
          <TextField
            fullWidth
            label="Phone Number (for Telebirr/CBEBirr)"
            placeholder="0912345678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            helperText="Enter your phone number to receive payment confirmation"
          />
        </div>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 3, gap: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handlePayment}
          disabled={loading}
          sx={{
            bgcolor: '#7C3AED',
            '&:hover': { bgcolor: '#6D28D9' },
            '&:disabled': { bgcolor: '#C4B5FD' },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Pay 100 ETB'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentModal;