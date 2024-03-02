import * as yup from 'yup'

export const taskValidation = yup.object().shape({
  description: yup.string().required('Required'),
  callbacknumber: yup
    .string()
    /*.matches(
      /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
      'Please enter a valid mobile number'
    )
    .min(10)
    .required('Required'),*/
    .matches(
      /^\+\d{1,3}[0-9]{9,14}$/,
      'Please enter a valid mobile number with country code'
    )
    .min(12)
    .required('Required'),
  selectedCustomer: yup.object({
    firstName: yup.string().required('Required'),
  }),
})
