import { useEffect, useState } from "react";
import { Modal, Button, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import * as customerService from "../../services/customerService";
import { IconButton } from '@mui/material';

export default function CustomerModal({
  openCustomer,
  setOpenCustomer,
  sendData,
}) {
  const customercols = [
    { field: "firstName", headerName: "First Name", align: "left" },
    { field: "lastName", headerName: "Last Name", align: "left" },
    { field: "category", headerName: "Category", align: "left" },
    { field: "address", headerName: "Address", align: "left" },
    { field: "phone01", headerName: "Contact Number" },
  ];

  const [rows, setRows] = useState([]);
  const [loadidng, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    customerService
      .listAllCustomers()
      .then((customers) => {
        setRows(customers);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleClose = () => {
    setOpenCustomer(false);
  };

  return (
    <>
      
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
              borderRadius: 3
            }}
          >
            <Typography variant="h6">Customer Modal</Typography>

            <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position:'absolute',
              right:8,
              top:8
            }}
            >
              <CloseIcon/>

            </IconButton>

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
                onRowClick={({ row }) => {
                  sendData("selectedCustomer", row);
                  setOpenCustomer(false);
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
              {/* <Button
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
              </Button> */}
            </div>
          </Box>
        </Modal>
      
    </>
  );
}
