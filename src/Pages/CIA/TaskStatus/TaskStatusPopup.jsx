import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import TaskForm from './TaskForm'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

export default function TaskStatusPopup(props) {
  const { openPopUp, setOpenPopup } = props
  const handleClose = () => {
    setOpenPopup(false);
  };

  return (
    <Dialog open={openPopUp} onClose={() => setOpenPopup(false)}>
      <DialogTitle>Add New Task Status</DialogTitle>
      <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>

      <DialogContent>
        <TaskForm setOpenPopup={setOpenPopup} />
      </DialogContent>
    </Dialog>
  )
}
