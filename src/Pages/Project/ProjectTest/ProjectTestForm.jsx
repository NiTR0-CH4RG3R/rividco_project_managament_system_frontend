import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { result } from "./ProjectTestData";
import { conductedby } from "./ProjectTestData";
import { useFormik } from "formik";
import * as yup from "yup";
import { ClearAll, Save } from "@mui/icons-material";

{
  /* ---------------- Validation part ------------------ */
}
const taskStatusValidation = yup.object().shape({
  status: yup.string().required("Required"),
});

function TaskForm() {
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
      status: "",
      comment: "",
    },
    onSubmit: (values) => {
      console.log("form values", values);
    },

    validationSchema: taskStatusValidation,
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "50ch" },
          }}
          noValidate
          autoComplete="off"
          height="50vh"
          flexDirection="column"
        >
          {/* ---------------- test name field ------------------ */}
          <div>
            <TextField
              id="testName"
              name="Test Name"
              label="Test Name"
              value={values.task}
            ></TextField>
          </div>

          {/* ---------------- Result field ------------------ */}
          <div>
            <TextField
              required
              id="result"
              name="result"
              select
              label="Result"
              value={values.status}
              onBlur={handleBlur}
              error={touched.status && errors.status}
              helperText={touched.status ? errors.status : ""}
              onChange={handleChange}
            >
              {result.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>

          {/* ---------------- Conducted by field ------------------ */}
          <div>
            <TextField
              required
              id="conductedBy"
              name="Conducted By"
              select
              label="Conducted By"
              value={values.status}
              onBlur={handleBlur}
              error={touched.status && errors.status}
              helperText={touched.status ? errors.status : ""}
              onChange={handleChange}
            >
              {conductedby.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>

          {/* ---------------- Conducted Date field ------------------ */}
          <div>
            <TextField
              id="conductedDate"
              name="Conducted Date"
              label="Conducted Date"
              value={values.task}
            ></TextField>
          </div>

          {/* ---------------- comment field ------------------ */}
          <div>
            <TextField
              id="comment"
              name="comment"
              label="Comments"
              multiline
              rows={5}
              value={values.comment}
              onChange={handleChange}
            />
          </div>

          {/* ---------------- Button placement ------------------ */}
          <div>
            <Stack spacing={1} direction="row" justifyContent="flex-end">
              <Button
                variant="contained"
                startIcon={<ClearAll />}
                onClick={handleReset}
              >
                {" "}
                Clear{" "}
              </Button>
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={submitForm}
              >
                {" "}
                Add{" "}
              </Button>
            </Stack>
          </div>
        </Box>
      </form>
    </>
  );
}

export default TaskForm;
