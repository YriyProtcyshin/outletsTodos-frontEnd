import Table from '../components/table/Table';
import TextField from '@mui/material/TextField';
import { Container } from 'components/Container/Container';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import AlertDialog from '../components/ModalDialog/Modal';
import { Typography } from '@mui/material';
import axios from 'axios';

export const OutletPage = () => {
  const [title, setTitle] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [outlet, setOutlet] = useState([]);

  const [open, setOpen] = useState(false);

  const { REACT_APP_API_URL } = process.env;
  const instance = axios.create({
    baseURL: REACT_APP_API_URL,
  });

  // закрытие модалки
  const handleClose = () => {
    setOpen(false);
  };

  // Нажатие на кнопку Add Task
  const handleButtonClick = () => {
    setOpen(true);
  };

  useEffect(() => {
    instance('outlets/').then(result => setOutlet(result.data.result));
  }, [instance]);

  return (
    <div>
      <Container>
        <Typography variant="h5" component="h3" sx={{ py: '20px' }}>
          Add Task
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mb: '20px' }}>
          <TextField
            required
            autoFocus
            id="title"
            label="Название задания"
            variant="outlined"
            sx={{ width: '505px' }}
            onChange={e => setTitle(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              defaultValue={dayjs()}
              format="DD/MM/YYYY"
              label="Старт задания"
              onChange={e => setStartDate(e.format('DD/MM/YYYY'))}
            />
            <DatePicker
              defaultValue={dayjs()}
              format="DD/MM/YYYY"
              label="Окончание задания"
              onChange={e => setEndDate(e.format('DD/MM/YYYY'))}
            />
          </LocalizationProvider>
        </Stack>
        <Stack direction="row" spacing={10} sx={{ mb: '20px' }}>
          <TextField
            id="description"
            label="Описание задания"
            variant="outlined"
            multiline
            sx={{ width: '1030px' }}
            onChange={e => setDescription(e.target.value)}
          />
          <Button
            disabled={!title ? true : false}
            variant="contained"
            sx={{ width: '160px' }}
            onClick={handleButtonClick}
          >
            Add task
          </Button>
        </Stack>
        <Table
          rowSelectionModel={rowSelectionModel}
          setRowSelectionModel={setRowSelectionModel}
          rows={outlet}
        />
        <AlertDialog
          open={open}
          handleClose={handleClose}
          data={{ title, startDate, endDate, description, rowSelectionModel }}
        />
      </Container>
    </div>
  );
};
