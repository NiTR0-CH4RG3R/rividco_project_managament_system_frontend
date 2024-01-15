import { Box, Link } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';

const columns = [
    {
        field: 'taskId',
        headerName: 'Task Id',
    },
    {
        field: 'category',
        headerName: 'Category',
    },
    {
        field: 'requestedBy',
        headerName: 'Requsted By',
    },
    {
        field: 'addedBy',
        headerName: 'Added By',
    },
    {
        field: 'addedDate',
        headerName: 'Added Date',
    },
    {
        field: 'assignTo',
        headerName: 'Assign TO',
    },
    {
        field: 'urgencyLevel',
        headerName: 'Urgency Level',
    },
    {
        field: 'status',
        headerName: 'Status',
    },
    {
        field: 'projectIdentificationNumber',
        headerName: 'Project Identification Number',
    },
    {
        field: 'callBackNumber',
        headerName: 'Callback Number',
    },
    {
        field: 'chatLink',
        headerName: 'Chat Link',
        width: '200',
        renderCell: (params) => (
            <Link href={params.value} target="_blank" rel="noopener noreferrer" >
                {params.value}
            </Link>
        ),
    },
    {
        field: 'description',
        headerName: 'Description',
    },
    {
        field: 'comment',
        headerName: 'Comment',
    },
]

//Asynchronous method to fetch data from API
const fetchData = async () => {
    try{
        const response = await fetch('https://localhost:44328/api/Tasks');
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
        }
        fetchRow();
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
                                pageSize: 5,
                            },
                        },
                    }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick    
            /> 
        </Box>
    )
}

export default ListTask
