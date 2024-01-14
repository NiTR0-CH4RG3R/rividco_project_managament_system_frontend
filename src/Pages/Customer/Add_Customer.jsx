import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import ClearIcon from '@mui/icons-material/Clear';
import ClearAllIcon from '@mui/icons-material/ClearAll';

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

export default function Add_Customer() {
  const [loading, setLoading] = React.useState(false);
  function handleClick() {
    setLoading(true);
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
                />
              </Grid>
              <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                <TextField
                  placeholder="Please Enter Your Last Name"
                  id="c_last_name"
                  label="Last Name *"
                  sx={{ width: "100%" }}
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
                />
              </Grid>
              <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                <TextField
                  placeholder="example@.com"
                  id="c_email"
                  label="Email *"
                  sx={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                <TextField
                  id="c_category"
                  select
                  label="Category *"
                  defaultValue="Customer"
                  sx={{ width: "100%" }}
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
                />
              </Grid>
              <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                <TextField
                  placeholder="0xxxxxxxxx"
                  id="c_office_no"
                  label="Office No"
                  sx={{ width: "100%" }}
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
                />
              </Grid>
            </Grid>
          </Box>
        </div>
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
            color="secondary"
            startIcon={<ClearAllIcon/>}
          >
            Clear
          </Button>

          <LoadingButton
            color="secondary"
            onClick={handleClick}
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            sx={{ width: "8.5rem", margin: "1em 0.5em !important" }}
          >
            <span>Save</span>
          </LoadingButton>
        </div>
      </form>
    </div>
  );
}
