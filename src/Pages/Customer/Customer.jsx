import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";

import SaveIcon from "@mui/icons-material/Save";

import ClearAllIcon from "@mui/icons-material/ClearAll";
import { useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
//add formik
import { useFormik } from "formik";
import { customerValidation } from "./CustomerValidation";
import { useTopbarContext } from "../../Contexts/TopbarContext";
import { AppRoutes } from "../../Data/AppRoutes";
import FormTextField from "../../Components/StyledComponents/FormTextField";
import FormClearButton from "../../Components/StyledComponents/FormClearButton";
import FormSaveLoadingButton from "../../Components/StyledComponents/FormSaveLoadingButton";
import FormButton from "../../Components/StyledComponents/FormButton";
import ProjectFilterModal from "./ProjectFilterModal";
import * as customerService from "../../services/customerService";
import FormEditButton from "../../Components/StyledComponents/FormEditButton";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function Customer(props) {
  const [loading, setLoading] = useState(false);
  const [categoryType, setCategoryType] = useState([]);
  const [openProjectFilter, setOpenProjectFilter] = useState(false);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);

  const handleCloseSuccessMessage = () => {
    setSuccessMessageOpen(false);
  };

  function loadCustomerData(id, setValues) {
    // Load customer data from the backend
    customerService
      .getCustomer(id)
      .then((customer) => {
        setValues(customer);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function loadCategoryType() {
    // Load category type from the backend
    setCategoryType([
      {
        value: "Customer",
        label: "Customer",
      },
      {
        value: "Guest",
        label: "Guest",
      },

      {
        value: "Business",
        label: "Business",
      },
    ]);
  }

  const { id } = useParams();

  const { setTitle, setSubtitle } = useTopbarContext();
  setTitle(
    props.type === "add"
      ? "Add a new Customer"
      : props.type === "edit"
      ? "Edit Customer Details"
      : `View Customer Details`
  );
  setSubtitle(
    props.type === "add"
      ? "You can add a new customers here."
      : props.type === "edit"
      ? `You can edit customer id: #${id} details here.`
      : `You can view customer id: #${id} details here.`
  );

  //set initial values in formik
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
    setValues,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      category: "",
      address: "",
      email: "",
      phone01: "",
      phone02: "",
      customerRegistrationNumber: "",
      profession: "",
      comments: "",
    },
    validationSchema: customerValidation,
    onSubmit: (values) => {
      setLoading(true);
      if (props.type === "add") {
        customerService
          .addCustomer(values)
          .then(() => {
            setLoading(false);
            navigate(AppRoutes.customer_list.path);
          })
          .catch((error) => {
            console.error(error);
            alert(error);
            setLoading(false);
          });
      } else if (props.type === "edit") {
        customerService
          .updateCustomer(values, id)
          .then(() => {
            setLoading(false);
            navigate(AppRoutes.customer_list.path);
          })
          .catch((error) => {
            console.error(error);
            alert(error);
            setLoading(false);
          });
      }
    },
  });

  useEffect(() => {
    loadCategoryType();

    if (props.type !== "add") {
      loadCustomerData(id, setValues);
    }
  }, [id]);

  useEffect(() => {
    if (props.type === "add") {
      setValues({
        firstName: "",
        lastName: "",
        category: "",
        address: "",
        email: "",
        phone01: "",
        phone02: "",
        customerRegistrationNumber: "",
        profession: "",
        comments: "",
      });
    }
  }, [props.type]);

  const navigate = useNavigate();

  return (
    <Box
      component="form"
      onReset={handleReset}
      onSubmit={(e) => {
        handleSubmit(e);
        setSuccessMessageOpen(true);
      }}
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
        elevation={4}
      >
        <Grid item xs={6}>
          <FormTextField
            required
            placeholder="Please Enter Your First Name"
            name="firstName"
            label="First Name"
            size="small"
            fullWidth
            value={values.firstName} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={touched.firstName && errors.firstName}
            helperText={touched.firstName ? errors.firstName : ""}
            variant="filled"
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            required
            placeholder="Please Enter Your Last Name"
            name="lastName"
            label="Last Name "
            size="small"
            fullWidth
            value={values.lastName} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={touched.lastName && errors.lastName}
            helperText={touched.lastName ? errors.lastName : ""}
            variant="filled"
          />
        </Grid>

        <Grid item xs={12}>
          <FormTextField
            required
            placeholder="No: 00 , road ,city"
            id="c_address"
            name="address"
            label="Address "
            multiline
            maxRows={4}
            fullWidth
            size="small"
            value={values.address} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={touched.address && errors.address}
            helperText={touched.address ? errors.address : ""}
            variant="filled"
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            required
            placeholder="example@.com"
            id="c_email"
            name="email"
            label="Email "
            fullWidth
            size="small"
            value={values.email} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            className={errors.email && touched.email ? "input-error" : ""}
            onBlur={handleBlur}
            error={touched.email && errors.email}
            helperText={touched.email ? errors.email : ""}
            variant="filled"
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            required
            id="c_category"
            name="category"
            select
            label="Category "
            fullWidth
            size="small"
            value={values.category} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={touched.category && errors.category}
            helperText={touched.category ? errors.category : ""}
            variant="filled"
          >
            {categoryType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </FormTextField>
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            id="c_profession"
            name="profession"
            label={
              values.category === "Business"
                ? "Nature of the business"
                : "Profession"
            }
            placeholder={
              values.category === "Business"
                ? "Please enter the nature of the business "
                : "Please enter the profession of the customer"
            }
            fullWidth
            size="small"
            value={values.profession} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
            variant="filled"
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            required
            placeholder="Please Enter Customer Id"
            name="customerRegistrationNumber"
            label="Customer Id"
            fullWidth
            size="small"
            value={values.customerRegistrationNumber} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={
              touched.customerRegistrationNumber &&
              errors.customerRegistrationNumber
            }
            helperText={
              touched.customerRegistrationNumber
                ? errors.customerRegistrationNumber
                : ""
            }
            variant="filled"
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            required
            placeholder="07xxxxxxxx"
            id="c_mobile_no"
            name="phone01"
            label="Mobile No "
            fullWidth
            size="small"
            value={values.phone01} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={touched.phone01 && errors.phone01}
            helperText={touched.phone01 ? errors.phone01 : ""}
            variant="filled"
          />
        </Grid>
        <Grid item xs={6}>
          <FormTextField
            placeholder="0xxxxxxxxx"
            id="c_office_no"
            name="phone02"
            label="Office No"
            fullWidth
            size="small"
            value={values.phone02} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={touched.phone02 && errors.phone02}
            helperText={touched.phone02 ? errors.phone02 : ""}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            placeholder="Please Enter Your Comment"
            id="c_comment"
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
              color="primary"
              startIcon={<ClearAllIcon />}
              sx={{ mr: 2 }}
              type="reset"
            >
              Clear
            </FormClearButton>

            <FormSaveLoadingButton
              color="primary"
              size="large"
              type="submit"
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
            >
              Save
            </FormSaveLoadingButton>
          </>
        )}
        {props.type === "view" && (
          <>
            <FormButton
              variant="contained"
              size="large"
              color="primary"
              sx={{ mr: 2 }}
              onClick={() => setOpenProjectFilter(true)}
            >
              Projects
            </FormButton>
            <FormEditButton
              variant="contained"
              size="large"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() =>
                navigate(`${AppRoutes.customer_edit.path.replace(":id", id)}`)
              }
            >
              Edit
            </FormEditButton>
          </>
        )}
      </Box>
      <ProjectFilterModal
        openProjectFilter={openProjectFilter}
        setOpenProjectFilter={setOpenProjectFilter}
        id={id}
      />

      <Snackbar
        open={successMessageOpen}
        autoHideDuration={6000}
        onClose={handleCloseSuccessMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        //transitionDuration={100}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSuccessMessage}
          severity="success"
          sx={{
            fontSize: "1.5rem", // Increase text size
            textAlign: "center", // Center text
            display: "flex",
            alignItems: "center",
        }}
        //   action={
        //     <IconButton
        //         size="small"
        //         aria-label="close"
        //         color="inherit"
        //         onClick={handleCloseSuccessMessage}
        //     >
        //         <CloseIcon fontSize="small" />
        //     </IconButton>
        // }
        >
          {props.type === "add"
            ? "Customer added successfully!"
            : "Customer details updated successfully!"}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}
