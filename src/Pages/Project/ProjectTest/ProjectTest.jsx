import { Box , Grid} from '@mui/material'
import React from 'react'
import ProjectTable from '../ProjectTest/ProjectTestTable'
import ProjectForm from '../ProjectTest/ProjectTestForm'

function ProjectTest() {
  return (
    <div>
    <Box>
        <Grid container spacing={1} sx={{ width: "100%" }}>

            {/* ---------------- Task Table ------------------ */}
            <Grid item xs={8} sx={{ padding: "7em 2em 0em 4em !important" }}>
                <ProjectTable/>
            </Grid>

            
            {/* ---------------- Task form ------------------ */}
            <Grid item xs={4} sx={{ padding: "12em 2em 0em 4em !important" }}>
            
                <ProjectForm/>
            </Grid>
        </Grid>
    </Box>
</div>
  )
}

export default ProjectTest