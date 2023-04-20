import Card from '@mui/material/Card';
import { CardHeader } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';

export const Task = ({ task }) => {
  const countComplited = task.Outlets.filter(item => item.complited);
  return (
    <Card sx={{ width: 440 }}>
      <CardHeader
        title={task['TaskName'].slice(0, 30)}
        subheader={`Deadline: ${task.End}`}
      />
      <CardContent>
        <Typography sx={{ mb: 1.5 }}>{task.Description}</Typography>
        <Typography sx={{ mb: 1.5 }}>
          Количество точек: {task.Outlets.length}
        </Typography>
        <Typography>Выполнено точек: {countComplited.length}</Typography>
      </CardContent>
      <CardActions>
        <Button
          component={NavLink}
          to={`/task/${task._id}`}
          size="large"
          variant="contained"
        >
          More
        </Button>
      </CardActions>
    </Card>
  );
};
