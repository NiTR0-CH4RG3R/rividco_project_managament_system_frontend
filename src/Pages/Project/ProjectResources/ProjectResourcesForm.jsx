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
import { IconButton,Typography } from "@mui/material";
import { GridClearIcon } from "@mui/x-data-grid";
import { addProjectValidation } from "../../../Validation/AddProjectValidation";
import { useTopbarContext } from "../../../Contexts/TopbarContext";
import { AppRoutes } from "../../../Data/AppRoutes";
import FormTextField from "../../../Components/StyledComponents/FormTextField";
import FormClearButton from "../../../Components/StyledComponents/FormClearButton";
import FormSaveLoadingButton from "../../../Components/StyledComponents/FormSaveLoadingButton";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import FormButton from "../../../Components/StyledComponents/FormButton";
import FormEditButton from "../../../Components/StyledComponents/FormEditButton";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function ProjectResourcesForm(props) {
  const [categoryType, setcategoryType] = useState([]);
  const [modeType, setModeType] = useState(props.type);

  function loadProjectData(id) {
    //add here
  }

  function loadcategoryType() {
    //load status type from the backend
    setcategoryType([
      {
        value: "categoryOne",
        label: "Category One",
      },
      {
        value: "categoryTwo",
        label: "Category Two",
      },
    ]);
  }

  const { id } = useParams();

  

  useEffect(() => {
    
      loadcategoryType();

    if (modeType !== "add") {
      loadProjectData(id);
    }
  }, []);

  const { setTitle, setSubtitle } = useTopbarContext();
  // setTitle(
  //   modeType === "add"
  //     ? "Add a new Project Resource"
  //     : modeType === "edit"
  //     ? "Edit Project Resources"
  //     : `Project Resources`
  // );
  // setSubtitle(
  //   modeType === "add"
  //     ? "You can add a new project resource here."
  //     : modeType === "edit"
  //     ? "You can edit project resource details here."
  //     : `You can view project resource details here.`
  // );
  setTitle("Project Resources");
  setSubtitle("You can view and manage all the project resources here.");


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

      resourceName: "",
      category: "",
      comment: "",
   
      
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
    <>
   <Typography sx={{fontSize:'large',pb:2,pt:2}}>
  {modeType === "add"
    ? "Add Resource"
    : modeType === "view"
    ? "View Resource"
    : "Edit Resource"
  }
</Typography>
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
            placeholder="Please Enter The Resource Name"
            id="resourceName"
            name="resourceName"
            label="Resource Name"
            multiline
            maxRows={4}
            fullWidth
            size="small"
            value={values.resourceName} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={modeType === "view"}
            onBlur={handleBlur}
            error={touched.resourceName && errors.resourceName}
            helperText={touched.resourceName ? errors.resourceName : ""}
          />
        </Grid>

        
        <Grid item xs={12}>
          <FormTextField
            required
            id="category"
            name="category"
            select
            label="Category"
            fullWidth
            size="small"
            value={values.category} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={modeType === "view"}
            onBlur={handleBlur}
            error={touched.category && errors.category}
            helperText={touched.category ? errors.category : ""}
          >
            {categoryType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </FormTextField>
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
            disabled={modeType === "view"}
            onBlur={handleBlur}
            error={touched.comment && errors.comment}
            helperText={touched.comment ? errors.comment : ""}
          />
          
        
        </Grid>
        
        </Grid>


        <Stack direction="row" spacing={25}>
        <Box display="flex" pt={3} width="100%" justifyContent="flex-start">
        {modeType !== "view" && (
          <FormButton
            
            size="large"
            fullWidth={true}
            component="label"
            role={undefined}
            variant="contained"
           // tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
             Upload File
            <VisuallyHiddenInput type="file" />
          </FormButton>
        )}
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
         </Box>
      </Stack>
      <Box display="flex" pt={3} width="100%" justifyContent="flex-end">

          {modeType === "view" && (
            <>
              <FormEditButton
                variant="contained"
                size="large"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => setModeType("edit")}
              >
                Edit
              </FormEditButton>
            </>
          )}
        </Box>
      

      <VendorModal
        openVendor={openVendor}
        setOpenVendor={setOpenVendor}
        sendData={setFieldValue}
      />
    
    </Box>
    </>
  );
}
