import { Modal, Button } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import * as projectService from "../../services/projectService";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

export default function ProjectModal(props) {
  const { openProject, setOpenProject, sendData } = props;

  const projectcols = [
    { field: "projectId", headerName: "Project Id", align: "left" },
    { field: "customer", headerName: "Customer", align: "left" },
    { field: "location", headerName: "Location", align: "left" },
    { field: "coordinator", headerName: "Coordinator", align: "left" },
    { field: "status", headerName: "Status" },
  ];

  const handleClose = () => {
    setOpenProject(false);
  };

  const [rows, setRows] = useState([]);
  const [loadidng, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    projectService
      .listAllProjects()
      .then((project) => {
        setRows(project);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loadidng ? (
        <div>Loading...</div>
      ) : (
        <Modal open={openProject} onClose={handleClose}>
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
              borderRadius: 3

            }}
          >
            <Typography variant="h6">Project Modal</Typography>

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
                onRowClick={({ row }) => {
                  sendData("selectedProject", row);
                  setOpenProject(false);
                }}
                pagination
              />
            </div>
            {/* <div
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
            </div> */}
          </Box>
        </Modal>
      )}
    </>
  );
}
