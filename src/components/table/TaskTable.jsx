import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container } from '../Container/Container';

const columns = [
  { field: 'Customer_Code', headerName: 'Customer Code', width: 100 },
  { field: 'Account_Name', headerName: 'Account Name', width: 170 },
  { field: 'Address_Line_1', headerName: 'Address', width: 360 },
  { field: 'Commercial_(Legal)_Name', headerName: 'Legal Name', width: 130 },

  {
    field: 'Parent_Account_Name',
    headerName: 'Parent Account Name',
    width: 160,
  },
  { field: 'Key_Account_Type', headerName: 'Key Account Type', width: 160 },

  { field: 'Status', headerName: 'Status' },
];

export default function DataTable({
  rowSelectionModel,
  setRowSelectionModel,
  rows,
}) {
  return (
    <Container>
      <div style={{ height: 'calc(100vh - 250px)', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          getRowId={row => row['Customer_Code']}
          onRowSelectionModelChange={newRowSelectionModel => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          showColumnVerticalBorder
          showCellVerticalBorder
        />
      </div>
    </Container>
  );
}
