import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import SaveIcon from "@mui/icons-material/Save";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import VendorItemModal from "../../../Components/ModalWindow/VendorItemModal";
import { IconButton, Typography } from "@mui/material";
import { GridClearIcon } from "@mui/x-data-grid";
import { addProjectValidation } from "../../../Validation/AddProjectValidation";
import { useTopbarContext } from "../../../Contexts/TopbarContext";
import { AppRoutes } from "../../../Data/AppRoutes";
import FormTextField from "../../../Components/StyledComponents/FormTextField";
import FormClearButton from "../../../Components/StyledComponents/FormClearButton";
import FormSaveLoadingButton from "../../../Components/StyledComponents/FormSaveLoadingButton";
import WarrentyField from "../../../Components/WarrentyField/WarrentyField";
import FormButton from "../../../Components/StyledComponents/FormButton";
import EditIcon from "@mui/icons-material/Edit";
//import { Typography } from "@mui/material/styles/createTypography";

export default function ProjectItemsForm(props) {
  const [statusType, setStatusType] = useState([]);
  const [modeType, setModeType] = useState(props.type);


  function loadProjectData(id) {
    //add here
  }

  const { id } = useParams();

  useEffect(() => {
    if (modeType !== "add") {
      loadProjectData(id);
    }
  }, []);

  const { setTitle, setSubtitle } = useTopbarContext();
  setTitle("Project items");
  setSubtitle("You can view and manage all the project items here.");

  const [loading, setLoading] = useState(false);
  //for modal
  const [openVendorItem, setOpenVendorItem] = useState(false);


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
      
      selectedVendorItem: {
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
    ? "Add"
    : modeType === "view"
    ? "View"
    : "Edit"
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
            placeholder="Vendor Item"
            id="vendorItem"
            name="vendorItem"
            label="Select the Vendor Item"
            fullWidth
            size="small"
            onClick={() => {
              if (!values.selectedVendorItem?.title && modeType !== "view") {
                setOpenVendorItem(true);
              }
            }}
            value={values.selectedVendorItem?.title ?? ""}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setFieldValue("selectedVendorItem", "")}
                  sx={{
                    visibility: values.selectedVendorItem?.title
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
              touched.selectedVendorItem?.title && errors.selectedVendorItem?.title
            }
            helperText={
              touched.selectedVendorItem?.title
                ? errors.selectedVendorItem?.title
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
            disabled={modeType === "view"}
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
            disabled={modeType === "view"}
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
            disabled={modeType === "view"}
            onBlur={handleBlur}
            error={touched.comment && errors.comment}
            helperText={touched.comment ? errors.comment : ""}
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

      <VendorItemModal
        openVendorItem={openVendorItem}
        setOpenVendorItem={setOpenVendorItem}
        sendData={setFieldValue}
      />
    
    </Box>
    </>
  );
}
