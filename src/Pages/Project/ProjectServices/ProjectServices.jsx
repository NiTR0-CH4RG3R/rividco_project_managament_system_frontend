import { Box, Grid } from '@mui/material'
import React, { useState } from 'react'
import ProjectTable from '../ProjectServices/ProjectServicesTable'
import { useTopbarContext } from '../../../Contexts/TopbarContext'
import FormSaveLoadingButton from '../../../Components/StyledComponents/FormSaveLoadingButton'
import ProjectServicesPopup from '../ProjectServices/ProjectServicesPopup'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


export default function ProjectServices() {
    const { setTitle, setSubtitle } = useTopbarContext();
    setTitle("Project services");
    setSubtitle("You can view and manage all the project services here.");

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
              Add New service
            </FormSaveLoadingButton>
                    </Grid>

                 </Grid>
        
        <ProjectServicesPopup openPopUp={openPopUp} setOpenPopup={setOpenPopup} />
                
            </Box>

        </div>
    );
}


