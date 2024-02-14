import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import TaskForm from './TaskForm'

export default function TaskStatusPopup(props) {
  const { openPopUp, setOpenPopup } = props
  return (
    <Dialog open={openPopUp} onClose={() => setOpenPopup(false)}>
      <DialogTitle>Add New Task Status</DialogTitle>
      <DialogContent>
        <TaskForm setOpenPopup={setOpenPopup} />
      </DialogContent>
    </Dialog>
  )
}
