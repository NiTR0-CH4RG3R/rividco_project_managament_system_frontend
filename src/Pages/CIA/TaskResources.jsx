import React, { useEffect, useState } from 'react'
import { Grid, MenuItem, Box } from '@mui/material'
import Paper from "@mui/material/Paper"
import { useTopbarContext } from '../../Contexts/TopbarContext'
import axios from '../../api/axios'

const TaskResources = (props) => {

    const [files, setFiles] = useState(null)
    const [progress, setProgress] = useState({ started: false, pc: 0 })
    const [msg, setMsg] = useState(null)

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

    function handleUpload() {
        if (!files) {
            setMsg("No file selected");
            return;
        }

        const fd = new FormData();
        for (let i=0; i<files.length; i++){
            fd.append(`file${i+1}`, files[i]);}

        setMsg("Uploading...");
        setProgress(prevState => {
            return {...prevState, started: true }
        })
        axios.post('http://localhost:5000/api', fd, {
            onUploadProgress: (progressEvent) => { setProgress(prevState => {
                return { ...prevState, pc: progressEvent.progress*100}
            }) },
                "Custom-Header": "value",
        })
        .then(res => {
            setMsg("Upload Successful");
            console.log(res.data)})

        .catch(err => {
            setMsg("Upload failed");
            console.error(err)});
    }


  return (
            
        <Box
            component="form"
            // onReset={handleReset}
            // onSubmit={handleSubmit}
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
                <input
                        type="file"
                        id="url"
                        multiple
                        title='Choose a file from your files'
                        name="url"
                        onChange={(e) => { setFiles(e.target.files)
                            // handleChange(e); // Update formik values
                        }}
                        // onBlur={handleBlur}
                        disabled={props.type === "view"}
                        accept=".pdf,.doc,.docx,.txt" // Optional: specify accepted file types
                    />
                </Grid>
                <Grid item xs={6}>
                    <button onClick={handleUpload}>Upload</button>
                    { progress.started && <progress max="100" value={progress.pc}></progress>}
                    { msg && <span>{msg}</span>}
                </Grid>
            </Grid>
        </Box>
  )
}

export default TaskResources