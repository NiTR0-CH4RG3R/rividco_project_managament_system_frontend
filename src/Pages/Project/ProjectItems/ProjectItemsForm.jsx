import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import SaveIcon from "@mui/icons-material/Save";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import VendorModal from "../../../Components/ModalWindow/VendorModal";
import { IconButton } from "@mui/material";
import { GridClearIcon } from "@mui/x-data-grid";
import { addProjectValidation } from "../../../Validation/AddProjectValidation";
import { useTopbarContext } from "../../../Contexts/TopbarContext";
import { AppRoutes } from "../../../Data/AppRoutes";
import FormTextField from "../../../Components/StyledComponents/FormTextField";
import FormClearButton from "../../../Components/StyledComponents/FormClearButton";
import FormSaveLoadingButton from "../../../Components/StyledComponents/FormSaveLoadingButton";
import WarrentyField from "../../../Components/WarrentyField/WarrentyField";

export default function ProjectItemsForm(props) {
  const [statusType, setStatusType] = useState([]);
  function loadProjectData(id) {
    //add here
  }

  const { id } = useParams();

  useEffect(() => {
    if (props.type !== "add") {
      loadProjectData(id);
    }
  }, []);

  const { setTitle, setSubtitle } = useTopbarContext();
  setTitle(
    props.type === "add"
      ? "Add a new Project Service"
      : props.type === "edit"
      ? "Edit Project Service"
      : `Project Services`
  );
  setSubtitle(
    props.type === "add"
      ? "You can add a new project services here."
      : props.type === "edit"
      ? "You can edit project services details here."
      : `You can view project services details here.`
  );

  const [loading, setLoading] = useState(false);
  //for modal
  const [openVendor, setOpenVendor] = useState(false);


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

      vendorItem: "",
      status: "",
      comment: "",
      dueDate: "",
      
      selectedVendor: {
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
            placeholder="Vendor Item"
            id="vendorItem"
            name="vendorItem"
            label="Select the Vendor Item"
            fullWidth
            size="small"
            onClick={() => {
              if (!values.selectedVendor?.title && props.type !== "view") {
                setOpenVendor(true);
              }
            }}
            value={values.selectedVendor?.title ?? ""}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setFieldValue("selectedVendor", "")}
                  sx={{
                    visibility: values.selectedVendor?.title
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
              touched.selectedVendor?.title && errors.selectedVendor?.title
            }
            helperText={
              touched.selectedVendor?.title
                ? errors.selectedVendor?.title
                : ""
            }
          />
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
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={touched.description && errors.description}
            helperText={touched.description ? errors.description : ""}
          />
        </Grid>

        <Grid item xs={12}>
        
          <WarrentyField
            //required={true}
            name="warrantyPeriod"
            onChange={handleChange}
            disabled={props.type === "view"}
            onBlur={handleBlur}
            fullWidth={true}
            size="small"
          />
        </Grid>
       
        <Grid item xs={12}>
          <FormTextField
            required
            placeholder="Please Enter Comments"
            id="comment"
            name="comment"
            label="Comment"
            multiline
            maxRows={4}
            fullWidth
            size="small"
            value={values.comment} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={touched.comment && errors.comment}
            helperText={touched.comment ? errors.comment : ""}
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

      <VendorModal
        openVendor={openVendor}
        setOpenVendor={setOpenVendor}
        sendData={setFieldValue}
      />
    
    </Box>
  );
}
