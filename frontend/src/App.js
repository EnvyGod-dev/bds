import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Exams from './pages/exams'
import Register from './pages/register'
import { Box, CssBaseline } from '@mui/material';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Topbar />
          <Box sx={{ p: 3 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/exams" element={<Exams/>}/>
              <Route path="/register" element={<Register/>}/>
            </Routes>
          </Box>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
