import { Card, CardContent, Typography, Chip, Stack, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function TaskCard({ task, onDelete, onEdit }) {
  return (
    <Card elevation={3} sx={{ mb: 2 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6">{task.title}</Typography>
          <Stack direction="row">
            <IconButton onClick={() => onEdit(task)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(task._id)}>
              <DeleteIcon color="error" />
            </IconButton>
          </Stack>
        </Stack>

        <Typography variant="body2" sx={{ mt: 1 }}>
          {task.description}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Chip label={task.status} color={
            task.status === 'Done' ? 'success' :
            task.status === 'In Progress' ? 'warning' : 'default'
          } />
          <Chip label={'Priority: ' + task.priority} color={
            task.priority === 'High' ? 'error' :
            task.priority === 'Medium' ? 'warning' : 'info'
          } />
        </Stack>
      </CardContent>
    </Card>
  );
}
