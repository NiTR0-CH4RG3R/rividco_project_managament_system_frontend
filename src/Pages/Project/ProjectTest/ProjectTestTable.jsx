import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';

const columns = [
  {
    field: 'testName',
    headerName: 'Test Name',
    width: 150,
    editable: true,
  },
  {
    field: 'result',
    headerName: 'Result',
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
    width: 250,
    editable: true,
  },
  {
    field: 'comment',
    headerName: 'Comment',
    width: 100,
    editable: true,
  }
];


const rows = [
  { id:'11' ,testName: 'Test 1', result: 'Pass', conductedBy: 'Admin 01' ,comment:'Comment 01' },
  { id:'12' ,testName: 'Test 2', result: 'Fail', conductedBy: 'Admin 02' ,comment:'Comment 02' },
  { id:'13' ,testName: 'Test 3', result: 'Pass', conductedBy: 'Admin 01' ,comment:'Comment 03' },
  { id:'14' ,testName: 'Test 4', result: 'Pass', conductedBy: 'Admin 01' ,comment:'Comment 04' },
  { id:'15' ,testName: 'Test 5', result: 'Fail', conductedBy: 'Admin 07' ,comment:'Comment 05' },
  { id:'16' ,testName: 'Test 6', result: 'Fail', conductedBy: 'Admin 01' ,comment:'Comment 06' },
  { id:'17' ,testName: 'Test 7', result: 'Pass', conductedBy: 'Admin 01' ,comment:'Comment 07' },
  { id:'18' ,testName: 'Test 8', result: 'Fail', conductedBy: 'Admin 09' ,comment:'Comment 08' },
  { id:'19' ,testName: 'Test 9', result: 'Fail', conductedBy: 'Admin 01' ,comment:'Comment 09' },
  { id:'22' ,testName: 'Test 10', result: 'Pass', conductedBy: 'Admin 08' ,comment:'Comment 10' },
  
];



// {/* ---------------- add Custom toolbar  ------------------ */}
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function ProjectTestTable() {

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