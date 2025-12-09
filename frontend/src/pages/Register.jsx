import { Card, TextField, Button, Typography, Stack } from '@mui/material';
import client from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', name: '' });

  const handleRegister = async () => {
    try {
      await client.post('/auth/register', form);
      navigate('/');
    } catch (err) {
      alert(err?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Stack alignItems="center" justifyContent="center" sx={{ height: '100vh' }}>
      <Card sx={{ p: 4, width: 360 }}>
        <Typography variant="h5" mb={3}>Register</Typography>

        <Stack spacing={2}>
          <TextField label="Name" fullWidth onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <TextField label="Email" fullWidth onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <TextField label="Password" type="password" fullWidth onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <Button variant="contained" fullWidth onClick={handleRegister}>Register</Button>

          <Typography align="center">
            Already have an account? <Link to="/">Login</Link>
          </Typography>
        </Stack>
      </Card>
    </Stack>
  );
}
