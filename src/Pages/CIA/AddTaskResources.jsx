import React, { useEffect, useState } from 'react'
import { Grid, MenuItem, Box } from '@mui/material'
import { useTopbarContext } from '../../Contexts/TopbarContext'
import { useNavigate, useParams } from 'react-router-dom'
import { AppRoutes } from '../../Data/AppRoutes'
import FormTextField from '../../Components/StyledComponents/FormTextField'
import { resourceCategory } from './TaskData'

const AddTaskResources = (props) => {

    const [loading, setLoading] = useState(false);
    const { id } = useParams()
    const navi = useNavigate()
    const [taskStatusType, setTaskResourceType] = useState([])

    const { setTitle, setSubtitle } = useTopbarContext()
    setTitle(
        props.type === 'add'
            ? 'Add a new CIA Task Resource'
            : `View CIA Task Resource`
    )
    setSubtitle(
        props.type === 'add'
            ? 'You can add CIA Task Resource here.'
            : `You can CIA Task Resource details here.`
    )

    function loadTaskResourceType() {
        //load status type from the backend
        setTaskResourceType(resourceCategory)
      }

    return (
        
        <Box
            component="form"
            noValidate
            autoComplete="off"
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            flexDirection="column"
            width="90%"
        >
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <FormTextField
                        required
                        placeholder="Please Enter Task Resource Category"
                        id="category"
                        name="category"
                        select
                        label="Category"
                        fullWidth
                        size="small"
                        // value={values.firstName} //set value using formik
                        // onChange={handleChange} //get onchange value using formik
                        // disabled={props.type === "view"}
                        // onBlur={handleBlur}
                        // error={touched.firstName && errors.firstName}
                        // helperText={touched.firstName ? errors.firstName : ""}
                    >
                         {resourceCategory.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </FormTextField>

                </Grid>
                <Grid item xs={6}>
                    <FormTextField
                        required
                        type='file'
                        name="lastName"
                        size="small"
                        fullWidth
                        // value={values.lastName} //set value using formik
                        // onChange={handleChange} //get onchange value using formik
                        // disabled={props.type === "view"}
                        // onBlur={handleBlur}
                        // error={touched.lastName && errors.lastName}
                        // helperText={touched.lastName ? errors.lastName : ""}
                    />
                </Grid>
                <Grid item xs ={12}>
                    <FormTextField
                        multiline
                        rows={4}
                        fullWidth
                        name='comment'
                        label='Comment'
                        required
                    />
                </Grid>
            </Grid>
        </Box>
        
    );
};

export default AddTaskResources;

