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
//add formik for form management
import { useFormik } from "formik";
import { VendoritemValidation } from "../../Validation/VendoritemValidation";
import { useTopbarContext } from "../../Contexts/TopbarContext";
import VendorModal from "../../Components/ModalWindow/VendorModal";
import { IconButton } from "@mui/material";
import { GridClearIcon } from "@mui/x-data-grid";
import { AppRoutes } from "../../Data/AppRoutes";



export default function Vendoritem(props) {



  function loadVendorData(id) {
    //add here
  }

  const { id } = useParams();

  React.useEffect(() => {
    console.log(props);

    if (props.type !== "add") {
      console.log(id);
      loadVendorData(id);
    }
  }, []);

  

  const { setTitle, setSubtitle } = useTopbarContext();
  setTitle(
    props.type === "add"
      ? "Add a new Vendor Item"
      : props.type === "edit"
      ? "Edit Vendor Item"
      : `View Vendor Item`
  );
  setSubtitle(
    props.type === "add"
      ? "You can add a new vendor item here."
      : props.type === "edit"
      ? "You can edit vendor item details here."
      : `You can view vendor item details here.`
  );

  const [openVendor, setOpenVendor] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

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
      product_name: "",
      price: "",
      vendor: "",
      warranty_duration: "",
      capacity: "",
      brand: "",
      productCode: "",
      comments: "",
      selectedVendor: {
        userId: null,
        id: null,
        title: null,
        completed: true,
      },
    },
    validationSchema: VendoritemValidation,
    onSubmit: (values) => {
      setLoading(true);
      //Send values to the backend
    },
  });

 

  
  const navigation = useNavigate();

  

  

  

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
            placeholder="Product name"
            name="product_name"
            label="Product name "
            fullWidth
            value={values.product_name} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={touched.product_name && errors.product_name}
            helperText={touched.product_name ? errors.product_name : ""}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="vendor"
            name="vendor"
            label="Vendor "
            fullWidth
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
              touched.selectedVendor?.title ? errors.selectedVendor?.title : ""
            }
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            placeholder="Enter price in LKR (e.g., 500,000 LKR)"
            id="price"
            name="price"
            label="Price "
            multiline
            maxRows={4}
            fullWidth
            value={values.price} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={touched.price && errors.price}
            helperText={touched.price ? errors.price : ""}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            placeholder="Enter warranty duration (e.g., 1 year, 24 months)"
            id="warranty_duration"
            name="warranty_duration"
            label="Warranty duration "
            fullWidth
            value={values.warranty_duration} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            className={
              errors.warranty_duration && touched.warranty_duration
                ? "input-error"
                : ""
            }
            onBlur={handleBlur}
            error={touched.warranty_duration && errors.warranty_duration}
            helperText={
              touched.warranty_duration ? errors.warranty_duration : ""
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            placeholder="Enter system capacity (e.g., 5 kW, 1000 liters/second)"
            id="capacity"
            name="capacity"
            label="Capacity "
            fullWidth
            value={values.capacity} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            className={errors.capacity && touched.capacity ? "input-error" : ""}
            onBlur={handleBlur}
            error={touched.capacity && errors.capacity}
            helperText={touched.capacity ? errors.capacity : ""}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            placeholder="Enter brand name (e.g., SolarTech, HydroPower Solutions)"
            id="brand"
            name="brand"
            label="Brand"
            fullWidth
            value={values.brand} //set value using formikß
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={touched.brand && errors.brand}
            helperText={touched.brand ? errors.brand : ""}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            placeholder="Please enter the product code"
            id="productCode"
            name="ProductCode"
            label="Product Code"
            fullWidth
            value={values.productCode} //set value using formikß
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={touched.productCode && errors.productCode}
            helperText={touched.productCode ? errors.productCode : ""}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            placeholder="Please Enter Your Comment"
            id="comments"
            name="comments"
            label="Comment"
            multiline
            rows={4}
            fullWidth
            value={values.comments} //set value using formikß
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
          />
        </Grid>
      </Grid>
      <Box display="flex" width="100%" pt={3} justifyContent="flex-end">
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
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => navigation(`${AppRoutes.vendor_item_edit.path}/${id}`)}
          >
            Edit
          </Button>
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
