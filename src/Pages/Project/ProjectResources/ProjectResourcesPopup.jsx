import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import ProjectResourcesForm from './ProjectResourcesForm'

export default function ProjectResourcesPopup(props) {
  const { openPopUp, setOpenPopup,type } = props
  return (
    <Dialog open={openPopUp} onClose={() => setOpenPopup(false)}>
      <DialogTitle>Add New Resource</DialogTitle>
      <DialogContent>
        <ProjectResourcesForm type={type} />
      </DialogContent>
    </Dialog>
  )
}

// import { Dialog, DialogContent, DialogTitle } from '@mui/material'
// import React from 'react'
// import ProjectResourcesForm from './ProjectResourcesForm'
// import CloseIcon from '@mui/icons-material/Close';
// import IconButton from '@mui/material/IconButton';

// export default function ProjectResourcesPopup(props) {
//   const { setOpen, openPopUp, setOpenPopup } = props
  
//   const handleClose = () => {
//     setOpen(false);
//   };

//   // export default function CustomizedDialogs() {
//   //   const [open, setOpen] = React.useState(false);
  
//   //   const handleClickOpen = () => {
//   //     setOpen(true);
//   //   };
//   //   const handleClose = () => {
//   //     setOpen(false);
//   //   };
  
//   return (
//     <Dialog open={openPopUp} onClose={() => setOpenPopup(false)}>
//       <DialogTitle>Add New Resource</DialogTitle>
//       <IconButton
//           aria-label="close"
//           onClick={handleClose}
//           sx={{
//             position: 'absolute',
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>

//       <DialogContent>
//         <ProjectResourcesForm />
//       </DialogContent>
//     </Dialog>
//   )
// }






