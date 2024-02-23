import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import TaskStatusForm from './TaskStatusForm'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

export default function TaskStatusPopup(props) {
  const { openPopUp, setOpenPopup, taskId, type } = props
  const handleClose = () => {
    setOpenPopup(false)
  }

  return (
    <Dialog open={openPopUp} onClose={() => setOpenPopup(false)}>
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
      <DialogTitle>
        {type === 'add' ? <>Add New Status</> : <>View and Edit Status</>}
      </DialogTitle>
      <DialogContent>
        <TaskStatusForm taskId={taskId} type={type} />
      </DialogContent>
    </Dialog>
  )
}
