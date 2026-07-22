// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }
// export default App



// import { Routes, Route, Navigate } from 'react-router-dom';
// import Dashboard from './Student/StudentDashboard';
// import Quiz from './Student/Quiz';
// import QuizAttempt from './Student/AttemptQuiz';
// import ViewReport from './Student/ViewReport';   // import
// import Setting from './Student/Setting';
// // ...

// function App() {
//   return (
//     <Routes>
//           <Route path="/" element={<Navigate to="/student/dashboard" replace />} />
//       <Route path="/student/dashboard" element={<Dashboard />} />
//       <Route path="/student/quiz" element={<Quiz />} />
//       <Route path="/student/quiz/attempt/:lessonId" element={<QuizAttempt />} />
//       <Route path="/student/reports" element={<ViewReport />} />     // add this
//       <Route path="/Student/ViewReport" element={<ViewReport />} /> 
//       <Route path="/student/settings" element={<Setting />} /> // also keep for backward compatibility
//     </Routes>
//   );
// }

// export default App;



// import { Routes, Route, Navigate } from 'react-router-dom';
// import Login from './common/Pages/Login';
// import SignUp from './Student/SignUp';
// import Home from './Student/Home';
// import Dashboard from './Student/StudentDashboard';
// import AdminDashboard from './Admin/AdminDashboard';
// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<SignUp />} />

//       <Route path="/student/dashboard" element={<Dashboard />} />
//       <Route path="/Admin/admindashboard" element={<AdminDashboard/>}></Route>
//       {/* Optional: redirect any unknown routes to home */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }

// export default App;

// import { Routes, Route, Navigate } from 'react-router-dom';
// import Login from './common/Pages/Login';
// import SignUp from './Student/SignUp';
// import Home from './Student/Home';
// import Dashboard from './Student/StudentDashboard';
// import AdminDashboard from './Admin/AdminDashboard';
// import ManageGrade from './Admin/ManageGrade';
// // Import other admin pages when you create them
// import ManageSubject from './Admin/ManageSubject';
// import ManageLesson from './Admin/ManageLesson';
// import ManageQuiz from './Admin/ManageQuiz';
// import ManageUser from './Admin/ManageStudent';
// import ForgetPassword from './common/Pages/forgetPassword';
// // ...


// import { Password } from '@mui/icons-material';

// function App() {
//   return (
//     <Routes>
//       {/* Public */}
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//    <Route path="/forgot-password" element={<ForgetPassword />} />
//       <Route path="/signup" element={<SignUp />} />

//       {/* Student */}
//       <Route path="/student/dashboard" element={<Dashboard />} />

//       {/* Admin – paths must match sidebar menuItems */}
//       <Route path="/admin/dashboard" element={<AdminDashboard />} />
//       <Route path="/admin/grades" element={<ManageGrade />} />  
//       <Route path="/admin/subjects" element={<ManageSubject />} />
//       <Route path="/admin/lessons" element={<ManageLesson />} />
//       <Route path="/admin/quizzes" element={<ManageQuiz />} />
//       <Route path="/admin/users" element={<ManageUser />} /> 

//       {/* Fallback */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }

// export default App;


import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './common/contexts/AuthContext';
import { NotificationProvider } from './common/contexts/NotificationContext'; // ✅ import
import Login from './common/Pages/Login';
import SignUp from './Student/SignUp';
import Home from './Student/Home';
import Dashboard from './Student/StudentDashboard';
import Quiz from './Student/Quiz';
import QuizAttempt from './Student/AttemptQuiz';
import ViewReport from './Student/ViewReport';
import Setting from './Student/Setting';
import AdminDashboard from './Admin/AdminDashboard';
import ManageGrade from './Admin/ManageGrade';
import ManageSubject from './Admin/ManageSubject';
import ManageLesson from './Admin/ManageLesson';
import ManageQuiz from './Admin/ManageQuiz';
import ManageUser from './Admin/ManageStudent';
import ForgetPassword from './common/Pages/forgetPassword';
import Onboarding from './common/Pages/Onboarding';
import ManageQuestions from './Admin/ManageQuestion';
import ManageQuestionsList from './Admin/ManageQuestionsLisrt';
import AdminReports from './Admin/AdminReport';
import PaymentSuccess from './common/Pages/PaymentSuccess';
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    // ✅ Wrap everything with NotificationProvider (can be inside or outside AuthProvider)
    // We'll place it outside so that notifications can be shown even before authentication.
    <NotificationProvider>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/signup" element={<SignUp />} />
<Route path="/payment/success" element={<PaymentSuccess />} />
          {/* Student routes */}
          <Route path="/student/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/onboarding" element={<PrivateRoute><Onboarding /></PrivateRoute>} />
          <Route path="/student/quiz" element={<Quiz />} />
          <Route path="/student/quiz/attempt/:lessonId" element={<QuizAttempt />} />
          <Route path="/student/reports" element={<ViewReport />} />
          <Route path="/Student/ViewReport" element={<ViewReport />} />
          <Route path="/student/settings" element={<Setting />} />

          {/* Admin routes */}
          <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/grades" element={<PrivateRoute><ManageGrade /></PrivateRoute>} />
          <Route path="/admin/subjects" element={<PrivateRoute><ManageSubject /></PrivateRoute>} />
          <Route path="/admin/lessons" element={<PrivateRoute><ManageLesson /></PrivateRoute>} />
          <Route path="/admin/quizzes" element={<PrivateRoute><ManageQuiz /></PrivateRoute>} />
          <Route path="/admin/users" element={<PrivateRoute><ManageUser /></PrivateRoute>} />
          <Route path="/admin/questions" element={<PrivateRoute><ManageQuestionsList /></PrivateRoute>} />
          <Route path="/admin/quizzes/:quizId/questions" element={<PrivateRoute><ManageQuestions /></PrivateRoute>} />
          <Route path="/admin/reports" element={<PrivateRoute><AdminReports /></PrivateRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;