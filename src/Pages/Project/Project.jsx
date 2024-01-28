import React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import CustomerModal from "../../Components/ModalWindow/CustomerModal";
import EmployeeModal from "../../Components/ModalWindow/EmployeeModal";
import { IconButton } from "@mui/material";
import { GridClearIcon } from "@mui/x-data-grid";
import { addProjectValidation } from "../../Validation/AddProjectValidation";

const statusType = [
  {
    value: "On going",
    label: "On going",
  },
  {
    value: "Done",
    label: "Done",
  },
];

export default function Project(props) {
  const [loading, setLoading] = React.useState(false);
  //for modal
  const [openCustomer, setOpenCustomer] = React.useState(false);
  const [openEmployee, setOpenEmployee] = React.useState(false);

  //set initial values in formik
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
    setFieldValue,
  } = useFormik({
    initialValues: {
      customer: "",
      startDate: "",
      description: "",
      warantyPeriod: "",
      status: "",
      estimatedCost: "",
      location: "",
      referencedBy: "",
      coordinator: "",
      comment: "",
    },
    selectedCustomer: {
      userId: null,
      id: null,
      title: null,
      completed: true,
    },

    selectedEmployee: {
      userId: null,
      id: null,
      title: null,
      completed: true,
    },

    selectedReferenceBy: {
      userId: null,
      id: null,
      title: null,
      completed: true,
    },
    validationSchema: addProjectValidation,

    onSubmit: (values) => {
      sendData(values);
    },
  });

  //
  console.log(values);

  const { id } = useParams();
  const navi = useNavigate();

  React.useEffect(() => {
    console.log(props);

    if (props.type !== "add") {
      console.log(id);
      getDataFromApi(id);
    }
  }, []);

  function getDataFromApi(id) {
    //add here
  }

  function sendData(data) {
    //addhere
    setLoading(true);
    console.log(data);
    clearData();
    setLoading(false);
  }

  function clearData() {
    handleReset();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1 },
          }}
          noValidate
          autoComplete="off"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          flexDirection="column"
        >
          <Grid container spacing={2} sx={{ width: "70%" }}>
            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                required
                placeholder="Select a Customer"
                id="p_customer"
                name="customer"
                label="customer"
                sx={{ width: "100%" }}
                onClick={() => {
                  if (
                    !values.selectedCustomer?.title &&
                    props.type !== "view"
                  ) {
                    setOpenCustomer(true);
                  }
                }}
                value={values.selectedCustomer?.title ?? ""}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setFieldValue("selectedCustomer", "")}
                      sx={{
                        visibility: values.selectedCustomer?.title
                          ? "visible"
                          : "hidden",
                      }}
                    >
                      <GridClearIcon />
                    </IconButton>
                  ),
                }}
                onChange={handleChange} //get onchange value using formik
                disabled={props.type === "view"}
                onBlur={handleBlur}
                //error={touched.selectedCustomer && errors.selectedCustomer}
                //helperText={touched.selectedCustomer ?errors.selectedCustomer : ""}
                error={
                  touched.selectedCustomer?.title &&
                  errors.selectedCustomer?.title
                }
                helperText={
                  touched.selectedCustomer?.title
                    ? errors.selectedCustomer?.title
                    : ""
                }
              />
            </Grid>
            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                required
                type="date"
                placeholder="Select a Date"
                id="p_startDate"
                name="startDate"
                label="Start Date"
                sx={{ width: "100%" }}
                value={values.startDate} //set value using formik
                onChange={handleChange} //get onchange value using formik
                disabled={props.type === "view"}
                onBlur={handleBlur}
                //focused
                InputLabelProps={{ shrink: true }}
                error={touched.startDate && errors.startDate}
                helperText={touched.startDate ? errors.startDate : ""}
              />
            </Grid>

            <Grid item xs={12} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                required
                placeholder="Please Enter The Description"
                id="p_Description"
                name="description"
                label="Description"
                multiline
                maxRows={4}
                sx={{ width: "100%" }}
                value={values.description} //set value using formik
                onChange={handleChange} //get onchange value using formik
                disabled={props.type === "view"}
                onBlur={handleBlur}
                error={touched.description && errors.description}
                helperText={touched.description ? errors.description : ""}
              />
            </Grid>
            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                placeholder="Please Enter Warranty Period"
                id="p_warrantyPeriod"
                name="warrantyPeriod"
                label="Warranty Period"
                sx={{ width: "100%" }}
                value={values.warantyPeriod} //set value using formik
                onChange={handleChange} //get onchange value using formik
                disabled={props.type === "view"}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                required
                id="p_status"
                name="status"
                select
                label="Status"
                sx={{ width: "100%" }}
                value={values.status} //set value using formik
                onChange={handleChange} //get onchange value using formik
                disabled={props.type === "view"}
                onBlur={handleBlur}
                error={touched.status && errors.status}
                helperText={touched.status ? errors.status : ""}
              >
                {statusType.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                placeholder="Please Enter Estimated Cost"
                id="p_estimatedCost"
                name="estimatedCost"
                label="Estimated Cost"
                sx={{ width: "100%" }}
                value={values.estimatedCost} //set value using formik
                onChange={handleChange} //get onchange value using formik
                disabled={props.type === "view"}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                placeholder="Select a Customer"
                id="p_referencedBy"
                name="referenceBy"
                label="Reference By"
                sx={{ width: "100%" }}
                onClick={() => {
                  if (
                    !values.selectedReferenceBy?.title &&
                    props.type !== "view"
                  ) {
                    setOpenCustomer(true);
                  }
                }}
                value={values.selectedReferenceBy?.title ?? ""}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setFieldValue("selectedReferenceBy", "")}
                      sx={{
                        visibility: values.selectedReferenceBy?.title
                          ? "visible"
                          : "hidden",
                      }}
                    >
                      <GridClearIcon />
                    </IconButton>
                  ),
                }}
                onChange={handleChange} //get onchange value using formik
                disabled={props.type === "view"}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                required
                placeholder="Please enter the location"
                id="p_location"
                name="location"
                label="Location"
                sx={{ width: "100%" }}
                value={values.location} //set value using formik
                onChange={handleChange} //get onchange value using formik
                disabled={props.type === "view"}
                onBlur={handleBlur}
                error={touched.location && errors.location}
                helperText={touched.location ? errors.location : ""}
              />
            </Grid>
            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                required
                placeholder="Select a Coordinator"
                id="p_coordinator"
                name="coordinator"
                label="Coordinator"
                sx={{ width: "100%" }}
                onClick={() => {
                  if (
                    !values.selectedEmployee?.title &&
                    props.type !== "view"
                  ) {
                    setOpenEmployee(true);
                  }
                }}
                value={values.selectedEmployee?.title ?? ""}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setFieldValue("selectedEmployee", "")}
                      sx={{
                        visibility: values.selectedEmployee?.title
                          ? "visible"
                          : "hidden",
                      }}
                    >
                      <GridClearIcon />
                    </IconButton>
                  ),
                }}
                onChange={handleChange} //get onchange value using formik
                disabled={props.type === "view"}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                placeholder="Please Enter Your Comment"
                id="c_comment"
                name="comment"
                label="Comment"
                multiline
                rows={4}
                sx={{ width: "100%" }}
                value={values.comment} //set value using formikß
                onChange={handleChange} //get onchange value using formik
                disabled={props.type === "view"}
              />
            </Grid>
          </Grid>
          <Box display="flex" width="70%" justifyContent="flex-end">
            {props.type !== "view" && (
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
                  color="secondary"
                  startIcon={<ClearAllIcon />}
                  onClick={() => clearData()}
                >
                  Clear
                </Button>

                <LoadingButton
                  color="secondary"
                  type="submit"
                  //onClick={handleSubmit}
                  loading={loading}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="contained"
                  sx={{
                    width: "8.5rem",
                    margin: "1em 0.5em !important",
                    backgroundColor: "#4caf50",
                  }}
                >
                  <span>Save</span>
                </LoadingButton>
              </div>
            )}
            {props.type === "view" && (
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
                  startIcon={<EditIcon />}
                  onClick={() => navi(`/customer/update/${id}`)}
                >
                  Edit
                </Button>
              </div>
            )}
          </Box>
        </Box>
      </form>

      <CustomerModal
        //call customer modal
        openCustomer={openCustomer}
        setOpenCustomer={setOpenCustomer}
        sendData={setFieldValue}
      />

      <EmployeeModal
        openEmployee={openEmployee}
        setOpenEmployee={setOpenEmployee}
        sendData={setFieldValue}
      />
    </div>
  );
}
