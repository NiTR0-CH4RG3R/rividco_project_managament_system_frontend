import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import SaveIcon from "@mui/icons-material/Save";
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
import FormTextField from "../../Components/StyledComponents/FormTextField";
import FormClearButton from "../../Components/StyledComponents/FormClearButton";
import FormSaveLoadingButton from "../../Components/StyledComponents/FormSaveLoadingButton";
import FormButton from "../../Components/StyledComponents/FormButton";
import WarrentyField from "../../Components/WarrentyField/WarrentyField";
import CategoryIcon from "@mui/icons-material/Category";
import ReportIcon from "@mui/icons-material/Report";
import SpeedIcon from "@mui/icons-material/Speed";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import BoltIcon from "@mui/icons-material/Bolt";
import * as projectService from "../../services/projectService";
import FormEditButton from "../../Components/StyledComponents/FormEditButton";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import ProjectViewButton from "../../Components/StyledComponents/ProjectViewButton";

export default function Project(props) {
  const [statusType, setStatusType] = useState([]);
  function loadProjectData(id, setValues) {
    //Load data
    projectService
      .getProject(id)
      .then((project) => {
        setValues(project);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function loadStatusType() {
    //load status type from the backend
    setStatusType([
      {
        value: "On going",
        label: "On going",
      },
      {
        value: "Done",
        label: "Done",
      },
    ]);
  }

  const { id } = useParams();

  useEffect(() => {
    loadStatusType();

    if (props.type !== "add") {
      loadProjectData(id, setValues);
    }
  }, []);

  useEffect(() => {
    if (props.type === "add") {
      setValues({
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
          id: null,
          firstName: null,
        },

        selectedEmployee: {
          id: null,
          firstName: null,
        },

        selectedReferenceBy: {
          id: null,
          firstName: null,
        },
        selectedSalesPerson: {
          id: null,
          firstName: null,
        },
      });
    }
  }, [props.type]);

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
      ? `You can edit project id:#${id} details here.`
      : `You can view project id:#${id} details here.`
  );

  const [loading, setLoading] = useState(false);
  //for modal
  const [openCustomer, setOpenCustomer] = useState(false);
  const [openEmployee, setOpenEmployee] = useState(false);
  const [openReferenceBy, setOpenReferenceBy] = useState(false);
  const [openSalesPerson, setOpenSalesPerson] = useState(false);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);

  const handleCloseSuccessMessage = () => {
    setSuccessMessageOpen(false);
  };

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
    setValues,
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
        id: null,
        firstName: null,
      },

      selectedEmployee: {
        id: null,
        firstName: null,
      },

      selectedReferenceBy: {
        id: null,
        firstName: null,
      },
      selectedSalesPerson: {
        id: null,
        firstName: null,
      },
    },

    validationSchema: addProjectValidation,

    onSubmit: (values) => {
      setSuccessMessageOpen(true);
      setLoading(true);
      if (props.type === "add") {
        projectService
          .addProject({
            customerId: values.selectedCustomer.id,
            description: values.description,
            startDate: values.startDate,
            address: values.location,
            coordinatorId: values.selectedEmployee.id,
            systemWarrentyPeriod: values.warantyPeriod,
            status: values.status,
            estimatedCost: values.estimatedCost,
            referencedBy: values.selectedReferenceBy.id,
            locationCoordinates: "0,0",
            electricityTariffStructure: values.electricityTariffStructure,
            electricityAccountNumber: values.electricityAccountNumber,
            electricityBoardArea: values.electricityBoardArea,
            commissionDate: values.commisionDate,
            projectIdentificationNumber: values.identificationNumber,
            salesPerson: values.selectedSalesPerson.id,
            comments: values.comment,
          })
          .then(() => {
            setLoading(false);
            navigate(AppRoutes.project_list.path);
          })
          .catch((error) => {
            console.error(error);
            alert(error);
            setLoading(false);
          });
      } else if (props.type === "edit") {
        projectService
          .updateProject(values, id)
          .then(() => {
            setLoading(false);
            navigate(AppRoutes.project_list.path);
          })
          .catch((error) => {
            console.error(error);
            alert(error);
            setLoading(false);
          });
      }
    },
  });

  const navigate = useNavigate();

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
      //padding={5}
      pl={5}
      pr={5}
      
      
    >
      <Grid
        container
        component={Paper}
        sx={{
          p: 2,
          // mt:2,
          
          borderRadius: 3,
          "& .MuiGrid-item": {
            padding: 1,
            
          },
        }}
        elevation={3}
      >
        <Grid item xs={6}>
          <FormTextField
            required
            placeholder="Select a Customer"
            id="p_customer"
            name="customer"
            label="customer"
            fullWidth
            size="small"
            onClick={() => {
              if (
                !values.selectedCustomer?.firstName &&
                props.type !== "view"
              ) {
                setOpenCustomer(true);
              }
            }}
            value={values.selectedCustomer?.firstName ?? ""}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setFieldValue("selectedCustomer", "")}
                  sx={{
                    visibility: values.selectedCustomer?.firstName
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
              touched.selectedCustomer?.firstName &&
              errors.selectedCustomer?.firstName
            }
            helperText={
              touched.selectedCustomer?.firstName
                ? errors.selectedCustomer?.firstName
                : ""
            }
            variant="filled"
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            required
            type="date"
            placeholder="Select a Date"
            id="p_startDate"
            name="startDate"
            label="Start Date"
            fullWidth
            size="small"
            value={values.startDate} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
            InputLabelProps={{ shrink: true }}
            error={touched.startDate && errors.startDate}
            helperText={touched.startDate ? errors.startDate : ""}
            variant="filled"
          />
        </Grid>

        <Grid item xs={12}>
          <FormTextField
            required
            placeholder="Please Enter The Description"
            id="p_Description"
            name="description"
            label="Description"
            multiline
            maxRows={4}
            fullWidth
            size="small"
            value={values.description} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={touched.description && errors.description}
            helperText={touched.description ? errors.description : ""}
            variant="filled"
          />
        </Grid>

        <Grid item xs={6}>
          <WarrentyField
            //required={true}
            name="warrantyPeriod"
            onChange={handleChange}
            disabled={props.type === "view"}
            onBlur={handleBlur}
            fullWidth={true}
            size="small"
            variant="filled"
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            required
            id="p_status"
            name="status"
            select
            label="Status"
            fullWidth
            size="small"
            value={values.status} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={touched.status && errors.status}
            helperText={touched.status ? errors.status : ""}
            variant="filled"
          >
            {statusType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </FormTextField>
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            placeholder="Please Enter Estimated Cost"
            id="p_estimatedCost"
            name="estimatedCost"
            label="Estimated Cost"
            fullWidth
            size="small"
            value={values.estimatedCost} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
            variant="filled"
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            placeholder="Select a Customer"
            id="p_referencedBy"
            name="referenceBy"
            label="Reference By"
            fullWidth
            size="small"
            onClick={() => {
              if (
                !values.selectedReferenceBy?.firstName &&
                props.type !== "view"
              ) {
                setOpenReferenceBy(true);
              }
            }}
            value={values.selectedReferenceBy?.firstName ?? ""}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setFieldValue("selectedReferenceBy", "")}
                  sx={{
                    visibility: values.selectedReferenceBy?.firstName
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
              touched.selectedReferenceBy?.firstName &&
              errors.selectedReferenceBy?.firstName
            }
            helperText={
              touched.selectedReferenceBy?.firstName
                ? errors.selectedReferenceBy?.firstName
                : ""
            }
            variant="filled"
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            required
            placeholder="Please enter the location"
            id="p_location"
            name="location"
            label="Location"
            fullWidth
            size="small"
            value={values.location} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={touched.location && errors.location}
            helperText={touched.location ? errors.location : ""}
            variant="filled"
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            required
            placeholder="Select a Coordinator"
            id="p_coordinator"
            name="coordinator"
            label="Coordinator"
            fullWidth
            size="small"
            onClick={() => {
              if (
                !values.selectedEmployee?.firstName &&
                props.type !== "view"
              ) {
                setOpenEmployee(true);
              }
            }}
            value={values.selectedEmployee?.firstName ?? ""}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setFieldValue("selectedEmployee", "")}
                  sx={{
                    visibility: values.selectedEmployee?.firstName
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
              touched.selectedEmployee?.firstName &&
              errors.selectedEmployee?.firstName
            }
            helperText={
              touched.selectedEmployee?.firstName
                ? errors.selectedEmployee?.firstName
                : ""
            }
            variant="filled"
          />
        </Grid>

        <Grid item xs={6}>
          <FormTextField
            required
            placeholder="Please Electricity Tariff Amount"
            id="p_electricityTariffStructure"
            name="electricityTariffStructure"
            label="Tariff"
            fullWidth
            size="small"
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
            variant="filled"
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            required
            placeholder="Please enter the Electricity Account Number"
            id="p_electricityAccountnumber"
            name="electricityAccountNumber"
            label="Electricity Account Number"
            fullWidth
            size="small"
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
            variant="filled"
          />
        </Grid>

        <Grid item xs={6}>
          <FormTextField
            required
            placeholder="Please enter Electricity Board Area"
            id="p_electricityBoardArea"
            name="electricityBoardArea"
            label="Electricity Board Area"
            fullWidth
            size="small"
            value={values.electricityBoardArea} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={touched.electricityBoardArea && errors.electricityBoardArea}
            helperText={
              touched.electricityBoardArea ? errors.electricityBoardArea : ""
            }
            variant="filled"
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            required
            type="date"
            placeholder="Select the Commision Date"
            id="commisionDate"
            name="commisionDate"
            label="Commision Date"
            fullWidth
            size="small"
            value={values.startDate} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
            InputLabelProps={{ shrink: true }}
            error={touched.commisionDate && errors.commisionDate}
            helperText={touched.commisionDate ? errors.commisionDate : ""}
            variant="filled"
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            placeholder="Please Project identification number"
            id="p_identificationNumber"
            name="identificationNumber"
            label="Identification Number"
            fullWidth
            size="small"
            value={values.identificationNumber} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
            variant="filled"
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            placeholder="Please select sales Person"
            id="p_salesPerson"
            name="salesPerson"
            label="Sales Person"
            fullWidth
            size="small"
            onClick={() => {
              if (
                !values.selectedSalesPerson?.firstName &&
                props.type !== "view"
              ) {
                setOpenSalesPerson(true);
              }
            }}
            value={values.selectedSalesPerson?.firstName ?? ""}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setFieldValue("selectedSalesPerson", "")}
                  sx={{
                    visibility: values.selectedSalesPerson?.firstName
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
              touched.selectedSalesPerson?.firstName &&
              errors.selectedSalesPerson?.firstName
            }
            helperText={
              touched.selectedSalesPerson?.firstName
                ? errors.selectedSalesPerson?.firstName
                : ""
            }
            variant="filled"
          />
        </Grid>

        <Grid item xs={12}>
          <FormTextField
            placeholder="Please Enter Your Comment"
            id="c_comment"
            name="comment"
            label="Comment"
            multiline
            rows={4}
            fullWidth
            size="small"
            value={values.comment} //set value using formikß
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            variant="filled"
          />
        </Grid>
      </Grid>
      <Box display="flex" pt={3} width="100%" justifyContent="flex-end">
        {props.type !== "view" && (
          <>
            <FormClearButton
              variant="outlined"
              size="large"
              sx={{
                mr: 2,
              }}
              color="primary"
              startIcon={<ClearAllIcon />}
              type="reset"
            >
              Clear
            </FormClearButton>

            <FormSaveLoadingButton
              color="primary"
              type="submit"
              size="large"
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
            >
              <span>Save</span>
            </FormSaveLoadingButton>
          </>
        )}
        {props.type === "view" && (
          <>
            <ProjectViewButton
              variant="outlined"
              color="primary"
              startIcon={<CategoryIcon />}
              sx={{
                mr: 2,
              }}
              onClick={() =>
                navigate(
                  `${AppRoutes.project_items_list.path.replace(":id", id)}`
                )
              }
            >
              Items
            </ProjectViewButton>
            <ProjectViewButton
              variant="outlined"
              color="primary"
              startIcon={<ElectricalServicesIcon />}
              sx={{
                mr: 2,
              }}
              onClick={() =>
                navigate(
                  `${AppRoutes.project_services_list.path.replace(":id", id)}`
                )
              }
            >
              Services
            </ProjectViewButton>
            <ProjectViewButton
              variant="outlined"
              color="primary"
              startIcon={<SpeedIcon />}
              sx={{
                mr: 2,
              }}
              onClick={() =>
                navigate(
                  `${AppRoutes.project_test_list.path.replace(":id", id)}`
                )
              }
            >
              Tests
            </ProjectViewButton>
            <ProjectViewButton
              variant="outlined"
              color="primary"
              startIcon={<BoltIcon />}
              sx={{
                mr: 2,
              }}
              onClick={() =>
                navigate(
                  `${AppRoutes.project_resources_list.path.replace(":id", id)}`
                )
              }
            >
              Resources
            </ProjectViewButton>
            <ProjectViewButton
              variant="outlined"
              startIcon={<ReportIcon />}
              color="primary"
              sx={{
                mr: 2,
              }}
              onClick={() =>
                navigate(
                  `${AppRoutes.project_commsion_report.path.replace(":id", id)}`
                )
              }
            >
              Commision Reports
            </ProjectViewButton>
            <FormEditButton
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() =>
                navigate(`${AppRoutes.project_edit.path.replace(":id", id)}}`)
              }
            >
              Edit
            </FormEditButton>
          </>
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

      <Snackbar
        open={successMessageOpen}
        autoHideDuration={6000}
        onClose={handleCloseSuccessMessage}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
          marginTop: "64px",
        }}
        TransitionComponent={Slide}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSuccessMessage}
          severity="success"
          sx={{
            fontSize: "1.5rem",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            borderRadius: "8px",
          }}
        >
          {props.type === "add"
            ? "Project added successfully!"
            : "Project details updated successfully!"}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}
