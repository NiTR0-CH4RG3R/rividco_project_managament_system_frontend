import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SaveIcon from "@mui/icons-material/Save";
import Paper from "@mui/material/Paper";
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
import FormTextField from "../../Components/StyledComponents/FormTextField";
import FormClearButton from "../../Components/StyledComponents/FormClearButton";
import FormSaveLoadingButton from "../../Components/StyledComponents/FormSaveLoadingButton";
import FormButton from "../../Components/StyledComponents/FormButton";
import WarrentyField from "../../Components/WarrentyField/WarrentyField";
import * as vendorItemService from "../../services/vendorItemService";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import * as vendorService from "../../services/vendorService";

export default function Vendoritem(props) {
  const { id } = useParams();
  function loadVendorData(id, setValues) {
    vendorItemService
      .getVendorItem(id)
      .then((vendorItem) => {
        vendorService.getVendor(vendorItem.vendorId).then((vendor) => {
          setValues({
            product_name: vendorItem.productName,
            price: vendorItem.price,
            warranty_duration: vendorItem.warrantyDuration,
            capacity: vendorItem.capacity,
            brand: vendorItem.brand,
            productCode: vendorItem.productCode,
            comments: vendorItem.comments,
            selectedVendor: {
              id: vendorItem.vendorId,
              name: vendor.name,
            },
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (props.type === "add") {
      setValues({
        product_name: "",
        price: "",
        warranty_duration: "",
        capacity: "",
        brand: "",
        productCode: "",
        comments: "",
        selectedVendor: {
          id: null,
          name: null,
        },
      });
    }
  }, [props.type]);

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
      ? `You can edit vendor item id:#${id} details here.`
      : `You can view vendor item id:#${id} details here.`
  );

  const [openVendor, setOpenVendor] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);

  const handleCloseSuccessMessage = () => {
    setSuccessMessageOpen(false);
  };

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
      product_name: "",
      price: "",
      warranty_duration: "",
      capacity: "",
      brand: "",
      productCode: "",
      comments: "",
      selectedVendor: {
        id: null,
        name: null,
      },
    },
    validationSchema: VendoritemValidation,
    onSubmit: (values) => {
      setSuccessMessageOpen(true);
      setLoading(true);
      console.log(values);
      if (props.type === "add") {
        vendorItemService
          .addVendorItem({
            productName: values.product_name,
            price: values.price,
            vendorId: values.selectedVendor.id,
            warrantyDuration: values.warranty_duration,
            capacity: values.capacity,
            brand: values.brand,
            productCode: values.productCode,
            comments: values.comments,
          })
          .then(() => {
            setLoading(false);
            navigation(AppRoutes.vendor_item_list.path);
            console.log("hello");
          })
          .catch((error) => {
            console.error(error);
            alert(error);
            setLoading(false);
          });
      } else if (props.type === "edit") {
        vendorItemService
          .updateVendorItem(
            {
              productName: values.product_name,
              price: values.price,
              vendorId: values.selectedVendor.id,
              warrantyDuration: values.warranty_duration,
              capacity: values.capacity,
              brand: values.brand,
              productCode: values.productCode,
              comments: values.comments,
            },
            id
          )
          .then(() => {
            setLoading(false);
            navigation(AppRoutes.vendor_item_list.path);
          })
          .catch((error) => {
            console.error(error);
            alert(error);
            setLoading(false);
          });
      }
    },
  });

  //set initial values in formik

  useEffect(() => {
    if (props.type !== "add") {
      loadVendorData(id, setValues);
    }
  }, []);

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
        <Grid item xs={6}>
          <FormTextField
            required
            placeholder="Product name"
            name="product_name"
            label="Product name "
            fullWidth
            size="small"
            value={values.product_name} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={touched.product_name && errors.product_name}
            helperText={touched.product_name ? errors.product_name : ""}
            variant="filled"
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            required
            id="vendor"
            name="vendor"
            label="Vendor "
            fullWidth
            size="small"
            onClick={() => {
              if (!values.selectedVendor?.name && props.type !== "view") {
                setOpenVendor(true);
              }
            }}
            value={values.selectedVendor?.name ?? ""}
            InputProps={{
              endAdornment: props.type !== "view" && (
                <IconButton
                  onClick={() => setFieldValue("selectedVendor", "")}
                  sx={{
                    visibility: values.selectedVendor?.name
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
            error={touched.selectedVendor?.name && errors.selectedVendor?.name}
            helperText={
              touched.selectedVendor?.name ? errors.selectedVendor?.name : ""
            }
            variant="filled"
          />
        </Grid>

        <Grid item xs={12}>
          <FormTextField
            required
            placeholder="Enter price in LKR (e.g., 500,000 LKR)"
            id="price"
            name="price"
            label="Price "
            multiline
            maxRows={4}
            fullWidth
            size="small"
            value={values.price} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={touched.price && errors.price}
            helperText={touched.price ? errors.price : ""}
            variant="filled"
          />
        </Grid>

        <Grid item xs={6}>
          <WarrentyField
            required={true}
            name="warranty_duration"
            label="Warranty duration"
            value={values.warranty_duration}
            onChange={handleChange}
            disabled={props.type === "view"}
            onBlur={handleBlur}
            fullWidth={true}
            size="small"
            error={touched.warranty_duration && errors.warranty_duration}
            helperText={
              touched.warranty_duration ? errors.warranty_duration : ""
            }
            variant="filled"
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            required
            placeholder="Enter system capacity (e.g., 5 kW, 1000 liters/second)"
            id="capacity"
            name="capacity"
            label="Capacity "
            fullWidth
            size="small"
            value={values.capacity} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            className={errors.capacity && touched.capacity ? "input-error" : ""}
            onBlur={handleBlur}
            error={touched.capacity && errors.capacity}
            helperText={touched.capacity ? errors.capacity : ""}
            variant="filled"
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            required
            placeholder="Enter brand name (e.g., SolarTech, HydroPower Solutions)"
            id="brand"
            name="brand"
            label="Brand"
            fullWidth
            size="small"
            value={values.brand} //set value using formikß
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={touched.brand && errors.brand}
            helperText={touched.brand ? errors.brand : ""}
            variant="filled"
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            required
            placeholder="Please enter the product code"
            id="productCode"
            name="productCode"
            label="Product Code"
            fullWidth
            size="small"
            value={values.productCode} //set value using formikß
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={touched.productCode && errors.productCode}
            helperText={touched.productCode ? errors.productCode : ""}
            variant="filled"
          />
        </Grid>

        <Grid item xs={12}>
          <FormTextField
            placeholder="Please Enter Your Comment"
            id="comments"
            name="comments"
            label="Comment"
            multiline
            rows={4}
            fullWidth
            size="small"
            value={values.comments} //set value using formikß
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            variant="filled"
          />
        </Grid>
      </Grid>
      <Box display="flex" width="100%" pt={3} justifyContent="flex-end">
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
          <FormButton
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() =>
              navigation(
                `${AppRoutes.vendor_item_edit.path.replace(":id", id)}`
              )
            }
          >
            Edit
          </FormButton>
        )}
      </Box>

      <VendorModal
        openVendor={openVendor}
        setOpenVendor={setOpenVendor}
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
            ? "Item added successfully!"
            : "Item details updated successfully!"}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}
