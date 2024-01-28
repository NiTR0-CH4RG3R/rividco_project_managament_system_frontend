import { Box , Grid} from '@mui/material'
import React from 'react'
import TaskTable from './TaskStatus/TaskTable'
import TaskForm from './TaskStatus/TaskForm'

function TaskStatus() {
  return (
    <div>
        <Box>
            <Grid container spacing={2} sx={{ width: "100%" }}>

                {/* ---------------- Task Table ------------------ */}
                <Grid item xs={8} sx={{ padding: "7em 2em 0em 12em !important" }}>
                    <TaskTable/>
                </Grid>

                
                {/* ---------------- Task form ------------------ */}
                <Grid item xs={4} sx={{ padding: "12em 2em 0em 7em !important" }}>
                <h2>Update Task Status</h2>
                    <TaskForm/>
                </Grid>
            </Grid>
        </Box>
    </div>
  )
}

export default TaskStatus
