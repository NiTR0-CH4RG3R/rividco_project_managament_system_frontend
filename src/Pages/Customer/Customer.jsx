import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";

import SaveIcon from "@mui/icons-material/Save";

import ClearAllIcon from "@mui/icons-material/ClearAll";
import { useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
//add formik
import { useFormik } from "formik";
import { customerValidation } from "./CustomerValidation";
import { useTopbarContext } from "../../Contexts/TopbarContext";
import { AppRoutes } from "../../Data/AppRoutes";
import FormTextField from "../../Components/StyledComponents/FormTextField";
import FormClearButton from "../../Components/StyledComponents/FormClearButton";
import FormSaveLoadingButton from "../../Components/StyledComponents/FormSaveLoadingButton";
import FormButton from "../../Components/StyledComponents/FormButton";

export default function Customer(props) {
    const [loading, setLoading] = useState(false);
    const [categoryType, setCategoryType] = useState([]);

    function loadCustomerData(id) {
        // Load customer data from the backend
    }

    function loadCategoryType() {
        // Load category type from the backend
        setCategoryType([
            {
                value: "Customer",
                label: "Customer",
            },
            {
                value: "Guest",
                label: "Guest",
            },

            {
                value: "Business",
                label: "Business",
            },
        ]);
    }

    const { id } = useParams();

    useEffect(() => {
        loadCategoryType();

        if (props.type !== "add") {
            loadCustomerData(id);
        }
    }, []);

    const { setTitle, setSubtitle } = useTopbarContext();
    setTitle(
        props.type === "add"
            ? "Add a new Customer"
            : props.type === "edit"
                ? "Edit Customer Details"
                : `View Customer Details`
    );
    setSubtitle(
        props.type === "add"
            ? "You can add a new customers here."
            : props.type === "edit"
                ? "You can edit customer details here."
                : `You can view customer details here.`
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
    } = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            address: "",
            email: "",
            category: "",
            profession: "",
            customerId: "",
            mobileNumber: "",
            officeNumber: "",
            comment: "",
        },
        validationSchema: customerValidation,
        onSubmit: (values) => {
            setLoading(true);
            // Send values to the backend
        },
    });

    const navigate = useNavigate();

    return (
        <Box
            component="form"
            onReset={handleReset}
            onSubmit={handleSubmit}
            noValidate
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            width="70%"
        >
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <FormTextField
                        required
                        placeholder="Please Enter Your First Name"
                        name="firstName"
                        label="First Name"
                        fullWidth
                        value={values.firstName} //set value using formik
                        onChange={handleChange} //get onchange value using formik
                        disabled={props.type === "view"}
                        onBlur={handleBlur}
                        error={touched.firstName && errors.firstName}
                        helperText={touched.firstName ? errors.firstName : ""}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormTextField
                        required
                        placeholder="Please Enter Your Last Name"
                        name="lastName"
                        label="Last Name "
                        fullWidth
                        value={values.lastName} //set value using formik
                        onChange={handleChange} //get onchange value using formik
                        disabled={props.type === "view"}
                        onBlur={handleBlur}
                        error={touched.lastName && errors.lastName}
                        helperText={touched.lastName ? errors.lastName : ""}
                    />
                </Grid>

                <Grid item xs={12}>
                    <FormTextField
                        required
                        placeholder="No: 00 , road ,city"
                        id="c_address"
                        name="address"
                        label="Address "
                        multiline
                        maxRows={4}
                        sx={{ width: "100%" }}
                        value={values.address} //set value using formik
                        onChange={handleChange} //get onchange value using formik
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
                        id="c_email"
                        name="email"
                        label="Email "
                        sx={{ width: "100%" }}
                        value={values.email} //set value using formik
                        onChange={handleChange} //get onchange value using formik
                        disabled={props.type === "view"}
                        className={errors.email && touched.email ? "input-error" : ""}
                        onBlur={handleBlur}
                        error={touched.email && errors.email}
                        helperText={touched.email ? errors.email : ""}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormTextField
                        required
                        id="c_category"
                        name="category"
                        select
                        label="Category "
                        sx={{ width: "100%" }}
                        value={values.category} //set value using formik
                        onChange={handleChange} //get onchange value using formik
                        disabled={props.type === "view"}
                        onBlur={handleBlur}
                        error={touched.category && errors.category}
                        helperText={touched.category ? errors.category : ""}
                    >
                        {categoryType.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </FormTextField>
                </Grid>
                <Grid item xs={6}>
                    <FormTextField
                        id="c_profession"
                        name="profession"
                        label={
                            values.category === "Business"
                                ? "Nature of the business"
                                : "Profession"
                        }
                        placeholder={
                            values.category === "Business"
                                ? "Please enter the nature of the business "
                                : "Please enter the profession of the customer"
                        }
                        sx={{ width: "100%" }}
                        value={values.profession} //set value using formik
                        onChange={handleChange} //get onchange value using formik
                        disabled={props.type === "view"}
                        onBlur={handleBlur}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormTextField
                        required
                        placeholder="Please Enter Customer Id"
                        name="customerId"
                        label="Customer Id"
                        fullWidth
                        value={values.customerId} //set value using formik
                        onChange={handleChange} //get onchange value using formik
                        disabled={props.type === "view"}
                        onBlur={handleBlur}
                        error={touched.customerId && errors.customerId}
                        helperText={touched.customerId ? errors.customerId : ""}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormTextField
                        required
                        placeholder="07xxxxxxxx"
                        id="c_mobile_no"
                        name="mobileNumber"
                        label="Mobile No "
                        sx={{ width: "100%" }}
                        value={values.mobileNumber} //set value using formik
                        onChange={handleChange} //get onchange value using formik
                        disabled={props.type === "view"}
                        onBlur={handleBlur}
                        error={touched.mobileNumber && errors.mobileNumber}
                        helperText={touched.mobileNumber ? errors.mobileNumber : ""}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormTextField
                        placeholder="0xxxxxxxxx"
                        id="c_office_no"
                        name="officeNumber"
                        label="Office No"
                        sx={{ width: "100%" }}
                        value={values.officeNumber} //set value using formik
                        onChange={handleChange} //get onchange value using formik
                        disabled={props.type === "view"}
                        onBlur={handleBlur}
                        error={touched.officeNumber && errors.officeNumber}
                        helperText={touched.officeNumber ? errors.officeNumber : ""}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormTextField
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
            <Box display="flex" width="100%" pt={3} justifyContent="flex-end">
                {props.type !== "view" && (
                    <>
                        <FormClearButton
                            variant="contained"
                            size="large"
                            color="primary"
                            startIcon={<ClearAllIcon />}
                            sx={{ mr: 2 }}
                            type="reset"
                        >
                            Clear
                        </FormClearButton>

                        <FormSaveLoadingButton
                            color="primary"
                            size="large"
                            type="submit"
                            loading={loading}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                        >
                            Save
                        </FormSaveLoadingButton>
                    </>
                )}
                {props.type === "view" && (
                    <FormButton
                        variant="contained"
                        color="primary"
                        startIcon={<EditIcon />}
                        onClick={() => navigate(`${AppRoutes.customer_edit.path}/${id}`)}
                    >
                        Edit
                    </FormButton>
                )}
            </Box>
        </Box>
    );
}
