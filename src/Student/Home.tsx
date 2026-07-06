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






import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Divider,
  Paper,
} from '@mui/material';
import './Home.css';
// Import the image from assets
import heroBg from '../assets/img1.jpg';   


const featureImages = [
  {
    id: 1,
    url: 'https://plus.unsplash.com/premium_photo-1679957333039-285fb913aa2b?q=80&w=726&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Personalized Learning',
    desc: 'AI adapts to your knowledge level and adjusts difficulty automatically.',
  },
  {
    id: 2,
        url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop',

    title: 'Instant AI Feedback',
    desc: 'Get explanations for every answer instantly.',
  },
  {
    id: 3,
    
    url: 'https://images.unsplash.com/photo-1657534076033-093b5c6047df?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Progress Tracking',
    desc: 'Track your performance visually over time.',
  },
  {
    id: 4,
        url: 'https://images.unsplash.com/photo-1732579690000-84101b120f7f?q=80&w=776&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

    title: 'Engaging Quizzes',
    desc: 'Timed quizzes simulate real exam conditions.',
  },
  {
    id: 5,
            url: 'https://images.unsplash.com/photo-1617791160536-598cf32026fb?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

    title: 'AI Recommendations',
    desc: 'Smart suggestions based on your weaknesses.',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&h=400&fit=crop',
    title: 'Grade 6–12 Coverage',
    desc: 'Full curriculum support across subjects.',
  },

];

const steps = [
  { number: '1', title: 'Choose Subject', desc: 'Select your grade and subject.' },
  { number: '2', title: 'Take Quiz', desc: 'Answer questions and learn instantly.' },
  { number: '3', title: 'AI Feedback', desc: 'Get personalized insights.' },
  { number: '4', title: 'Track Growth', desc: 'Monitor your progress over time.' },
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* HERO with background image from assets */}
      <Box
        className="hero-section"
        sx={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
         
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.55)', // dark overlay
          },
        }}
      >
        <Box
          className="hero-overlay"
          sx={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            color: 'white',
            px: 2,
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Learn Smarter with AI
            </Typography>

            <Typography variant="h5" sx={{ mb: 3, fontWeight: 300 }}>
              Practice quizzes, get instant feedback, and improve faster.
            </Typography>
<Button
  variant="contained"
  color="secondary"
  size="large"
  onClick={() => navigate('/login')}
  sx={{ px: 4, py: 1.5, borderRadius: 30 }}
>
  Get Started
</Button>
          </Container>
        </Box>
      </Box>

      {/* ABOUT */}

      <Container maxWidth="lg" sx={{ py: 6 }} className='bits'>
        
        <Typography variant="h3" align="center" gutterBottom>
          About QuizAI
        </Typography>

        <Typography variant="body1" align="center"  sx={{ fontWeight: 700, }}>
          QuizAI is an AI-powered learning platform for Grades 6–12 students.<br></br>
           It adapts to your performance and guides you step-by-step.
        </Typography>

     <Container maxWidth="lg" sx={{ py: 6 }}>
       
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 3,
          }}
        >
          {steps.map((step) => (
            <Paper
              key={step.number}
              elevation={3}
              sx={{
                p: 3,
                textAlign: 'center',
                width: '500px',
                height: '200px',
                border: '2.5px solid #7C3AED',
                borderRadius: '20px',
              }}
            >
              <Typography variant="h2" sx={{ fontWeight: 700, color: '#7C3AED' }}>
                {step.number}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {step.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {step.desc}
              </Typography>
            </Paper>
          ))}
        </Box>

        <Divider sx={{ my: 5 }} />
      </Container>
<Typography variant="h4" align="center" gutterBottom>
          Key Features
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            justifyContent: 'center',
          }}
        >
          {featureImages.map((item) => (
            <Box
              key={item.id}
              sx={{ width: { xs: '100%', sm: '48%', md: '30%' } }}
            >
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={item.url}
                  alt={item.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>

      {/* HOW IT WORKS */}
     
      {/* FEATURES */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        
      </Container>

      {/* CTA */}
      <Box sx={{ backgroundColor: 'rgba(106, 80, 183, 1)', py: 6, mt: 6 }}>
        <Container maxWidth="sm">
          <Typography variant="h4" align="center" color="white" gutterBottom sx={{color: 'white' }}> 
            Ready to Boost Your Grades?
          </Typography>

          <Typography variant="body1" align="center" color="white" sx={{ mb: 3, color: 'white' }}>
            Join thousands of students learning smarter with QuizAI.
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
         <Button
  variant="contained"
  color="secondary"
  size="large"
  onClick={() => navigate('/login')}
  sx={{ px: 4, py: 1.5, borderRadius: 30 }}
>
  Start Now
</Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Home;