



// import React, { useState } from 'react';
// import { Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import Sidebar from '../../Student/components/Sidebar';

// interface LayoutProps {
//   title: string;
//   children: React.ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ children, title }) => {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   return (
//     <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8FAFC' }}>
      
//       {/* APP BAR */}
//       <AppBar
//         position="fixed"
//         sx={{
//           width: { sm: `calc(100% - 260px)` },
//           ml: { sm: '260px' },
//           bgcolor: 'white',
//           color: '#1A202C',
//           boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
//           borderBottom: '1px solid #E2E8F0',
//         }}
//       >
//         <Toolbar>
//           <IconButton
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>

//           <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
//             {title}
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       {/* SIDEBAR */}
//       <Sidebar open={mobileOpen} onClose={handleDrawerToggle} />

//       {/* MAIN CONTENT */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: { sm: `calc(100% - 260px)` },
//           mt: '64px',
//           bgcolor: '#F8FAFC',
//         }}
//       >
//         {children}
//       </Box>

//     </Box>
//   );
// };

// export default Layout;



// import React, { useState } from 'react';
// import { Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import Sidebar from '../../Student/components/Sidebar';

// interface LayoutProps {
//   title: string;
//   children: React.ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ children, title }) => {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   return (
//     <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8FAFC' }}>
      
//       {/* APP BAR */}
//       <AppBar
//         position="fixed"
//         sx={{
//           width: { sm: `calc(100% - 260px)` },
//           ml: { sm: '260px' },
//           bgcolor: 'white',
//           color: '#1A202C',
//           boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//           borderBottom: '1px solid #E2E8F0',
//         }}
//       >
//         <Toolbar>
//           <IconButton
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>

//           <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
//             {title}
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       {/* SIDEBAR (CONTROLLED HERE) */}
//       <Sidebar open={mobileOpen} onClose={handleDrawerToggle} />

//       {/* MAIN CONTENT */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: { sm: `calc(100% - 260px)` },
//           mt: '64px',
//           bgcolor: '#F8FAFC',
//         }}
//       >
//         {children}
//       </Box>
//     </Box>
//   );
// };

// export default Layout;


// import React, { useState } from 'react';
// import { Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';

// interface LayoutProps {
//   children: React.ReactNode;
//   title?: string;
//   sidebar: React.ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ children, title = 'Dashboard', sidebar }) => {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

//   // ✅ Cast to ReactElement<any> to allow adding props
//   const sidebarWithProps = React.isValidElement(sidebar)
//     ? React.cloneElement(sidebar as React.ReactElement<any>, {
//         open: mobileOpen,
//         onClose: handleDrawerToggle,
//       })
//     : sidebar;

//   return (
//     <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8FAFC' }}>
//       <AppBar
//         position="fixed"
//         sx={{
//           width: { sm: `calc(100% - 260px)` },
//           ml: { sm: '260px' },
//           bgcolor: 'white',
//           color: '#1A202C',
//           boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
//           borderBottom: '1px solid #E2E8F0',
//         }}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
//             {title}
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       {sidebarWithProps}

//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: { sm: `calc(100% - 260px)` },
//           mt: '64px',
//           bgcolor: '#F8FAFC',
//         }}
//       >
//         {children}
//       </Box>
//     </Box>
//   );
// };

// export default Layout;


// import React from 'react';
// import { Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';

// interface LayoutProps {
//   children: React.ReactNode;
//   title?: string;
//   sidebar: React.ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ children, title = 'Dashboard', sidebar }) => {
//   // No useState – just render the sidebar as-is (open by default)
//   return (
//     <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8FAFC' }}>
//       <AppBar
//         position="fixed"
//         sx={{
//           width: { sm: `calc(100% - 260px)` },
//           ml: { sm: '260px' },
//           bgcolor: 'white',
//           color: '#1A202C',
//           boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
//           borderBottom: '1px solid #E2E8F0',
//         }}
//       >
//         <Toolbar>
//           <IconButton
//             edge="start"
//             sx={{ mr: 2, display: { sm: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
//             {title}
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       {/* Render sidebar directly, passing open=true and a dummy onClose */}
//       {React.isValidElement(sidebar)
//         ? React.cloneElement(sidebar as React.ReactElement<any>, {
//             open: true,
//             onClose: () => {},
//           })
//         : sidebar}

//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: { sm: `calc(100% - 260px)` },
//           mt: '64px',
//           bgcolor: '#F8FAFC',
//         }}
//       >
//         {children}
//       </Box>
//     </Box>
//   );
// };

// export default Layout;



// import React, { useState } from 'react';
// import { Box, AppBar, Toolbar, IconButton, Typography, useTheme, useMediaQuery } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

// interface LayoutProps {
//   children: React.ReactNode;
//   title?: string;
//   sidebar: React.ReactNode;
//   sidebarWidth?: number;
// }

// const Layout: React.FC<LayoutProps> = ({
//   children,
//   title = 'Dashboard',
//   sidebar,
//   sidebarWidth = 260,
// }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [desktopOpen, setDesktopOpen] = useState(true);

//   const handleDrawerToggle = () => {
//     if (isMobile) {
//       setMobileOpen(!mobileOpen);
//     } else {
//       setDesktopOpen(!desktopOpen);
//     }
//   };

//   const handleDrawerClose = () => {
//     if (isMobile) setMobileOpen(false);
//   };

//   // Clone sidebar and inject required props
//   const sidebarWithProps = React.isValidElement(sidebar)
//     ? React.cloneElement(sidebar as React.ReactElement<any>, {
//         open: isMobile ? mobileOpen : desktopOpen,
//         onClose: handleDrawerClose,
//         variant: isMobile ? 'temporary' : 'permanent',
//         width: sidebarWidth,
//         collapsed: !desktopOpen,
//         onToggleCollapse: () => setDesktopOpen(!desktopOpen),
//       })
//     : sidebar;

