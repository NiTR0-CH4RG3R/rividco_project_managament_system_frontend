import { Box, Grid } from '@mui/material'
import React, { useState } from 'react'
import TaskTable from './TaskStatus/TaskTable'
import TaskForm from './TaskStatus/TaskForm'
import { useTopbarContext } from '../../Contexts/TopbarContext'
import FormButton from '../../Components/StyledComponents/FormButton'
import TaskStatusPopup from './TaskStatus/TaskStatusPopup'

function TaskStatus() {
  const { setTitle, setSubtitle } = useTopbarContext()
  setTitle('List CIA Task Status')
  setSubtitle('You can view and manage all the List CIA Task Status here.')

  const [openPopUp, setOpenPopup] = useState(false)

  return (
    <div>
      <Box>
        <Grid container spacing={5}>
          {/* ---------------- Task Table ------------------ */}
          <Grid item xs={10}>
            <TaskTable />
          </Grid>
          {/* ---------------- Add Status Button ------------------ */}
          <Grid item xs={2}>
            <FormButton onClick={() => setOpenPopup(true)}>
              Add New Status
            </FormButton>
          </Grid>
        </Grid>
        <TaskStatusPopup openPopUp={openPopUp} setOpenPopup={setOpenPopup} />
      </Box>
    </div>
  )
}

export default TaskStatus
