import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { statuses } from './ProjectServicesData';
import { users } from '../ProjectServices/ProjectServicesData';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { ClearAll, Save } from '@mui/icons-material';

{/* ---------------- Validation part ------------------ */}
const projectServicesValidation = yup.object().shape({
  status: yup.string().required('Required')
  
})

function ProjectServicesForm() {

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
      
      status :'',
      conductedBy :'',
      dueDate :'',
      description :''

    },
    onSubmit: (values) => {
      console.log('form values', values)
    },

    validationSchema:projectServicesValidation
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
         
         {/* ---------------- Description field ------------------ */}
         <div>
          <TextField
            id="description"
            name='description'
            label="Descriptions"
            multiline
            rows={5}
            value={values.description}
            onChange={handleChange}
          />
          </div>

          {/* ---------------- status field ------------------ */}
          <div>
          <TextField
              required
              id="status"
              name="status"
              select
              label="Status"
              value={values.status}
              onBlur={handleBlur}
              error={touched.status && errors.status}
              helperText={touched.status ? errors.status : ''}
              onChange={handleChange}
                
          >
            {statuses.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          </div>

          {/* ---------------- conducted by field ------------------ */}
          <div>
          <TextField
              required
              id="conductedBy"
              name="conductedBy"
              select
              label="Conducted By"
              value={values.conductedBy}
              onBlur={handleBlur}
              error={touched.conductedBy && errors.conductedBy}
              helperText={touched.conductedBy ? errors.conductedBy : ''}
              onChange={handleChange}
                
          >
            {users.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          </div>

           

            
            {/* ---------------- due Date field ------------------ */}
          <div>
          
          <TextField
                      required
                      type="date"
                      placeholder="Select the Due Date"
                      id="dueDate"
                      name="dueDate"
                      label="Conducted Date"
                      fullWidth
                      value={values.dueDate} //set value using formik
                      onChange={handleChange} //get onchange value using formik
                      onBlur={handleBlur}
                      InputLabelProps={{ shrink: true }}
                      error={touched.dueDate && errors.dueDate}
                      helperText={touched.dueDate ? errors.dueDate : ""}
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

export default ProjectServicesForm