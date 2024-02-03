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
import ReferenceByModal from "../../Components/ModalWindow/ReferenceByModal";
import { useTopbarContext } from "../../Contexts/TopbarContext";
import SalesPersonModal from "../../Components/ModalWindow/SalesPersonModal";
import { AppRoutes } from "../../Data/AppRoutes";

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
  const { setTitle, setSubtitle } = useTopbarContext();
  setTitle(
    props.type === "add"
      ? "Add a new Project"
      : props.type === "edit"
      ? "Edit Project"
      : `View Project`
  );
  setSubtitle(
    props.type === "add"
      ? "You can add a new project here."
      : props.type === "edit"
      ? "You can edit project details here."
      : `You can view project details here.`
  );

  const [loading, setLoading] = React.useState(false);
  //for modal
  const [openCustomer, setOpenCustomer] = React.useState(false);
  const [openEmployee, setOpenEmployee] = React.useState(false);
  const [openReferenceBy, setOpenReferenceBy] = React.useState(false);
  const [openSalesPerson, setOpenSalesPerson] = React.useState(false);

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
    submitForm,
  } = useFormik({
    initialValues: {
      //customer: "",
      startDate: "",
      description: "",
      warantyPeriod: "",
      status: "",
      estimatedCost: "",
      location: "",
      //referencedBy: "",
      //coordinator: "",
      electricityTariffStructure: "",
      electricityAccountNumber: "",
      electricityBoardArea: "",
      commisionDate: "",
      identificationNumber: "",
      comment: "",

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
      selectedSalesPerson: {
        userId: null,
        id: null,
        title: null,
        completed: true,
      },
    },

    validationSchema: addProjectValidation,

    onSubmit: (values) => {
      sendData(values);
    },
  });

  //
  //console.log(values);

  const { id } = useParams();
  const navigate = useNavigate();

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
    <Box
      component="form"
      onSubmit={handleSubmit}
      onReset={handleReset}
      noValidate
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      width={"70%"}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            required
            placeholder="Select a Customer"
            id="p_customer"
            name="customer"
            label="customer"
            fullWidth
            onClick={() => {
              if (!values.selectedCustomer?.title && props.type !== "view") {
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
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={
              touched.selectedCustomer?.title && errors.selectedCustomer?.title
            }
            helperText={
              touched.selectedCustomer?.title
                ? errors.selectedCustomer?.title
                : ""
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            type="date"
            placeholder="Select a Date"
            id="p_startDate"
            name="startDate"
            label="Start Date"
            fullWidth
            value={values.startDate} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
            InputLabelProps={{ shrink: true }}
            error={touched.startDate && errors.startDate}
            helperText={touched.startDate ? errors.startDate : ""}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            placeholder="Please Enter The Description"
            id="p_Description"
            name="description"
            label="Description"
            multiline
            maxRows={4}
            fullWidth
            value={values.description} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={touched.description && errors.description}
            helperText={touched.description ? errors.description : ""}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            placeholder="Please Enter Warranty Period"
            id="p_warrantyPeriod"
            name="warrantyPeriod"
            label="Warranty Period"
            fullWidth
            value={values.warantyPeriod} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="p_status"
            name="status"
            select
            label="Status"
            fullWidth
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
        <Grid item xs={6}>
          <TextField
            placeholder="Please Enter Estimated Cost"
            id="p_estimatedCost"
            name="estimatedCost"
            label="Estimated Cost"
            fullWidth
            value={values.estimatedCost} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            placeholder="Select a Customer"
            id="p_referencedBy"
            name="referenceBy"
            label="Reference By"
            fullWidth
            onClick={() => {
              if (!values.selectedReferenceBy?.title && props.type !== "view") {
                setOpenReferenceBy(true);
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
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={
              touched.selectedReferenceBy?.title &&
              errors.selectedReferenceBy?.title
            }
            helperText={
              touched.selectedReferenceBy?.title
                ? errors.selectedReferenceBy?.title
                : ""
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            placeholder="Please enter the location"
            id="p_location"
            name="location"
            label="Location"
            fullWidth
            value={values.location} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={touched.location && errors.location}
            helperText={touched.location ? errors.location : ""}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            placeholder="Select a Coordinator"
            id="p_coordinator"
            name="coordinator"
            label="Coordinator"
            fullWidth
            onClick={() => {
              if (!values.selectedEmployee?.title && props.type !== "view") {
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
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={
              touched.selectedEmployee?.title && errors.selectedEmployee?.title
            }
            helperText={
              touched.selectedEmployee?.title
                ? errors.selectedEmployee?.title
                : ""
            }
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            required
            placeholder="Please Electricity Tariff Amount"
            id="p_electricityTariffStructure"
            name="electricityTariffStructure"
            label="Tariff"
            fullWidth
            value={values.electricityTariffStructure} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={
              touched.electricityTariffStructure &&
              errors.electricityTariffStructure
            }
            helperText={
              touched.electricityTariffStructure
                ? errors.electricityTariffStructure
                : ""
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            placeholder="Please enter the Electricity Account Number"
            id="p_electricityAccountnumber"
            name="electricityAccountnumber"
            label="Electricity Account Number"
            fullWidth
            value={values.electricityAccountNumber} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={
              touched.electricityAccountNumber &&
              errors.electricityAccountNumber
            }
            helperText={
              touched.electricityAccountNumber
                ? errors.electricityAccountNumber
                : ""
            }
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            required
            placeholder="Please enter Electricity Board Area"
            id="p_electricityBoardArea"
            name="electricityBoardArea"
            label="Electricity Board Area"
            fullWidth
            value={values.electricityBoardArea} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={touched.electricityBoardArea && errors.electricityBoardArea}
            helperText={
              touched.electricityBoardArea ? errors.electricityBoardArea : ""
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            type="date"
            placeholder="Select the Commision Date"
            id="commisionDate"
            name="commisionDate"
            label="Commision Date"
            fullWidth
            value={values.startDate} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
            InputLabelProps={{ shrink: true }}
            error={touched.commisionDate && errors.commisionDate}
            helperText={touched.commisionDate ? errors.commisionDate : ""}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            placeholder="Please Project identification number"
            id="p_identificationNumber"
            name="identificationNumber"
            label="Identification Number"
            fullWidth
            value={values.identificationNumber} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            placeholder="Please select sales Person"
            id="p_salesPerson"
            name="salesPerson"
            label="Sales Person"
            fullWidth
            onClick={() => {
              if (!values.selectedSalesPerson?.title && props.type !== "view") {
                setOpenSalesPerson(true);
              }
            }}
            value={values.selectedSalesPerson?.title ?? ""}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setFieldValue("selectedSalesPerson", "")}
                  sx={{
                    visibility: values.selectedSalesPerson?.title
                      ? "visible"
                      : "hidden",
                  }}
                >
                  <GridClearIcon />
                </IconButton>
              ),
            }}
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={
              touched.selectedSalesPerson?.title &&
              errors.selectedSalesPerson?.title
            }
            helperText={
              touched.selectedSalesPerson?.title
                ? errors.selectedSalesPerson?.title
                : ""
            }
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            placeholder="Please Enter Your Comment"
            id="c_comment"
            name="comment"
            label="Comment"
            multiline
            rows={4}
            fullWidth
            value={values.comment} //set value using formikß
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
          />
        </Grid>
      </Grid>
      <Box display="flex" pt={3} width="100%" justifyContent="flex-end">
        {props.type !== "view" && (
          <>
            <Button
              variant="contained"
              size="large"
              sx={{
                mr: 2,
              }}
              color="primary"
              startIcon={<ClearAllIcon />}
              type="reset"
            >
              Clear
            </Button>

            <LoadingButton
              color="primary"
              type="submit"
              size="large"
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
            >
              <span>Save</span>
            </LoadingButton>
          </>
        )}
        {props.type === "view" && (
          
            <Button
              variant="contained"
              sx={{ width: "8.5rem", margin: "1em 0.5em !important" }}
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => navigate(`${AppRoutes.project_edit.path}/${id}`)}
            >
              Edit
            </Button>
          
        )}
      </Box>

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
      <ReferenceByModal
        openReferenceBy={openReferenceBy}
        setOpenReferenceBy={setOpenReferenceBy}
        sendData={setFieldValue}
      />
      <SalesPersonModal
        openSalesPerson={openSalesPerson}
        setOpenSalesPerson={setOpenSalesPerson}
        sendData={setFieldValue}
      />
    </Box>
  );
}
