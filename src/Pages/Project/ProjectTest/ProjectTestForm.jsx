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
import { IconButton, Typography } from "@mui/material";
import { GridClearIcon } from "@mui/x-data-grid";
import { addProjectValidation } from "../../../Validation/AddProjectValidation";
import { useTopbarContext } from "../../../Contexts/TopbarContext";
import { AppRoutes } from "../../../Data/AppRoutes";
import FormTextField from "../../../Components/StyledComponents/FormTextField";
import FormClearButton from "../../../Components/StyledComponents/FormClearButton";
import FormSaveLoadingButton from "../../../Components/StyledComponents/FormSaveLoadingButton";
import EditIcon from "@mui/icons-material/Edit";
import FormButton from "../../../Components/StyledComponents/FormButton";
import * as projectTestService from "../../../services/projectTestService";

export default function ProjectServicesForm(props) {
  const { testId } = props;
  const [statusType, setResultType] = useState([]);
  const [modeType, setModeType] = useState(props.type);


  function loadProjectTestData(testId, setValues) {
    //add here
    projectTestService
      .getTest(testId)
      .then((test) => {
        console.log(test);
        console.log(test.conductedDate.substring(0, test.conductedDate.lastIndexOf("T")));

        setValues({
          testName: test.name,
          conductedDate: test.conductedDate.substring(0, test.conductedDate.lastIndexOf("T")),
          status: test.passed,
          comment: test.comments,

          selectedEmployee: {
            id: test.conductedBy,
            //firstName: null,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function loadStatusType() {
    //load status type from the backend
    setResultType([
      {
        value: 1,
        label: "Pass",
      },
      {
        value: 0,
        label: "Fail",
      },
    ]);
  }

  const { id } = useParams();

  useEffect(() => {
    loadStatusType();

    if (modeType !== "add") {
      loadProjectTestData(testId, setValues);
    }
  }, []);

  useEffect(() => {
    if (props.type === "add") {
      setValues({
        testName: "",
        conductedDate: "",
        status: "",
        comment: "",

        selectedEmployee: {
          id: null,
          firstName: null,
        },
      });
    }
  }, []);

  const { setTitle, setSubtitle } = useTopbarContext();
  setTitle("Project Tests");
  setSubtitle("You can view and manage all the project tests here.");

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
    setValues,
  } = useFormik({
    initialValues: {
      testName: "",
      conductedDate: "",
      status: "",
      comment: "",

      selectedEmployee: {
        id: null,
        firstName: null,
      },
    },

    // validationSchema: addProjectValidation,

    onSubmit: (values) => {
      setLoading(true);
      //Send values to the backend
      if (modeType === "add") {
        //console.log(values);
        projectTestService
          .addTest({
            name: values.testName,
            projectId: id,
            conductedBy: values.selectedEmployee.id,
            conductedDate: values.conductedDate,
            comments: values.comment,
            passed: values.status,
          })
          .then(() => {
            setLoading(false);
            props.handleClose();
            //navigate(AppRoutes.project_test_list.path.replace(":id", testId));

          })
          .catch((error) => {
            console.error(error);
            alert(error);
            setLoading(false);
            props.handleClose();
          });
      } else if (modeType === "edit") {
        projectTestService
          .updateTest(
            {
              name: values.testName,
              projectId: id,
              conductedBy: values.selectedEmployee.id,
              conductedDate: values.conductedDate,
              comments: values.comment,
              passed: values.status,
            },
            testId
          )
          .then(() => {
            setLoading(false);
            props.handleClose();
            //navigate(AppRoutes.project_test_list.path);

          })
          .catch((error) => {
            console.error(error);
            alert(error);
            setLoading(false);
            props.handleClose();
          });
      }
    },
  });

  const navigate = useNavigate();

  return (
    <>

      <Typography sx={{ fontSize: "large", pb: 2, pt: 2 }}>
        {modeType === "add"
          ? "Add Test"
          : modeType === "view"
            ? "View Test"
            : "Edit Test"}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        onReset={handleReset}
        //noValidate
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
              placeholder="Please Enter The Test Name"
              id="testName"
              name="testName"
              label="Test Name"
              multiline
              maxRows={4}
              fullWidth
              size="small"
              variant="filled"
              value={values.testName} //set value using formik
              onChange={handleChange} //get onchange value using formik
              disabled={modeType === "view"}
              onBlur={handleBlur}
              error={touched.testName && errors.testName}
              helperText={touched.testName ? errors.testName : ""}
            />
          </Grid>

          <Grid item xs={12}>
            <FormTextField
              required
              id="status"
              name="status"
              select
              label="Result"
              fullWidth
              size="small"
              variant="filled"
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
              variant="filled"
              onClick={() => {
                if (
                  !values.selectedEmployee?.firstName &&
                  modeType !== "view"
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
              placeholder="Select the Conduct Date"
              id="conductedDate"
              name="conductedDate"
              label="Conducted Date"
              fullWidth
              size="small"
              variant="filled"
              value={values.conductedDate} //set value using formik
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

        <EmployeeModal
          openEmployee={openEmployee}
          setOpenEmployee={setOpenEmployee}
          sendData={setFieldValue}
        />
      </Box>

    </>
  );
}
