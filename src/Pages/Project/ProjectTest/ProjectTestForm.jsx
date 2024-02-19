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


export default function ProjectServicesForm(testId) {
    const [statusType, setResultType] = useState([]);
    const[modeType,setModeType]=useState();
    useEffect(() => {
        
        // Set modeType based on testId
        if (testId === null) {
            setModeType("add");
        } else {
            setModeType("view");
        }
    }, [testId]); // Adding testId as a dependency to useEffect
    


    function loadProjectData(id) {
        //add here
    }

    function loadStatusType() {
        //load status type from the backend
        setResultType([
            {
                value: "pass",
                label: "Pass",
            },
            {
                value: "fail",
                label: "Fail",
            },
        ]);
    }

    const { id } = useParams();

    useEffect(() => {
        loadStatusType();

        if (props.type !== "add") {
            loadProjectData(id);
        }
    }, []);

    const { setTitle, setSubtitle } = useTopbarContext();
    setTitle(
        props.type === "add"
            ? "Add a new Project Test"
            : props.type === "edit"
                ? "Edit Project Test"
                : `Project Test`
    );
    setSubtitle(
        props.type === "add"
            ? "You can add a new project tests here."
            : props.type === "edit"
                ? "You can edit project test details here."
                : `You can view project test details here.`
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

            testName: "",
            result: "",
            conductedBy: "",
            conductedDate: "",

            selectedEmployee: {
                userId: null,
                id: null,
                title: null,
                completed: true,
            },

        },

        validationSchema: addProjectValidation,

        onSubmit: (values) => {
            setLoading(true);
            //Send values to the backend
        },
    });

    const navigate = useNavigate();

    return (
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
                        value={values.testName} //set value using formik
                        onChange={handleChange} //get onchange value using formik
                        disabled={props.type === "view"}
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
                        label="Status"
                        fullWidth
                        size="small"
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


                <Grid item xs={12}>
                    <FormTextField
                        required
                        type="date"
                        placeholder="Select the Due Date"
                        id="dueDate"
                        name="dueDate"
                        label="Due Date"
                        fullWidth
                        size="small"
                        value={values.startDate} //set value using formik
                        onChange={handleChange} //get onchange value using formik
                        disabled={props.type === "view"}
                        onBlur={handleBlur}
                        InputLabelProps={{ shrink: true }}
                        error={touched.dueDate && errors.dueDate}
                        helperText={touched.dueDate ? errors.dueDate : ""}
                    />
                </Grid>
            </Grid>
            <Box display="flex" pt={3} width="100%" justifyContent="flex-end">
                {props.type !== "view" && (
                    <>


                        <FormClearButton
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

            </Box>

            <EmployeeModal
                openEmployee={openEmployee}
                setOpenEmployee={setOpenEmployee}
                sendData={setFieldValue}
            />

        </Box>
    );
}
