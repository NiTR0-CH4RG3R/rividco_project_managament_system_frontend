import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';

const columns = [
    {
        field: 'taskId',
        headerName: 'Task Id',
        width: '110'
    },
    {
        field: 'category',
        headerName: 'Category',
        width: '110'
    },
    {
        field: 'requestedBy',
        headerName: 'Requsted By',
        width: '110'
    },
    {
        field: 'addedBy',
        headerName: 'Added By',
        width: '110'
    },
    {
        field: 'addedDate',
        headerName: 'Added Date',
        width: '110'
    },
    {
        field: 'urgencyLevel',
        headerName: 'Urgency Level',
        width: '110'
    },
    {
        field: 'status',
        headerName: 'Status',
        width: '110'
    },
    {
        field: 'description',
        headerName: 'Description',
        width: '110'
    },
    {
        field: 'comment',
        headerName: 'Comment',
        width: '110'
    },
    {
        field: 'assignTo',
        headerName: 'Assign TO',
        width: '110'
    },
    {
        field: 'projectIdentificationNumber',
        headerName: 'Project Identification Number',
        width: '110'
    },
    {
        field: 'callbackNumber',
        headerName: 'Callback Number',
        width: '110'
    },
    {
        field: 'chatLink',
        headerName: 'Chat Link',
        width: '110'
    }
]

//Asynchronous method to fetch data from API
const fetchData = async () => {
    try{
        const response = await fetch('http://localhost:8080/task');
        const data = await response.json();
        return data;
    }
    catch(error){
        console.error('Error in API link: ' ,error);
        throw error;
    }
    
}

function ListTask(){

    const [task, setTask] = React.useState([]);

    React.useEffect(() =>{
        const fetchRow = async () =>{
            try{
                const data = await fetchData();
                setTask(data);
            }
            catch(error){
                console.error(error);
                throw error;
            }
            fetchRow();
        }
    }, [])


    const getRowId = (row) => row.taskId;

    return(
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid 
                columns={columns}
                rows={task}
                getRowId={getRowId}
                initialState={{
                        pagination: {
                            paginationModel:{
                                pageSize: 10,
                            },
                        },
                    }}
                disableRowSelectionOnClick    
            /> 
        </Box>
    )
}

export default ListTask
