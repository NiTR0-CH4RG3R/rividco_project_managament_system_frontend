import { Box, Grid } from '@mui/material'
import React, { useState } from 'react'
import ProjectTable from '../ProjectItems/ProjectItemsTable'
import { useTopbarContext } from '../../../Contexts/TopbarContext'
import FormSaveLoadingButton from '../../../Components/StyledComponents/FormSaveLoadingButton'
import ProjectItemsPopup from '../ProjectItems/ProjectItemsPopup'


export default function ProjectItems() {
    const { setTitle, setSubtitle } = useTopbarContext();
    setTitle("Project items");
    setSubtitle("You can view and manage all the project items here.");

    const [openPopUp, setOpenPopup] = useState(false)


    return (
        <div>

            <Box>
                <Grid container spacing={1} sx={{ width: "100%" }}>

                    {/* ---------------- Task Table ------------------ */}
                    <Grid item xs={8} sx={{ padding: "4em 2em 0em 4em !important" }}>
                        <ProjectTable />
                    </Grid>


                    {/* ---------------- Task button ------------------ */}
                    <Grid item xs={4} sx={{ padding: "4em 2em 0em 6em !important" }}>

                    <FormSaveLoadingButton onClick={() => setOpenPopup(true)}>
              Add New Item
            </FormSaveLoadingButton>
                    </Grid>

                 </Grid>
        
        <ProjectItemsPopup openPopUp={openPopUp} setOpenPopup={setOpenPopup} />
                
            </Box>

        </div>
    );
}


