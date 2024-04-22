import * as yup from "yup";

export const projectItemValidation = yup.object().shape({
  selectedVendorItem: yup.object().shape({
    id: yup.string().required("Vendor Item is required"),
    productName: yup.string().required("Vendor Item is required"),
  }),
  moduleNumber: yup.string().required("Module Number is required"),
  serialNumber: yup.string().required("Serial Number is required"),
  warrantyPeriod: yup.string().required("Warranty Period is required"),
  comment: yup.string(),
});
