import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
 // const { user } = useAuth();

  return (
    <AppBar position="sticky" color="primary" elevation={1}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          📚 QuizAI
        </Typography>
        <Box>
       {/* {user ? (
            <Button color="inherit" onClick={() => navigate('/student/lessons')}>
              Dashboard
            </Button>
          ) : ( */}
            <Button color="inherit" onClick={() => navigate('/login')}>
              Login
            </Button>
        
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;