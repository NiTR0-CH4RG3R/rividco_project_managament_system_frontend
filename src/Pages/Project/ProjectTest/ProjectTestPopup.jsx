import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import ProjectTestForm from "./ProjectTestForm";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ProjectTestPopup(props) {
  const { openPopUp, setOpenPopup, testId, type } = props;
  const handleClose = () => {
    setOpenPopup(false);
  };
  return (
    <Dialog open={openPopUp} onClose={() => setOpenPopup(false)}>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
      {/* <DialogTitle>
        {testId === null ? <>Add New Test</> : <>Show Test</>}
      </DialogTitle> */}
      <DialogContent>
        <ProjectTestForm testId={testId} type={type} />
      </DialogContent>
    </Dialog>
  );
}
