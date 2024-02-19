import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import ProjectItemsForm from './ProjectItemsForm'

export default function ProjectItemsPopup(props) {
  const { openPopUp, setOpenPopup, type } = props
  return (
    <Dialog open={openPopUp} onClose={() => setOpenPopup(false)}>
      <DialogTitle>Add New Item</DialogTitle>
      <DialogContent>
        <ProjectItemsForm type={type} />
      </DialogContent>
    </Dialog>
  )
}
