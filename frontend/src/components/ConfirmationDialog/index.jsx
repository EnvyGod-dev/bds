import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Avatar,
  Box
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  title = 'Та итгэлтэй байна уу?',
  description = '',
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent sx={{ textAlign: 'center', p: 4 }}>
        <Avatar
          sx={{
            bgcolor: '#2e4736',
            width: 56,
            height: 56,
            margin: '0 auto',
            mb: 2,
            boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
          }}
        >
          <HelpOutlineIcon fontSize="medium" />
        </Avatar>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" sx={{ mb: 2 }}>
            {description}
          </Typography>
        )}
        <Box display="flex" justifyContent="space-around" mt={3}>
          <Button onClick={onClose}>Үгүй</Button>
          <Button onClick={onConfirm} variant="contained">
            Тийм
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
