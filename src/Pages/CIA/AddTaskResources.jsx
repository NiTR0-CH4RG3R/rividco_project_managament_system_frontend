import React, { useEffect, useState } from 'react'
import { Grid, MenuItem, Box } from '@mui/material'
import { useTopbarContext } from '../../Contexts/TopbarContext'
import { useNavigate, useParams } from 'react-router-dom'
import { AppRoutes } from '../../Data/AppRoutes'

const AddTaskResources = (props) => {

    const [loading, setLoading] = useState(false);
    const { id } = useParams()
    const navi = useNavigate()

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

        </Box>
        
    );
};

export default AddTaskResources;

