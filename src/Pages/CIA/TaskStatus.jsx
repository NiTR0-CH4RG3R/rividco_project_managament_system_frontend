import { Box , Grid,Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import React from 'react'
import TaskTable from './TaskStatus/TaskTable'
import TaskForm from './TaskStatus/TaskForm'

function TaskStatus() {
  return (
    <div>
        <Box>
            <Grid container spacing={2} sx={{ width: "100%" }}>

                {/* ---------------- Task Table ------------------ */}
                <Grid item xs={8} sx={{ padding: "1em 1em 0em 1em !important" }}>
                    <TaskTable/>
                </Grid>

                {/* ---------------- Task form ------------------ */}
                <Grid sx={{ padding: "1em 1em 0em 1em !important" }}>
                    <TaskForm/>
                </Grid>
            </Grid>
        </Box>
    </div>
  )
}

export default TaskStatus
