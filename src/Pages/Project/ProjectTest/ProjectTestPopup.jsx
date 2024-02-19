import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import ProjectTestForm from "./ProjectTestForm";

export default function ProjectTestPopup(props) {
  const { openPopUp, setOpenPopup, testId, type } = props;
  return (
    <Dialog open={openPopUp} onClose={() => setOpenPopup(false)}>
      <DialogTitle>
        {testId === null ? <>Add New Test</> : <>Show Test</>}
      </DialogTitle>
      <DialogContent>
        <ProjectTestForm testId={testId} type={type} />
      </DialogContent>
    </Dialog>
  );
}
