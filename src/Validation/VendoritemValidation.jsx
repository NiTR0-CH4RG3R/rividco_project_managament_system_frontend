import * as yup from "yup";

export const VendoritemValidation = yup.object().shape({
  product_name: yup.string().required("Required"),
  productCode: yup.string().required("Required"),
  brand: yup.string().required("Required"),

  price: yup.string().required("Required"),
  warranty_duration: yup.string().required("Required"),
  capacity: yup.string().required("Required"),
  
  selectedVendor: yup.object({
    name: yup.string().required("Required"),
  }),
});
