import { Modal, Button } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import * as vendorService from "../../services/vendorService";
import CloseIcon from "@mui/icons-material/Close";

export default function VendorModal(props) {
  const { openVendor, setOpenVendor, sendData } = props;

  const vendorcols = [
    { field: "name", headerName: "Name", align: "left" },
    { field: "address", headerName: "Address", align: "left" },
    { field: "email", headerName: "Email", align: "left" },

    { field: "phone01", headerName: "Contact Number" },
  ];

  const handleClose = () => {
    setOpenVendor(false);
  };

  const [rows, setRows] = useState([]);
  const [loadidng, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    vendorService
      .listAllVendors()
      .then((vendor) => {
        setRows(vendor);
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
      <Modal open={openVendor} onClose={handleClose}>
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
          <Typography variant="h6">Vendor Modal</Typography>

          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={vendorcols}
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
                sendData("selectedVendor", row);
                setOpenVendor(false);
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
