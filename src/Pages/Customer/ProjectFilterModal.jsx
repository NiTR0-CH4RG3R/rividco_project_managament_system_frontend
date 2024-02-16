import { Modal, Button } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import * as projectService from "../../services/projectService";
import CloseIcon from "@mui/icons-material/Close";
import { useParams } from "react-router-dom";

export default function ProjectFilterModal(props) {
  const { openProjectFilter, setOpenProjectFilter, id } = props;

  const projectcols = [
    { field: "projectId", headerName: "Project Id", align: "left" },
    { field: "customer", headerName: "Customer", align: "left" },
    { field: "location", headerName: "Location", align: "left" },
    { field: "coordinator", headerName: "Coordinator", align: "left" },
    { field: "status", headerName: "Status" },
  ];

  const handleClose = () => {
    setOpenProjectFilter(false);
  };

  const [rows, setRows] = useState([]);
  const [loadidng, setLoading] = useState(false);

  useEffect(() => {}, []);

  return (
    <>
      {loadidng ? (
        <div>Loading...</div>
      ) : (
        <Modal open={openProjectFilter} onClose={handleClose}>
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
            <Typography variant="h6">Project Modal</Typography>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={projectcols}
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                  toolbar: {
                    showQuickFilter: true,
                  },
                }}
                pagination
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
                variant="contained"
                sx={{ width: "8.5rem", margin: "1em 0.5em !important" }}
                color="primary"
                startIcon={<CloseIcon />}
                onClick={handleClose}
              >
                Close
              </Button>
            </div>
          </Box>
        </Modal>
      )}
    </>
  );
}
