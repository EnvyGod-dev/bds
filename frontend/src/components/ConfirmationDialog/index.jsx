import React from 'react';
import {
  Dialog,
  DialogContent,
  Avatar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  title = 'Та итгэлтэй байна уу?',
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          textAlign: 'center',
          p: 3,
        },
      }}
    >
      <DialogContent>
        <Avatar
          sx={{
            bgcolor: '#2e4736',
            width: 60,
            height: 60,
            mx: 'auto',
            boxShadow: '0 6px 15px rgba(0,0,0,0.2)',
            mb: 2,
          }}
        >
          <HelpOutlineIcon fontSize="medium" />
        </Avatar>

        <Typography variant="body1" fontWeight={500} sx={{ mb: 3 }}>
          {title}
        </Typography>

        <Box display="flex" justifyContent="space-between" px={4}>
          <Button onClick={onClose} variant="text">
            Үгүй
          </Button>
          <Button onClick={onConfirm} variant="text" sx={{ fontWeight: 600 }}>
            Тийм
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
