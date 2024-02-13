import { Box, Grid } from '@mui/material'
import React, { useState } from 'react'
import ProjectTable from '../ProjectIResources/ProjectResourcesTable'
import { useTopbarContext } from '../../../Contexts/TopbarContext'
import FormSaveLoadingButton from '../../../Components/StyledComponents/FormSaveLoadingButton'
import ProjectResourcesPopup from '../ProjectIResources/ProjectResourcesPopup'


export default function ProjectResources() {
    const { setTitle, setSubtitle } = useTopbarContext();
    setTitle("Project Resources");
    setSubtitle("You can view and manage all the project resources here.");

    const [openPopUp, setOpenPopup] = useState(false)


    return (
        <div>

            <Box>
                <Grid container spacing={1} sx={{ width: "100%" }}>

                    {/* ---------------- resource Table ------------------ */}
                    <Grid item xs={8} sx={{ padding: "4em 2em 0em 4em !important" }}>
                        <ProjectTable />
                    </Grid>


                    {/* ---------------- resource button ------------------ */}
                    <Grid item xs={4} sx={{ padding: "4em 2em 0em 6em !important" }}>

                    <FormSaveLoadingButton onClick={() => setOpenPopup(true)}>
              Add New Resource
            </FormSaveLoadingButton>
                    </Grid>

                 </Grid>
        
        <ProjectResourcesPopup openPopUp={openPopUp} setOpenPopup={setOpenPopup} />
                
            </Box>

        </div>
    );
}


