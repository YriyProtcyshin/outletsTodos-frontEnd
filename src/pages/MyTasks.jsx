import { Container } from 'components/Container/Container';
import { PageName } from 'components/PageName/PageName';
import { Task } from 'components/Task/Task';
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const MyTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios('http://localhost:5000/tasks/').then(result =>
      setTasks(result.data.result)
    );
  }, []);
  return (
    <Container>
      <PageName>My tasks</PageName>
      <Stack direction="row" flexWrap="wrap" useFlexGap spacing={4}>
        {tasks.map(task => (
          <Task key={task._id} task={task} />
        ))}
      </Stack>
    </Container>
  );
};
