import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Avatar,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const Topbar = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: '#fff',
        color: '#333',
        px: 3,
        py: 1,
        boxShadow: 'none',
        borderBottom: '1px solid #eee',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left side: Sort filter */}
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body1" fontWeight={500}>
            Sort:
          </Typography>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <Select
              variant="outlined"
              defaultValue="7days"
              sx={{ fontSize: 14 }}
            >
              <MenuItem value="7days">Сүүлийн 7 хоног</MenuItem>
              <MenuItem value="30days">Сүүлийн 30 хоног</MenuItem>
              <MenuItem value="all">Бүгд</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Right side: Notification + User */}
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton>
            <NotificationsNoneIcon sx={{ color: '#3f51f1' }} />
          </IconButton>
          <Avatar sx={{ bgcolor: '#3f51f1', width: 32, height: 32, fontSize: 14 }}>
            J
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
