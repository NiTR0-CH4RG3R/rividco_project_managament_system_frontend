import { Modal, Button } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import * as systemUserService from "../../services/systemUserService";
import { IconButton } from "@mui/material";
import { sx } from "@mui/system";

export default function EmployeeModal(props) {
  const { openEmployee, setOpenEmployee, sendData } = props;

  const employeecols = [
    { field: "firstName", headerName: "First Name", align: "left" },
    { field: "lastName", headerName: "Last Name", align: "left" },
    { field: "profession", headerName: "Profession", align: "left" },
    { field: "address", headerName: "Address", align: "left" },
    { field: "phone01", headerName: "Contact Number" },
  ];

  const handleClose = () => {
    setOpenEmployee(false);
  };

  const [rows, setRows] = useState([]);
  const [loadidng, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    systemUserService
      .listAllSystemUsers()
      .then((employee) => {
        setRows(employee);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      
        <Modal open={openEmployee} onClose={handleClose}>
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
              borderRadius: 3,
            }}
          >
            <Typography variant="h6">Employee Modal</Typography>
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
                columns={employeecols}
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                //slots={{ toolbar: GridToolbar }}
                slotProps={{
                  toolbar: {
                    showQuickFilter: true,
                  },
                }}
                onRowClick={({ row }) => {
                  sendData("selectedEmployee", row);
                  setOpenEmployee(false);
                }}
                pagination
                // sx={{
                //   '& .MuiDataGrid-root .MuiDataGrid-header': {
                //     backgroundColor: 'lightblue', // Replace with your desired color
                //   },
                // }}
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
      
    </>
  );
}
