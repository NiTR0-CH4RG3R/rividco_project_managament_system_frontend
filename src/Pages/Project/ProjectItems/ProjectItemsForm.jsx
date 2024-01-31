import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { vendoritems } from './ProjectItemsData';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { ClearAll, Save } from '@mui/icons-material';

{/* ---------------- Validation part ------------------ */}
const taskStatusValidation = yup.object().shape({
  status: yup.string().required('Required')
  
})

function TaskForm() {

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
    submitForm,
    } = useFormik({
    initialValues :{
      
      vendor_item :'',
      serial_number :'',
      warranty_period :'',
      comment :''

    },
    onSubmit: (values) => {
      console.log('form values', values)
    },

    validationSchema:taskStatusValidation
  })

  return (
    <>
      <form onSubmit={handleSubmit}>

      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '50ch' },
        }}
        noValidate
          autoComplete="off"
          height="50vh"
          flexDirection="column"
      >   
         
          {/* ---------------- Vendor Item field ------------------ */}
          <div>
          <TextField
              required
              id="vendor_item"
              name='VendorItem'
              select
              label="Vendor Item"
              value={values.vendor_item}
              onBlur={handleBlur}
              error={touched.status && errors.status}
              helperText={touched.status ? errors.status : ''}
              onChange={handleChange}
                
          >
            {vendoritems.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          </div>

           {/* ---------------- Task field ------------------ */}
           <div>
            <TextField
                
                id="serialNo"
                name='Serial Number'
                label="Serial Number"
                value={values.serial_number}
            >
          </TextField>
          </div>

            {/* ----------------Warranty Period------------------ */}
            <div>
            <TextField
                
                id="warrantyPeriod"
                name='Warranty Period'
                label="Warranty Period"
                value={values.warranty_period}
            >
          </TextField>
          </div>


          {/* ---------------- comment field ------------------ */}
          <div>
          <TextField
            id="comment"
            name='comment'
            label="Comments"
            multiline
            rows={5}
            value={values.comment}
            onChange={handleChange}
          />
          </div>

          {/* ---------------- Button placement ------------------ */}
          <div>
              <Stack spacing={1} direction="row" justifyContent="flex-end">
                  
                  <Button  variant="contained" startIcon={<ClearAll/>} onClick={handleReset}>  Clear  </Button>
                  <Button  variant="contained" startIcon={<Save/>} onClick={submitForm}>  Add  </Button>
                  
              </Stack>
          </div>
      </Box>

      </form>
    
    </>
  )
}

export default TaskForm