import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  IconButton,
} from '@mui/material';

import {
  Dashboard,
  School,
  Book,
  MenuBook,
  Quiz,
  People,
  Logout,
  ChevronLeft,
  ChevronRight,
  QuestionAnswer,
  TrendingUp,
} from '@mui/icons-material';

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
  variant?: 'permanent' | 'temporary';
  width?: number;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  open = true,
  onClose = () => {},
  variant = 'permanent',
  width = 260,
  collapsed = false,
  onToggleCollapse = () => {},
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const drawerWidth = collapsed ? 72 : width;

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/admin/dashboard' },
    { text: 'Grades', icon: <School />, path: '/admin/grades' },
    { text: 'Subjects', icon: <Book />, path: '/admin/subjects' },
    { text: 'Lessons', icon: <MenuBook />, path: '/admin/lessons' },
    { text: 'Quizzes', icon: <Quiz />, path: '/admin/quizzes' },
    { text: 'Questions', icon: <QuestionAnswer />, path: '/admin/questions' },
    { text: 'Users', icon: <People />, path: '/admin/users' },
    { text: 'Reports', icon: <TrendingUp />, path: '/admin/reports' },
  ];

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* HEADER */}
      <Box
        sx={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          px: 2,
          bgcolor: '#0F172A',
          color: 'white',
        }}
      >
        {!collapsed && (
          <Typography sx={{fontWeight: 700}}>QuizAI Admin</Typography>
        )}

        {variant === 'permanent' && (
          <IconButton onClick={onToggleCollapse} sx={{ color: 'white' }}>
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        )}
      </Box>

      {/* MENU */}
      <List sx={{ flex: 1, px: 1, pt: 1 }}>
        {menuItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <ListItem
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                cursor: 'pointer',
                justifyContent: collapsed ? 'center' : 'flex-start',
                bgcolor: active ? '#EEF2FF' : 'transparent',
                '&:hover': { bgcolor: '#EEF2FF' },
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
                  slotProps={{
                    primary: {
                      sx: {
                        fontSize: 14,
                        fontWeight: active ? 600 : 400,
                        color: active ? '#7C3AED' : '#334155',
                      },
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
          onClick={() => {
            localStorage.clear();
            navigate('/login');
          }}
          sx={{
            borderRadius: 2,
            cursor: 'pointer',
            justifyContent: collapsed ? 'center' : 'flex-start',
            '&:hover': { bgcolor: '#FEE2E2' },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: collapsed ? 0 : 40,
              color: '#EF4444',
            }}
          >
            <Logout />
          </ListItemIcon>

          {!collapsed && (
            <ListItemText
              primary="Logout"
              slotProps={{
                primary: {
                  sx: {
                    color: '#EF4444',
                    fontWeight: 500,
                  },
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
          overflowX: 'hidden',
          borderRight: '1px solid #E2E8F0',
          transition: 'width 0.25s ease',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;