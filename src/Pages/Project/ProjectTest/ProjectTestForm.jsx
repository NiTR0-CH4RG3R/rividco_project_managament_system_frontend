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
const projectTestValidation = yup.object().shape({
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
      testName: "",
      result:"",
      conductedBy:"",
      conductedDate:"",

    },
    onSubmit: (values) => {
      console.log("form values", values);
    },

    validationSchema: projectTestValidation,
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
              name="testName"
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
              value={values.result}
              onBlur={handleBlur}
              error={touched.result && errors.result}
              helperText={touched.result ? errors.result : ""}
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
              name="conductedBy"
              select
              label="Conducted By"
              value={values.conductedBy}            
              error={touched.conductedBy && errors.conductedBy}
              helperText={touched.conductedBy ? errors.conductedBy : ""}
              onChange={handleChange}
              onBlur={handleBlur}
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
                        required
                        type="date"
                        placeholder="Select the Commision Date"
                        id="conductedDate"
                        name="conductedDate"
                        label="Conducted Date"
                        fullWidth
                        value={values.startDate} //set value using formik
                        onChange={handleChange} //get onchange value using formik
                        onBlur={handleBlur}
                        InputLabelProps={{ shrink: true }}
                        error={touched.conductedDate && errors.conductedDate}
                        helperText={touched.conductedDate ? errors.conductedDate : ""}
                    />
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
