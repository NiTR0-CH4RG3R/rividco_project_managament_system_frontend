import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';

const columns = [
  {
    field: 'description',
    headerName: 'Description',
    width: 150,
    editable: true,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    editable: true,
  },
  {
    field: 'conductedBy',
    headerName: 'Conducted By',
    width: 150,
    editable: true,
  },
  {
    field: 'conductedDate',
    headerName: 'Conducted Date',
    width: 150,
    editable: true,
  },
  {
    field: 'dueDate',
    headerName: 'Due Date',
    width: 200,
    editable: true,
  }
  
];


const rows = [
  { id:'12' ,description: 'service 2', status: 'pending', conductedBy: 'user 1' ,dueDate:'01/02/2023', conductedDate:'01/02/2023' },
  { id:'13' ,description: 'service 3', status: 'pending', conductedBy: 'user 1' ,dueDate:'01/02/2023', conductedDate:'09/03/2023' },
  { id:'14' ,description: 'service 3', status: 'pending', conductedBy: 'user 1' ,dueDate:'01/02/2023', conductedDate:'08/04/2023' },
  { id:'15' ,description: 'service 4', status: 'pending', conductedBy: 'user 1' ,dueDate:'01/02/2023', conductedDate:'07/05/2023' },
  { id:'16' ,description: 'service 5', status: 'pending', conductedBy: 'user 1' ,dueDate:'01/02/2023', conductedDate:'06/06/2023' },
  { id:'17' ,description: 'service 3', status: 'pending', conductedBy: 'user 1' ,dueDate:'01/02/2023', conductedDate:'05/07/2023' },
  { id:'18' ,description: 'service 7', status: 'pending', conductedBy: 'user 1' ,dueDate:'01/02/2023', conductedDate:'04/08/2023' },
  { id:'19' ,description: 'service 8', status: 'pending', conductedBy: 'user 1' ,dueDate:'01/02/2023', conductedDate:'03/09/2023' },
  { id:'20' ,description: 'service 2', status: 'pending', conductedBy: 'user 1' ,dueDate:'01/02/2023', conductedDate:'02/10/2023' },
  
];



// {/* ---------------- add Custom toolbar  ------------------ */}
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function ProjectServicesTable() {

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