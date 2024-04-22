import * as yup from "yup";

export const projectTestValidation = yup.object().shape({
  testName: yup.string().required("Test Name is required"),
  status: yup.number().required("Result is required"),
  selectedEmployee: yup.object().shape({
    id: yup.string().required("Conducted By is required"),
    firstName: yup.string().required("Conducted By is required"),
  }),
  conductedDate: yup.string().required("Conducted Date is required"),
  comment: yup.string(),
});
