import { Box, Grid } from '@mui/material'
import React, { useState } from 'react'
import ProjectTable from '../ProjectTest/ProjectTestTable'
import { useTopbarContext } from '../../../Contexts/TopbarContext'
import FormSaveLoadingButton from '../../../Components/StyledComponents/FormSaveLoadingButton'
import ProjectTestPopup from '../ProjectTest/ProjectTestPopup'


export default function ProjectTest() {
    const { setTitle, setSubtitle } = useTopbarContext();
    setTitle("Project Tests");
    setSubtitle("You can view and manage all the project tests here.");

    const [openPopUp, setOpenPopup] = useState(false)


    return (
        <div>

            <Box>
                <Grid container spacing={1} sx={{ width: "100%" }}>

                    {/* ---------------- Test Table ------------------ */}
                    <Grid item xs={8} sx={{ padding: "4em 2em 0em 4em !important" }}>
                        <ProjectTable />
                    </Grid>


                    {/* ---------------- Test button ------------------ */}
                    <Grid item xs={4} sx={{ padding: "4em 2em 0em 6em !important" }}>

                    <FormSaveLoadingButton onClick={() => setOpenPopup(true)}>
              Add New Test
            </FormSaveLoadingButton>
                    </Grid>

                 </Grid>
        
        <ProjectTestPopup openPopUp={openPopUp} setOpenPopup={setOpenPopup} />
                
            </Box>

        </div>
    );
}

