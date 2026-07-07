// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Container,
//   Typography,
//   Card,
//   CardMedia,
//   CardContent,
//   Button,
//   Divider,
//   Paper,
// } from '@mui/material';
// import './Home.css';
// import './Login'

// const featureImages = [
//   {
//     id: 1,
//     url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop',
//     title: 'Personalized Learning',
//     desc: 'AI adapts to your knowledge level and adjusts difficulty automatically.',
//   },
//   {
//     id: 2,
//     url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop',
//     title: 'Instant AI Feedback',
//     desc: 'Get explanations for every answer instantly.',
//   },
//   {
//     id: 3,
//     url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&h=400&fit=crop',
//     title: 'Progress Tracking',
//     desc: 'Track your performance visually over time.',
//   },
//   {
//     id: 4,
//     url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop',
//     title: 'Engaging Quizzes',
//     desc: 'Timed quizzes simulate real exam conditions.',
//   },
//   {
//     id: 5,
//     url: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?w=600&h=400&fit=crop',
//     title: 'AI Recommendations',
//     desc: 'Smart suggestions based on your weaknesses.',
//   },
//   {
//     id: 6,
//     url: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&h=400&fit=crop',
//     title: 'Grade 6–12 Coverage',
//     desc: 'Full curriculum support across subjects.',
//   },
//   {
//     id: 7,
//     url: 'https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=600&h=400&fit=crop',
//     title: 'Admin Dashboard',
//     desc: 'Teachers manage content and analytics easily.',
//   },
// ];

// const steps = [
//   { number: '1', title: 'Choose Subject', desc: 'Select your grade and subject.' },
//   { number: '2', title: 'Take Quiz', desc: 'Answer questions and learn instantly.' },
//   { number: '3', title: 'AI Feedback', desc: 'Get personalized insights.' },
//   { number: '4', title: 'Track Growth', desc: 'Monitor your progress over time.' },
// ];

// const Home: React.FC = () => {
//   const navigate = useNavigate();

//   return (
//     <>
//       {/* HERO */}
//       <Box className="hero-section">
//         <video autoPlay muted loop playsInline className="hero-video">
//           <source src="https://www.w3schools.com/html/mov_bbb.mp4" />
//         </video>

//         <Box className="hero-overlay">
//           <Container maxWidth="md">
//             <Typography variant="h2" gutterBottom>
//               Learn Smarter with AI
//             </Typography>

//             <Typography variant="h5" sx={{ mb: 3 }}>
//               Practice quizzes, get instant feedback, and improve faster.
//             </Typography>

//             <Button
//               variant="contained"
//               color="secondary"
//               size="large"
//               onClick={() => navigate('/login')}
//             >
//               Get Started
//             </Button>
//           </Container>
//         </Box>
//       </Box>

//       {/* ABOUT */}
//       <Container maxWidth="lg" sx={{ py: 6 }}>
//         <Typography variant="h3" align="center" gutterBottom>
//           About QuizAI
//         </Typography>

//         <Typography variant="body1" align="center" sx={{ mb: 2 }}>
//           QuizAI is an AI-powered learning platform for Grades 6–12 students.
//         </Typography>

//         <Typography variant="body1" align="center" sx={{ mb: 2 }}>
//           It adapts to your performance and guides you step-by-step.
//         </Typography>

//         <Divider sx={{ my: 4 }} />
//       </Container>

//       {/* HOW IT WORKS */}
//       <Container maxWidth="lg" sx={{ py: 6 }}>
//         <Typography variant="h4" align="center" gutterBottom>
//           How It Works
//         </Typography>

//         <Box
//           sx={{
//             display: 'flex',
//             flexWrap: 'wrap',
//             justifyContent: 'center',
//             gap: 3,
//           }}
//         >
//           {steps.map((step) => (
//             <Paper
//               key={step.number}
//               elevation={3}
//               sx={{
//                 p: 3,
//                 textAlign: 'center',
//                 width: { xs: '100%', sm: '45%', md: '22%' },
//               }}
//             >
//               <Typography variant="h2">{step.number}</Typography>
//               <Typography variant="h6">{step.title}</Typography>
//               <Typography variant="body2">{step.desc}</Typography>
//             </Paper>
//           ))}
//         </Box>

