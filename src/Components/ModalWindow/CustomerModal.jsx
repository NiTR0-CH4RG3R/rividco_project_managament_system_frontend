import { Modal, Button } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

export default function CustomerModal(props) {
<<<<<<< HEAD
  const { openCustomer, setOpenCustomer, sendData } = props

  const customercols = [
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
=======
  const { openCustomer, setOpenCustomer, formik } = props;
>>>>>>> Modified Close button color in Customer modal

  const handleClose = () => {
    setOpenCustomer(false);
  };

  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Fetch data from REST endpoint using axios
    axios
<<<<<<< HEAD
      .get('https://jsonplaceholder.typicode.com/todos')
=======
      .get("url to get customer data")
>>>>>>> Modified Close button color in Customer modal
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Modal open={openCustomer} onClose={handleClose}>
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
        <Typography variant="h6">Customer Modal</Typography>

        <div style={{ height: 400, width: '100%' }}>
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
            onRowClick={({ row }) => {
              sendData('selectedCustomer', row)
              setOpenCustomer(false)
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
            variant="contained"
            sx={{
              width: "8.5rem",
              margin: "1em 0.5em !important",
              backgroundColor: "#d32f2f",
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
