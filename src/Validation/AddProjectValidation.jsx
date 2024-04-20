import * as yup from "yup";

export const addProjectValidation = yup.object().shape({
    selectedCustomer: yup.object().shape({
      id: yup.string().required("Required"),
      firstName: yup.string().required("Required"),
    }),
  
    // selectedReferenceBy: yup.object().shape({
    //   id: yup.string().required("Required"),
    //   firstName: yup.string().required("Required"),
    // }),
  
    selectedEmployee: yup.object().shape({
      id: yup.string().required("Required"),
      firstName: yup.string().required("Required"),
    }),
  
    // selectedSalesPerson: yup.object().shape({
    //   id: yup.string().required("Required"),
    //   firstName: yup.string().required("Required"),
    // }),
  
    description: yup.string().required("Required"),
    status: yup.string().required("Required"),
    location: yup.string().required("Required"),
    startDate: yup.string().required("Required"),
  });
  
