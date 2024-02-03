import { useFormik } from "formik";
import { Box } from "@mui/material";
import WarrentyField from "../../Components/WarrentyField/WarrentyField";
import * as yup from 'yup';



export default function Test() {
    const formik = useFormik({
        initialValues: {
            warrenty: 0,
        },
        onSubmit: (values) => {
            console.log(values);
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

            <button type="submit">Submit</button>
        </Box>
    );
}