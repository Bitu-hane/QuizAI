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


import React from 'react';
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
  width = 260,
  collapsed = false,
  onToggleCollapse = () => {},
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();

  const drawerWidth = collapsed ? 72 : width;

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/student/dashboard' },
    { text: 'Quiz', icon: <QuizIcon />, path: '/student/quiz' },
    { text: 'Reports', icon: <AssessmentIcon />, path: '/student/reports' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/student/settings' },
  ];

  const displayName =
    user ? `${user.FName || ''} ${user.LName || ''}`.trim() : 'Student';

  const gradeDisplay = user?.gradeId ? `Grade ${user.gradeId}` : '';

  const handleNavigate = (path: string) => {
    navigate(path);
    if (variant === 'temporary') onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* HEADER */}
      <Box
        sx={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          px: collapsed ? 1 : 2,
          bgcolor: '#7C3AED',
          color: 'white',
        }}
      >
        {!collapsed && (
          <Typography sx={{fontWeight:600, fontSize:14}}>
            QuizAI Student
          </Typography>
        )}

        {variant === 'permanent' && (
          <IconButton onClick={onToggleCollapse} sx={{ color: 'white' }}>
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        )}
      </Box>

      {/* USER INFO */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        {loading ? (
          <CircularProgress size={28} sx={{ color: '#7C3AED' }} />
        ) : (
          <>
            <Avatar sx={{ bgcolor: '#7C3AED' }}>
              {displayName?.charAt(0)?.toUpperCase() || 'S'}
            </Avatar>

            {!collapsed && (
              <Box>
                <Typography sx={{fontWeight:600, fontSize:14}}>
                  {displayName || 'Student'}
                </Typography>
                <Typography sx={{fontSize:12, color:"text.secondary"}}>
                  {gradeDisplay || 'No grade assigned'}
                </Typography>
              </Box>
            )}
          </>
        )}
      </Box>

      <Divider />

      {/* MENU */}
      <List sx={{ flex: 1, px: 1, pt: 1 }}>
        {menuItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <ListItem
              key={item.text}
              onClick={() => handleNavigate(item.path)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                cursor: 'pointer',
                justifyContent: collapsed ? 'center' : 'flex-start',
                bgcolor: active ? '#F5F3FF' : 'transparent',
                '&:hover': { bgcolor: '#F5F3FF' },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: collapsed ? 0 : 40,
                  color: active ? '#7C3AED' : '#64748B',
                }}
              >
                {item.icon}
              </ListItemIcon>

              {!collapsed && (
                <ListItemText
                  primary={item.text}
                  sx={{
                    color: active ? '#7C3AED' : '#334155',
                    '& .MuiTypography-root': {
                      fontSize: 14,
                      fontWeight: active ? 600 : 400,
                    },
                  }}
                />
              )}
            </ListItem>
          );
        })}
      </List>

      <Divider />

      {/* LOGOUT */}
      <List sx={{ px: 1, pb: 2 }}>
        <ListItem
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            cursor: 'pointer',
            justifyContent: collapsed ? 'center' : 'flex-start',
            '&:hover': { bgcolor: '#FEF2F2' },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: collapsed ? 0 : 40,
              color: '#EF4444',
            }}
          >
            <LogoutIcon />
          </ListItemIcon>

          {!collapsed && (
            <ListItemText
              primary="Logout"
              sx={{
                color: '#EF4444',
                '& .MuiTypography-root': {
                  fontWeight: 500,
                },
              }}
            />
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
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: '1px solid #E2E8F0',
          overflowX: 'hidden',
          transition: 'width 0.25s ease',
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