//         <Divider sx={{ my: 5 }} />
//       </Container>

//       {/* FEATURES */}
//       <Container maxWidth="lg" sx={{ py: 6 }}>
//         <Typography variant="h4" align="center" gutterBottom>
//           Key Features
//         </Typography>

//         <Box
//           sx={{
//             display: 'flex',
//             flexWrap: 'wrap',
//             gap: 3,
//             justifyContent: 'center',
//           }}
//         >
//           {featureImages.map((item) => (
//             <Box
//               key={item.id}
//               sx={{ width: { xs: '100%', sm: '48%', md: '30%' } }}
//             >
//               <Card>
//                 <CardMedia
//                   component="img"
//                   height="200"
//                   image={item.url}
//                   alt={item.title}
//                 />
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom>
//                     {item.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {item.desc}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Box>
//           ))}
//         </Box>
//       </Container>

//       {/* CTA */}
//       <Box sx={{ backgroundColor: '#111', py: 6, mt: 6 }}>
//         <Container maxWidth="sm">
//           <Typography variant="h4" align="center" color="white" gutterBottom>
//             Ready to Boost Your Grades?
//           </Typography>

//           <Typography variant="body1" align="center" color="white" sx={{ mb: 3 }}>
//             Join thousands of students learning smarter with QuizAI.
//           </Typography>

//           <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//             <Button
//               variant="contained"
//               color="secondary"
//               size="large"
//               onClick={() => navigate('/Login')}
//             >
//               Start Now
//             </Button>
//           </Box>
//         </Container>
//       </Box>
//     </>
//   );
// };

// export default Home;






// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Container,
//   Typography,
//   Card,
//   CardMedia,
//   CardContent,
//   Button,
//   Divider,
//   Paper,
// } from '@mui/material';
// import './Home.css';
// // Import the image from assets
// import heroBg from '../assets/img1.jpg';   


// const featureImages = [
//   {
//     id: 1,
//     url: 'https://plus.unsplash.com/premium_photo-1679957333039-285fb913aa2b?q=80&w=726&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     title: 'Personalized Learning',
//     desc: 'AI adapts to your knowledge level and adjusts difficulty automatically.',
//   },
//   {
//     id: 2,
//         url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop',

//     title: 'Instant AI Feedback',
//     desc: 'Get explanations for every answer instantly.',
//   },
//   {
//     id: 3,
    
//     url: 'https://images.unsplash.com/photo-1657534076033-093b5c6047df?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     title: 'Progress Tracking',
//     desc: 'Track your performance visually over time.',
//   },
//   {
//     id: 4,
//         url: 'https://images.unsplash.com/photo-1732579690000-84101b120f7f?q=80&w=776&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

//     title: 'Engaging Quizzes',
//     desc: 'Timed quizzes simulate real exam conditions.',
//   },
//   {
//     id: 5,
//             url: 'https://images.unsplash.com/photo-1617791160536-598cf32026fb?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

//     title: 'AI Recommendations',
//     desc: 'Smart suggestions based on your weaknesses.',
//   },
//   {
//     id: 6,
//     url: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&h=400&fit=crop',
//     title: 'Grade 6–12 Coverage',
//     desc: 'Full curriculum support across subjects.',
//   },

// ];

// const steps = [
//   { number: '1', title: 'Choose Subject', desc: 'Select your grade and subject.' },
//   { number: '2', title: 'Take Quiz', desc: 'Answer questions and learn instantly.' },
//   { number: '3', title: 'AI Feedback', desc: 'Get personalized insights.' },
//   { number: '4', title: 'Track Growth', desc: 'Monitor your progress over time.' },
// ];

// const Home: React.FC = () => {
//   const navigate = useNavigate();

