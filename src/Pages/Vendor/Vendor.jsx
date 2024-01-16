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

export default function Vendor(props) {
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
  } = useFormik({
    initialValues: {
      name: "",
      address: "",
      email: "",
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
    <div>
      <form onSubmit={handleSubmit}>
        <div className="">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2} sx={{ width: "100vw" }}>
              <Grid item xs={12} sx={{ padding: "1em 1em 0em 1em !important" }}>
                <TextField
                  placeholder="Please Enter Vendor Name"
                  id="v_name"
                  name="name"
                  label="Name *"
                  sx={{ width: "100%" }}
                  value={values.name} //set value using formik
                  onChange={handleChange} //get onchange value using formik
                  disabled={props.type === "view"}
                  onBlur={handleBlur}
                  error={touched.name && errors.name}
                  helperText={touched.name ? errors.name : ""}
                />
              </Grid>

              <Grid item xs={12} sx={{ padding: "1em 1em 0em 1em !important" }}>
                <TextField
                  placeholder="No: 00 , road ,city"
                  id="v_address"
                  name="address"
                  label="Address *"
                  multiline
                  maxRows={4}
                  sx={{ width: "100%" }}
                  value={values.address}
                  onChange={handleChange}
                  disabled={props.type === "view"}
                  onBlur={handleBlur}
                  error={touched.address && errors.address}
                  helperText={touched.address ? errors.address : ""}
                />
              </Grid>
              <Grid item xs={12} sx={{ padding: "1em 1em 0em 1em !important" }}>
                <TextField
                  placeholder="example@.com"
                  id="v_email"
                  type="email"
                  name="email"
                  label="Email *"
                  sx={{ width: "100%" }}
                  value={values.email}
                  onChange={handleChange}
                  disabled={props.type === "view"}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                  helperText={touched.email ? errors.email : ""}
                />
              </Grid>

              <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                <TextField
                  placeholder="07xxxxxxxx"
                  id="v_mobile_no"
                  name="mobileNumber"
                  label="Mobile No *"
                  sx={{ width: "100%" }}
                  value={values.mobileNumber}
                  onChange={handleChange}
                  disabled={props.type === "view"}
                  onBlur={handleBlur}
                  error={touched.mobileNumber && errors.mobileNumber}
                  helperText={touched.mobileNumber ? errors.mobileNumber : ""}
                />
              </Grid>
              <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                <TextField
                  placeholder="0xxxxxxxxx"
                  id="v_office_no"
                  name="officeNumber"
                  label="Office No"
                  sx={{ width: "100%" }}
                  value={values.officeNumber}
                  onChange={handleChange}
                  disabled={props.type === "view"}
                  onBlur={handleBlur}
                  error={touched.officeNumber && errors.officeNumber}
                  helperText={touched.officeNumber ? errors.officeNumber : ""}
                />
              </Grid>
              <Grid item xs={12} sx={{ padding: "1em 1em 0em 1em !important" }}>
                <TextField
                  placeholder="Please Enter Your Comment"
                  id="v_comment"
                  name="comment"
                  label="Comment"
                  multiline
                  rows={4}
                  sx={{ width: "100%" }}
                  value={values.comment} //set value using formikß
                  onChange={handleChange} //get onchange value using formik
                  disabled={props.type === "view"}
                />
              </Grid>
            </Grid>
          </Box>
        </div>
        {props.type !== "view" && (
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              padding: "1em 2em 0em 2em !important",
            }}
          >
            <Button
              variant="contained"
              sx={{
                width: "8.5rem",
                margin: "1em 0.5em !important",
                backgroundColor: "#d32f2f",
              }}
              color="secondary"
              startIcon={<ClearAllIcon />}
              onClick={() => clearData()}
            >
              Clear
            </Button>

            <LoadingButton
              color="secondary"
              type="submit"
              //onClick={handleSubmit}
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              sx={{
                width: "8.5rem",
                margin: "1em 0.5em !important",
                backgroundColor: "#4caf50",
              }}
            >
              <span>Save</span>
            </LoadingButton>
          </div>
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
      </form>
    </div>
  );
}
