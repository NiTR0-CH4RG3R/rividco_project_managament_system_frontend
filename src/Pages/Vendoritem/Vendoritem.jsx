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

const vendorcategoryType = [
  {
    value: "Vendor1",
    label: "Vendor1",
  },
  {
    value: "Vendor2",
    label: "Vendor2",
  },
];

export default function Vendoritem(props) {
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
      product_name: "",
      price: "",
      vendor: "",
      warranty_duration: "",
      capacity: "",
      brand: "",
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
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1 },
          }}
          noValidate
          autoComplete="off"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          flexDirection="column"
        >
          <Grid container spacing={2} sx={{ width: "70%" }}>
            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                required
                placeholder="Product name"
                id="product_name"
                name="product_name"
                label="Product name "
                sx={{ width: "100%" }}
                value={values.product_name} //set value using formik
                onChange={handleChange} //get onchange value using formik
                disabled={props.type === "view"}
                onBlur={handleBlur}
                error={touched.product_name && errors.product_name}
                helperText={touched.product_name ? errors.product_name : ""}
              />
            </Grid>
            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                required
                id="vendor"
                name="vendor"
                select
                label="Vendor "
                sx={{ width: "100%" }}
                value={values.vendor} //set value using formik
                onChange={handleChange} //get onchange value using formik
                disabled={props.type === "view"}
                onBlur={handleBlur}
                error={touched.vendor && errors.vendor}
                helperText={touched.vendor ? errors.vendor : ""}
              >
                {vendorcategoryType.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                required
                placeholder="Enter price in LKR (e.g., 500,000 LKR)"
                id="price"
                name="price"
                label="Price "
                multiline
                maxRows={4}
                sx={{ width: "100%" }}
                value={values.price} //set value using formik
                onChange={handleChange} //get onchange value using formik
                disabled={props.type === "view"}
                onBlur={handleBlur}
                error={touched.price && errors.price}
                helperText={touched.price ? errors.price : ""}
              />
            </Grid>
            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                required
                placeholder="Enter warranty duration (e.g., 1 year, 24 months)"
                id="warranty_duration"
                name="warranty_duration"
                label="Warranty duration "
                sx={{ width: "100%" }}
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
            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                required
                placeholder="Enter system capacity (e.g., 5 kW, 1000 liters/second)"
                id="capacity"
                name="capacity"
                label="Capacity "
                sx={{ width: "100%" }}
                value={values.capacity} //set value using formik
                onChange={handleChange} //get onchange value using formik
                disabled={props.type === "view"}
                className={
                  errors.capacity && touched.capacity ? "input-error" : ""
                }
                onBlur={handleBlur}
                error={touched.capacity && errors.capacity}
                helperText={touched.capacity ? errors.capacity : ""}
              />
            </Grid>
            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                placeholder="Enter brand name (e.g., SolarTech, HydroPower Solutions)"
                id="brand"
                name="brand"
                label="Brand"
                multiline
                rows={4}
                sx={{ width: "100%" }}
                value={values.comments} //set value using formikß
                onChange={handleChange} //get onchange value using formik
                disabled={props.type === "view"}
              />
            </Grid>

            <Grid item xs={12} sx={{ padding: "1em 1em 0em 1em !important" }}>
              <TextField
                placeholder="Please Enter Your Comment"
                id="comments"
                name="comments"
                label="Comment"
                multiline
                rows={4}
                sx={{ width: "100%" }}
                value={values.comments} //set value using formikß
                onChange={handleChange} //get onchange value using formik
                disabled={props.type === "view"}
              />
            </Grid>
          </Grid>
          <Box display="flex" width="70%" justifyContent="flex-end">
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
                  }}
                  color="primary"
                  startIcon={<ClearAllIcon />}
                  onClick={() => clearData()}
                >
                  Clear
                </Button>

                <LoadingButton
                  color="primary"
                  type="submit"
                  //onClick={handleSubmit}
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
                  // onClick={() => navi(`/vendor/update/${id}`)}
                >
                  Edit
                </Button>
              </div>
            )}
          </Box>
        </Box>
      </form>
    </div>
  );
}