//   return (
//     <>
//       {/* HERO with background image from assets */}
//       <Box
//         className="hero-section"
//         sx={{
//           backgroundImage: `url(${heroBg})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           position: 'relative',
         
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           '&::before': {
//             content: '""',
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: 'rgba(0, 0, 0, 0.55)', // dark overlay
//           },
//         }}
//       >
//         <Box
//           className="hero-overlay"
//           sx={{
//             position: 'relative',
//             zIndex: 1,
//             textAlign: 'center',
//             color: 'white',
//             px: 2,
//           }}
//         >
//           <Container maxWidth="md">
//             <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
//               Learn Smarter with AI
//             </Typography>

//             <Typography variant="h5" sx={{ mb: 3, fontWeight: 300 }}>
//               Practice quizzes, get instant feedback, and improve faster.
//             </Typography>
// <Button
//   variant="contained"
//   color="secondary"
//   size="large"
//   onClick={() => navigate('/login')}
//   sx={{ px: 4, py: 1.5, borderRadius: 30 }}
// >
//   Get Started
// </Button>
//           </Container>
//         </Box>
//       </Box>

//       {/* ABOUT */}

//       <Container maxWidth="lg" sx={{ py: 6 }} className='bits'>
        
//         <Typography variant="h3" align="center" gutterBottom>
//           About QuizAI
//         </Typography>

//         <Typography variant="body1" align="center"  sx={{ fontWeight: 700, }}>
//           QuizAI is an AI-powered learning platform for Grades 6–12 students.<br></br>
//            It adapts to your performance and guides you step-by-step.
//         </Typography>

//      <Container maxWidth="lg" sx={{ py: 6 }}>
       
//         <Box
//           sx={{
//             display: 'flex',
//             flexWrap: 'wrap',
//             justifyContent: 'center',
//             gap: 3,
//           }}
//         >
//           {steps.map((step) => (
//             <Paper
//               key={step.number}
//               elevation={3}
//               sx={{
//                 p: 3,
//                 textAlign: 'center',
//                 width: '500px',
//                 height: '200px',
//                 border: '2.5px solid #7C3AED',
//                 borderRadius: '20px',
//               }}
//             >
//               <Typography variant="h2" sx={{ fontWeight: 700, color: '#7C3AED' }}>
//                 {step.number}
//               </Typography>
//               <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                 {step.title}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {step.desc}
//               </Typography>
//             </Paper>
//           ))}
//         </Box>

//         <Divider sx={{ my: 5 }} />
//       </Container>
// <Typography variant="h4" align="center" gutterBottom>
//           Key Features
//         </Typography>

//         <Box
//           sx={{
//             display: 'flex',
//             flexWrap: 'wrap',
//             gap: 3,
//             justifyContent: 'center',
//           }}
//         >
//           {featureImages.map((item) => (
//             <Box
//               key={item.id}
//               sx={{ width: { xs: '100%', sm: '48%', md: '30%' } }}
//             >
//               <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//                 <CardMedia
//                   component="img"
//                   height="200"
//                   image={item.url}
//                   alt={item.title}
//                 />
//                 <CardContent sx={{ flexGrow: 1 }}>
//                   <Typography variant="h6" gutterBottom>
//                     {item.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {item.desc}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Box>
//           ))}
//         </Box>
//       </Container>

//       {/* HOW IT WORKS */}
     
//       {/* FEATURES */}
//       <Container maxWidth="lg" sx={{ py: 6 }}>
        
//       </Container>

//       {/* CTA */}
//       <Box sx={{ backgroundColor: 'rgba(106, 80, 183, 1)', py: 6, mt: 6 }}>
//         <Container maxWidth="sm">
//           <Typography variant="h4" align="center" color="white" gutterBottom sx={{color: 'white' }}> 
//             Ready to Boost Your Grades?
//           </Typography>

//           <Typography variant="body1" align="center" color="white" sx={{ mb: 3, color: 'white' }}>
//             Join thousands of students learning smarter with QuizAI.
//           </Typography>

//           <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//          <Button
//   variant="contained"
//   color="secondary"
//   size="large"
//   onClick={() => navigate('/login')}
//   sx={{ px: 4, py: 1.5, borderRadius: 30 }}
// >
//   Start Now
// </Button>
//           </Box>
//         </Container>
//       </Box>
//     </>
//   );
// };

// export default Home;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useScrollTrigger,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import './Home.css';

const featureImages = [
  {
    id: 1,
    url: 'https://plus.unsplash.com/premium_photo-1679957333039-285fb913aa2b?q=80&w=726&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Personalized learning',
    desc: 'AI adapts to your knowledge level and adjusts difficulty automatically, question by question.',
    icon: '01 / PERSONALIZATION',
    color: '#C0392B',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop',
    title: 'Instant AI feedback',
    desc: 'Get a plain-language explanation for every answer, right when you need it — not at the end of the quiz.',
    icon: '02 / FEEDBACK',
    color: '#3B6EA5',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1657534076033-093b5c6047df?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Progress tracking',
    desc: 'Track your performance visually over time, and see exactly where scores are climbing.',
    icon: '03 / ANALYTICS',
    color: '#2E7D52',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1732579690000-84101b120f7f?q=80&w=776&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Engaging quizzes',
    desc: 'Timed quizzes simulate real exam conditions, so test day never feels unfamiliar.',
    icon: '04 / FORMAT',
    color: '#C99A2E',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1617791160536-598cf32026fb?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'AI recommendations',
    desc: 'Smart suggestions based on your weakest topics, updated automatically as you improve.',
    icon: '05 / GUIDANCE',
    color: '#C0392B',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&h=400&fit=crop',
    title: 'Grade 6–12 coverage',
    desc: 'Full curriculum support across subjects, matched to where you are in school right now.',
    icon: '06 / COVERAGE',
    color: '#3B6EA5',
  },
];

const aboutSteps = [
  {
    id: 'Q1',
    title: 'Choose your subject',
    desc: 'Select your grade level and subject, and QuizAI pulls a question set matched to your curriculum.',
    tag: 'Setup',
  },
  {
    id: 'Q2',
    title: 'Take the quiz',
    desc: 'Answer questions at your own pace. Difficulty adjusts automatically as you go, so you’re always working at the edge of what you know.',
    tag: 'Practice',
    color: '#C0392B',
  },
  {
    id: 'Q3',
    title: 'Get AI feedback',
    desc: 'Every answer comes with a plain-language explanation — not just a checkmark, but the reasoning behind it.',
    tag: 'Review',
    color: '#C99A2E',
  },
  {
    id: 'Q4',
    title: 'Track your growth',
    desc: 'See your scores and weak spots plotted over time, so you know exactly what to study next.',
    tag: 'Progress',
    color: '#2E7D52',
  },
];

const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'About QuizAI', id: 'about' },
  { label: 'Services', id: 'services' },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 80,
  });

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <>
      {/* ===== NAVIGATION BAR ===== */}
      <AppBar
        position="fixed"
        elevation={trigger ? 4 : 0}
        className="navbar navbar-solid"
        sx={{ bgcolor: '#FBFAF6 !important' }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 2, md: 6 } }}>
          <Box className="logo" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              className="dot"
              sx={{
                width: 9,
                height: 9,
                borderRadius: '50%',
                bgcolor: '#C0392B',
                boxShadow: '0 0 0 2px rgba(192,57,43,.15)',
              }}
            />
            <Typography
              variant="h5"
              className="navbar-logo"
              onClick={() => handleNavClick('home')}
              sx={{
                fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: 0.5,
                fontFamily: "'Space Grotesk', sans-serif",
                color: '#1B2430',
              }}
            >
              QuizAI
            </Typography>
          </Box>

          <Box className="nav-links" sx={{ display: { xs: 'none', md: 'flex' }, gap: 4, alignItems: 'center' }}>
            {navLinks.map((link) => (
              <Typography
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="navbar-link"
                sx={{
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '14.5px',
                  color: '#4B5563',
                  position: 'relative',
                  pb: 0.5,
                  '&:hover': { color: '#1B2430' },
                }}
              >
                {link.label}
              </Typography>
            ))}
          </Box>

          <IconButton
            className="navbar-menu-btn"
            sx={{ display: { xs: 'flex', md: 'none' }, color: '#1B2430' }}
            onClick={() => setMobileOpen(true)}
            aria-label="open navigation menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 260, pt: 2 }} role="presentation">
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, mb: 1 }}>
            <IconButton onClick={() => setMobileOpen(false)} aria-label="close navigation menu">
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.id} onClick={() => handleNavClick(link.id)} sx={{ cursor: 'pointer' }}>
                <ListItemText primary={link.label} slotProps={{ primary: { sx: { fontWeight: 600 } } }} />
              </ListItem>
            ))}
            <ListItem sx={{ mt: 1 }}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={() => {
                  setMobileOpen(false);
                  navigate('/login');
                }}
                sx={{ borderRadius: 30, fontWeight: 700 }}
              >
                Get Started
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* ===== HERO SECTION ===== */}
      <Box
        id="home"
        className="hero-section"
        sx={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#FBFAF6',
        }}
      >
        <Box className="ruled" sx={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <Box
            className="ruled-pattern"
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'repeating-linear-gradient(to bottom, transparent 0px, transparent 37px, rgba(185, 210, 230, 0.35) 37px, rgba(185, 210, 230, 0.35) 38px)',
              pointerEvents: 'none',
            }}
          />
          <Box
            className="ruled-margin"
            sx={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: { xs: '28px', md: '88px' },
              width: '2px',
              background: '#C0392B',
              opacity: 0.45,
              pointerEvents: 'none',
            }}
          />
        </Box>

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1.15fr 0.85fr' },
              gap: 4,
              alignItems: 'center',
            }}
          >
            {/* Left Content */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box sx={{ width: 14, height: 1, bgcolor: '#C0392B', display: 'inline-block' }} />
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '12.5px',
                    letterSpacing: '1.5px',
                    fontWeight: 600,
                    color: '#C0392B',
                  }}
                >
                  GRADE 6–12 · AI-POWERED PRACTICE
                </Typography>
              </Box>

              <Typography
                variant="h1"
                sx={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: { xs: '38px', md: '64px' },
                  lineHeight: 1.03,
                  fontWeight: 700,
                  color: '#1B2430',
                  mb: 2,
                  letterSpacing: '-1px',
                }}
              >
                Ace your
                <Box component="span" sx={{ position: 'relative', display: 'inline-block', ml: 1 }}>
                  next quiz.
                  <Box
                    component="svg"
                    viewBox="0 0 300 40"
                    preserveAspectRatio="none"
                    sx={{
                      position: 'absolute',
                      left: '-4%',
                      top: '-6%',
                      width: '108%',
                      height: '130%',
                      zIndex: -1,
                    }}
                  >
                    <path
                      d="M2,30 C 80,42 220,42 298,28"
                      stroke="#C99A2E"
                      strokeWidth="7"
                      fill="none"
                      strokeLinecap="round"
                      opacity="0.55"
                    />
                  </Box>
                </Box>
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: '18px',
                  lineHeight: 1.6,
                  color: '#4B5563',
                  maxWidth: '460px',
                  mb: 3,
                }}
              >
                Practice questions built for your grade, instant grading, and feedback that actually
                explains the answer — not just marks it wrong.
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  onClick={() => navigate('/login')}
                  sx={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: '15.5px',
                    bgcolor: '#1B2430',
                    color: '#FBFAF6',
                    border: '2px solid #1B2430',
                    px: 4,
                    py: 1.5,
                    borderRadius: '2px',
                    letterSpacing: '0.3px',
                    transition: 'transform 0.15s ease, background 0.15s ease',
                    '&:hover': {
                      bgcolor: '#C0392B',
                      borderColor: '#C0392B',
                      transform: 'translateY(-2px) rotate(-0.6deg)',
                    },
                  }}
                >
                  Get started — it's free
                </Button>
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '12.5px',
                    color: '#4B5563',
                  }}
                >
                  no credit card required
                </Typography>
              </Box>

              <Box
                sx={{
                  mt: 4,
                  pt: 3,
                  borderTop: '1px solid rgba(27,36,48,0.12)',
                  display: 'flex',
                  gap: 3,
                  flexWrap: 'wrap',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '12.5px',
                    color: '#4B5563',
                  }}
                >
                  <Box component="b" sx={{ color: '#1B2430', fontWeight: 600 }}>
                    12,400+
                  </Box>{' '}
                  students practicing weekly
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '12.5px',
                    color: '#4B5563',
                  }}
                >
                  <Box component="b" sx={{ color: '#1B2430', fontWeight: 600 }}>
                    40
                  </Box>{' '}
                  partner schools
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '12.5px',
                    color: '#4B5563',
                  }}
                >
                  <Box component="b" sx={{ color: '#1B2430', fontWeight: 600 }}>
                    6–12
                  </Box>{' '}
                  full grade coverage
                </Typography>
              </Box>
            </Box>

            {/* Stamp */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <Box
                sx={{
                  width: { xs: '200px', md: '300px' },
                  aspectRatio: '1',
                  transform: 'rotate(-9deg)',
                  filter: 'drop-shadow(0 10px 20px rgba(27,36,48,0.08))',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    border: '4px solid #C0392B',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: '12px',
                    borderRadius: '50%',
                    border: '2px solid #C0392B',
                  }}
                />
                <Box sx={{ textAlign: 'center', zIndex: 1 }}>
                  <Typography
                    variant="h1"
                    sx={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      color: '#C0392B',
                      fontSize: { xs: '48px', md: '72px' },
                      lineHeight: 1,
                    }}
                  >
                    A+
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontWeight: 600,
                      fontSize: '13px',
                      letterSpacing: '3px',
                      color: '#C0392B',
                      display: 'block',
                    }}
                  >
                    WELL DONE
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                    <Box component="svg" viewBox="0 0 100 40" sx={{ width: 80 }}>
                      <path
                        d="M10,25 L35,38 L80,12"
                        stroke="#2E7D52"
                        strokeWidth="7"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Letter bubbles */}
              <Box
                sx={{
                  position: 'absolute',
                  right: '-6px',
                  top: '8%',
                  display: { xs: 'none', md: 'flex' },
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                {['A', 'B', 'C', 'D'].map((letter, idx) => (
                  <Box
                    key={letter}
                    sx={{
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      border: '2px solid #1B2430',
                      opacity: idx === 1 ? 1 : 0.35,
                      bgcolor: idx === 1 ? '#2E7D52' : 'transparent',
                      color: idx === 1 ? '#FBFAF6' : '#1B2430',
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: idx === 1 ? '#2E7D52' : '#1B2430',
                    }}
                  >
                    {letter}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ===== ABOUT SECTION ===== */}
      <Container maxWidth="lg" sx={{ py: 8, position: 'relative' }} id="about">
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'repeating-linear-gradient(to bottom, transparent 0px, transparent 37px, rgba(185, 210, 230, 0.35) 37px, rgba(185, 210, 230, 0.35) 38px)',
            opacity: 0.5,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: { xs: '28px', md: '88px' },
            width: '2px',
            background: '#C0392B',
            opacity: 0.4,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: '980px', mx: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box sx={{ width: 14, height: 1, bgcolor: '#C0392B', display: 'inline-block' }} />
            <Typography
              variant="caption"
              sx={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '12.5px',
                letterSpacing: '1.5px',
                fontWeight: 600,
                color: '#C0392B',
              }}
            >
              HOW IT WORKS
            </Typography>
          </Box>

          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: { xs: '34px', md: '52px' },
              fontWeight: 700,
              letterSpacing: '-1px',
              color: '#1B2430',
              mb: 2,
            }}
          >
            Four questions in, one clearer answer out.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: '18px',
              lineHeight: 1.65,
              color: '#4B5563',
              maxWidth: '640px',
              mb: 6,
            }}
          >
            QuizAI is an AI-powered learning platform for Grades 6–12. It adapts to your performance
            in real time and walks you through the process one step at a time — like a quiz that
            grades itself as you go.
          </Typography>

          {/* About Steps */}
          <Box sx={{ position: 'relative', counterReset: 'q' }}>
            <Box
              sx={{
                position: 'absolute',
                left: '33px',
                top: '14px',
                bottom: '14px',
                width: '2px',
                background: 'repeating-linear-gradient(to bottom, #1B2430 0 6px, transparent 6px 12px)',
                opacity: 0.25,
                zIndex: 0,
                '@media (max-width:600px)': { left: '25px' },
              }}
            />
            {/* ✅ FIX: Removed unused 'index' parameter */}
            {aboutSteps.map((step) => (
              <Box
                key={step.id}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '50px 1fr', md: '68px 1fr' },
                  gap: { xs: '16px', md: '28px' },
                  padding: '28px 0',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <Box
                  className="qnum"
                  sx={{
                    width: { xs: '50px', md: '68px' },
                    height: { xs: '50px', md: '68px' },
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontWeight: 600,
                    fontSize: { xs: '13px', md: '15px' },
                    background: '#FBFAF6',
                    border: `2px solid ${step.color || '#1B2430'}`,
                    color: step.color || '#1B2430',
                  }}
                >
                  {step.id}
                </Box>
                <Box
                  sx={{
                    background: '#fff',
                    border: '1px solid rgba(27,36,48,0.12)',
                    borderRadius: '6px',
                    padding: { xs: '20px', md: '26px 30px' },
                    boxShadow: '0 1px 0 rgba(27,36,48,0.03)',
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '11px',
                      letterSpacing: '1px',
                      fontWeight: 600,
                      color: '#4B5563',
                      opacity: 0.6,
                      textTransform: 'uppercase',
                      display: 'block',
                      mb: 0.5,
                    }}
                  >
                    {step.tag}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '22px',
                      fontWeight: 700,
                      color: '#1B2430',
                      mb: 0.5,
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#4B5563', fontSize: '15.5px', lineHeight: 1.6 }}>
                    {step.desc}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Answer Strip */}
          <Box
            sx={{
              mt: 6,
              p: { xs: '20px', md: '30px 34px' },
              borderRadius: '6px',
              bgcolor: '#1B2430',
              color: '#FBFAF6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 3,
              flexWrap: 'wrap',
            }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '19px',
                  fontWeight: 700,
                  color: '#FBFAF6',
                }}
              >
                Ready to see your first question?
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  color: '#C7CDD6',
                  mt: 0.5,
                }}
              >
                Set up your subject in under a minute.
              </Typography>
            </Box>
            <Button
              onClick={() => navigate('/login')}
              sx={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: '14.5px',
                bgcolor: '#C0392B',
                color: '#fff',
                border: '2px solid #C0392B',
                padding: '13px 24px',
                borderRadius: '2px',
                whiteSpace: 'nowrap',
                '&:hover': {
                  bgcolor: '#A93226',
                  borderColor: '#A93226',
                },
              }}
            >
              Get started
            </Button>
          </Box>
        </Box>
      </Container>

      {/* ===== SERVICES SECTION ===== */}
      <Container maxWidth="lg" sx={{ py: 6 }} id="services">
        <Box sx={{ maxWidth: '620px', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box sx={{ width: 14, height: 1, bgcolor: '#C0392B', display: 'inline-block' }} />
            <Typography
              variant="caption"
              sx={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '12.5px',
                letterSpacing: '1.5px',
                fontWeight: 600,
                color: '#C0392B',
              }}
            >
              KEY FEATURES
            </Typography>
          </Box>

          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: { xs: '32px', md: '46px' },
              fontWeight: 700,
              letterSpacing: '-1px',
              color: '#1B2430',
              mb: 1,
            }}
          >
            Everything a study session needs, nothing it doesn't.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: '16.5px',
              lineHeight: 1.6,
              color: '#4B5563',
            }}
          >
            Six tools that work together — from the first question you answer to the report card moment.
          </Typography>
        </Box>

        {/* Features Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: '22px',
            pb: 6,
          }}
        >
          {featureImages.map((item) => (
            <Box
              key={item.id}
              sx={{
                background: '#fff',
                border: '1px solid rgba(27,36,48,0.12)',
                borderRadius: '6px',
                padding: '30px 26px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 10px 24px rgba(27,36,48,0.08)',
                },
              }}
            >
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid',
                  color: item.color,
                }}
              >
                {item.id === 1 && (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M4 20L4.8 15.2L16 4L20 8L8.8 19.2L4 20Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                    <path d="M13 7L17 11" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                )}
                {item.id === 2 && (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M4 5H20V16H9L5 19V16H4V5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                    <path d="M8 9.5H16M8 12.5H13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                )}
                {item.id === 3 && (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M4 20V4M4 20H20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    <path d="M7 16L11 11L14 13.5L19 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {item.id === 4 && (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M12 8V12L14.5 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                )}
                {item.id === 5 && (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M12 4L14 9L19.5 9.5L15.3 13L16.5 18.5L12 15.5L7.5 18.5L8.7 13L4.5 9.5L10 9L12 4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  </svg>
                )}
                {item.id === 6 && (
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path d="M4 5.5C4 5.5 6 4.5 9 4.5C12 4.5 12 6 12 6C12 6 12 4.5 15 4.5C18 4.5 20 5.5 20 5.5V17.5C20 17.5 18 16.5 15 16.5C12 16.5 12 18 12 18C12 18 12 16.5 9 16.5C6 16.5 4 17.5 4 17.5V5.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                    <path d="M12 6V18" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                )}
              </Box>
              <Typography
                variant="caption"
                sx={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '11px',
                  color: '#4B5563',
                  opacity: 0.55,
                  letterSpacing: '1px',
                }}
              >
                {item.icon}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '19px',
                  fontWeight: 700,
                  color: '#1B2430',
                }}
              >
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '14.5px',
                  lineHeight: 1.55,
                  color: '#4B5563',
                }}
              >
                {item.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>

      {/* ===== CTA SECTION ===== */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          bgcolor: '#1B2430',
          color: '#FBFAF6',
          py: { xs: 6, md: 8 },
          px: { xs: 2, md: 4 },
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'repeating-linear-gradient(to bottom, transparent 0px, transparent 37px, rgba(159,191,230,0.14) 37px, rgba(159,191,230,0.14) 38px)',
            pointerEvents: 'none',
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: '640px', mx: 'auto' }}>
          <Box sx={{ mx: 'auto', mb: 3 }}>
            <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
              <circle cx="60" cy="60" r="52" fill="none" stroke="#E8735F" strokeWidth="3" />
              <path d="M38,62 L52,76 L84,42" stroke="#E8735F" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Box>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: { xs: '26px', md: '38px' },
              fontWeight: 700,
              color: '#FBFAF6',
              mb: 1,
              letterSpacing: '-0.5px',
            }}
          >
            Ready to boost your grade?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: '16px',
              color: '#C7CDD6',
              mb: 4,
            }}
          >
            Join thousands of students learning smarter with QuizAI.
          </Typography>
          <Button
            onClick={() => navigate('/login')}
            sx={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: '15px',
              bgcolor: '#C0392B',
              color: '#fff',
              border: '2px solid #C0392B',
              padding: '15px 32px',
              borderRadius: '2px',
              transition: 'transform 0.15s ease',
              '&:hover': {
                bgcolor: '#A93226',
                borderColor: '#A93226',
                transform: 'translateY(-2px)',
              },
            }}
          >
            Start now
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Home;