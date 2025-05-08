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
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ConfirmationDialog from '../../components/ConfirmationDialog';



const Exams = () => {
  const [exams, setExams] = useState([
    { id: 1, title: 'Biology', value: 100, questions: 26, timeLimit: '6:05:32', isActive: true, category: 'science' },
    { id: 2, title: 'Math', value: 100, questions: 26, timeLimit: '10:30:54', isActive: true, category: 'math' },
    { id: 3, title: 'Chemistry', value: 100, questions: 26, timeLimit: '1:30:22', isActive: true, category: 'science' },
    { id: 4, title: 'English', value: 100, questions: 26, timeLimit: '00:30:56', isActive: true, category: 'language' },
  ]);

  const [form, setForm] = useState({
    title: '',
    value: '',
    questions: '',
    timeLimit: '',
    isActive: true,
    category: '',
  });

  const [questions, setQuestions] = useState([
    { text: '', correct: '', answers: ['', '', '', ''] },
  ]);

  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [onConfirmCallback, setOnConfirmCallback] = useState(() => () => {});

  const isTimeLow = (timeStr) => {
    const [h, m] = timeStr.split(':').map(Number);
    return h === 0 && m < 45;
  };

  const openConfirm = (message, onConfirm) => {
    setConfirmMessage(message);
    setOnConfirmCallback(() => onConfirm);
    setConfirmOpen(true);
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title) newErrors.title = 'Шалгалтын нэр шаардлагатай';
    if (!form.value || form.value <= 0) newErrors.value = 'Зөв оноо оруулна уу';
    if (!form.questions || form.questions <= 0) newErrors.questions = 'Асуултын тоо шаардлагатай';
    if (!form.category) newErrors.category = 'Ангилал сонгоно уу';
    if (!form.timeLimit) newErrors.timeLimit = 'Цаг оруулна уу';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const hasInvalidQuestion = questions.some(
      (q) =>
        !q.text ||
        !q.correct ||
        q.answers.filter(Boolean).length < 2 ||
        !q.answers.includes(q.correct)
    );

    if (hasInvalidQuestion) {
      alert('❗ Бүх асуултанд шаардлагатай мэдээлэл бөглөнө үү!');
      return;
    }

    const examData = {
      ...form,
      questionsDetail: [...questions],
    };

    if (editMode && editIndex !== null) {
      const updated = [...exams];
      updated[editIndex] = { ...examData, id: updated[editIndex].id };
      setExams(updated);
    } else {
      setExams([...exams, { ...examData, id: Date.now() }]);
    }

    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setForm({
      title: '',
      value: '',
      questions: '',
      timeLimit: '',
      isActive: true,
      category: '',
    });
    setErrors({});
    setQuestions([{ text: '', correct: '', answers: ['', '', '', ''] }]);
    setEditMode(false);
    setEditIndex(null);
  };

  const handleQuestionChange = (index, key, value) => {
    const updated = [...questions];
    updated[index][key] = value;
    setQuestions(updated);
  };

  const handleAnswerChange = (qIndex, aIndex, value) => {
    const updated = [...questions];
    updated[qIndex].answers[aIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { text: '', correct: '', answers: ['', '', '', ''] }]);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleEdit = (exam, index) => {
    setForm(exam);
    setQuestions(exam.questionsDetail || [{ text: '', correct: '', answers: ['', '', '', ''] }]);
    setEditMode(true);
    setEditIndex(index);
    setOpen(true);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700}>
          Шалгалт
        </Typography>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 2 }}
          onClick={() => {
            resetForm();
            setOpen(true);
          }}
        >
          Шалгалт нэмэх
        </Button>
      </Box>

      <Paper elevation={0} sx={{ borderRadius: 4, p: 2, boxShadow: '0 8px 20px rgba(0,0,0,0.05)' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Шалгалт</TableCell>
                <TableCell>Оноо</TableCell>
                <TableCell>Асуулт</TableCell>
                <TableCell>Үлдсэн хугацаа</TableCell>
                <TableCell align="center">Үйлдэл</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exams.map((exam, index) => (
                <TableRow key={exam.id}>
                  <TableCell>#{index + 1}</TableCell>
                  <TableCell>{exam.title}</TableCell>
                  <TableCell>{exam.value}</TableCell>
                  <TableCell>{exam.questions}</TableCell>
                  <TableCell sx={{ color: isTimeLow(exam.timeLimit) ? 'red' : 'text.primary' }}>
                    {exam.timeLimit}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleEdit(exam, index)}>
                      <EditIcon sx={{ color: '#3F51F1' }} />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        openConfirm('Та энэ шалгалтыг устгахдаа итгэлтэй байна уу?', () => {
                          const updated = [...exams];
                          updated.splice(index, 1);
                          setExams(updated);
                        })
                      }
                    >
                      <DeleteIcon sx={{ color: '#3F51F1' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add/Edit Modal */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editMode ? 'Шалгалт засах' : 'Шинэ шалгалт нэмэх'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Шалгалтын нэр" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} error={!!errors.title} helperText={errors.title} fullWidth />
          <TextField label="Оноо (value)" type="number" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} error={!!errors.value} helperText={errors.value} fullWidth />
          <TextField label="Асуултын тоо" type="number" value={form.questions} onChange={(e) => setForm({ ...form, questions: e.target.value })} error={!!errors.questions} helperText={errors.questions} fullWidth />
          <TextField label="Үлдсэн хугацаа (HH:MM:SS)" value={form.timeLimit} onChange={(e) => setForm({ ...form, timeLimit: e.target.value })} error={!!errors.timeLimit} helperText={errors.timeLimit} fullWidth />
          <TextField select label="Ангилал" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} error={!!errors.category} helperText={errors.category} fullWidth>
            <MenuItem value="science">Science</MenuItem>
            <MenuItem value="math">Math</MenuItem>
            <MenuItem value="language">Language</MenuItem>
          </TextField>
          <FormControlLabel control={<Checkbox checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />} label="Идэвхтэй эсэх" />

          {/* Questions */}
          <Box mt={2}>
            <Typography variant="subtitle1" fontWeight={600}>Асуултууд</Typography>
            {questions.map((q, qIndex) => (
              <Paper key={qIndex} sx={{ p: 2, mt: 2, backgroundColor: '#f9f9f9' }}>
                <TextField fullWidth label={`Асуулт ${qIndex + 1}`} value={q.text} onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)} sx={{ mb: 2 }} />
                <Typography variant="body2" fontWeight={500}>Сонголтууд:</Typography>
                {q.answers.map((ans, aIndex) => (
                  <TextField key={aIndex} fullWidth label={`Хариулт ${aIndex + 1}`} value={ans} onChange={(e) => handleAnswerChange(qIndex, aIndex, e.target.value)} sx={{ mt: 1 }} />
                ))}
                <TextField select fullWidth label="Зөв хариулт" value={q.correct} onChange={(e) => handleQuestionChange(qIndex, 'correct', e.target.value)} sx={{ mt: 2 }}>
                  {q.answers.filter((ans) => ans.trim() !== '').map((ans, idx) => (
                    <MenuItem key={idx} value={ans}>{ans}</MenuItem>
                  ))}
                </TextField>
                <Button color="error" sx={{ mt: 2 }} onClick={() => removeQuestion(qIndex)} disabled={questions.length === 1}>Устгах</Button>
              </Paper>
            ))}
            <Button onClick={addQuestion} variant="outlined" sx={{ mt: 2 }}>➕ Асуулт нэмэх</Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Болих</Button>
          <Button onClick={handleSubmit} variant="contained">Хадгалах</Button>
        </DialogActions>
      </Dialog>

      {/* Reusable Confirm Dialog */}
      <ConfirmationDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          onConfirmCallback();
          setConfirmOpen(false);
        }}
        title={confirmMessage}
      />
    </Box>
  );
};

export default Exams;
