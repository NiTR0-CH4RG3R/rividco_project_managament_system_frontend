import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { MenuItem } from '@mui/material'

const categories = [
  {
    value: 'complaint',
    label: 'Complaint',
  },
  {
    value: 'inquiry',
    label: 'Inquiry',
  },
  {
    value: 'activity',
    label: 'Activity',
  },
]

const statuses = [
  {
    value: 'active',
    label: 'Active',
  },
  {
    value: 'on_hold',
    label: 'On Hold',
  },
  {
    value: 'waiting',
    label: 'Waiting',
  },
  {
    value: 'rejected',
    label: 'Rejected',
  },
  {
    value: 'completed',
    label: 'Completed',
  },
]

const urgencies = [
  {
    value: 'critical',
    label: 'Critical',
  },
  {
    value: 'high_priority',
    label: 'High Priority',
  },
  {
    value: 'neutral',
    label: 'Neutral',
  },
  {
    value: 'low_priority',
    label: 'Low Priority',
  },
  {
    value: 'unknown',
    label: 'Unknown',
  },
]

export default function Task() {
  //form textfields
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [callbacknumber, setCallbackNumber] = useState('')
  const [chatlink, setChatLink] = useState('')
  const [status, setStatus] = useState('')
  const [urgency, setUrgency] = useState('')
  const [comment, setComment] = useState('')

  //common
  const [selectedRow, setSelectedRow] = useState(null)

  //project regarding
  const [isModalOpenProject, setModalOpenProject] = useState(false)
  const [searchLocation, setSearchLocation] = useState('')
  const [searchTimePeriod, setSearchTimePeriod] = useState('')

  //requested by
  const [isModalOpenCustomer, setModalOpenCustomer] = useState(false)
  const [searchFirstNameCustomer, setSearchFirstNameCustomer] = useState('')
  const [searchLastNameCustomer, setSearchLastNameCustomer] = useState('')
  const [searchAddress, setSearchAddress] = useState('')
  const [searchContactNoCustomer, setSearchContactNoCustomer] = useState('')
  const [searchCategory, setSearchCategory] = useState('')

  //assigned to
  const [isModalOpenEmp, setModalOpenEmp] = useState(false)
  const [searchFirstNameEmp, setSearchFirstNameEmp] = useState('')
  const [searchLastNameEmp, setSearchLastNameEmp] = useState('')
  const [searchRole, setSearchRole] = useState('')
  const [searchContactNoEmp, setSearchContactNoEmp] = useState('')

  const OpenModalWindowProject = () => {
    setModalOpenProject(true)
  }

  const CloseModalWindowProject = () => {
    if (searchLocation || searchTimePeriod) {
      // Clear search fields if they are filled
      setSearchLocation('')
      setSearchTimePeriod('')
    } else {
      // Close the modal if search fields are empty
      setModalOpenProject(false)
    }
  }

  const OpenModalWindowCustomer = () => {
    setModalOpenCustomer(true)
  }

  const CloseModalWindowCustomer = () => {
    if (
      searchFirstNameCustomer ||
      searchLastNameCustomer ||
      searchAddress ||
      searchContactNoCustomer ||
      searchCategory
    ) {
      setSearchFirstNameCustomer('')
      setSearchLastNameCustomer('')
      setSearchAddress('')
      setSearchContactNoCustomer('')
      setSearchCategory('')
    } else {
      // Close the modal if search fields are empty
      setModalOpenCustomer(false)
    }
  }

  const OpenModalWindowEmp = () => {
    setModalOpenEmp(true)
  }

  const CloseModalWindowEmp = () => {
    if (
      searchFirstNameEmp ||
      searchLastNameEmp ||
      searchRole ||
      searchContactNoEmp
    ) {
      // First click: Clear search fields
      setSearchFirstNameEmp('')
      setSearchLastNameEmp('')
      setSearchRole('')
      setSearchContactNoEmp('')
    } else {
      // Close the modal if search fields are empty
      setModalOpenEmp(false)
    }
  }

  const handleRowSelectProject = (row) => {
    setSelectedRow(row)

    // Update the state of search fields based on the selected row
    setSearchLocation(row.location)
    setSearchTimePeriod(row.startedDate)
  }

  const handleRowSelectCustomer = (row) => {
    setSelectedRow(row)

    // Update the state of search fields based on the selected row
    setSearchFirstNameCustomer(row.firstName)
    setSearchLastNameCustomer(row.lastName)
    setSearchAddress(row.address)
    setSearchContactNoCustomer(row.contact)
    setSearchCategory(row.category)
  }
  const handleRowSelectEmp = (row) => {
    setSelectedRow(row)

    // Update the state of search fields based on the selected row
    setSearchFirstNameEmp(row.empFirstName)
    setSearchLastNameEmp(row.empLastName)
    setSearchRole(row.role)
    setSearchContactNoEmp(row.contact)
  }

  //form save ,clear button functions
  const handleFormClearButtonClick = () => {
    // Reset all the form fields to their initial state
    setDescription('')
    setCategory('')
    setCallbackNumber('')
    setChatLink('')
    setStatus('')
    setUrgency('')
    setComment('')

    //Clear selected values from modal searches
    setSelectedRow(null)
    setSearchLocation('')
    setSearchTimePeriod('')
    setSearchFirstNameCustomer('')
    setSearchLastNameCustomer('')
    setSearchAddress('')
    setSearchContactNoCustomer('')
    setSearchCategory('')
    setSearchFirstNameEmp('')
    setSearchLastNameEmp('')
    setSearchRole('')
    setSearchContactNoEmp('')
  }

  const handleFormSaveButtonClick = () => {
    alert('Saved successfully')
  }

  const handleProjectRegardingSaveButtonClick = () => {
    if (selectedRow) {
      document.getElementById('project_regarding').value = selectedRow.projectID
      setModalOpenProject(false) // Close the modal after selecting
    }
  }

  const handleRequestedBySaveButtonClick = () => {
    if (selectedRow) {
      document.getElementById('requested_by').value = selectedRow.customerID
      setModalOpenCustomer(false) // Close the modal after selecting
    }
  }

  const handleAssignedToSaveButtonClick = () => {
    if (selectedRow) {
      document.getElementById('assigned_to').value = selectedRow.empID
      setModalOpenEmp(false) // Close the modal after selecting
    }
  }

  //project data object array
  const projectrows = [
    {
      projectID: 'P1001',
      location: 'City A',
      startedDate: '2022-01-01',
      customer: 'Customer A',
    },
    {
      projectID: 'P1002',
      location: 'City A',
      startedDate: '2022-02-01',
      customer: 'Customer B',
    },
    {
      projectID: 'P1003',
      location: 'City C',
      startedDate: '2023-01-01',
      customer: 'Customer C',
    },
    {
      projectID: 'P1004',
      location: 'City D',
      startedDate: '2021-02-01',
      customer: 'Customer D',
    },
    {
      projectID: 'P1005',
      location: 'City E',
      startedDate: '2019-01-01',
      customer: 'Customer E',
    },
    {
      projectID: 'P1006',
      location: 'City F',
      startedDate: '2020-02-01',
      customer: 'Customer F',
    },
  ]

  // Filter the rows based on search criterias Project Modal Window
  const filteredRowsProject = projectrows.filter(
    (row) =>
      row.location.toLowerCase().includes(searchLocation.toLowerCase()) &&
      row.startedDate.includes(searchTimePeriod)
  )

  //customer data object array
  const customerrows = [
    {
      customerID: 'C1001',
      firstName: 'fname1',
      lastName: 'lname1',
      address: 'address 1',
      contact: 'contact 1',
      category: 'Complaint',
    },
    {
      customerID: 'C1002',
      firstName: 'fname2',
      lastName: 'lname2',
      address: 'address 2',
      contact: 'contact 2',
      category: 'Activity',
    },
    {
      customerID: 'C1003',
      firstName: 'fname3',
      lastName: 'lname3',
      address: 'address 3',
      contact: 'contact 3',
      category: 'Inquiry',
    },
    {
      customerID: 'C1004',
      firstName: 'fname4',
      lastName: 'lname4',
      address: 'address 4',
      contact: 'contact 4',
      category: 'Activity',
    },
    {
      customerID: 'C1005',
      firstName: 'fname5',
      lastName: 'lname5',
      address: 'address 5',
      contact: 'contact 5',
      category: 'Inquiry',
    },
  ]

  // Filter the rows based on search criterias Customer Modal Window
  const filteredRowsCustomer = customerrows.filter(
    (row) =>
      row.firstName
        .toLowerCase()
        .includes(searchFirstNameCustomer.toLowerCase()) &&
      row.lastName
        .toLowerCase()
        .includes(searchLastNameCustomer.toLowerCase()) &&
      row.address.toLowerCase().includes(searchAddress.toLowerCase()) &&
      row.contact
        .toLowerCase()
        .includes(searchContactNoCustomer.toLowerCase()) &&
      row.category.toLowerCase().includes(searchCategory.toLowerCase())
  )

  //employee data object array
  const emprows = [
    {
      empID: 'E1001',
      empFirstName: 'EmpFname1',
      empLastName: 'EmpLname1',
      role: 'role A',
      contact: 'contact A',
    },
    {
      empID: 'E1002',
      empFirstName: 'EmpFname2',
      empLastName: 'EmpLname2',
      role: 'role B',
      contact: 'contact B',
    },

    {
      empID: 'E1003',
      empFirstName: 'EmpFname3',
      empLastName: 'EmpLname3',
      role: 'role A',
      contact: 'contact C',
    },
  ]

  // Filter the rows based on search criterias Employee Modal Window
  const filteredRowsEmp = emprows.filter(
    (row) =>
      row.empFirstName
        .toLowerCase()
        .includes(searchFirstNameEmp.toLowerCase()) &&
      row.empLastName.toLowerCase().includes(searchLastNameEmp.toLowerCase()) &&
      row.role.toLowerCase().includes(searchRole.toLowerCase()) &&
      row.contact.toLowerCase().includes(searchContactNoEmp.toLowerCase())
  )

  return (
    <div>
      <form action="">
        <Box
          component="form"
          sx={{
            //border: '2px solid black',
            '& .MuiTextField-root': { m: 1 },
            '& .MuiButton-root': { m: 1 },
            justifyContent: 'flex-end',
          }}
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={1} sx={{ width: '100vw' }}>
            <Grid item xs={12}>
              <TextField
                id="description"
                label="Description"
                placeholder="Enter any description"
                variant="outlined"
                fullWidth
                multiline
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="category"
                label="Category"
                select
                variant="outlined"
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="project_regarding"
                placeholder="Project Regarding"
                helperText="Project Identification Number"
                variant="outlined"
                fullWidth
                onClick={OpenModalWindowProject}
              />
            </Grid>

            <Grid item xs={10}>
              <TextField
                id="requested_by"
                placeholder="Requested By"
                helperText="Customer Identification Number"
                variant="outlined"
                fullWidth
                onClick={OpenModalWindowCustomer}
              />
            </Grid>
            <Grid item xs={2}>
              <Grid container xs={12} sx={{ justifyContent: 'center' }}>
                <Button variant="contained">Add Guest</Button>
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="callbacknumber"
                label="Callback Number"
                placeholder="Enter telephone number"
                variant="outlined"
                fullWidth
                value={callbacknumber}
                onChange={(e) => {
                  setCallbackNumber(e.target.value)
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="chatlink"
                label="Chat Link"
                placeholder="Enter whatsapp chat link"
                variant="outlined"
                fullWidth
                value={chatlink}
                onChange={(e) => setChatLink(e.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="status"
                label="Status"
                select
                variant="outlined"
                fullWidth
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {statuses.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="urgency"
                label="Urgency Level"
                select
                variant="outlined"
                defaultValue="None"
                fullWidth
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
              >
                {urgencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="assigned_to"
                placeholder="Assigned To"
                helperText="Employee Identification Number"
                variant="outlined"
                fullWidth
                onClick={OpenModalWindowEmp}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="comment"
                label="Comment"
                placeholder="Enter any comment"
                variant="outlined"
                fullWidth
                multiline
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Grid>

            {/*Clear , Save Buttons on the form*/}
            <Grid
              container
              spacing={1}
              sx={{ mt: 3, justifyContent: 'flex-end' }}
            >
              <Grid>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleFormClearButtonClick}
                >
                  Clear
                </Button>
              </Grid>
              <Grid>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleFormSaveButtonClick}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </form>

      {/*-----------Modal for Projects--------------*/}

      <Modal open={isModalOpenProject} onClose={CloseModalWindowProject}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800, // Adjust the width as needed
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          {/*Project Modal content*/}
          <Typography variant="h6" component="div">
            Project Details
          </Typography>

          {/* Project Modal Search options */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <TextField
                id="search-location"
                label="Search by Location"
                variant="outlined"
                fullWidth
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="search-time"
                label="Search by Date"
                variant="outlined"
                fullWidth
                value={searchTimePeriod}
                onChange={(e) => setSearchTimePeriod(e.target.value)}
              />
            </Grid>
          </Grid>

          {/* Table in the project modal */}
          <Grid>
            <TableContainer component={Paper} sx={{ mt: 3 }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>ProjectID</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Started Date</TableCell>
                    <TableCell>Customer</TableCell>
                  </TableRow>
                  {filteredRowsProject.map((rows) => (
                    <TableRow
                      key={rows.projectID}
                      onClick={() => handleRowSelectProject(rows)}
                      style={{
                        cursor: 'pointer',
                        backgroundColor:
                          selectedRow &&
                          selectedRow.projectID === rows.projectID
                            ? '#e0e0e0'
                            : 'inherit',
                      }}
                    >
                      <TableCell>{rows.projectID}</TableCell>
                      <TableCell>{rows.location}</TableCell>
                      <TableCell>{rows.startedDate}</TableCell>
                      <TableCell>{rows.customer}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          {/* Buttons in the project modal */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mr: 2 }}
              onClick={CloseModalWindowProject}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleProjectRegardingSaveButtonClick}
            >
              Select
            </Button>
          </Box>
        </Box>
      </Modal>

      {/*-----------Modal for Customers--------------*/}

      <Modal open={isModalOpenCustomer} onClose={CloseModalWindowCustomer}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800, // Adjust the width as needed
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* Customer Modal content*/}
          <Typography variant="h6" component="div">
            Customer Details
          </Typography>

          {/* Customer Modal Search options */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <TextField
                id="search-firstname"
                label="First Name"
                variant="outlined"
                fullWidth
                value={searchFirstNameCustomer}
                onChange={(e) => setSearchFirstNameCustomer(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="search-lastname"
                label="Last Name"
                variant="outlined"
                fullWidth
                value={searchLastNameCustomer}
                onChange={(e) => setSearchLastNameCustomer(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="search-address"
                label="Address"
                variant="outlined"
                fullWidth
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="search-contact"
                label="Contact No"
                variant="outlined"
                fullWidth
                value={searchContactNoCustomer}
                onChange={(e) => setSearchContactNoCustomer(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="category"
                label="Category"
                variant="outlined"
                fullWidth="true"
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
              ></TextField>
            </Grid>
          </Grid>

          {/* Table in the customer modal */}
          <Grid>
            <TableContainer component={Paper} sx={{ mt: 3 }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>CustomerID</TableCell>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Contact No</TableCell>
                    <TableCell>Category</TableCell>
                  </TableRow>
                  {filteredRowsCustomer.map((row) => (
                    <TableRow
                      key={row.customerID}
                      onClick={() => handleRowSelectCustomer(row)}
                      style={{
                        cursor: 'pointer',
                        backgroundColor:
                          selectedRow &&
                          selectedRow.customerID === row.customerID
                            ? '#e0e0e0'
                            : 'inherit',
                      }}
                    >
                      <TableCell>{row.customerID}</TableCell>
                      <TableCell>{row.firstName}</TableCell>
                      <TableCell>{row.lastName}</TableCell>
                      <TableCell>{row.address}</TableCell>
                      <TableCell>{row.contact}</TableCell>
                      <TableCell>{row.category}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          {/* Buttons in the customer modal */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mr: 2 }}
              onClick={CloseModalWindowCustomer}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRequestedBySaveButtonClick}
            >
              Select
            </Button>
          </Box>
        </Box>
      </Modal>
      {/*-----------Modal for Employees--------------*/}
      <Modal open={isModalOpenEmp} onClose={CloseModalWindowEmp}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* Employee Modal content */}
          <Typography variant="h6" component="div">
            Employee Details
          </Typography>

          {/* Employee Modal Search options */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <TextField
                id="search-firstname"
                label="First Name"
                variant="outlined"
                fullWidth
                value={searchFirstNameEmp}
                onChange={(e) => setSearchFirstNameEmp(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="search-lastname"
                label="Last Name"
                variant="outlined"
                fullWidth
                value={searchLastNameEmp}
                onChange={(e) => setSearchLastNameEmp(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="search-role"
                label="Role"
                variant="outlined"
                fullWidth
                value={searchRole}
                onChange={(e) => setSearchRole(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="search-contactno"
                label="Contact No"
                variant="outlined"
                fullWidth
                value={searchContactNoEmp}
                onChange={(e) => setSearchContactNoEmp(e.target.value)}
              />
            </Grid>
          </Grid>

          {/* Table in the employee modal */}
          <Grid>
            <TableContainer component={Paper} sx={{ mt: 3 }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>EmpID</TableCell>
                    <TableCell>FirstName</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Contact No</TableCell>
                  </TableRow>
                  {filteredRowsEmp.map((rows) => (
                    <TableRow
                      key={rows.empID}
                      onClick={() => handleRowSelectEmp(rows)}
                      style={{
                        cursor: 'pointer',
                        backgroundColor:
                          selectedRow && selectedRow.empID === rows.empID
                            ? '#e0e0e0'
                            : 'inherit',
                      }}
                    >
                      <TableCell>{rows.empID}</TableCell>
                      <TableCell>{rows.empLastName}</TableCell>
                      <TableCell>{rows.empFirstName}</TableCell>
                      <TableCell>{rows.role}</TableCell>
                      <TableCell>{rows.contact}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          {/* Buttons in the employee modal*/}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mr: 2 }}
              onClick={CloseModalWindowEmp}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAssignedToSaveButtonClick}
            >
              Select
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
