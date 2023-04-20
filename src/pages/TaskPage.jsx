import { Container } from 'components/Container/Container';
import { PageName } from 'components/PageName/PageName';
import { useParams } from 'react-router-dom';
import TaskTable from '../components/table/TaskTable';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Divider } from '@mui/material';

const { REACT_APP_API_URL } = process.env;
const instance = axios.create({
  baseURL: REACT_APP_API_URL,
});

export const TaskPage = ({ id }) => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [outletsList, setOutletsList] = useState(null);

  // 1. Получить из базы записть о задание
  useEffect(() => {
    const fetchData = async () => {
      await instance(`tasks/${taskId}`).then(result =>
        setTask(result.data.result)
      );
    };
    fetchData();
  }, [taskId]);

  // Запрос на сервер на изменения статуса выполнения задания
  useEffect(() => {
    if (rowSelectionModel.length === 0) return;

    instance.patch(`tasks/${taskId}`, {
      complitedOutlets: rowSelectionModel.join(','),
    });
  }, [rowSelectionModel, taskId]);

  useEffect(() => {
    if (!task) return;
    console.log('get comlited tasks');
    // Нахожу коды в задании
    const petraIds = task.Outlets.map(item => item.petraId);
    // опредяляю пункты которые уже выделены
    const complitedTask = task.Outlets.reduce((arr, item) => {
      if (item.complited) {
        arr.push(item.petraId);
      }
      return arr;
    }, []);

    setRowSelectionModel(complitedTask);

    // запрос на получение Outlet данных по перечню кодов
    instance
      .post('outlets/many', {
        outlets: petraIds.join(','),
      })
      .then(res => setOutletsList(res.data.result));
  }, [task]);

  return (
    outletsList && (
      <Container>
        <PageName> {task.TaskName}</PageName>
        <Divider />
        <p>Выполнить до: {task.End}</p>
        <p>{task.Description}</p>
        <p>Выполнено {rowSelectionModel.length}</p>
        <TaskTable
          rowSelectionModel={rowSelectionModel}
          setRowSelectionModel={setRowSelectionModel}
          rows={outletsList}
        />
      </Container>
    )
  );
};
