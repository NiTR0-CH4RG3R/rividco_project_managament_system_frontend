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
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
//add formik
import { useFormik } from "formik";

const currencies = [
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
  const navi=useNavigate();

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

  function sendData() {
    //addhere
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
    setData({
      firstName: "",
      lastName: "",
      address: "",
      email: "",
      category: "",
      mobileNumber: "",
      officeNumber: "",
      comment: "",
    });
  }

  return (
    <div>
      <form action="">
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
                  label="First Name *"
                  sx={{ width: "100%" }}
                  value={data.firstName}
                  onChange={(e) => onChangeDateSet("firstName", e.target.value)}
                  disabled={props.type === "view"}
                />
              </Grid>
              <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                <TextField
                  placeholder="Please Enter Your Last Name"
                  id="c_last_name"
                  label="Last Name *"
                  sx={{ width: "100%" }}
                  value={data.lastName}
                  onChange={(e) => onChangeDateSet("lastName", e.target.value)}
                  disabled={props.type === "view"}
                />
              </Grid>

              <Grid item xs={12} sx={{ padding: "1em 1em 0em 1em !important" }}>
                <TextField
                  placeholder="No: 00 , road ,city"
                  id="c_address"
                  label="Address *"
                  multiline
                  maxRows={4}
                  sx={{ width: "100%" }}
                  value={data.address}
                  onChange={(e) => onChangeDateSet("address", e.target.value)}
                  disabled={props.type === "view"}
                />
              </Grid>
              <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                <TextField
                  placeholder="example@.com"
                  id="c_email"
                  label="Email *"
                  sx={{ width: "100%" }}
                  value={data.email}
                  onChange={(e) => onChangeDateSet("email", e.target.value)}
                  disabled={props.type === "view"}
                />
              </Grid>
              <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                <TextField
                  id="c_category"
                  select
                  label="Category *"
                  sx={{ width: "100%" }}
                  value={data.category}
                  onChange={(e) => onChangeDateSet("category", e.target.value)}
                  disabled={props.type === "view"}
                >
                  {currencies.map((option) => (
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
                  label="Mobile No *"
                  sx={{ width: "100%" }}
                  value={data.mobileNumber}
                  onChange={(e) =>
                    onChangeDateSet("mobileNumber", e.target.value)
                  }
                  disabled={props.type === "view"}
                />
              </Grid>
              <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                <TextField
                  placeholder="0xxxxxxxxx"
                  id="c_office_no"
                  label="Office No"
                  sx={{ width: "100%" }}
                  value={data.officeNumber}
                  onChange={(e) =>
                    onChangeDateSet("officeNumber", e.target.value)
                  }
                  disabled={props.type === "view"}
                />
              </Grid>
              <Grid item xs={12} sx={{ padding: "1em 1em 0em 1em !important" }}>
                <TextField
                  placeholder="Please Enter Your Comment"
                  id="c_comment"
                  label="Comment"
                  multiline
                  rows={4}
                  sx={{ width: "100%" }}
                  value={data.comment}
                  onChange={(e) => onChangeDateSet("comment", e.target.value)}
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
              sx={{ width: "8.5rem", margin: "1em 0.5em !important" ,backgroundColor:"#d32f2f"}}
              color="secondary"
              startIcon={<ClearAllIcon />}
              onClick={() => clearData()}
            >
              Clear
            </Button>

            <LoadingButton
              color="secondary"
              onClick={sendData}
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              sx={{ width: "8.5rem", margin: "1em 0.5em !important",backgroundColor:'#4caf50' }}
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
