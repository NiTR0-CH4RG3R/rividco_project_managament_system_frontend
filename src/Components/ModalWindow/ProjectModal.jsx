import { Modal,Button } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';

export default function ProjectModal(props) {
  const { openProject, setOpenProject, sendData } = props

  const projectcols = [
    {
      field: 'userId',
      headerName: 'User ID',
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'id',
      headerName: 'ID',
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'title',
      headerName: 'Title',
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'completed',
      headerName: 'Completed',
      align: 'center',
      headerAlign: 'center',
    },
  ]

  const handleClose = () => {
    setOpenProject(false);
  };

  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Fetch data from REST endpoint using axios
    axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
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
        }}
      >
        <Typography variant="h6">Project Modal</Typography>
        <div style={{ height: 400, width: '100%' }}>
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
              sendData('selectedProject', row)
              setOpenProject(false)
            }}
          />
        </div>
      </Box>
    </Modal>
  );
}
