import { useState, useEffect } from "react";
import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";

import SaveIcon from "@mui/icons-material/Save";

import ClearAllIcon from "@mui/icons-material/ClearAll";
import { useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
//add formik
import { useFormik } from "formik";
import { vendorValidation } from "../../Validation/VendorValidation";
import { useTopbarContext } from "../../Contexts/TopbarContext";
import { AppRoutes } from "../../Data/AppRoutes";
import FormTextField from "../../Components/StyledComponents/FormTextField";
import FormClearButton from "../../Components/StyledComponents/FormClearButton";
import FormSaveLoadingButton from "../../Components/StyledComponents/FormSaveLoadingButton";
import FormButton from "../../Components/StyledComponents/FormButton";

export default function Vendor(props) {
    function loadVendorData(id) {
        //add here
    }

    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (props.type !== "add") {
            loadVendorData(id);
        }
    }, []);

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
            setLoading(true);
            //send values to the backend
        },
    });

    //

    const navigate = useNavigate();

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
                    <FormTextField
                        required
                        placeholder="Please Enter Vendor Name"
                        name="name"
                        label="Name "
                        fullWidth
                        size="small"
                        value={values.name} //set value using formik
                        onChange={handleChange} //get onchange value using formik
                        disabled={props.type === "view"}
                        onBlur={handleBlur}
                        error={touched.name && errors.name}
                        helperText={touched.name ? errors.name : ""}
                    />
                </Grid>

                <Grid item xs={12}>
                    <FormTextField
                        required
                        placeholder="No: 00 , road ,city"
                        name="address"
                        label="Address "
                        multiline
                        maxRows={4}
                        fullWidth
                        size="small"
                        value={values.address}
                        onChange={handleChange}
                        disabled={props.type === "view"}
                        onBlur={handleBlur}
                        error={touched.address && errors.address}
                        helperText={touched.address ? errors.address : ""}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormTextField
                        required
                        placeholder="example@.com"
                        type="email"
                        name="email"
                        label="Email "
                        fullWidth
                        size="small"
                        value={values.email}
                        onChange={handleChange}
                        disabled={props.type === "view"}
                        onBlur={handleBlur}
                        error={touched.email && errors.email}
                        helperText={touched.email ? errors.email : ""}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormTextField
                        required
                        placeholder="Please enter registration number"
                        name="email"
                        label="Registration Number"
                        fullWidth
                        size="small"
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
                    <FormTextField
                        required
                        placeholder="07xxxxxxxx"
                        name="mobileNumber"
                        label="Mobile No "
                        fullWidth
                        size="small"
                        value={values.mobileNumber}
                        onChange={handleChange}
                        disabled={props.type === "view"}
                        onBlur={handleBlur}
                        error={touched.mobileNumber && errors.mobileNumber}
                        helperText={touched.mobileNumber ? errors.mobileNumber : ""}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormTextField
                        placeholder="0xxxxxxxxx"
                        name="officeNumber"
                        label="Office No"
                        fullWidth
                        size="small"
                        value={values.officeNumber}
                        onChange={handleChange}
                        disabled={props.type === "view"}
                        onBlur={handleBlur}
                        error={touched.officeNumber && errors.officeNumber}
                        helperText={touched.officeNumber ? errors.officeNumber : ""}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormTextField
                        placeholder="Please Enter Your Comment"
                        name="comment"
                        label="Comment"
                        multiline
                        rows={4}
                        fullWidth
                        size="small"
                        value={values.comment} //set value using formikß
                        onChange={handleChange} //get onchange value using formik
                        disabled={props.type === "view"}
                    />
                </Grid>
            </Grid>

            <Box display="flex" width="100%" pt={3} justifyContent="flex-end">
                {props.type !== "view" && (
                    <>
                        <FormClearButton
                            variant="contained"
                            size="large"
                            sx={{
                                mr: 2,
                            }}
                            color="primary"
                            startIcon={<ClearAllIcon />}
                            type="reset"
                        >
                            Clear
                        </FormClearButton>

                        <FormSaveLoadingButton
                            color="primary"
                            type="submit"
                            size="large"
                            loading={loading}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                        >
                            <span>Save</span>
                        </FormSaveLoadingButton>
                    </>
                )}
                {props.type === "view" && (
                    <FormButton
                        variant="contained"
                        color="primary"
                        startIcon={<EditIcon />}
                        onClick={() => navigate(`${AppRoutes.vendor_edit.path.replace(':id',id)}`)}
                    >
                        Edit
                    </FormButton>
                )}
            </Box>
        </Box>
    );
}
