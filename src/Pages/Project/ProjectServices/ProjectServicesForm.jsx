import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import SaveIcon from "@mui/icons-material/Save";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import EmployeeModal from "../../../Components/ModalWindow/EmployeeModal";
import { IconButton } from "@mui/material";
import { GridClearIcon } from "@mui/x-data-grid";
import { addProjectValidation } from "../../../Validation/AddProjectValidation";
import { useTopbarContext } from "../../../Contexts/TopbarContext";
import { AppRoutes } from "../../../Data/AppRoutes";
import FormTextField from "../../../Components/StyledComponents/FormTextField";
import FormClearButton from "../../../Components/StyledComponents/FormClearButton";
import FormSaveLoadingButton from "../../../Components/StyledComponents/FormSaveLoadingButton";
import EditIcon from "@mui/icons-material/Edit";
import FormButton from "../../../Components/StyledComponents/FormButton";
import * as projectServicesService from "../../../services/projectServicesService";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function ProjectServicesForm(props) {
  const [statusType, setStatusType] = useState([]);
  const [priorityType, setPriorityType] = useState([]);
  const [modeType, setModeType] = useState(props.type);

  function loadProjectData(id) {
    //add here
  }

  function loadStatusType() {
    //load status type from the backend
    setStatusType([
      {
        value: "pending",
        label: "Pending",
      },
      {
        value: "done",
        label: "Done",
      },
    ]);
  }

  function loadPriorityType() {
    //load priority type from the backend
    setPriorityType([
      {
        value: "urgent",
        label: "Urgent",
      },
      {
        value: "high",
        label: "High",
      },
      {
        value: "normal",
        label: "Normal",
      },
      {
        value: "urgent",
        label: "Urgent",
      },
    ]);
  }

  const { id } = useParams();

  useEffect(() => {
    loadStatusType();
    loadPriorityType();

    if (modeType !== "add") {
      loadProjectData(id);
    }
  }, []);

  const { setTitle, setSubtitle } = useTopbarContext();
  setTitle(
    modeType === "add"
      ? "Add a new Project Service"
      : modeType === "edit"
      ? "Edit Project Service"
      : `Project Services`
  );
  setSubtitle(
    modeType === "add"
      ? "You can add a new project service here."
      : modeType === "edit"
      ? "You can edit project services details here."
      : `You can view project services details here.`
  );

  const [loading, setLoading] = useState(false);
  //for modal
  const [openEmployee, setOpenEmployee] = useState(false);

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
      dueDate: "",
      id: "",
      projectId: "",
      plannedDate: "",
      status: "",
      conductedBy: "",
      conductedDate: "",
      priority: "",
      description: "",
      servicereportURL: "",
      serviceLevel: "",

      selectedEmployee: {
        id: null,
        firstName: null,
      },
    },

    validationSchema: addProjectValidation,

    onSubmit: (values) => {
      setLoading(true);
      //Send values to the backend
      if (modeType === "add") {
        projectServicesService
          .addService({
            description: values.description,
            satatus: values.status,
            conductedBy: values.selectedEmployee.id,
            conductedDate: values.dueDate,
          })
          .then(() => {
            setLoading(false);
            navigate(AppRoutes.project_services_list.path);
          })
          .catch((error) => {
            console.error(error);
            alert(error);
            setLoading(false);
          });
      } else if (modeType === "edit") {
        projectServicesService
          .updateService(
            {
              description: values.description,
              satatus: values.status,
              conductedBy: values.selectedEmployee.id,
              conductedDate: values.dueDate,
            },
            id
          )
          .then(() => {
            setLoading(false);
            navigate(AppRoutes.project_services_list.path);
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
      width={"100%"}
    >
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <FormTextField
            required
            type="date"
            placeholder="Select the Planned Date"
            id="plannedDate"
            name="plannedDate"
            label="Planned Date"
            fullWidth
            size="small"
            value={values.startDate} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={modeType === "view"}
            onBlur={handleBlur}
            InputLabelProps={{ shrink: true }}
            error={touched.plannedDate && errors.plannedDate}
            helperText={touched.plannedDate ? errors.plannedDate : ""}
          />
        </Grid>

        <Grid item xs={12}>
          <FormTextField
            required
            id="status"
            name="status"
            select
            label="Status"
            fullWidth
            size="small"
            value={values.status} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={modeType === "view"}
            onBlur={handleBlur}
            error={touched.status && errors.status}
            helperText={touched.status ? errors.status : ""}
          >
            {statusType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </FormTextField>
        </Grid>

        <Grid item xs={12}>
          <FormTextField
            required
            placeholder="Conducted By"
            id="conductedBy"
            name="conductedBy"
            label="Conducted By"
            fullWidth
            size="small"
            onClick={() => {
              if (!values.selectedEmployee?.firstName && modeType !== "view") {
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
            disabled={modeType === "view"}
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
          />
        </Grid>

        <Grid item xs={12}>
          <FormTextField
            required
            type="date"
            placeholder="Select the Conducted Date"
            id="conductedDate"
            name="conductedDate"
            label="Conducted Date"
            fullWidth
            size="small"
            value={values.startDate} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={modeType === "view"}
            onBlur={handleBlur}
            InputLabelProps={{ shrink: true }}
            error={touched.conductedDate && errors.conductedDate}
            helperText={touched.conductedDate ? errors.conductedDate : ""}
          
          />
        </Grid>

        <Grid item xs={12}>
          <FormTextField
            required
            id="priority"
            name="priority"
            select
            label="Priorty"
            fullWidth
            size="small"
            value={values.priority} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={modeType === "view"}
            onBlur={handleBlur}
            error={touched.priority && errors.priority}
            helperText={touched.priority ? errors.priority : ""}
          >
            {priorityType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </FormTextField>
        </Grid>

        <Grid item xs={12}>
          <FormTextField
            required
            placeholder="Please Enter The Description"
            id="description"
            name="description"
            label="Description"
            multiline
            maxRows={4}
            fullWidth
            size="small"
            value={values.description} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={modeType === "view"}
            onBlur={handleBlur}
            error={touched.description && errors.description}
            helperText={touched.description ? errors.description : ""}
          />
        </Grid>

        <Grid item xs={12}>
          <FormTextField
            required
            placeholder="Please Enter Service Level"
            id="serviceLevel"
            name="serviceLevel"
            label="Service Level"
            multiline
            maxRows={4}
            fullWidth
            size="small"
            value={values.serviceLevel} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={modeType === "view"}
            onBlur={handleBlur}
            error={touched.serviceLevel && errors.serviceLevel}
            helperText={touched.serviceLevel ? errors.serviceLevel : ""}
          />
        </Grid>

       
      </Grid>

      <Stack direction="row" spacing={18}>
        <Box display="flex" pt={3} width="100%" justifyContent="flex-start">
          <FormButton
            size="small"
            // fullWidth={true}
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Service Report Upload
            <VisuallyHiddenInput type="file" />
          </FormButton>
        </Box>

        <Box display="flex" pt={3} width="100%" justifyContent="flex-end">
          {modeType !== "view" && (
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

          {modeType === "view" && (
            <>
              <FormButton
                variant="contained"
                size="large"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => setModeType("edit")}
              >
                Edit
              </FormButton>
            </>
          )}
        </Box>
      </Stack>

      <EmployeeModal
        openEmployee={openEmployee}
        setOpenEmployee={setOpenEmployee}
        sendData={setFieldValue}
      />
    </Box>
  );
}
