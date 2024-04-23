import { Modal, Button, Grid } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import FormButton from "../../Components/StyledComponents/FormButton";
import FormTextField from "../../Components/StyledComponents/FormTextField";
import FormClearButton from "../../Components/StyledComponents/FormClearButton";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import SaveIcon from "@mui/icons-material/Save";
import FormSaveLodingButton from "../../Components/StyledComponents/FormSaveLoadingButton";
import { useFormik } from "formik";
import * as yup from 'yup';

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const validationSchema = yup.object({
  description: yup.string().required("Description is required"),
  reportNumber: yup.string().required("Report number is required"),
});

export default function CommisionReportModal(props) {
  const { openCommisionReport, setOpenCommisionReport, sendData } = props;

  const handleClose = () => {
    setOpenCommisionReport(false);
  };

  const [loading, setLoading] = useState(false);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: {
      description: "",
      reportNumber: "",
    },
    validationSchema:validationSchema,
  });

  return (
    <Modal open={openCommisionReport} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: 800,
          //minHeight: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6">Upload Commision Report</Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box
          component="form"
          onSubmit={handleSubmit}
          onReset={handleReset}
          noValidate
          display="flex"
          //justifyContent="center"
          //alignItems="center"
          flexDirection="column"
          pt={2}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormTextField
                required
                placeholder="Please enter the description"
                id="description"
                name="description"
                label="Description"
                fullWidth
                size="small"
                variant="filled"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && errors.description}
                helperText={touched.description ? errors.description : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                required
                placeholder="Please enter the report number"
                id="reportNumber"
                name="reportNumber"
                label="Report Number"
                fullWidth
                size="small"
                variant="filled"
                value={values.reportNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.reportNumber && errors.reportNumber}
                helperText={touched.reportNumber ? errors.reportNumber : ""}
              />
            </Grid>
          </Grid>
        

        <div
          style={{
            display: "flex",
            justifyContent: "end",
            padding: "1em 2em 0em 2em !important",
          }}
        >
          <FormButton
            component="label"
            sx={{
              width: "8.5rem",
              margin: "1em 0.5em !important",
            }}
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput type="file" />
          </FormButton>

          <FormClearButton
            variant="outlined"
            size="large"
            sx={{
              mr: 2,
              width: "8.5rem",
              margin: "1em 0.5em !important",
            }}
            color="primary"
            startIcon={<ClearAllIcon />}
            type="reset"
          >
            Clear
          </FormClearButton>
          <FormSaveLodingButton
            color="primary"
            type="submit"
            size="large"
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
          </FormSaveLodingButton>

        </div>
        </Box>
      </Box>
    </Modal>
  );
}
