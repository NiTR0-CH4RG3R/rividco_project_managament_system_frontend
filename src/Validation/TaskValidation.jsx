import * as yup from 'yup'

export const taskValidation = yup.object().shape({
  description: yup.string().required('Required'),
  callbacknumber: yup
    .string()
    .matches(
      /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
      'Please enter a valid mobile number'
    )
    .min(10)
    .max(10)
    .required('Required'),
})
