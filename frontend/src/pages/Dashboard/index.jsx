import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  IconButton,
  Container,
} from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';

const StatCard = ({ title, value, gradient, bars }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 8,
        borderRadius: '24px',
        minHeight: 240,
        backgroundColor: '#fff',
        boxShadow: '0 12px 30px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography
          variant="caption"
          color="text.secondary"
          fontWeight={500}
          sx={{ fontSize: 14 }}
        >
          {title}
        </Typography>
        <IconButton size="small" sx={{ opacity: 0.3, p: 0.5 }}>
          <ShowChartIcon fontSize="small" />
        </IconButton>
      </Box>

      <Typography
        variant="h4"
        fontWeight={700}
        color="text.primary"
        sx={{ fontSize: 28, mb: 2 }}
      >
        {value}
      </Typography>

      {/* Chart Bars */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          height: 80,
          gap: 2,
          mt: 'auto',
        }}
      >
        {bars.map((height, idx) => (
          <Box
            key={idx}
            sx={{
              width: 8,
              height: `${height}%`,
              borderRadius: 12,
              background: gradient,
            }}
          />
        ))}
      </Box>
    </Paper>
  );
};

const Dashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Typography
        variant="h4"
        fontWeight={700}
        mb={5}
        textAlign="center"
      >
        Хяналт самбар
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="шалгалт"
            value="203"
            gradient="linear-gradient(180deg, #4f83f1, #b6c9f9)"
            bars={[30, 40, 50, 60, 70, 80, 90]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="оюутан"
            value="351"
            gradient="linear-gradient(180deg, #f56991, #fcd3df)"
            bars={[35, 45, 55, 65, 75, 65, 50]}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
