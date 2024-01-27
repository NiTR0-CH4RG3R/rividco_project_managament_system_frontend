import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { left } from '@popperjs/core';
import { statuses } from '../TaskData';


function TaskForm() {
  return (
    <>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '45ch' },
      }}
      noValidate
        autoComplete="off"
        display="flex"
        justifyContent="left"
        //alignItems="center"
        height="95vh"
        flexDirection="column"
    >   
        {/* ---------------- Task field ------------------ */}
        <div>
          <TextField
              disabled
              id="outlined-select-task"
              label="Task"
              defaultValue="Task 01"
              //helperText="Please select your Task"
          >
        </TextField>
        </div>

        {/* ---------------- Status field ------------------ */}
        <div>
        <TextField
            required
            id="outlined-select-status"
            select
            label="Status"
            defaultValue="Status 01"
            helperText="Please select your Status"
        >
          {statuses.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </div>

        {/* ---------------- comment field ------------------ */}
        <div>
        <TextField
          id="outlined-multiline-static"
          label="Comment"
          multiline
          rows={5}
        />
        </div>

        {/* ---------------- Button placement ------------------ */}
        <div>
            <Stack spacing={2} direction="row" justifyContent="flex-end">
                
                <Button variant="outlined" >  Clear  </Button>
                <Button variant="contained">  Add  </Button>
                
            </Stack>
        </div>
    </Box>
    </>
  )
}

export default TaskForm