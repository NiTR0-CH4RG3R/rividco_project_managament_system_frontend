import React, { useState, useEffect } from 'react'
import { Button,TextField,Grid,MenuItem,Box } from '@mui/material'
import ClearAllIcon from '@mui/icons-material/ClearAll'
import SaveIcon from '@mui/icons-material/Save'


const AddTaskResources = () => {

    const [taskId, setTaskId] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedPath, setSelectedPath] = useState('');

    useEffect(() => {
        const fetchTaskId = async () => {
          try {
            const response = await fetch('http://localhost:3001/taskId'); // Replace with actual endpoint
            const data = await response.json();
            setTaskId(data.taskId);
          } catch (error) {
            console.error('Error fetching TaskId:', error.message);
          }
        };
    
        fetchTaskId();
      }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handlePathChange = (event) => {
        const path = event.target.value;
        setSelectedPath(path);
    };

    const handleUpload = async () => {
        try {
          if (!selectedFile) {
            alert('Please select a file.');
            return;
          }
    
          const formData = new FormData();
          formData.append('file', selectedFile);
          formData.append('category', selectedPath);
    
          // Make an API request to the server
          const response = await fetch('http://localhost:3001/upload', {
            method: 'POST',
            body: formData,
          });
    
          const data = await response.json();
          console.log(data);
    
          setSelectedFile(null);
          setSelectedPath('images');
        } catch (error) {
          console.error('Error uploading file:', error.message);
        }
      };

        const [loading, setLoading] = React.useState(false);
        function handleClick() {
            setLoading(true);
        };
    

  return (
    <div>
        <form>
        <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
            noValidate
            autoComplete="off"
        >

        <Grid container spacing={2} sx={{ width: "100vw" }}>
            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                <TextField 
                    id="component-disabled" 
                    value={taskId} 
                    variant='outlined' 
                    size='small' 
                    disabled 
                    label='TaskId'
                    sx={{ width: "100%" }}
                />
            </Grid>

            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                <TextField
                    select
                    value={selectedPath}
                    variant='outlined'
                    onChange={handlePathChange}
                    label="Category"
                    size='small'
                    sx={{ width: "100%" }}
                >
                    <MenuItem value='images'>Image</MenuItem>
                    <MenuItem value='documents'>Document</MenuItem>
                    <MenuItem value='others'>Other</MenuItem>
                </TextField>
            </Grid>
            
            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                <TextField 
                    type="file" 
                    onChange={handleFileChange} 
                    size='small'
                    sx={{ width: "100%" }}
                />

            </Grid>

            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                <Button variant="contained" color="success" onClick={handleUpload} >
                    Upload
                </Button>
            </Grid>

            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                <TextField
                   variant='outlined'
                   label="AddedBy"
                   sx={{ width: "100%" }}
                   size='small'
                   placeholder='Add a consumer'
                />
            </Grid>

            <Grid item xs={6} sx={{ padding: "1em 1em 0em 1em !important" }}>
                <TextField
                   variant='outlined'
                   type='date'
                   defaultValue=""
                   label="AddedDate"
                   InputLabelProps={{
                    shrink: true,
                  }}
                   sx={{ width: "100%" }}
                   size='small'
                />
            </Grid>

            <Grid item xs={12} sx={{ padding: "1em 1em 0em 1em !important" }}>
                <TextField
                   variant='outlined'
                   label="Comment"
                   sx={{ width: "100%" }}
                   size='small'
                   multiline
                   rows={4}
                   placeholder='Add a comment'
                />
            </Grid>

        </Grid>    

        </Box>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            padding: "1em 2em 0em 2em !important",
          }}
        >
            <Button
                variant="contained"
                sx={{ width: "8.5rem", margin: "1em 0.5em !important" }}
                color="primary"
                startIcon={<ClearAllIcon/>}
            >
                Clear
            </Button>

            <Button
                color='primary'
                onClick={handleClick}
                loading={loading}
                loadingPosition='start'
                startIcon={<SaveIcon/>}
                variant='contained'
                sx={{width: "8.5rem", margin: "1em 0.5em !important"}}
            >
                Save
            </Button>

        </div>
        </form>
    </div>
  )
}

export default AddTaskResources