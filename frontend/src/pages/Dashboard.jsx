import { Container, Grid, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import client from '../api/axios';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await client.get('/tasks');
      setTasks(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async (task) => {
    try {
      await client.post('/tasks', task);
      setOpen(false);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (task) => {
    try {
      await client.put(`/tasks/${task._id}`, task);
      setEditTask(null);
      setOpen(false);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await client.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        {tasks.map((task) => (
          <Grid item xs={12} md={6} lg={4} key={task._id}>
            <TaskCard task={task} onDelete={handleDelete} onEdit={(t) => { setEditTask(t); setOpen(true); }} />
          </Grid>
        ))}
      </Grid>

      <Fab color="primary" sx={{ position: 'fixed', bottom: 40, right: 40 }} onClick={() => { setEditTask(null); setOpen(true); }}>
        <AddIcon />
      </Fab>

      <TaskForm open={open} onClose={() => setOpen(false)} onSubmit={editTask ? handleUpdate : handleAdd} existing={editTask} />
    </Container>
  );
}
