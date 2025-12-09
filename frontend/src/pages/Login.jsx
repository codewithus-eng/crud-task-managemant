import { Card, TextField, Button, Typography, Stack } from '@mui/material';
import client from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleLogin = async () => {
    try {
      const res = await client.post('/auth/login', form);
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      // set user in localStorage so context picks it up on reload
      localStorage.setItem('user', JSON.stringify(user));
      // update auth context
      await login(user.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      alert(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Stack alignItems="center" justifyContent="center" sx={{ height: '100vh' }}>
      <Card sx={{ p: 4, width: 360 }}>
        <Typography variant="h5" mb={3}>Login</Typography>

        <Stack spacing={2}>
          <TextField label="Email" fullWidth onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <TextField label="Password" type="password" fullWidth onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <Button variant="contained" fullWidth onClick={handleLogin}>Login</Button>

          <Typography align="center">
            New user? <Link to="/register">Register</Link>
          </Typography>
        </Stack>
      </Card>
    </Stack>
  );
}
