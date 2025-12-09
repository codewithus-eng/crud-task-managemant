import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>

        {user ? (
          <>
            <Typography variant="body2" sx={{ mr: 2 }}>{user.name || user.email}</Typography>
            <Button color="inherit" onClick={() => { logout(); nav('/'); }}>Logout</Button>
          </>
        ) : null}
      </Toolbar>
    </AppBar>
  );
}
