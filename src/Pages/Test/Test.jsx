import React, { useState } from "react";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import FormSaveLoadingButton from "../../Components/StyledComponents/FormSaveLoadingButton";
import WarrentyField from "../../Components/WarrentyField/WarrentyField";
import * as yup from 'yup';


const validationSchema = yup.object({
    warrenty: yup.number().required('Warrenty is required').min(0, 'Warrenty must be greater than or equal to 0'),
});

export default function Test() {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            warrenty: 0,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoading(true);
            console.log(values);
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        },

    });

    return (
        <Box
            component="form"
            onReset={formik.handleReset}
            onSubmit={formik.handleSubmit}
            noValidate
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
        >
            <WarrentyField
                required
                name="warrenty"
                value={formik.values.warrenty}
                onChange={formik.handleChange}
                className={formik.errors.warrenty && formik.touched.warrenty ? "input-error" : ""}
                onBlur={formik.handleBlur}
                error={formik.touched.warrenty && formik.errors.warrenty}
                helperText={formik.touched.warrenty ? formik.errors.warrenty : ""}
            />

            <FormSaveLoadingButton
                loading={loading}
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{
                    marginTop: 2,
                }}
            >
                Submit
            </FormSaveLoadingButton>
        </Box>
    );
}