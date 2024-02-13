import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';

const columns = [
  {
    field: 'resourceName',
    headerName: 'Resource Name ',
    width: 150,
    editable: true,
  },
  {
    field: 'comment',
    headerName: 'Comment',
    width: 200,
    editable: true,
  },
  {
    field: 'addedBy',
    headerName: 'Added By ',
    width: 150,
    editable: true,
  },
  {
    field: 'addedDate',
    headerName: 'Added Date',
    width: 150,
    editable: true,
  },
  
  
];


const rows = [
  { id:'12' ,resourceName: 'resource 1', comment:'Comment 01',addedBy:'user 1', addedDate:'01/02/2023'},
  { id:'13' ,resourceName: 'resource 1', comment:'Comment 01',addedBy:'user 1', addedDate:'01/02/2023'},
  { id:'14' ,resourceName: 'resource 1', comment:'Comment 01',addedBy:'user 1', addedDate:'01/02/2023'},
  { id:'15' ,resourceName: 'resource 1', comment:'Comment 01',addedBy:'user 1', addedDate:'01/02/2023'},
  { id:'16' ,resourceName: 'resource 1', comment:'Comment 01',addedBy:'user 1', addedDate:'01/02/2023'},
  { id:'17' ,resourceName: 'resource 1', comment:'Comment 01',addedBy:'user 1', addedDate:'01/02/2023'},
  { id:'18' ,resourceName: 'resource 1', comment:'Comment 01',addedBy:'user 1', addedDate:'01/02/2023'},
  { id:'19' ,resourceName: 'resource 1', comment:'Comment 01',addedBy:'user 1', addedDate:'01/02/2023'},
  { id:'20' ,resourceName: 'resource 1', comment:'Comment 01',addedBy:'user 1', addedDate:'01/02/2023'},
  
];



// {/* ---------------- add Custom toolbar  ------------------ */}
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function ProjectResourcesTable() {

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