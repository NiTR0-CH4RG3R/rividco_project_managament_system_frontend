import React, { useState } from 'react';
import { DataGrid} from '@mui/x-data-grid';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/Search';
import { Box, Stack } from "@mui/material";
import { AddBoxOutlined } from "@mui/icons-material";

const columns = [
  { field: 'id', headerName: 'Registration No', width: 150 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'profession', headerName: 'Profession', width: 100 },
  { field: 'address', headerName: 'Address', width: 450 },
  { field: 'email', headerName: 'E-mail Adress', width: 250 },
  { field: 'contact1', headerName: 'Contact No1', type: Number, width: 150 },
];

const rows = [
  { id:"SC1201", name:"Nethmi Nuwanthara", profession:"Clerk", address:"No 262/E,Ihala biyanwila,Mankada road,Kadawatha", email:"indika456@gmail.com", contact1:760809481},
  { id:"SC1202", name:"Udeshi Gamage", profession:"Clerk", address:"No 44/18A, 1st cross street,Pagoda road,Nugegoda", email:"sonali890@gmail.com", contact1:760900481 },
  { id:"SC1203", name:"Sachindu Umayangana", profession:"Teacher", address:"No 262/E,Pahala biyanwila,Mankada road,Kadawatha", email:"amali92@gmail.com", contact1:760809481 },
  { id:"SC1204", name:"Buddhima De Soyza", profession:"Teacher", address:"No 300/a,Weliwatta,Palpathwala,Matale", email:"kamal273@gmail.com", contact1:760809481 },
  { id:"SC1205", name:"Saymi De Alwis", profession:"Lecturer", address:"No 44/18A, 1st cross street,Pagoda road,Nugegoda", email:"indika456@gmail.com", contact1:760809481},
  { id:"SC1206", name:"Tharushi Kavindya", profession:"Lecturer", address:"No 44/18A, 1st cross street,Pagoda road,Nugegoda", email:"kamal273@gmail.com", contact1:760900481},
  { id:"SC1207", name:"Udesh Kumara", profession:"Clerk", address:"No 300/a,Weliwatta,Palpathwala,Matale", email:"sonali890@gmail.com", contact1:714686363},
  { id:"SC1208", name:"Yashod Gunathilaka", profession:"Lawyer", address:"No 44/18A, 1st cross street,Pagoda road,Nugegoda", email:"indika456@gmail.com", contact1:766785481},
  { id:"SC1209", name:"Yashini Perera", profession:"Nurse", address:"No 44/18A, 1st cross street,Pagoda road,Nugegoda", email:"indika456@gmail.com", contact1:760809481},
  { id:"SC1210", name:"Nirmal Gunathilaka", profession:"Doctor", address:"No 300/a,Weliwatta,Palpathwala,Matale", email:"sonali890@gmail.com", contact1:760809481},
  { id:"SC1211", name:"Aparna Wijerathne", profession:"Lawyer", address:"No 262/E,Ihala biyanwila,Mankada road,Kadawatha", email:"indika456@gmail.com", contact1:760900481},
  { id:"SC1212", name:"Malithi Perera", profession:"Engineer", address:"No 44/18A, 1st cross street,Pagoda road,Nugegoda", email:"indika456@gmail.com", contact1:763463784},
  { id:"SC1213", name:"Kasuni Gunasena", profession:"Nurse", address:"No 44/18A, 1st cross street,Pagoda road,Nugegoda", email:"amali92@gmail.com", contact1:763463784},
  { id:"SC1214", name:"Wiharika Niwarthana", profession:"Nurse", address:"No 262/E,Ihala biyanwila,Mankada road,Kadawatha", email:"kamal273@gmail.com", contact1:718182863},
  { id:"SC1201", name:"Nethmi Nuwanthara", profession:"Clerk", address:"No 262/E,Ihala biyanwila,Mankada road,Kadawatha", email:"indika456@gmail.com", contact1:760809481},
  { id:"SC1202", name:"Udeshi Gamage", profession:"Clerk", address:"No 44/18A, 1st cross street,Pagoda road,Nugegoda", email:"sonali890@gmail.com", contact1:760900481 },
  { id:"gSC1203", name:"Sachindu Umayangana", profession:"Teacher", address:"No 262/E,Pahala biyanwila,Mankada road,Kadawatha", email:"amali92@gmail.com", contact1:760809481},
  { id:"SC1204", name:"Buddhima De Soyza", profession:"Teacher", address:"No 300/a,Weliwatta,Palpathwala,Matale", email:"kamal273@gmail.com", contact1:760809481},
  { id:"SC1205", name:"Saymi De Alwis", profession:"Lecturer", address:"No 44/18A, 1st cross street,Pagoda road,Nugegoda", email:"indika456@gmail.com", contact1:760809481},
  { id:"SC1206", name:"Tharushi Kavindya", profession:"Lecturer", address:"No 44/18A, 1st cross street,Pagoda road,Nugegoda", email:"kamal273@gmail.com", contact1:760900481},
  { id:"SC1207", name:"Udesh Kumara", profession:"Clerk", address:"No 300/a,Weliwatta,Palpathwala,Matale", email:"sonali890@gmail.com", contact1:714686363},
  { id:"SC1208", name:"Yashod Gunathilaka", profession:"Lawyer", address:"No 44/18A, 1st cross street,Pagoda road,Nugegoda", email:"indika456@gmail.com", contact1:766785481},
  { id:"SC1209", name:"Yashini Perera", profession:"Nurse", address:"No 44/18A, 1st cross street,Pagoda road,Nugegoda", email:"indika456@gmail.com", contact1:760809481},
  { id:"SC1210", name:"Nirmal Gunathilaka", profession:"Doctor", address:"No 300/a,Weliwatta,Palpathwala,Matale", email:"sonali890@gmail.com", contact1:760809481},
  { id:"SC1211", name:"Aparna Wijerathne", profession:"Lawyer", address:"No 262/E,Ihala biyanwila,Mankada road,Kadawatha", email:"indika456@gmail.com", contact1:760900481},
  { id:"SC1212", name:"Malithi Perera", profession:"Engineer", address:"No 44/18A, 1st cross street,Pagoda road,Nugegoda", email:"indika456@gmail.com", contact1:763463784},
  { id:"SC1213", name:"Kasuni Gunasena", profession:"Nurse", address:"No 44/18A, 1st cross street,Pagoda road,Nugegoda", email:"amali92@gmail.com", contact1:763463784},
  { id:"SC1214", name:"Wiharika Niwarthana", profession:"Nurse", address:"No 262/E,Ihala biyanwila,Mankada road,Kadawatha", email:"kamal273@gmail.com", contact1:718182863},
  

];

const CustomerList = () => {
  const[pageSize,setPageSize]=useState(5);
  const[page,setPage]=useState(1);

  return (

    <div style={{ height: 400, width: '100%' }}>
      <h1><center>Customers Datatable</center></h1>
   
    
      <TextField
        variant="standard"
        reg="search-input"
        label="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
               <SearchRoundedIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}  
      />
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          page={page}
          pagination
          autoHeight
          onPageChange={(params) => setPage(params.page)}
          onPageSizeChange={(params) => setPageSize(params.pageSize)}
        />

      <Box
        sx={{ mt: 10, ml: 2, display: "flex", justifyContent: "flex-start" }}
      >
        <Stack direction="row" spacing={1}>
          <IconButton arisl-aria-label="add-button">
            <AddBoxOutlined color="primary" style={{ fontSize: 50 }} />
          </IconButton>
        </Stack>
      </Box>
      
  </div>
  );
};

export default CustomerList;