import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {
  const { open, handleClose, data } = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Довавить задание?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Title: {data.title}
            <br />
            Начало: {data.startDate}
            <br />
            Окончание: {data.endDate}
            <br />
            Описание: {data.description}
            <br />
            Выбрано - {data.rowSelectionModel?.length} точек
            <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleClose} autoFocus>
            ОК
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
