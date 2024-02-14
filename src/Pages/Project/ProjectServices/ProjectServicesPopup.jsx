import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import ProjectServicesForm from './ProjectServicesForm'

export default function ProjectServicesPopup(props) {
  const { openPopUp, setOpenPopup } = props
  return (
    <Dialog open={openPopUp} onClose={() => setOpenPopup(false)}>
      <DialogTitle>Add New Item</DialogTitle>
      <DialogContent>
        <ProjectServicesForm />
      </DialogContent>
    </Dialog>
  )
}
