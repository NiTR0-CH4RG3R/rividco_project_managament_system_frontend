import {
  Box,
  IconButton,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
} from "@mui/material";
import { Add, Tab } from "@mui/icons-material";
import SearchBar from "../SearchBar/SearchBar";
import ListTable from "../../Components/StyledComponents/ListTable";

export default function ListPage({
  columns = [
    {
      id: "name",
      label: "Dessert (100g serving)",
      minWidth: 170,
      align: "left",
    },
    { id: "calories", label: "Calories", minWidth: 100 },
    { id: "fat", label: "Fat (g)", minWidth: 100 },
    { id: "carbs", label: "Carbs (g)", minWidth: 100 },
    { id: "protein", label: "Protein (g)", minWidth: 100 },
  ],
  rows = [
    {
      name: "Frozen yoghurt",
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
    },
    {
      name: "Ice cream sandwich",
      calories: 237,
      fat: 9.0,
      carbs: 37,
      protein: 4.3,
    },
    { name: "Eclair", calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
    { name: "Cupcake", calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
    { name: "Gingerbread", calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
  ],
  searchBarProps = {
    searchBy: "name",
    onSearchChange: (e) => {
      console.log(e.target.value);
    },
    onSearchClick: (e) => {},
  },
  onRowClick = (e, id) => {},
  onAddButtonClick = (e) => {},
  tablePaginationProps = {},
  disableSearchBar = false,
  customUpperBar = undefined,
}) {
  return (
    <Box width="90%" height="70%" display="flex" flexDirection="column">
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={4}
        
      >
        {!disableSearchBar && <SearchBar {...searchBarProps} />}
        {customUpperBar}
      </Box>
      <Paper elevation={4}   sx={{ maxHeight: "90%",borderRadius:3 }}>
        <TableContainer sx={{ maxHeight: "90%" }}>
          <ListTable stickyHeader aria-label="simple table" size="small" >
            <TableHead>
              <TableRow key={0}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align === undefined ? "right" : column.align}
                    style={{
                      ...(column.minWidth !== undefined && {
                        minWidth: column.minWidth,
                      }),
                    }}
                    sx={{ fontWeight: "bold" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                "& .MuiTableRow-hover:hover": {
                  backgroundColor: "#c4c1c0",
                },
              }}
            >
              {rows.map((row) => (
                <TableRow
                  key={row[0]}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                  }}
                  hover
                  onClick={(event) => {
                    return onRowClick(event, row.id);
                  }}
                  role="checkbox"
                >
                  {columns.map((column, index) => (
                    <TableCell
                      key={column.id}
                      component={index === 0 ? "th" : "td"}
                      scope={index === 0 ? "row" : ""}
                      align={
                        column.align === undefined ? "right" : column.align
                      }
                    >
                      {row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </ListTable>
        </TableContainer>
        <TablePagination {...tablePaginationProps} />
      </Paper>

      <Box width="100%" display="flex" justifyContent="flex-end" mt={5}>
        <IconButton
          type="button"
          sx={{
            position: "fixed",
            bottom: "5%",
            right: "2%",
            boxShadow: 3,
            backgroundColor: "background.paper",
            color: "text",
            p: 2,
          }}
          onClick={onAddButtonClick}
        >
          <Add />
        </IconButton>
      </Box>
    </Box>
  );
}
