import * as yup from 'yup';

const SystemUserValidation = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  address: yup.string().required('Address is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  mobileNo: yup.string().required('Mobile No is required'),
  userName: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  role: yup.string().required('Role is required'),
});

export default SystemUserValidation;