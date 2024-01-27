import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
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
    width: 150,
    editable: true,
  },
  {
    field: 'addBy',
    headerName: 'Add By',
    width: 150,
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
  { id : 1,task: 'create task',taskStatus: 'done' ,addDate: '01/10/2024' ,addBy: 'puna' ,comment:'done ok' },
  { id : 2,task: 'create task',taskStatus: 'done' ,addDate: '01/10/2024' ,addBy: 'puna' ,comment:'done ok' },
  { id : 3,task: 'create task',taskStatus: 'done' ,addDate: '01/10/2024' ,addBy: 'puna' ,comment:'done ok' },
  { id : 4,task: 'create task',taskStatus: 'done' ,addDate: '01/10/2024' ,addBy: 'puna' ,comment:'done ok' },
  { id : 5,task: 'create task',taskStatus: 'done' ,addDate: '01/10/2024' ,addBy: 'puna' ,comment:'done ok' },
  { id : 6,task: 'create task',taskStatus: 'done' ,addDate: '01/10/2024' ,addBy: 'puna' ,comment:'done ok' },
  { id : 7,task: 'create task',taskStatus: 'done' ,addDate: '01/10/2024' ,addBy: 'puna' ,comment:'done ok' },
  { id : 8,task: 'create task',taskStatus: 'done' ,addDate: '01/10/2024' ,addBy: 'puna' ,comment:'done ok' },
  { id : 9,task: 'create task',taskStatus: 'done' ,addDate: '01/10/2024' ,addBy: 'puna' ,comment:'done ok' },
  { id : 10,task: 'create task',taskStatus: 'done' ,addDate: '01/10/2024' ,addBy: 'puna' ,comment:'done ok' },
  { id : 11,task: 'create task',taskStatus: 'done' ,addDate: '01/10/2024' ,addBy: 'puna' ,comment:'done ok' },
  { id : 12,task: 'create task',taskStatus: 'done' ,addDate: '01/10/2024' ,addBy: 'puna' ,comment:'done ok' },
  { id : 13,task: 'create task',taskStatus: 'done' ,addDate: '01/10/2024' ,addBy: 'puna' ,comment:'done ok' },
  { id : 14,task: 'create task',taskStatus: 'done' ,addDate: '01/10/2024' ,addBy: 'puna' ,comment:'done ok' },
  { id : 15,task: 'create task',taskStatus: 'done' ,addDate: '01/10/2024' ,addBy: 'puna' ,comment:'done ok' },
  { id : 16,task: 'create task',taskStatus: 'done' ,addDate: '01/10/2024' ,addBy: 'puna' ,comment:'done ok' },
  { id : 17,task: 'create task',taskStatus: 'done' ,addDate: '01/10/2024' ,addBy: 'puna' ,comment:'done ok' },
  { id : 18,task: 'create task',taskStatus: 'done' ,addDate: '01/10/2024' ,addBy: 'puna' ,comment:'done ok' },
  { id : 19,task: 'create task',taskStatus: 'done' ,addDate: '01/10/2024' ,addBy: 'puna' ,comment:'done ok' },
  { id : 20,task: 'create task',taskStatus: 'done' ,addDate: '01/10/2024' ,addBy: 'puna' ,comment:'done ok' },
  { id : 21,task: 'create task',taskStatus: 'done' ,addDate: '01/10/2024' ,addBy: 'puna' ,comment:'done ok' },
  { id : 22,task: 'create task',taskStatus: 'done' ,addDate: '01/10/2024' ,addBy: 'puna' ,comment:'done ok' },
  { id : 23,task: 'create task',taskStatus: 'done' ,addDate: '01/10/2024' ,addBy: 'puna' ,comment:'done ok' },
  { id : 24,task: 'create task',taskStatus: 'done' ,addDate: '01/10/2024' ,addBy: 'puna' ,comment:'done ok' },

];

export default function TaskSt() {
  return (
    <Box 
    noValidate
      autoComplete="off"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="95vh"
      flexDirection="column" 
      sx={{ height: 630, width: '90%' }}>

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