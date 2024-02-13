import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { category } from './ProjectResourcesData';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { ClearAll, Save } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

 /* ---------------- Validation part ------------------ */
const ProjectResourcesValidation = yup.object().shape({
  status: yup.string().required('Required')
  
})

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function ProjectResourcesForm() {

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
      
      category :'',
      resourceName :'',
      comment :''

    },
    onSubmit: (values) => {
      console.log('form values', values)
    },

    validationSchema:ProjectResourcesValidation
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
          {/* ---------------- Name field ------------------ */}
          <div>
            <TextField
                
                id="resourceName"
                name='resourceName'
                label="Resource Name"
                value={values.resourceName}
                onChange={handleChange}
            >
          </TextField>
          </div>

          {/* ---------------- category field ------------------ */}
          <div>
          <TextField
              required
              id="category"
              name="category"
              select
              label="Category"
              value={values.category}
              onBlur={handleBlur}
              error={touched.category && errors.category}
              helperText={touched.category ? errors.category : ''}
              onChange={handleChange}
                
          >
            {category.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
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

          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput type="file" />
           </Button>

          <div>
              <Stack spacing={1} direction="row" justifyContent="flex-end">
                  
                  <Button  variant="contained" startIcon={<ClearAll/>} onClick={handleReset}>  Clear  </Button>
                  <Button  variant="contained" startIcon={<Save/>} onClick={submitForm}>  Save  </Button>
                  
              </Stack>
          </div>
      </Box>

      </form>
    
    </>
  )
}

export default ProjectResourcesForm