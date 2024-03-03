import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
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
import FormEditButton from "../../Components/StyledComponents/FormEditButton";
import * as vendorService from "../../services/vendorService";
import FormButton from "../../Components/StyledComponents/FormButton";

export default function Vendor(props) {
    function loadVendorData(id, setValues) {
        vendorService
            .getVendor(id)
            .then((vendor) => {
                setValues(vendor);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (props.type === "add") {
            setValues({
                name: "",
                address: "",
                email: "",
                vendorRegistrationNumber: "",
                phone01: "",
                phone02: "",
                comments: "",
            });
        }
    }, [props.type]);

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
                ? `You can edit Vendor ID:#${id} details here.`
                : `You can view Vendor ID:#${id} details here.`
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
        setValues
    } = useFormik({
        initialValues: {
            name: "",
            address: "",
            email: "",
            vendorRegistrationNumber: "",
            phone01: "",
            phone02: "",
            comments: "",
        },
        validationSchema: vendorValidation,
        onSubmit: (values) => {
            setLoading(true);
            if (props.type === "add") {
                vendorService
                    .addVendor(values)
                    .then(() => {
                        setLoading(false);
                        navigate(AppRoutes.vendor_list.path);
                    })
                    .catch((error) => {
                        console.error(error);
                        alert(error);
                        setLoading(false);
                    });
            } else if (props.type === "edit") {
                vendorService
                    .updateVendor(values, id)
                    .then(() => {
                        setLoading(false);
                        navigate(AppRoutes.vendor_list.path);
                    })
                    .catch((error) => {
                        console.error(error);
                        alert(error);
                        setLoading(false);
                    });
            }
        },
    });

    useEffect(() => {
        if (props.type !== "add") {
            loadVendorData(id, setValues);
        }
    }, []);

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
            padding={5}
        >
            <Grid container component={Paper} 
                sx={{
                    p : 2,
                    borderRadius: 3,
                    '& .MuiGrid-item' : {
                        padding: 1
                    },
                }}
                elevation={4}
            >
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
                        variant="filled"

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
                        variant="filled"

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
                        variant="filled"

                    />
                </Grid>
                <Grid item xs={6}>
                    <FormTextField
                        required
                        placeholder="Please enter registration number"
                        name="vendorRegistrationNumber"
                        label="Registration Number"
                        fullWidth
                        size="small"
                        value={values.vendorRegistrationNumber}
                        onChange={handleChange}
                        disabled={props.type === "view"}
                        onBlur={handleBlur}
                        error={touched.vendorRegistrationNumber && errors.vendorRegistrationNumber}
                        helperText={
                            touched.vendorRegistrationNumber ? errors.vendorRegistrationNumber : ""
                        }
                        variant="filled"

                    />
                </Grid>

                <Grid item xs={6}>
                    <FormTextField
                        required
                        placeholder="07xxxxxxxx"
                        name="phone01"
                        label="Mobile No "
                        fullWidth
                        size="small"
                        value={values.phone01}
                        onChange={handleChange}
                        disabled={props.type === "view"}
                        onBlur={handleBlur}
                        error={touched.phone01 && errors.phone01}
                        helperText={touched.phone01 ? errors.phone01 : ""}
                        variant="filled"

                    />
                </Grid>
                <Grid item xs={6}>
                    <FormTextField
                        placeholder="0xxxxxxxxx"
                        name="phone02"
                        label="Office No"
                        fullWidth
                        size="small"
                        value={values.phone02}
                        onChange={handleChange}
                        disabled={props.type === "view"}
                        onBlur={handleBlur}
                        error={touched.phone02 && errors.phone02}
                        helperText={touched.phone02 ? errors.phone02 : ""}
                        variant="filled"

                    />
                </Grid>
                <Grid item xs={12}>
                    <FormTextField
                        placeholder="Please Enter Your Comment"
                        name="comments"
                        label="Comment"
                        multiline
                        rows={4}
                        fullWidth
                        size="small"
                        value={values.comments} //set value using formikß
                        onChange={handleChange} //get onchange value using formik
                        disabled={props.type === "view"}
                        variant="filled"

                    />
                </Grid>
            </Grid>

            <Box display="flex" width="100%" pt={3} justifyContent="flex-end">
                {props.type !== "view" && (
                    <>
                        <FormClearButton
                            variant="outlined"
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
                    <FormEditButton
                        variant="contained"
                        color="primary"
                        startIcon={<EditIcon />}
                        onClick={() =>
                            navigate(`${AppRoutes.vendor_edit.path.replace(":id", id)}`)
                        }
                    >
                        Edit
                    </FormEditButton>
                )}
            </Box>
        </Box>
    );
}
