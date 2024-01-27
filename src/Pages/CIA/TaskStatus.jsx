import { Box , Grid,Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import React from 'react'
import TaskTable from './TaskStats/TaskTable'


//   const rows = [
//     createData('abc', 'abc', 6.0, 24, 4.0),
//     createData('efg', 'abc', 9.0, 37, 4.3),
//     createData('hij', 'abc', 16.0, 24, 6.0),
//     createData('klm', 'abc', 3.7, 67, 4.3),
//     createData('nop', 'abc', 16.0, 49, 3.9),
//     createData('abc', 'abc', 6.0, 24, 4.0),
//     createData('efg', 'abc', 9.0, 37, 4.3),
//     createData('hij', 'abc', 16.0, 24, 6.0),
//     createData('klm', 'abc', 3.7, 67, 4.3),
//     createData('abc', 'abc', 6.0, 24, 4.0),
//     createData('efg', 'abc', 9.0, 37, 4.3),
//     createData('nop', 'abc', 16.0, 49, 3.9)
//   ];

//   function createData(Task, Status, AddedDate, AddedBy, Comment) {
//     return { Task, Status, AddedDate, AddedBy, Comment };
//   }

function TaskStatus() {
  return (
    <div>
        <Box>
            <Grid container spacing={2} sx={{ width: "100%" }}>
                <Grid item xs={8} sx={{ padding: "1em 1em 0em 1em !important" }}>
                    {/* <Paper>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column)=>(
                                            <TableCell key={column.id}>{column.name}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
        
                                    {rows.map((row) => (
                                     <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell component="th" scope="row">{row.Task}</TableCell>
                                    <TableCell align="left">{row.Status}</TableCell>
                                    <TableCell align="left">{row.AddedDate}</TableCell>
                                    <TableCell align="left">{row.AddedBy}</TableCell>
                                    <TableCell align="left">{row.Comment}</TableCell>
                                    </TableRow>
                                    ))}
    
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper> */}
                    <TaskTable/>
                </Grid>
                <Grid>

                </Grid>
            </Grid>
        </Box>
    </div>
  )
}

export default TaskStatus
