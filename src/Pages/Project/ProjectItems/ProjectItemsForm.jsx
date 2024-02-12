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
const projectItemsValidation = yup.object().shape({
  status: yup.string().required('Required')
  
})

function ProjectItemsForm() {

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
      
      vendorItem :'',
      serialNumber :'',
      warrantyPeriod :'',
      comment :''

    },
    onSubmit: (values) => {
      console.log('form values', values)
    },

    validationSchema:projectItemsValidation
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
              id="vendorItem"
              name="vendorItem"
              select
              label="Vendor Item"
              value={values.vendorItem}
              onBlur={handleBlur}
              error={touched.vendorItem && errors.vendorItem}
              helperText={touched.vendorItem ? errors.vendorItem : ''}
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
                
                id="serialNumber"
                name='serialNumber'
                label="Serial Number"
                value={values.serial_number}
                onChange={handleChange}
            >
          </TextField>
          </div>

            {/* ----------------Warranty Period------------------ */}
            <div>
            <TextField
                
                id="warrantyPeriod"
                name="warrantyPeriod"
                label="Warranty Period"
                value={values.warrantyPeriod}
                onChange={handleChange}
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

export default ProjectItemsForm