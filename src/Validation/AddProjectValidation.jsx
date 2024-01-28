import * as yup from "yup";


export const addProjectValidation = yup.object().shape({

    selectedCustomer:yup.string().required("Required"),
    description:yup.string().required("Required"),
});