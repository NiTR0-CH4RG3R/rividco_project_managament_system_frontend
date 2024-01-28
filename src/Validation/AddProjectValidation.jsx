import * as yup from "yup";

export const addProjectValidation = yup.object().shape({
  selectedCustomer: yup.object({
    title: yup.string().required("Required"),
  }),

  selectedReferenceBy: yup.object({
    title: yup.string().required("Required"),
  }),
  description: yup.string().required("Required"),
  status: yup.string().required("Required"),
  location: yup.string().required("Required"),
  startDate: yup.string().required("Required"),
});
