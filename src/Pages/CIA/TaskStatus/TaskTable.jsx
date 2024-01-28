import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';

const columns = [
  {
    field: 'taskStatus',
    headerName: 'Task Status',
    width: 250,
    editable: true,
  },
  {
    field: 'addedDate',
    headerName: 'Add Date',
    width: 150,
    editable: true,
  },
  {
    field: 'addedBy',
    headerName: 'Add By',
    width: 150,
    editable: true,
  },
  {
    field: 'comment',
    headerName: 'Comment',
    width: 300,
    editable: true,
  }
];


const rows = [
  { id:'11' ,taskStatus: 'Active', addedDate: '01/10/2024', addedBy: 'Admin 01' ,comment:'Comment 01' },
  { id:'12' ,taskStatus: 'OnHold', addedDate: '01/10/2024', addedBy: 'Admin 02' ,comment:'Comment 02' },
  { id:'13' ,taskStatus: 'Reject', addedDate: '01/10/2024', addedBy: 'Admin 01' ,comment:'Comment 03' },
  { id:'14' ,taskStatus: 'Active', addedDate: '01/10/2024', addedBy: 'Admin 01' ,comment:'Comment 04' },
  { id:'11' ,taskStatus: 'Wating', addedDate: '01/10/2024', addedBy: 'Admin 07' ,comment:'Comment 05' },
  { id:'11' ,taskStatus: 'Active', addedDate: '01/10/2024', addedBy: 'Admin 01' ,comment:'Comment 06' },
  { id:'12' ,taskStatus: 'OnHold', addedDate: '01/10/2024', addedBy: 'Admin 01' ,comment:'Comment 07' },
  { id:'13' ,taskStatus: 'Reject', addedDate: '01/10/2024', addedBy: 'Admin 09' ,comment:'Comment 08' },
  { id:'14' ,taskStatus: 'Active', addedDate: '01/10/2024', addedBy: 'Admin 01' ,comment:'Comment 09' },
  { id:'11' ,taskStatus: 'Wating', addedDate: '01/10/2024', addedBy: 'Admin 08' ,comment:'Comment 10' },
  
];

// const columns = [
//   {
//     field: 'userId',
//     headerName: 'User ID',
//     align: 'center',
//     headerAlign: 'center',
//   },
//   {
//     field: 'id',
//     headerName: 'ID',
//     align: 'center',
//     headerAlign: 'center',
//   },
//   {
//     field: 'title',
//     headerName: 'Title',
//     align: 'center',
//     headerAlign: 'center',
//   },
//   {
//     field: 'completed',
//     headerName: 'Completed',
//     align: 'center',
//     headerAlign: 'center',
//   },
// ]

// {/* ---------------- add Custom toolbar  ------------------ */}
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function TaskTable() {

  // const [rows, setRows] = useState([])

  // useEffect(() => {
  //   // Fetch data from REST endpoint using axios
  //   axios
  //     .get('https://jsonplaceholder.typicode.com/todos')
  //     .then((response) => {
  //       setRows(response.data)
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error)
  //     })
  // }, [])

  return (
    <Box 
    noValidate
      autoComplete="off"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
      flexDirection="column" 
      sx={{ height: 630, width: '100%' }}>

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
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          slots={{ toolbar: CustomToolbar }}
        />
    </Box>
  );
}