import * as yup from "yup";

export const customerValidation = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  customerRegistrationNumber: yup.string().required("Required"),
  address: yup.string().required("Required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  category: yup.string().required("Required"),
  phone01: yup
    .string()
    .matches(
      // /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
      // "Please enter a valid mobile number"
      /^\+\d{1,3}[0-9]{9,14}$/,
      "Please enter a valid mobile number with country code"
    )
    .min(10)
    .required("Required"),
  phone02: yup
    .string()
    .matches(
      /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
      "Please enter a valid office number"
    )
    .min(10),
});
