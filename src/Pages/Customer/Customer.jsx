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
import { customerValidation } from "../../Validation/CustomerValidation";

const categoryType = [
  {
    value: "Customer",
    label: "Customer",
  },
  {
    value: "Guest",
    label: "Guest",
  },
];

export default function Customer(props) {
  const [loading, setLoading] = React.useState(false);

  //set initial values in formik
  const { values, errors, touched, handleBlur, handleChange, handleSubmit ,handleReset} =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        category: "",
        mobileNumber: "",
        officeNumber: "",
        comment: "",
      },
      validationSchema: customerValidation,
      onSubmit:values=>{
        sendData(values);

      },
    });
  

  //
  const [data, setData] = React.useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    category: "",
    mobileNumber: "",
    officeNumber: "",
    comment: "",
  });
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
    console.log(data);
    clearData();
    
  }

  function handleClick() {
    setLoading(true);
  }

  function onChangeDateSet(id, value) {
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    console.log(data);
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
              <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                <TextField
                  placeholder="Please Enter Your First Name"
                  id="c_first_name"
                  name="firstName"
                  label="First Name *"
                  sx={{ width: "100%" }}
                  value={values.firstName} //set value using formik
                  onChange={handleChange} //get onchange value using formik
                  disabled={props.type === "view"}
                  onBlur={handleBlur}
                  error={errors.firstName}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                <TextField
                  placeholder="Please Enter Your Last Name"
                  id="c_last_name"
                  name="lastName"
                  label="Last Name *"
                  sx={{ width: "100%" }}
                  value={values.lastName} //set value using formik
                  onChange={handleChange} //get onchange value using formik
                  disabled={props.type === "view"}
                  error={errors.lastName}
                  helperText={errors.lastName}
                />
              </Grid>

              <Grid item xs={12} sx={{ padding: "1em 1em 0em 1em !important" }}>
                <TextField
                  placeholder="No: 00 , road ,city"
                  id="c_address"
                  name="address"
                  label="Address *"
                  multiline
                  maxRows={4}
                  sx={{ width: "100%" }}
                  value={values.address} //set value using formik
                  onChange={handleChange} //get onchange value using formik
                  disabled={props.type === "view"}
                  error={errors.address}
                  helperText={errors.address}
                />
              </Grid>
              <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                <TextField
                  placeholder="example@.com"
                  id="c_email"
                  name="email"
                  label="Email *"
                  sx={{ width: "100%" }}
                  value={values.email} //set value using formik
                  onChange={handleChange} //get onchange value using formik
                  disabled={props.type === "view"}
                  className={errors.email && touched.email ? "input-error" : ""}
                  error={errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                <TextField
                  id="c_category"
                  name="category"
                  select
                  label="Category *"
                  sx={{ width: "100%" }}
                  value={values.category} //set value using formik
                  onChange={handleChange} //get onchange value using formik
                  disabled={props.type === "view"}
                  error={errors.category}
                  helperText={errors.category}
                >
                  {categoryType.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                <TextField
                  placeholder="07xxxxxxxx"
                  id="c_mobile_no"
                  name="mobileNumber"
                  label="Mobile No *"
                  ß
                  sx={{ width: "100%" }}
                  value={values.mobileNumber} //set value using formik
                  onChange={handleChange} //get onchange value using formik
                  disabled={props.type === "view"}
                  error={errors.mobileNumber}
                  helperText={errors.mobileNumber}
                />
              </Grid>
              <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                <TextField
                  placeholder="0xxxxxxxxx"
                  id="c_office_no"
                  name="officeNumber"
                  label="Office No"
                  sx={{ width: "100%" }}
                  value={values.officeNumber} //set value using formik
                  onChange={handleChange} //get onchange value using formik
                  disabled={props.type === "view"}
                  error={errors.officeNumberß}
                  helperText={errors.officeNumber}
                />
              </Grid>
              <Grid item xs={12} sx={{ padding: "1em 1em 0em 1em !important" }}>
                <TextField
                  placeholder="Please Enter Your Comment"
                  id="c_comment"
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
