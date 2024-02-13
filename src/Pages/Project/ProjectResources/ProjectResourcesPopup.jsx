import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import ProjectResourcesForm from './ProjectResourcesForm'

export default function ProjectResourcesPopup(props) {
  const { openPopUp, setOpenPopup } = props
  return (
    <Dialog open={openPopUp} onClose={() => setOpenPopup(false)}>
      <DialogTitle>Add New Item</DialogTitle>
      <DialogContent>
        <ProjectResourcesForm />
      </DialogContent>
    </Dialog>
  )
}
