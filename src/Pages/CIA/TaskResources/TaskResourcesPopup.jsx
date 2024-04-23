import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import TaskResourcesForm from './TaskResourcesForm'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

export default function TaskResourcesPopup(props) {
  const { openPopUp, setOpenPopup,type } = props
  const handleClose = () => {
    setOpenPopup(false);
  };

  return (
    <Dialog open={openPopUp} onClose={() => setOpenPopup(false)} 
   
  
    >
      {/* <DialogTitle>Add New Resource</DialogTitle> */}
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
        <TaskResourcesForm type={type} />
      </DialogContent>
    </Dialog>
  )
}