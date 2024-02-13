import { Modal, Button } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function CommisionReportModal(props) {
  const { openCommisionReport, setOpenCommisionReport, sendData } = props;

  const customercols = [
    {
      field: "fileName",
      headerName: "File Name",
      align: "center",
      headerAlign: "center",
    },
  ];

  const handleClose = () => {
    setOpenCommisionReport(false);
  };

  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Fetch data from REST endpoint using axios
  }, []);

  return (
    <Modal open={openCommisionReport} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: 800,
          minHeight: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6">Upload Commision Report</Typography>

        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={customercols}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "end",
            padding: "1em 2em 0em 2em !important",
          }}
        >
          <Button
            component="label"
            sx={{
              width: "8.5rem",
              margin: "1em 0.5em !important",
            }}
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput type="file" />
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "8.5rem",
              margin: "1em 0.5em !important",
            }}
            color="primary"
            startIcon={<CloseIcon />}
            onClick={handleClose}
          >
            Close
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
