import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import ProjectTestForm from './ProjectTestForm'

export default function ProjectTestPopup(props) {
  const { openPopUp, setOpenPopup } = props
  return (
    <Dialog open={openPopUp} onClose={() => setOpenPopup(false)}>
      <DialogTitle>Add New Test</DialogTitle>
      <DialogContent>
        <ProjectTestForm />
      </DialogContent>
    </Dialog>
  )
}
