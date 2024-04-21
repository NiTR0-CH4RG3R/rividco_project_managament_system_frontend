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
import * as projectItemServices from "../../../services/projectItemServices";

export default function ProjectItemsForm(props) {
  const { itemsId } = props;
  const [statusType, setStatusType] = useState([]);
  const [modeType, setModeType] = useState(props.type);

  function loadProjectItemData(itemsId, setValues) {
    //add here
    projectItemServices
      .getitem(itemsId)
      .then((items) => {
        setValues({
          moduleNumber:items.moduleNo,
          comment:items.comments,
          warrantyPeriod:items.warrantyDuration,
          serialNumber:items.serialNo,
  
          selectedVendorItem: {
            id:null,
            productName: null,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const { id } = useParams();

  useEffect(() => {
    if (modeType !== "add") {
      loadProjectItemData(itemsId, setValues);
    }
  }, []);

  useEffect(() => {
    if (props.type === "add") {
      setValues({
        moduleNumber: "",
        comment: "",
        warrantyPeriod: "",
        serialNumber: "",

        selectedVendorItem: {
          id: null,
          productName: null,
        },
      });
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
    setValues,
  } = useFormik({
    initialValues: {
      moduleNumber: "",
      comment: "",
      warrantyPeriod: "",
      serialNumber: "",

      selectedVendorItem: {
        id: null,
        productName: null,
      },
    },

    //validationSchema: addProjectValidation,

    onSubmit: (values) => {
      setLoading(true);
      console.log(values);
      //Send values to the backend
      if (modeType === "add") {
        projectItemServices
          .addItem({
            vendorItemId: values.selectedVendorItem.id,
            projectId: id,
            moduleNo: values.moduleNumber,
            serialNo: values.serialNumber,
            warrantyDuration: values.warrantyPeriod,
            comments: values.comment,
          })
          .then(() => {
            setLoading(false);
            console.log("done");
            props.handleClose();
            //navigate(AppRoutes.project_items_list.path.replace(":id", itemsId));
          })
          .catch((error) => {
            console.error(error);
            alert(error);
            setLoading(false);
            props.handleClose();
          });
      } else if (modeType === "edit") {
        projectItemServices
          .updateItem(
            {
              vendorItemId: values.selectedVendorItem.id,
              projectId: id,
              moduleNo: values.moduleNumber,
              serialNo: values.serialNumber,
              warrantyDuration: values.warrantyPeriod,
              comments: values.comment,
            },
            itemsId
          )
          .then(() => {
            setLoading(false);
            navigate(AppRoutes.project_items_list.path);
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
    <>
      <Typography sx={{ fontSize: "large", pb: 2, pt: 2 }}>
        {modeType === "add"
          ? "Add Items"
          : modeType === "view"
          ? "View Items"
          : "Edit Items"}
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
                if (
                  !values.selectedVendorItem?.productName &&
                  modeType !== "view"
                ) {
                  setOpenVendorItem(true);
                }
              }}
              variant="filled"
              value={values.selectedVendorItem?.productName ?? ""}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setFieldValue("selectedVendorItem", "")}
                    sx={{
                      visibility: values.selectedVendorItem?.productName
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
                touched.selectedVendorItem?.productName &&
                errors.selectedVendorItem?.productName
              }
              helperText={
                touched.selectedVendorItem?.productName
                  ? errors.selectedVendorItem?.productName
                  : ""
              }
            />
          </Grid>

          <Grid item xs={12}>
            <FormTextField
              placeholder="Please Enter The Module Number"
              id="moduleNumber"
              name="moduleNumber"
              label="Module Number"
              fullWidth
              size="small"
              value={values.moduleNumber} //set value using formik
              onChange={handleChange} //get onchange value using formik
              disabled={modeType === "view"}
              onBlur={handleBlur}
              error={touched.moduleNumber && errors.moduleNumber}
              helperText={touched.moduleNumber ? errors.moduleNumber : ""}
              variant="filled"
            />
          </Grid>

          <Grid item xs={12}>
            <FormTextField
              placeholder="Please Enter The Serial Number"
              id="serialNumber"
              name="serialNumber"
              label="Serial Number"
              fullWidth
              size="small"
              value={values.serialNumber} //set value using formik
              onChange={handleChange} //get onchange value using formik
              disabled={modeType === "view"}
              onBlur={handleBlur}
              error={touched.serialNumber && errors.serialNumber}
              helperText={touched.serialNumber ? errors.serialNumber : ""}
              variant="filled"
            />
          </Grid>

          <Grid item xs={12}>
            <WarrentyField
              name="warrantyPeriod"
              onChange={handleChange}
              disabled={modeType === "view"}
              onBlur={handleBlur}
              fullWidth={true}
              value={values.warrantyPeriod}
              size="small"
              variant="filled"
            />
          </Grid>

          <Grid item xs={12}>
            <FormTextField
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

        <VendorItemModal
          openVendorItem={openVendorItem}
          setOpenVendorItem={setOpenVendorItem}
          sendData={setFieldValue}
        />
      </Box>
    </>
  );
}
