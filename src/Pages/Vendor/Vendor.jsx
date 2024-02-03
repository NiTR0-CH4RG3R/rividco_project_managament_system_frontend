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
//add formik
import { useFormik } from "formik";
import { vendorValidation } from "../../Validation/VendorValidation";
import { useTopbarContext } from "../../Contexts/TopbarContext";

export default function Vendor(props) {
  const { setTitle, setSubtitle } = useTopbarContext();
  setTitle(
    props.type === "add"
      ? "Add a new Vendor"
      : props.type === "edit"
      ? "Edit Vendor Details"
      : `View Vendor Details`
  );
  setSubtitle(
    props.type === "add"
      ? "You can add a new vendor here."
      : props.type === "edit"
      ? "You can edit vendor details here."
      : `You can view vendor details here.`
  );

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
    submitForm,
  } = useFormik({
    initialValues: {
      name: "",
      address: "",
      email: "",
      registrationNumber: "",
      mobileNumber: "",
      officeNumber: "",
      comment: "",
    },
    validationSchema: vendorValidation,
    onSubmit: (values) => {
      sendData(values);
    },
  });

  //

  const { id } = useParams();
  const navi = useNavigate();

  React.useEffect(() => {
    console.log(props);

    if (props.type !== "add") {
      console.log(id);
      getDataFromApi(id);
    }
  }, []);

  function getDataFromApi(id) {
    //add here
  }

  function sendData(data) {
    //addhere
    setLoading(true);
    console.log(data);
    clearData();
    setLoading(false);
  }

  function clearData() {
    handleReset();
  }

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
        <Grid item xs={12}>
          <TextField
            required
            placeholder="Please Enter Vendor Name"
            name="name"
            label="Name "
            fullWidth
            value={values.name} //set value using formik
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={touched.name && errors.name}
            helperText={touched.name ? errors.name : ""}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            placeholder="No: 00 , road ,city"
            name="address"
            label="Address "
            multiline
            maxRows={4}
            fullWidth
            value={values.address}
            onChange={handleChange}
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={touched.address && errors.address}
            helperText={touched.address ? errors.address : ""}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            placeholder="example@.com"
            type="email"
            name="email"
            label="Email "
            fullWidth
            value={values.email}
            onChange={handleChange}
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={touched.email && errors.email}
            helperText={touched.email ? errors.email : ""}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            placeholder="Please enter registration number"
            name="email"
            label="Registration Number"
            fullWidth
            value={values.registrationNumber}
            onChange={handleChange}
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={touched.registrationNumber && errors.registrationNumber}
            helperText={
              touched.registrationNumber ? errors.registrationNumber : ""
            }
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            required
            placeholder="07xxxxxxxx"
            name="mobileNumber"
            label="Mobile No "
            fullWidth
            value={values.mobileNumber}
            onChange={handleChange}
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={touched.mobileNumber && errors.mobileNumber}
            helperText={touched.mobileNumber ? errors.mobileNumber : ""}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            placeholder="0xxxxxxxxx"
            name="officeNumber"
            label="Office No"
            fullWidth
            value={values.officeNumber}
            onChange={handleChange}
            disabled={props.type === "view"}
            onBlur={handleBlur}
            error={touched.officeNumber && errors.officeNumber}
            helperText={touched.officeNumber ? errors.officeNumber : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            placeholder="Please Enter Your Comment"
            name="comment"
            label="Comment"
            multiline
            rows={4}
            fullWidth
            value={values.comment} //set value using formikß
            onChange={handleChange} //get onchange value using formik
            disabled={props.type === "view"}
          />
        </Grid>
      </Grid>

      <Box display="flex" width="100%" justifyContent="flex-end">
        {props.type !== "view" && (
          <>
            <Button
              variant="contained"
              sx={{
                width: "8.5rem",
                margin: "1em 0.5em !important",
              }}
              color="primary"
              startIcon={<ClearAllIcon />}
              onClick={() => clearData()}
            >
              Clear
            </Button>

            <LoadingButton
              color="primary"
              //type="submit"
              onClick={submitForm}
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              sx={{
                width: "8.5rem",
                margin: "1em 0.5em !important",
              }}
            >
              <span>Save</span>
            </LoadingButton>
          </>
        )}
        {props.type === "view" && (
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              padding: "1em 2em 0em 2em !important",
            }}
          >
            <Button
              variant="contained"
              sx={{ width: "8.5rem", margin: "1em 0.5em !important" }}
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => navi(`/customer/update/${id}`)}
            >
              Edit
            </Button>
          </div>
        )}
      </Box>
    </Box>
  );
}
