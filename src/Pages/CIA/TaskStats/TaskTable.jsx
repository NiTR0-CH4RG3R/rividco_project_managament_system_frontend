import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'task',
    headerName: 'Task',
    width: 150,
    editable: true,
  },
  {
    field: 'taskStatus',
    headerName: 'Task Status',
    width: 150,
    editable: true,
  },
  {
    field: 'addDate',
    headerName: 'Add Date',
    width: 110,
    editable: true,
  },
  {
    field: 'addBy',
    headerName: 'Add By',
    width: 110,
    editable: true,
  },
  {
    field: 'comment',
    headerName: 'Comment',
    width: 150,
    editable: true,
  }
];

const rows = [
  { id : 1,task: 'create task',taskStatus: 'done' , addDate: 10/24 , addBy: 'puna' , comment:'done ok' },
  { id : 2,task: 'create task',taskStatus: 'done' , addDate: 10/24 , addBy: 'puna' , comment:'done ok' },
  { id : 3,task: 'create task',taskStatus: 'done' , addDate: 10/24 , addBy: 'puna' , comment:'done ok' },
  { id : 4,task: 'create task',taskStatus: 'done' , addDate: 10/24 , addBy: 'puna' , comment:'done ok' },
  { id : 5,task: 'create task',taskStatus: 'done' , addDate: 10/24 , addBy: 'puna' , comment:'done ok' },
  { id : 6,task: 'create task',taskStatus: 'done' , addDate: 10/24 , addBy: 'puna' , comment:'done ok' },

];

export default function TaskSt() {
  return (
    <Box sx={{ height: 650, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}