//   return (
//     <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8FAFC' }}>
//       {/* App Bar */}
//       <AppBar
//         position="fixed"
//         sx={{
//           width: {
//             sm: desktopOpen ? `calc(100% - ${sidebarWidth}px)` : `calc(100% - 72px)`,
//           },
//           ml: {
//             sm: desktopOpen ? `${sidebarWidth}px` : '72px',
//           },
//           bgcolor: 'white',
//           color: '#1A202C',
//           boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
//           borderBottom: '1px solid #E2E8F0',
//           transition: theme.transitions.create(['width', 'margin'], {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.leavingScreen,
//           }),
//         }}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
//             {title}
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       {/* Sidebar */}
//       {sidebarWithProps}

//       {/* Main content */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           mt: '64px',
//           transition: theme.transitions.create('margin', {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.leavingScreen,
//           }),
//           ml: {
//             sm: desktopOpen ? `${sidebarWidth}px` : '72px',
//           },
//           width: {
//             sm: desktopOpen ? `calc(100% - ${sidebarWidth}px)` : `calc(100% - 72px)`,
//           },
//         }}
//       >
//         {children}
//       </Box>
//     </Box>
//   );
// };

// export default Layout;



// import React from 'react';
// import { Box, AppBar, Toolbar, IconButton, Typography, useTheme, useMediaQuery } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';

// interface LayoutProps {
//   children: React.ReactNode;
//   title?: string;
//   sidebar: React.ReactNode;
//   sidebarWidth?: number;
// }

// const Layout: React.FC<LayoutProps> = ({
//   children,
//   title = 'Dashboard',
//   sidebar,
//   sidebarWidth = 260,
// }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const [mobileOpen, setMobileOpen] = React.useState(false);
//   const [desktopOpen, setDesktopOpen] = React.useState(true);

//   const handleDrawerToggle = () => {
//     if (isMobile) setMobileOpen(!mobileOpen);
//     else setDesktopOpen(!desktopOpen);
//   };
//   const handleDrawerClose = () => { if (isMobile) setMobileOpen(false); };

//   const sidebarWithProps = React.isValidElement(sidebar)
//     ? React.cloneElement(sidebar as React.ReactElement<any>, {
//         open: isMobile ? mobileOpen : desktopOpen,
//         onClose: handleDrawerClose,
//         variant: isMobile ? 'temporary' : 'permanent',
//         width: sidebarWidth,
//         collapsed: !desktopOpen,
//         onToggleCollapse: () => setDesktopOpen(!desktopOpen),
//       })
//     : sidebar;

//   return (
//     <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8FAFC' }}>
//       <AppBar
//         position="fixed"
//         sx={{
//           width: {
//             sm: desktopOpen ? `calc(100% - ${sidebarWidth}px)` : `calc(100% - 72px)`,
//           },
//           ml: {
//             sm: desktopOpen ? `${sidebarWidth}px` : '72px',
//           },
//           bgcolor: 'white',
//           color: '#1A202C',
//           boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
//           borderBottom: '1px solid #E2E8F0',
//           transition: theme.transitions.create(['width', 'margin'], {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.leavingScreen,
//           }),
//         }}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
//             {title}
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       {sidebarWithProps}

//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           mt: '64px',
//           transition: theme.transitions.create('margin', {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.leavingScreen,
//           }),
//           ml: {
//             sm: desktopOpen ? `${sidebarWidth}px` : '72px',
//           },
//           width: {
//             sm: desktopOpen ? `calc(100% - ${sidebarWidth}px)` : `calc(100% - 72px)`,
//           },
//         }}
//       >
//         {children}
//       </Box>
//     </Box>
//   );
// };


// export default Layout;
import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  sidebar: React.ReactNode;
  sidebarWidth?: number;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'Dashboard',
  sidebar,
  sidebarWidth = 260,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [desktopOpen, setDesktopOpen] = React.useState(true);

  const toggleDrawer = () => {
    if (isMobile) setMobileOpen((v) => !v);
    else setDesktopOpen((v) => !v);
  };

  const closeMobile = () => setMobileOpen(false);

  const sidebarWithProps = React.isValidElement(sidebar)
    ? React.cloneElement(sidebar as React.ReactElement<any>, {
        open: isMobile ? mobileOpen : desktopOpen,
        onClose: closeMobile,
        variant: isMobile ? 'temporary' : 'permanent',
        width: sidebarWidth,
        collapsed: !desktopOpen,
        onToggleCollapse: () => setDesktopOpen((v) => !v),
      })
    : sidebar;

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#F8FAFC' }}>
      {/* SIDEBAR */}
      {sidebarWithProps}

      {/* RIGHT SIDE */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* APP BAR */}
        <AppBar
          position="fixed"
          sx={{
            bgcolor: 'white',
            color: '#1A202C',
            boxShadow: '0 1px 3px rgb(0 0 0 / 0.1)',
            borderBottom: '1px solid #E2E8F0',
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <IconButton onClick={toggleDrawer} edge="start" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>

            <Typography sx={{fontWeight:600}}>{title}</Typography>
          </Toolbar>
        </AppBar>

        {/* pushes content below appbar */}
        <Toolbar />

        {/* MAIN CONTENT */}
        <Box
          component="main"
          sx={{
            flex: 1,
            overflowY: 'auto',
            p: 3,
            bgcolor: '#F8FAFC',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;