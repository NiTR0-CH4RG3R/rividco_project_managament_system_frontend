import React, { useEffect, useState } from 'react'
import { Grid, MenuItem, Box } from '@mui/material'
import ClearAllIcon from '@mui/icons-material/ClearAll'
import SaveIcon from '@mui/icons-material/Save'
import AddIcon from '@mui/icons-material/Add'
import FormTextField from '../../Components/StyledComponents/FormTextField'
import FormButton from '../../Components/StyledComponents/FormButton'
import FormClearButton from '../../Components/StyledComponents/FormClearButton'
import FormSaveLoadingButton from '../../Components/StyledComponents/FormSaveLoadingButton'
import { useTopbarContext } from '../../Contexts/TopbarContext'
import { useNavigate, useParams } from 'react-router-dom'
import ListPage from '../../Components/ListPage/ListPage'
import { AppRoutes } from '../../Data/AppRoutes'
import { Remove } from '@mui/icons-material'
import * as taskResourceService from "../../services/taskResourceService"
import { useFormik } from "formik"
import TaskResourcesValidation from '../../Validation/TaskResourcesValidation'

const AddTaskResources = (props) => {

    const [loading, setLoading] = useState(false);

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

    const [fields, setFields] = useState([{ category: '', file: null, comment: '' }]);

    const handleAddField = () => {
        setFields([...fields, { category: '', file: null, comment: '' }]);
    };
 
    const handleRemoveField = (index) => {
        const newFields = [...fields];
        newFields.splice(index, 1);
        setFields(newFields);
    };

    const handleChange = (index, field, value) => {
        const newFields = [...fields];
        newFields[index][field] = value;
        setFields(newFields);
    };

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        handleReset,
        setValues,
    } = useFormik({
        initialValues: {
            category: fields.map((fld) => fld.category),
            files: fields.map((fld) => fld.file),
            comment: fields.map((fld) => fld.comment),
        },
        validationSchema: TaskResourcesValidation,
        onSubmit: (values) => {
            setLoading(true);
            if (props.type === "add") {
                taskResourceService.AddTaskResources(values)
                    .then(() => {
                        setLoading(false);
                        navi(AppRoutes.cia_resources_add.path);
                    })
                    .catch((error) => {
                        console.error(error);
                        alert(error);
                        setLoading(false);
                    });
            }
            else if (props.type === "edit") {
                taskResourceService.updateTaskResources(values, id)
                    .then(() => {
                        setLoading(false);
                        navi(AppRoutes.cia_resources_edit.path);
                    })
                    .catch((error) => {
                        console.error(error);
                        alert(error);
                        setLoading(false);
                    });
            }
        },
    });

    useEffect(() => {
        if (props.type === "add") {
            setValues({
                category: "",
                file: "",
                comment: "",
            });
        }
    }, [props.type]);

    

    const columns = [
        { id: 'category', label: 'Category', align: 'left' },
        { id: 'filelink', label: 'File Link', align: 'left' },
        { id: 'comment', label: 'Comment', align: 'left' },
        { id: 'addedby', label: 'Added By', align: 'left' },
        { id: 'addeddate', label: 'Added Date' },
    ];

    const [rows, setRows] = useState([
        { id: 0, category: 'Image', filelink: 'file path or file link', comment: 'newly updated', addedby: 'john silva', addeddate: '2024-01-30', }
    ]);

    const { id } = useParams()
    const navi = useNavigate()


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
            {props.type === 'add' && (
            <Grid container spacing={2} sx={{ width: '70%', marginBottom: '1rem' }}>
            <Grid item xs={12}>
                <FormTextField
                    id="taskId"
                    variant="outlined"
                    disabled
                    label="TaskId"
                    fullWidth
                    size='small'
                />
            </Grid>
            </Grid>
            )}
                
            {fields.map((field, index) => (
                <Grid container spacing={2} key={index} sx={{ width: '70%', marginBottom: '1rem' }}>
                    {/* ---------------Category Field---------------- */}
                    {props.type === 'add' && (
                    <Grid item xs={4}>
                        <FormTextField
                            select
                            variant="outlined"
                            value={field.category}
                            onChange={(e) => handleChange(index, 'category', e.target.value)}
                            label="Category"
                            required
                            fullWidth
                            size='small'
                        >
                            <MenuItem value="images">Image</MenuItem>
                            <MenuItem value="documents">Document</MenuItem>
                            <MenuItem value="others">Other</MenuItem>
                        </FormTextField>
                    </Grid>
                    )}

                    {/* ---------------FileUpload Field---------------- */}
                    {props.type === 'add' && (
                    <Grid item xs={4}>
                        <FormTextField
                            type="file"
                            fullWidth
                            onChange={(e) => handleChange(index, 'file', e.target.files[0])}
                            required
                            size='small'
                        />
                    </Grid>
                    )}

                    {/* ---------------Comment Field---------------- */}
                    
                    {props.type === 'add' && (
                    <Grid item xs={4}>
                        <FormTextField
                            variant="outlined"
                            label="Comment"
                            fullWidth
                            required
                            size='small'
                            rows={2}
                            value={field.comment}
                            onChange={(e) => handleChange(index, 'comment', e.target.value)}
                        />
                    </Grid>
                    )}

                    {/* Add button */}

                    {props.type === 'add' && (
                    <Grid item xs={2}>
                    <FormButton
                        variant="outlined"
                        onClick={handleAddField}
                        startIcon={<AddIcon />}
                    >
                        Add Field
                    </FormButton>
                    </Grid>
                    )}

                    {/* Remove button */}

                    {props.type === 'add' && (
                    <Grid item xs={2}>
                    {index !== 0 && ( // Conditionally render the Remove button
                        <FormButton
                            variant="outlined"
                            color="error"
                            onClick={() => handleRemoveField(index)}
                            startIcon={<Remove />}
                        >
                            Remove
                        </FormButton>
                    )}
                    </Grid>
                    )}
                </Grid>
            ))}

            {/* Buttons Section */}
            {props.type === 'add' && (
            <Box display="flex" width="70%" justifyContent="flex-end">
                <div style={{ display: 'flex', justifyContent: 'end', padding: '1em 2em 0em 2em' }}>
                    {/* Clear Button */}
                    <FormClearButton
                        variant="contained"
                        sx={{ width: '8.5rem', margin: '1em 0.5em' }}
                        color="primary"
                        startIcon={<ClearAllIcon />}
                        onClick={() => setFields([{ category: '', file: null, comment: '' }])}
                    >
                        Clear
                    </FormClearButton>

                    {/* Save Button */}
                    <FormSaveLoadingButton
                        color="primary"
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{ width: '8.5rem', margin: '1em 0.5em' }}
                        startIcon={<SaveIcon />}
                    >
                        Save
                    </FormSaveLoadingButton>
                </div>
            </Box>
            )}
            {props.type === 'view' && (
                <ListPage
                    columns={columns}
                    rows={rows}
                    searchBarProps={{
                        searchBy: 'category',
                        onSearchChange: (e) => { console.log(e.target.value); },
                        onSearchClick: (e) => { },
                    }}
                    onRowClick={(e, id) => {
                        console.log(id);
                    }}
                    onAddButtonClick={(e) => {
                        navi(AppRoutes.cia_resources_add.path)
                    }}
                    tablePaginationProps={{
                        rowsPerPageOptions: [5, 10, 25, 100],
                        component: "div",
                        rowsPerPage: 5,
                        page: 0,
                        count: 100,
                        onPageChange: (e, page) => { console.log(page); },
                        onRowsPerPageChange: (e) => { console.log(e.target.value); }
                    }}
                /> 
            )}
        </Box>
        
    );
};

export default AddTaskResources;

