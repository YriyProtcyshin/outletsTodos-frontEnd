import { Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { OutletPage } from 'pages/OutletPage';
import { AddTask } from 'pages/AddTask';
import { MyTasks } from 'pages/MyTasks';
import { TaskPage } from '../pages/TaskPage';
import { LoginPage } from 'pages/LoginPage';

import { PrivateRoute } from '../routes/PrivateRoute';
import { RestrictedRoute } from '../routes/RestrictedRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from 'redux/auth/operations';
import { Navigate } from 'react-router-dom';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  const isRefreshing = useSelector(state => state.auth.isRefreshing);
  const error = useSelector(state => state.auth.error);

  if (error) {
    return <b>{error}</b>;
  }

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Routes>
      <Route
        path="/login"
        element={<RestrictedRoute redirectTo="/" component={<LoginPage />} />}
      />
      <Route path="/" element={<Layout />}>
        <Route index element />
        <Route
          path="/outlets"
          element={
            <PrivateRoute redirectTo="/login" component={<OutletPage />} />
          }
        />
        <Route
          path="/add-task"
          element={<PrivateRoute redirectTo="/login" component={<AddTask />} />}
        />
        <Route
          path="/my-tasks"
          element={<PrivateRoute redirectTo="/login" component={<MyTasks />} />}
        />
        <Route
          path="/task/:taskId"
          element={
            <PrivateRoute redirectTo="/login" component={<TaskPage />} />
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  );
};

/* <Route path="/outlets" element={<OutletPage />} />
        <Route path="/add-task" element={<AddTask />} />  
  <Route path="/task/:taskId" element={<TaskPage />} />;
   
  */
