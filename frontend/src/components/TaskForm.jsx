import {
  Dialog, DialogTitle, TextField, Button, MenuItem, Stack
} from '@mui/material';
import { useState, useEffect } from 'react';

export default function TaskForm({ open, onClose, onSubmit, existing }) {
  const [task, setTask] = useState({ title: '', description: '', priority: 'Low', status: 'Pending' });

  useEffect(() => {
    if (existing) setTask(existing);
    else setTask({ title: '', description: '', priority: 'Low', status: 'Pending' });
  }, [existing]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{existing ? 'Update Task' : 'Add Task'}</DialogTitle>

      <Stack spacing={2} sx={{ p: 3 }}>
        <TextField name="title" label="Title" fullWidth value={task.title} onChange={handleChange} />
        <TextField name="description" label="Description" fullWidth multiline rows={3} value={task.description} onChange={handleChange} />
        <TextField name="priority" select label="Priority" fullWidth value={task.priority} onChange={handleChange}>
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </TextField>
        <TextField name="status" select label="Status" fullWidth value={task.status} onChange={handleChange}>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </TextField>

        <Button variant="contained" onClick={() => onSubmit(task)}>{existing ? 'Update' : 'Add'}</Button>
      </Stack>
    </Dialog>
  );
}
