// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Typography,
//   Box,
//   Avatar,
//   Divider,
// } from '@mui/material';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import QuizIcon from '@mui/icons-material/Quiz';
// import AssessmentIcon from '@mui/icons-material/Assessment';
// import SettingsIcon from '@mui/icons-material/Settings';
// import LogoutIcon from '@mui/icons-material/Logout';

// const drawerWidth = 260;

// interface SidebarProps {
//   open: boolean;
//   onClose: () => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const menuItems = [
//     { text: 'Dashboard', icon: <DashboardIcon />, path: '/student/dashboard' },
//     { text: 'Quiz', icon: <QuizIcon />, path: '/student/quiz' },
//     { text: 'Reports', icon: <AssessmentIcon />, path: '/student/reports' },
//     { text: 'Settings', icon: <SettingsIcon />, path: '/student/settings' },
//   ];

//   const handleNavigate = (path: string) => {
//     navigate(path);
//     onClose();
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   const drawerContent = (
//     <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//       {/* Header */}
//       <Box
//         sx={{
//           p: 3,
//           background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
//           color: 'white',
//         }}
//       >
//         <Typography variant="h6" sx={{fontWeight:"bold"}}>
//           📚 QuizAI
//         </Typography>
//         <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
//           Student Dashboard
//         </Typography>
//       </Box>

//       {/* User Info */}
//       <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
//         <Avatar sx={{ bgcolor: '#7C3AED', width: 48, height: 48 }}>
//           S
//         </Avatar>
//         <Box>
//   <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
//   Student Name
// </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Grade 10
//           </Typography>
//         </Box>
//       </Box>

//       <Divider />

//       {/* Menu Items */}
//       <List sx={{ flex: 1, pt: 2 }}>
//         {menuItems.map((item) => {
//           const isActive = location.pathname === item.path;
//           return (
//             <ListItem
//               key={item.text}
//               onClick={() => handleNavigate(item.path)}
//               sx={{
//                 mx: 1,
//                 borderRadius: 2,
//                 mb: 0.5,
//                 cursor: 'pointer',
//                 backgroundColor: isActive ? '#F5F3FF' : 'transparent',
//                 '&:hover': {
//                   backgroundColor: '#F5F3FF',
//                 },
//                 '& .MuiListItemIcon-root': {
//                   color: isActive ? '#7C3AED' : '#64748B',
//                 },
//                 '& .MuiListItemText-primary': {
//                   color: isActive ? '#7C3AED' : '#334155',
//                   fontWeight: isActive ? 600 : 400,
//                 },
//               }}
//             >
//               <ListItemIcon>{item.icon}</ListItemIcon>
//               <ListItemText primary={item.text} />
//             </ListItem>
//           );
//         })}
//       </List>

//       <Divider />

//       {/* Logout */}
//       <List sx={{ pb: 2 }}>
//         <ListItem
//           onClick={handleLogout}
//           sx={{
//             mx: 1,
//             borderRadius: 2,
//             cursor: 'pointer',
//             '&:hover': {
//               backgroundColor: '#FEF2F2',
//             },
//             '& .MuiListItemIcon-root': {
//               color: '#EF4444',
//             },
//             '& .MuiListItemText-primary': {
//               color: '#EF4444',
//             },
//           }}
//         >
//           <ListItemIcon>
//             <LogoutIcon />
//           </ListItemIcon>
//           <ListItemText primary="Logout" />
//         </ListItem>
//       </List>
//     </Box>
//   );

//   return (
//     <Drawer
//       variant="temporary"
//       open={open}
//       onClose={onClose}
//       sx={{
//         '& .MuiDrawer-paper': {
//           width: drawerWidth,
//           boxSizing: 'border-box',
//           borderRight: '1px solid #E2E8F0',
//         },
//       }}
//     >
//       {drawerContent}
//     </Drawer>
//   );
// };

// export default Sidebar;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Avatar,
  Divider,
  CircularProgress,
  IconButton,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import QuizIcon from '@mui/icons-material/Quiz';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';

import { useAuth } from '../../common/contexts/AuthContext';
import API from '../../common/services/api';
import './Sidebar.css';

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
  variant?: 'permanent' | 'temporary';
  width?: number;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const StudentSidebar: React.FC<SidebarProps> = ({
  open = true,
  onClose = () => {},
  variant = 'temporary',
  width = 264,
  collapsed = false,
  onToggleCollapse = () => {},
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading: authLoading } = useAuth();
  const [userData, setUserData] = useState<any>(user);
  const [loading, setLoading] = useState(true);

  const drawerWidth = collapsed ? 72 : width;

  // Fetch fresh user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }
        const res = await API.get('/auth/me');
        setUserData(res.data);
        console.log('📊 User data from sidebar:', res.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      if (user) {
        setUserData(user);
        setLoading(false);
        // Fetch fresh data anyway to get latest grade and image
        fetchUserData();
      } else {
        fetchUserData();
      }
    }
  }, [authLoading]);

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/student/dashboard' },
    { text: 'Quiz', icon: <QuizIcon />, path: '/student/quiz' },
    { text: 'Reports', icon: <AssessmentIcon />, path: '/student/reports' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/student/settings' },
  ];

  // Get display name from user data
  const displayName = userData
    ? `${userData.FName || ''} ${userData.LName || ''}`.trim() || 'Student'
    : 'Student';

  // Get grade from user data
  const gradeDisplay = userData?.gradeId ? `Grade ${userData.gradeId}` : '';

  // Get profile image from PImage array
  const profileImage = userData?.PImage && userData.PImage.length > 0 
    ? userData.PImage[0] 
    : null;

  // Get avatar initials
  const getInitials = () => {
    if (!userData) return 'S';
    const first = userData.FName?.charAt(0) || '';
    const last = userData.LName?.charAt(0) || '';
    return `${first}${last}`.toUpperCase() || 'S';
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    if (variant === 'temporary') onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const drawerContent = (
    <Box className="sidebar-container">
      {/* HEADER - QuizAI Brand */}
      <Box className="sidebar-header">
        {!collapsed && (
          <Box className="brand">
            <Box className="brand-dot" />
            <Typography className="brand-text">QuizAI</Typography>
          </Box>
        )}
        {collapsed && (
          <Box className="brand">
            <Box className="brand-dot" />
          </Box>
        )}

        {variant === 'permanent' && (
          <IconButton onClick={onToggleCollapse} className="collapse-btn">
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        )}
      </Box>

      {/* USER INFO */}
      <Box className="user-info">
        {loading || authLoading ? (
          <CircularProgress size={28} sx={{ color: '#C0392B' }} />
        ) : (
          <>
            <Avatar
              src={profileImage || undefined}
              className="user-avatar"
              sx={{
                bgcolor: profileImage ? 'transparent' : '#1B2430',
                border: '2px solid #C0392B',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 15,
                width: 44,
                height: 44,
              }}
            >
              {!profileImage && getInitials()}
            </Avatar>

            {!collapsed && (
              <Box className="user-details">
                <Typography className="user-name">
                  {displayName || 'Student'}
                </Typography>
                <Typography className="user-grade">
                  {gradeDisplay || 'No grade assigned'}
                </Typography>
              </Box>
            )}
          </>
        )}
      </Box>

      <Divider className="sidebar-divider" />

      {/* MENU */}
      <List className="menu-list">
        {menuItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <ListItem
              key={item.text}
              onClick={() => handleNavigate(item.path)}
              className={`menu-item ${active ? 'active' : ''}`}
              sx={{
                justifyContent: collapsed ? 'center' : 'flex-start',
              }}
            >
              <ListItemIcon
                className={`menu-icon ${active ? 'active' : ''}`}
                sx={{
                  minWidth: collapsed ? 0 : 40,
                }}
              >
                {item.icon}
              </ListItemIcon>

              {!collapsed && (
                <ListItemText
                  primary={item.text}
                  className={`menu-text ${active ? 'active' : ''}`}
                />
              )}
            </ListItem>
          );
        })}
      </List>

      <Divider className="sidebar-divider" />

      {/* LOGOUT */}
      <List className="logout-list">
        <ListItem
          onClick={handleLogout}
          className="logout-item"
          sx={{
            justifyContent: collapsed ? 'center' : 'flex-start',
          }}
        >
          <ListItemIcon
            className="logout-icon"
            sx={{
              minWidth: collapsed ? 0 : 40,
            }}
          >
            <LogoutIcon />
          </ListItemIcon>

          {!collapsed && (
            <ListItemText primary="Logout" className="logout-text" />
          )}
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      className="sidebar-drawer"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: '1px solid rgba(27,36,48,0.12)',
          overflowX: 'hidden',
          transition: 'width 0.25s ease',
          backgroundColor: '#fff',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default StudentSidebar;


// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Typography,
//   Box,
//   Avatar,
//   Divider,
//   IconButton,
//   Toolbar,
//   useTheme,
// } from '@mui/material';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import QuizIcon from '@mui/icons-material/Quiz';
// import AssessmentIcon from '@mui/icons-material/Assessment';
// import SettingsIcon from '@mui/icons-material/Settings';
// import LogoutIcon from '@mui/icons-material/Logout';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// interface SidebarProps {
//   open?: boolean;
//   onClose?: () => void;
//   variant?: 'permanent' | 'temporary';
//   width?: number;
//   collapsed?: boolean;
//   onToggleCollapse?: () => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({
//   open = false,
//   onClose = () => {},
//   variant = 'temporary',
//   width = 260,
//   collapsed = false,
//   onToggleCollapse = () => {},
// }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const theme = useTheme();

//   const menuItems = [
//     { text: 'Dashboard', icon: <DashboardIcon />, path: '/student/dashboard' },
//     { text: 'Quiz', icon: <QuizIcon />, path: '/student/quiz' },
//     { text: 'Reports', icon: <AssessmentIcon />, path: '/student/reports' },
//     { text: 'Settings', icon: <SettingsIcon />, path: '/student/settings' },
//   ];

//   const handleNavigate = (path: string) => {
//     navigate(path);
//     if (variant === 'temporary') onClose();
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   const drawerContent = (
//     <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//       {/* Header with collapse toggle (only for permanent drawer) */}
//       <Box
//         sx={{
//           p: collapsed ? 1 : 3,
//           background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
//           color: 'white',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           minHeight: 64,
//         }}
//       >
//         {!collapsed && (
//           <Typography variant="h6" noWrap sx={{ fontWeight: 700}}>
//             📚 QuizAI
//           </Typography>
//         )}
//         {variant === 'permanent' && (
//           <IconButton
//             onClick={onToggleCollapse}
//             sx={{ color: 'white', ml: collapsed ? 'auto' : 0 }}
//           >
//             {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
//           </IconButton>
//         )}
//       </Box>

//       {!collapsed && (
//         <>
//           {/* User Info */}
//           <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
//             <Avatar sx={{ bgcolor: '#7C3AED', width: 48, height: 48 }}>S</Avatar>
//             <Box>
//               <Typography variant="subtitle1" sx={{ fontWeight: 700}}>Student Name</Typography>
//               <Typography variant="body2" color="text.secondary">Grade 10</Typography>
//             </Box>
//           </Box>
//           <Divider />
//         </>
//       )}

//       {/* Menu Items */}
//       <List sx={{ flex: 1, pt: 2, px: 1 }}>
//         {menuItems.map((item) => {
//           const isActive = location.pathname === item.path;
//           return (
//             <ListItem
//               key={item.text}
//               onClick={() => handleNavigate(item.path)}
//               sx={{
//                 borderRadius: 2,
//                 mb: 0.5,
//                 cursor: 'pointer',
//                 backgroundColor: isActive ? '#F5F3FF' : 'transparent',
//                 '&:hover': { backgroundColor: '#F5F3FF' },
//                 '& .MuiListItemIcon-root': {
//                   color: isActive ? '#7C3AED' : '#64748B',
//                   minWidth: collapsed ? 40 : 56,
//                 },
//                 '& .MuiListItemText-primary': {
//                   color: isActive ? '#7C3AED' : '#334155',
//                   fontWeight: isActive ? 600 : 400,
//                 },
//                 justifyContent: collapsed ? 'center' : 'flex-start',
//                 px: collapsed ? 1 : 2,
//               }}
//             >
//               <ListItemIcon>{item.icon}</ListItemIcon>
//               {!collapsed && <ListItemText primary={item.text} />}
//             </ListItem>
//           );
//         })}
//       </List>

//       <Divider />

//       {/* Logout */}
//       <List sx={{ pb: 2, px: 1 }}>
//         <ListItem
//           onClick={handleLogout}
//           sx={{
//             borderRadius: 2,
//             cursor: 'pointer',
//             '&:hover': { backgroundColor: '#FEF2F2' },
//             '& .MuiListItemIcon-root': { color: '#EF4444', minWidth: collapsed ? 40 : 56 },
//             '& .MuiListItemText-primary': { color: '#EF4444' },
//             justifyContent: collapsed ? 'center' : 'flex-start',
//             px: collapsed ? 1 : 2,
//           }}
//         >
//           <ListItemIcon><LogoutIcon /></ListItemIcon>
//           {!collapsed && <ListItemText primary="Logout" />}
//         </ListItem>
//       </List>
//     </Box>
//   );

//   return (
//     <Drawer
//       variant={variant}
//       open={open}
//       onClose={onClose}
//       sx={{
//         width: collapsed ? 72 : width,
//         flexShrink: 0,
//         '& .MuiDrawer-paper': {
//           width: collapsed ? 72 : width,
//           boxSizing: 'border-box',
//           borderRight: '1px solid #E2E8F0',
//           overflowX: 'hidden',
//           transition: theme.transitions.create('width', {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.enteringScreen,
//           }),
//         },
//       }}
//     >
//       {drawerContent}
//     </Drawer>
//   );
// };

// export default Sidebar;