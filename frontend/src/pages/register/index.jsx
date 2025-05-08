import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const Register = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Бат-Эрдэнэ', code: 'B231890063', email: 'bat_erdene@mail.com' },
    { id: 2, name: 'Тэмүүлэн', code: 'B231890063', email: 'temuulen123@gmail.com' },
    { id: 3, name: 'Алтан', code: 'B231890063', email: 'altan.gold@yahoo.com' },
    { id: 4, name: 'Болор', code: 'B231890063', email: 'bolor.crystal@outlook.com' },
    { id: 5, name: 'Эрхэмбаяр', code: 'B231890063', email: 'erkhembayar.mn@gmail.com' },
    { id: 6, name: 'Мөнхбат', code: 'B231890063', email: 'munkhbat.eternal@protonmail.com' },
    { id: 7, name: 'Тогтох', code: 'B231890063', email: 'togtokh.stable@mail.com' },
    { id: 8, name: 'Нарантуяа', code: 'B231890063', email: 'narantuya.sunshine@gmail.com' },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [form, setForm] = useState({ name: '', code: '', email: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = 'Нэр шаардлагатай';
    if (!form.code) errs.code = 'Код оруулна уу';
    if (!form.email || !form.email.includes('@')) errs.email = 'Зөв имэйл хаяг оруулна уу';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const openAddModal = () => {
    setForm({ name: '', code: '', email: '' });
    setEditMode(false);
    setSelectedIndex(null);
    setModalOpen(true);
  };

  const openEditModal = (student, index) => {
    setForm(student);
    setEditMode(true);
    setSelectedIndex(index);
    setModalOpen(true);
  };

  const handleDelete = (index) => {
    const updated = [...students];
    updated.splice(index, 1);
    setStudents(updated);
  };

  const handleSubmit = () => {
    if (!validate()) return;

    if (editMode && selectedIndex !== null) {
      const updated = [...students];
      updated[selectedIndex] = form;
      setStudents(updated);
    } else {
      setStudents([...students, { ...form, id: Date.now() }]);
    }

    setModalOpen(false);
    setForm({ name: '', code: '', email: '' });
    setErrors({});
    setSelectedIndex(null);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Exam
      </Typography>

      <Paper elevation={0} sx={{ borderRadius: 4, p: 2, boxShadow: '0 8px 20px rgba(0,0,0,0.05)' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Нэр</TableCell>
                <TableCell>code</TableCell>
                <TableCell>e-mail</TableCell>
                <TableCell align="center">Үйлдэл</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student, index) => (
                <TableRow key={student.id}>
                  <TableCell>#{index + 1}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.code}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => openEditModal(student, index)}>
                      <EditIcon sx={{ color: '#3F51F1' }} />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(index)}>
                      <DeleteIcon sx={{ color: '#3F51F1' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Button
        startIcon={<AddIcon />}
        onClick={openAddModal}
        sx={{ mt: 3, borderRadius: 2 }}
        variant="outlined"
      >
        ➕ Оюутан нэмэх
      </Button>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editMode ? 'Оюутан засах' : 'Шинэ оюутан нэмэх'}</DialogTitle>
        <DialogContent sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Нэр"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
          />
          <TextField
            label="Код"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            error={!!errors.code}
            helperText={errors.code}
            fullWidth
          />
          <TextField
            label="Имэйл"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Болих</Button>
          <Button onClick={handleSubmit} variant="contained">
            Хадгалах
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Register;
