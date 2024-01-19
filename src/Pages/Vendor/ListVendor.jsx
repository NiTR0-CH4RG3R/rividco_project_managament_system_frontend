import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { InputAdornment } from "@mui/material";
//import { useNavigate } from "react-router-dom";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "address", label: "Address", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "contact_no", label: "Contact no", minWidth: 100 },
];
function createData(name, address, email, contact_no) {
  return { name, address, email, contact_no };
}

const rows = [
  createData(
    "Perera",
    "no 262/E,ihala biyanwila,mankada road,kadawatha.",
    "amali92@gmail.com",
    760305481
  ),
  createData(
    "Bandara",
    "no 44/18A, 1st cross street,Pagoda road,nugegoda.",
    "kamal273@gmail.com",
    763463784
  ),
  createData(
    "Hewawitharana",
    "no 262/E,pahala biyanwila,mankada road,kadawatha.",
    "sonali890@gmail.com",
    760405481
  ),
  createData(
    "Gunathilaka",
    "no 300/a,weliwatta,palpathwala,matale.",
    "indika456@gmail.com",
    760900481
  ),
  createData(
    "Alwis",
    "no 262/E,ihala biyanwila,mankada road,kadawatha.",
    "amali92@gmail.com",
    760305467
  ),
  createData(
    "Karunarathne",
    "no 44/18A, 1st cross street,Pagoda road,nugegoda.",
    "kamal273@gmail.com",
    766785481
  ),
  createData(
    "Onali",
    "no 262/E,pahala biyanwila,mankada road,kadawatha.",
    "sonali890@gmail.com",
    767895481
  ),
  createData(
    "Sadeesha",
    "no 300/a,weliwatta,palpathwala,matale.",
    "indika456@gmail.com",
    760809481
  ),
];

export default function ListVendor() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filter, setFilter] = React.useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleRowClick = (rowData) => {
    setSelectedRow(rowData);
    //navigate(/form/${rowData.name});
  };

  const handleCloseForm = () => {
    setSelectedRow(null);
  };
  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <div>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon />
            </InputAdornment>
          ),
        }}
        id="filled-basic"
        label="Filter by Name"
        variant="filled"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                      onClick={() => handleRowClick(row)}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        {selectedRow && (
          <Viewvendor rowData={selectedRow} onClose={handleCloseForm} />
        )}
      </Paper>
    </div>
  );
}
