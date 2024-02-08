import { Box, Grid } from '@mui/material'
import React from 'react'
import ProjectTable from '../ProjectItems/ProjectItemsTable'
import ProjectForm from '../ProjectItems/ProjectItemsForm'
import { useTopbarContext } from '../../../Contexts/TopbarContext'


export default function ProjectItems() {
    const { setTitle, setSubtitle } = useTopbarContext();
    setTitle("Project items");
    setSubtitle("You can view and manage all the project items here.");


    return (
        <div>

            <Box>
                <Grid container spacing={1} sx={{ width: "100%" }}>

                    {/* ---------------- Task Table ------------------ */}
                    <Grid item xs={8} sx={{ padding: "7em 2em 0em 4em !important" }}>
                        <ProjectTable />
                    </Grid>


                    {/* ---------------- Task form ------------------ */}
                    <Grid item xs={4} sx={{ padding: "12em 2em 0em 4em !important" }}>

                        <ProjectForm />
                    </Grid>
                </Grid>
            </Box>

        </div>
    );
}


