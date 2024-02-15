import { Modal, Button } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

export default function VendorItemModal(props) {
  const { openVendorItem, setOpenVendorItem, sendData } = props;

  const vendoritemcols = [
    {
      field: "userId",
      headerName: "Item ID",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "id",
      headerName: "ID",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "title",
      headerName: "Item Name",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "completed",
      headerName: "Availability",
      align: "center",
      headerAlign: "center",
    },
  ];

  const handleClose = () => {
    setOpenVendorItem(false);
  };

  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Fetch data from REST endpoint using axios
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Modal open={openVendorItem} onClose={handleClose}>
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
        <Typography variant="h6">Vendor Item Modal</Typography>

        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={vendoritemcols}
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
              sendData("selectedVendorItem", row);
              setOpenVendorItem(false);
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
  );
}
