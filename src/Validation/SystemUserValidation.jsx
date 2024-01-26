import * as yup from 'yup';

const SystemUserValidation = yup.object().shape({
  FirstName: yup.string().required('First Name is required'),
  LastName: yup.string().required('Last Name is required'),
  Address: yup.string().required('Address is required'),
  Email: yup.string().email('Invalid email').required('Email is required'),
  MobileNo: yup.string().required('Mobile No is required'),
  UserName: yup.string().required('Username is required'),
  Password: yup.string().required('Password is required'),
  Role: yup.string().required('Role is required'),
});

export default SystemUserValidation;