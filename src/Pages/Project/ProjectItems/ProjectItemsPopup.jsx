import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import ProjectItemsForm from './ProjectItemsForm'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

export default function ProjectItemsPopup(props) {
  const { openPopUp, setOpenPopup, type } = props
  const handleClose = () => {
    setOpenPopup(false);
  };

  return (
    <Dialog open={openPopUp} onClose={() => setOpenPopup(false)}>
    {/* <DialogTitle>Add New Item</DialogTitle> */}
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
        <ProjectItemsForm type={type} />
      </DialogContent>
    </Dialog>
  )
}

