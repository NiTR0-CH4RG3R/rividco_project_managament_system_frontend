import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { IconButton, InputAdornment, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import CustomerModal from "../../Components/ModalWindow/CustomerModal";
import ProjectModal from "../../Components/ModalWindow/ProjectModal";
import EmployeeModal from "../../Components/ModalWindow/EmployeeModal";
import { categories, statuses, urgencies } from "./TaskData";
import { taskValidation } from "../../Validation/TaskValidation";
import { GridClearIcon } from "@mui/x-data-grid";
import { useNavigate, useParams } from "react-router";
import { useTopbarContext } from "../../Contexts/TopbarContext";
import {
  AddBox,
  ClearAll,
  Edit,
  History,
  Save,
  Visibility,
  WhatsApp,
} from "@mui/icons-material";
import FormTextField from "../../Components/StyledComponents/FormTextField";
import FormSaveLoadingButton from "../../Components/StyledComponents/FormSaveLoadingButton";
import FormClearButton from "../../Components/StyledComponents/FormClearButton";
import FormButton from "../../Components/StyledComponents/FormButton";
import FormEditButton from "../../Components/StyledComponents/FormEditButton";
import { AppRoutes } from "../../Data/AppRoutes";
import * as taskService from "../../services/taskService";
import * as customerService from "../../services/customerService";
import * as projectService from "../../services/projectService";
import * as systemUserService from "../../services/systemUserService";
import * as taskStatusService from "../../services/taskStatusService";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import RequestedCustomerField from "../CIA/TaskStatus/RequestedCustomerField";

export default function Task(props) {
  const { setTitle, setSubtitle } = useTopbarContext();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);

  const handleCloseSuccessMessage = () => {
    setSuccessMessageOpen(false);
  };

  async function loadCustomer(id) {
    return customerService.getCustomer(id).then((customer) => {
      return {
        id: customer.id,
        firstName: customer.firstName,
      };
    });
  }

  async function loadEmployee(id) {
    return systemUserService.getSystemUser(id).then((systemuser) => {
      return {
        id: systemuser.id,
        firstName: systemuser.firstName,
      };
    });
  }

  async function loadProject(id) {
    return projectService.getProject(id).then((project) => {
      return {
        id: project.projectId,
      };
    });
  }

  function loadTaskData(id, setValues) {
    taskService
      .getTask(id)
      .then(async (task) => {
        const [customer, project, employee] = await Promise.all([
          loadCustomer(task.requestedBy),
          loadProject(task.projectId),
          loadEmployee(task.assignedTo),
        ]);
        const taskValues = {
          description: task.description,
          category: task.category,
          callbacknumber: task.callBackNumber,
          selectedCustomer: customer,
          selectedProject: project,
          selectedEmployee: employee,
          status: task.status,
          urgency: task.urgencyLevel,
          comment: task.comments,
        };
        setValues(taskValues);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setTitle(
    props.type === "add"
      ? "Add a new CIA Task"
      : props.type === "edit"
      ? "Edit CIA Task"
      : `View CIA Task`
  );
  setSubtitle(
    props.type === "add"
      ? "You can add new CIA task here."
      : props.type === "edit"
      ? `You can edit CIA task id: #${id} details here.`
      : `You can view CIA task id: #${id} details here.`
  );

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: {
      description: "",
      category: "",
      callbacknumber: "",
      selectedCustomer: {
        id: null,
        firstName: null,
      },
      selectedProject: {
        id: null,
      },
      selectedEmployee: {
        id: null,
        firstName: null,
      },
      status: "",
      urgency: "",
      comment: "",
    },
    onSubmit: (values) => {
      setSuccessMessageOpen(true);
      setLoading(true);
      if (props.type === "add") {
        console.log(values);
        taskService
          .addTask({
            category: values.category,
            requestedBy: values.selectedCustomer.id,
            assignedTo: values.selectedEmployee.id,
            urgencyLevel: values.urgency,
            projectId: values.selectedProject.id,
            callBackNumber: values.callbacknumber,
            description: values.description,
            comments: values.comment,
          })
          .then((taskstatus) => {
            taskStatusService
              .addTaskStatus({
                taskId: taskstatus.id,
                status: values.status,
                comments: values.comment,
              })
              .then(() => {
                setLoading(false);
                navigate(AppRoutes.cia_list.path);
              });
          })
          .catch((error) => {
            console.log(error);
            alert(error);
            setLoading(false);
          });
      } else if (props.type === "edit") {
        taskService
          .updateTask(
            {
              category: values.category,
              requestedBy: values.selectedCustomer.id,
              assignedTo: values.selectedEmployee.id,
              urgencyLevel: values.urgency,
              projectId: values.selectedProject.id,
              callBackNumber: values.callbacknumber,
              description: values.description,
              comments: values.comment,
            },
            id
          )
          .then(() => {
            setLoading(false);
            navigate(AppRoutes.cia_list.path);
          })

          .catch((error) => {
            console.error(error);
            alert(error);
            setLoading(false);
          });
      }
    },
    validationSchema: taskValidation,
  });

  const isCallbackNumberValid = !!(
    values.callbacknumber && !errors.callbacknumber
  );

  useEffect(() => {
    if (props.type === "view" || props.type === "edit") {
      loadTaskData(id, setValues);
    }
  }, [id]);

  useEffect(() => {
    if (props.type === "add") {
      setValues({
        description: "",
        category: "",
        callbacknumber: "",
        selectedCustomer: {
          id: null,
          firstName: null,
        },
        selectedProject: {
          id: null,
        },
        selectedEmployee: {
          id: null,
          firstName: null,
        },
        status: "",
        urgency: "",
        comment: "",
      });
    }
  }, [props.type]);

  const [openCustomer, setOpenCustomer] = useState(false);
  const [openProject, setOpenProject] = useState(false);
  const [openEmployee, setOpenEmployee] = useState(false);

  return (
    <Box
      component="form"
      onReset={handleReset}
      onSubmit={handleSubmit}
      noValidate
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      padding={5}
    >
      <Grid
        container
        component={Paper}
        sx={{
          p: 2,
          borderRadius: 3,
          "& .MuiGrid-item": {
            padding: 1,
          },
        }}
        elevation={3}
      >
        <Grid item xs={12}>
          <RequestedCustomerField
            values={values}
            setFieldValue={setFieldValue}
            type={props.type}
            setOpenCustomer={setOpenCustomer}
            fullWidth={"100%"}
            errorSend={touched.selectedCustomer?.firstName &&
              errors.selectedCustomer?.firstName}
            helperTextSend={touched.selectedCustomer?.firstName
              ? errors.selectedCustomer?.firstName
              : ""}
          />
        </Grid>

        {/* <Grid item xs={props.type === "view" ? 12 : 10}>
          <FormTextField
            id="requested_by"
            name="requested_by"
            label="Requested Customer"
            variant="filled"
            fullWidth
            size="small"
            required
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
                  disabled={props.type === "view"}
                >
                  {(props.type === "add" || props.type === "edit") && (
                    <GridClearIcon />
                  )}
                </IconButton>
              ),
            }}
            disabled={props.type === "view"}
            error={
              touched.selectedCustomer?.firstName &&
              errors.selectedCustomer?.firstName
            }
            helperText={
              touched.selectedCustomer?.firstName
                ? errors.selectedCustomer?.firstName
                : ""
            }
          />
        </Grid>
        {(props.type === "add" || props.type === "edit") && (
          <Grid item xs={2}>
            <Grid container xs={12} sx={{ justifyContent: "right" }}>
              <FormButton
                variant="contained"
                color="primary"
                onClick={() => navigate(`${AppRoutes.customer_add.path}`)}
                startIcon={<AddBox />}
              >
                Add Guest
              </FormButton>
            </Grid>
          </Grid>
        )} */}

        <Grid item xs={12}>
          <FormTextField
            id="description"
            name="description"
            label="Description"
            placeholder="Enter any description"
            variant="filled"
            fullWidth
            size="small"
            multiline
            rows={3}
            required
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.description && errors.description}
            helperText={touched.description ? errors.description : ""}
            disabled={props.type === "view"}
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            id="category"
            name="category"
            label="Category"
            select
            variant="filled"
            fullWidth
            size="small"
            value={values.category}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={props.type === "view"}
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </FormTextField>
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            id="callbacknumber"
            name="callbacknumber"
            label="Callback Number"
            placeholder="+94xxxxxxxxx"
            variant="filled"
            fullWidth
            size="small"
            required
            value={values.callbacknumber}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {values.callbacknumber && isCallbackNumberValid && (
                    <IconButton
                      href={`https://wa.me/${encodeURIComponent(
                        values.callbacknumber
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        visibility:
                          props.type === "edit" ? "hidden" : "visible",
                      }}
                    >
                      <WhatsApp />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.callbacknumber && errors.callbacknumber}
            helperText={touched.callbacknumber ? errors.callbacknumber : ""}
            disabled={props.type === "view"}
          />
        </Grid>

        <Grid item xs={6}>
          <FormTextField
            id="project_regarding"
            name="project_regarding"
            label="Project Regarding"
            variant="filled"
            fullWidth
            size="small"
            onClick={() => {
              if (!values.selectedProject?.id && props.type !== "view") {
                setOpenProject(true);
              }
            }}
            value={values.selectedProject?.id ?? ""}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setFieldValue("selectedProject", "")}
                  sx={{
                    visibility: values.selectedProject?.id
                      ? "visible"
                      : "hidden",
                  }}
                >
                  {(props.type === "add" || props.type === "edit") && (
                    <GridClearIcon />
                  )}
                </IconButton>
              ),
            }}
            disabled={props.type === "view"}
          />
        </Grid>

        <Grid item xs={6}>
          <FormTextField
            id="assigned_to"
            name="assigned_to"
            label="Assigned Employee"
            variant="filled"
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
                  {(props.type === "add" || props.type === "edit") && (
                    <GridClearIcon />
                  )}
                </IconButton>
              ),
            }}
            disabled={props.type === "view"}
          />
        </Grid>
        {(props.type === "add" || props.type === "view") && (
          <Grid item xs={6}>
            <FormTextField
              id="status"
              name="status"
              label="Status"
              select
              variant="filled"
              fullWidth
              size="small"
              value={values.status}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={props.type === "view"}
            >
              {statuses.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </FormTextField>
          </Grid>
        )}
        <Grid item xs={6}>
          <FormTextField
            id="urgency"
            name="urgency"
            label="Urgency Level"
            select
            variant="filled"
            defaultValue="None"
            fullWidth
            size="small"
            value={values.urgency}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={props.type === "view"}
          >
            {urgencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </FormTextField>
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            id="comment"
            name="comment"
            label="Comment"
            placeholder="Enter any comment"
            variant="filled"
            fullWidth
            size="small"
            multiline
            rows={4}
            value={values.comment}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={props.type === "view"}
          />
        </Grid>
        {/*Clear , Save Buttons on the add, edit, view forms*/}
      </Grid>
      <Box
        display="flex"
        width="100%"
        pt={3}
        justifyContent="flex-end"
        sx={{
          "& .MuiButton-root": { m: 1 },
        }}
      >
        {props.type === "view" && (
          <>
            <FormButton
              variant="contained"
              size="large"
              color="primary"
              onClick={() =>
                navigate(`${AppRoutes.cia_status.path.replace(":id", id)}`)
              } //navigate to the taskstatus page
              startIcon={<History />}
            >
              View Status History
            </FormButton>

            <FormButton
              variant="contained"
              size="large"
              color="primary"
              onClick={() =>
                navigate(
                  `${AppRoutes.cia_resources_view.path.replace(":id", id)}`
                )
              } //navigate to the view task resouce page
              startIcon={<Visibility />}
            >
              View Task Resources
            </FormButton>

            <FormEditButton
              variant="contained"
              size="large"
              onClick={() =>
                navigate(`${AppRoutes.cia_edit.path.replace(":id", id)}`)
              } //navigate to edit task page
              startIcon={<Edit />}
            >
              Edit
            </FormEditButton>
          </>
        )}

        {(props.type === "add" || props.type === "edit") && (
          <>
            {" "}
            <FormButton
              variant="contained"
              size="large"
              color="primary"
              onClick={() =>
                navigate(
                  `${AppRoutes.cia_resources_add.path.replace(":id", id)}`
                )
              } //navigate to add task resources
              startIcon={<AddBox />}
            >
              Add Task Resources
            </FormButton>
            <FormClearButton
              color="primary"
              variant="outliend"
              size="large"
              type="reset"
              startIcon={<ClearAll />}
            >
              Clear
            </FormClearButton>
            <FormSaveLoadingButton
              color="primary"
              variant="contained"
              size="large"
              startIcon={<Save />}
              type="submit"
              loading={loading}
            >
              Save
            </FormSaveLoadingButton>
          </>
        )}
      </Box>

      <CustomerModal
        openCustomer={openCustomer}
        setOpenCustomer={setOpenCustomer}
        sendData={setFieldValue}
      />
      <ProjectModal
        openProject={openProject}
        setOpenProject={setOpenProject}
        sendData={setFieldValue}
      />
      <EmployeeModal
        openEmployee={openEmployee}
        setOpenEmployee={setOpenEmployee}
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
            ? "Task added successfully!"
            : "Task details updated successfully!"}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}
