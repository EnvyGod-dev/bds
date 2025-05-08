import React from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Home';
import IntegrationInstructionsIcon from '@mui/icons-material/Hub';
import PlaylistAddCheckIcon from '@mui/icons-material/CheckBox';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const mainMenu = [
    { text: 'Хяналт самбар', icon: <DashboardIcon />, path: '/' },
    { text: 'Шалгалт', icon: <IntegrationInstructionsIcon />, path: '/exams' },
    { text: 'Register', icon: <PlaylistAddCheckIcon />, path: '/register' },
  ];

  const bottomMenu = [
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
    { text: 'Гарах', icon: <ExitToAppIcon />, path: '/logout' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        '& .MuiDrawer-paper': {
          width: 240,
          background: '#3F51F1',
          color: 'white',
          borderTopRightRadius: 32,
          borderBottomRightRadius: 32,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      }}
    >
      {/* Top Section */}
      <Box>
        <Box sx={{ p: 3, mb: 1 }}>
          <Typography variant="h6" fontWeight="bold" display="flex" alignItems="center">
            <Box
              sx={{
                display: 'inline-block',
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: 'white',
                mr: 1,
              }}
            />
            E-student
          </Typography>
        </Box>

        <List>
          {mainMenu.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItemButton
                key={item.text}
                component={Link}
                to={item.path}
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: '12px',
                  mx: 2,
                  my: 0.5,
                  backgroundColor: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.25)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: '#fff',
                    minWidth: 36,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 400,
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      {/* Bottom Section */}
      <Box>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', mx: 2, my: 1 }} />
        <List>
          {bottomMenu.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItemButton
                key={item.text}
                component={Link}
                to={item.path}
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: '12px',
                  mx: 2,
                  my: 0.5,
                  backgroundColor: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.25)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: '#fff',
                    minWidth: 36,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 400,
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
