import { Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { OutletPage } from 'pages/OutletPage';
import { AddTask } from 'pages/AddTask';
import { MyTasks } from 'pages/MyTasks';
import { TaskPage } from '../pages/TaskPage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element />
        <Route path="/outlets" element={<OutletPage />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/my-tasks" element={<MyTasks />} />
        <Route path="/task/:taskId" element={<TaskPage />} />
      </Route>
    </Routes>
  );
};
