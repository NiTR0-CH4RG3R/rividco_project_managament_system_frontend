import * as yup from "yup";

export const customerValidation = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  address: yup.string().required("Required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  category: yup.string().required("Required"),
  mobileNumber: yup
    .string()
    .matches(
      /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
      "Please enter a valid mobile number"
    )
    .min(10)
    .required("Required"),
  officeNumber: yup
    .string()
    .matches(
      /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
      "Please enter a valid office number"
    )
    .min(10),
});
