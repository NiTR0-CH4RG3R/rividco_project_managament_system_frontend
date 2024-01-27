import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { left } from '@popperjs/core';


function TaskForm() {
    const taskNum = [
        {
          value: 'Task 01',
          label: 'Task 01',
        },
        {
          value: 'Task 02',
          label: 'Task 02',
        },
        {
          value: 'Task 03',
          label: 'Task 03',
        }
      ];

      const statusNum = [
        {
          value: 'Status 01',
          label: 'Status 01',
        },
        {
          value: 'Status 02',
          label: 'Status 02',
        },
        {
          value: 'Status 03',
          label: 'Status 03',
        },
      ];
  return (
    <>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '45ch' },
      }}
      noValidate
      autoComplete="off"
    >   
        {/* ---------------- Task field ------------------ */}
        <div>
        <TextField
            required
            id="outlined-select-task"
            select
            label="Task"
            defaultValue="Task 01"
            helperText="Please select your Task"
        >
          {taskNum.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
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
          {statusNum.map((option) => (
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
          rows={4}
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