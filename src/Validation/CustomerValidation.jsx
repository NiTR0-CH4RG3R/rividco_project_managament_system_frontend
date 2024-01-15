import * as yup from "yup";

export const customerValidation=yup.object().shape({
   
    firstName: yup.string().required("First name is required"),
    lastName:yup.string().required("Last name is required"),
    address: yup.string().required("Required"),
    email: yup.string().email("Please enter a valid email").required("Required"),
    category: yup.string().required("Required"),
    mobileNumber:yup
    .string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Required"),
    officeNumber:yup
    .string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
});
