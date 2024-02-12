import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';

const columns = [
  {
    field: 'vendoritem',
    headerName: 'Vendor Item',
    width: 150,
    editable: true,
  },
  {
    field: 'serialnumber',
    headerName: 'Serial Number',
    width: 150,
    editable: true,
  },
  {
    field: 'warrantyPD',
    headerName: 'Warranty Period',
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
    field: 'comment',
    headerName: 'Comment',
    width: 200,
    editable: true,
  }
  
];


const rows = [
  { id:'12' ,vendoritem: 'item 2', serialnumber: '11111111', warrantyPD: '02 years' ,comment:'Comment 02', conductedDate:'01/02/2023'},
  { id:'13' ,vendoritem: 'item 3', serialnumber: '22222222', warrantyPD: '02 years' ,comment:'Comment 03', conductedDate:'09/03/2023' },
  { id:'14' ,vendoritem: 'item 3', serialnumber: '13333333', warrantyPD: '02 years' ,comment:'Comment 04', conductedDate:'08/04/2023' },
  { id:'15' ,vendoritem: 'item 4', serialnumber: '11143255', warrantyPD: '02 years' ,comment:'Comment 05', conductedDate:'07/05/2023' },
  { id:'16' ,vendoritem: 'item 5', serialnumber: '11542666', warrantyPD: '02 years' ,comment:'Comment 06', conductedDate:'06/06/2023'},
  { id:'17' ,vendoritem: 'item 3', serialnumber: '11142567', warrantyPD: '02 years' ,comment:'Comment 07', conductedDate:'05/07/2023' },
  { id:'18' ,vendoritem: 'item 7', serialnumber: '11642321', warrantyPD: '02 years' ,comment:'Comment 08', conductedDate:'04/08/2023' },
  { id:'19' ,vendoritem: 'item 8', serialnumber: '54264211', warrantyPD: '02 years' ,comment:'Comment 09', conductedDate:'03/09/2023' },
  { id:'20' ,vendoritem: 'item 2', serialnumber: '16566211', warrantyPD: '02 years' ,comment:'Comment 10', conductedDate:'02/10/2023' },
  
];



// {/* ---------------- add Custom toolbar  ------------------ */}
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function ProjectItemsTable() {

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