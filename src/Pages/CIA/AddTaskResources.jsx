import React, { useEffect, useState } from 'react'
import { Grid, MenuItem, Box } from '@mui/material'
import Paper from "@mui/material/Paper"
import { useTopbarContext } from '../../Contexts/TopbarContext'
import { useNavigate, useParams } from 'react-router-dom'
import { AppRoutes } from '../../Data/AppRoutes'
import FormTextField from '../../Components/StyledComponents/FormTextField'
import { resourceCategory } from './TaskData'
import * as taskResourceService from '../../services/taskResourceService'
import { useFormik } from 'formik'
import TaskResourcesValidation from '../../Validation/TaskResourcesValidation'
import SaveIcon from '@mui/icons-material/Save'
import ClearAllIcon from '@mui/icons-material/ClearAll'
import FormClearButton from '../../Components/StyledComponents/FormClearButton'
import FormSaveLoadingButton from '../../Components/StyledComponents/FormSaveLoadingButton'


const AddTaskResources = (props) => {

    const [loading, setLoading] = useState(false)
    const [modeType, setModeType] = useState(props.type)
    const [resourceId, setResorceId] = useState(props.resorceId)
    const { id } = useParams()
    const navigate = useNavigate()
    const [taskResourceType, setTaskResourceType] = useState([])

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

    function loadTaskResourceData(id, setValues) {
        taskResourceService
        .getTaskResource(resourceId)
        .then((taskresource) => {
            let taskResourceValues = {
                category: taskresource.category,
                url: taskresource.url,
                comment: taskresource.comments,
            }

            setValues(taskResourceValues)
        })

        .catch((error) => {
            console.log(error)
        })
    }

    function loadTaskResourceType() {
        //load status type from the backend
        setTaskResourceType(resourceCategory)
    }
    
    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        handleReset,
        setValues,
    } = useFormik({
        initialValues: {
            category: '',
            url: '',
            comment: '',
        },
        onSubmit: (values) => {
            setLoading(true)

            if(modeType === 'add') {
                taskResourceService
                    .addTaskResource({
                        taskId: id,
                        category: values.category,
                        url: values.url,
                        comments: values.comment,
                    })
                    .then(() => {
                        setLoading(false)

                        navigate(AppRoutes.cia_resources_add.path)
                    })
                    .catch((error) => {
                        console.error(error)
                        alert(error)
                        setLoading(false)
                    })
            }
        },
        validationSchema: TaskResourcesValidation,
    })

    useEffect(() => {
        loadTaskResourceType()

        if(modeType !== 'add') {
            loadTaskResourceData(id, setValues)
        }
    }, [id])

    return (
        
        <Box
            component="form"
            onReset={handleReset}
            onSubmit={handleSubmit}
            noValidate
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            padding={5}
        >
            <Grid container component={Paper} 
                sx={{
                    p : 2,
                    borderRadius: 3,
                    '& .MuiGrid-item' : {
                        padding: 1
                    },
                }}
                elevation={4}>
                <Grid item xs={6}>
                    <FormTextField
                        required
                        placeholder="Please Enter Task Resource Category"
                        id="category"
                        name="category"
                        variant="filled"
                        select
                        label="Category"
                        fullWidth
                        size="small"
                        value={values.category} //set value using formik
                        onChange={handleChange} //get onchange value using formik
                        disabled={props.type === "view"}
                        onBlur={handleBlur}
                        error={touched.category && errors.category}
                        helperText={touched.category ? errors.category : ''}
                    >
                         {resourceCategory.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </FormTextField>

                </Grid>
                <Grid item xs={6}>
                    {/* <FormTextField
                        required
                        type='file'
                        name="file"
                        size="small"
                        fullWidth
                        value={values.url} //set value using formik
                        onChange={(e) => {
                            handleChange(e); // Update formik values
                        }} //get onchange value using formik
                        accept=".pdf,.doc,.docx,.txt" 
                        disabled={props.type === "view"}
                        onBlur={handleBlur}
                        error={touched.url && errors.url}
                        helperText={touched.url ? errors.url : ''}
                    /> */}
                    <input
                        type="file"
                        id="url"
                        name="url"
                        onChange={(e) => {
                            handleChange(e); // Update formik values
                        }}
                        onBlur={handleBlur}
                        disabled={props.type === "view"}
                        accept=".pdf,.doc,.docx,.txt" // Optional: specify accepted file types
                    />
                    {touched.url && errors.url && (
                    <div>{errors.url}</div>
                    )}

                </Grid>
                <Grid item xs ={12}>
                    <FormTextField
                        multiline
                        placeholder="Please Enter a comment"
                        rows={4}
                        fullWidth
                        variant="filled"
                        name='comment'
                        label='Comment'
                        required
                        value={values.comment} //set value using formik
                        onChange={handleChange} //get onchange value using formik
                        disabled={props.type === "view"}
                        onBlur={handleBlur}
                        error={touched.comment && errors.comment}
                        helperText={touched.comment ? errors.comment : ''}
                    />
                </Grid>
            </Grid>
            
        <Box display="flex" pt={3} width="100%" justifyContent="flex-end">
        {modeType !== 'view' && (
          <>
            <FormClearButton
              variant="contained"
              size="large"
              sx={{
                mr: 2,
              }}
              color="primary"
              startIcon={<ClearAllIcon />}
              type="reset"
            >
              Clear
            </FormClearButton>

            <FormSaveLoadingButton
              color="primary"
              type="submit"
              size="large"
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
            >
              <span>Save</span>
            </FormSaveLoadingButton>
          </>
        )}
        </Box>
        </Box>
        
    );
};

export default AddTaskResources;

