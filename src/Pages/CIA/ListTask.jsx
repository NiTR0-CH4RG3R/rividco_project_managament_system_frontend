import { AddBoxOutlined } from '@mui/icons-material';
import { Box, IconButton, Link, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';

//Initialize columns of the data grid
const columns = [
    {
        field: 'taskId',
        headerName: 'Task Id',
        align: 'center',
        headerAlign: 'center'
    },
    {
        field: 'companyId',
        headerName: 'Company Id',
        align: 'center',
        headerAlign: 'center'
    },
    {
        field: 'category',
        headerName: 'Category',
        align: 'center',
        headerAlign: 'center'
    },
    {
        field: 'requestedBy',
        headerName: 'Requsted By',
        align: 'center',
        headerAlign: 'center'
    },
    {
        field: 'addedBy',
        headerName: 'Added By',
        align: 'center',
        headerAlign: 'center'
    },
    {
        field: 'addedDate',
        headerName: 'Added Date',
        align: 'center',
        headerAlign: 'center',
        width: '200'
    },
    {
        field: 'assignTo',
        headerName: 'Assign TO',
        align: 'center',
        headerAlign: 'center'
    },
    {
        field: 'urgencyLevel',
        headerName: 'Urgency Level',
        align: 'center',
        headerAlign: 'center',
        width: '150'
    },
    {
        field: 'status',
        headerName: 'Status',
        align: 'center',
        headerAlign: 'center'
    },
    {
        field: 'projectIdentificationNumber',
        headerName: 'Project Identification Number',
        align: 'center',
        headerAlign: 'center',
        width: '150'
    },
    {
        field: 'callBackNumber',
        headerName: 'Callback Number',
        align: 'center',
        headerAlign: 'center',
        width: '150'
    },
    {
        field: 'chatLink',
        headerName: 'Chat Link',
        width: '200',
        align: 'center',
        headerAlign: 'center',
        renderCell: (params) => (
            <Link href={params.value} target="_blank" rel="noopener noreferrer" >
                {params.value}
            </Link>
        ),
    },
    {
        field: 'description',
        headerName: 'Description',
        align: 'center',
        headerAlign: 'center',
        width: '200'
    },
    {
        field: 'comment',
        headerName: 'Comment',
        align: 'center',
        headerAlign: 'center',
        width: '150'
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

    //Map taskId as unique identifier in the data grid
    const getRowId = (row) => row.taskId;

    return(
        <Box sx={{ mt: 10, width: '84%', marginLeft: -80, paddingInlineStart: 80}}>

            <Box sx={{ height: 400}}>
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
                    disableSelectionOnClick = {true}
                    disableColumnFilter={true}
                    autoWidth = {true}    
                />
            </Box>
            
            <Box sx={{height: 100, mt: 10, display: 'flex', justifyContent: 'flex-start'}}>
                <Stack direction="row" spacing={1}>
                    <IconButton arisl-aria-label='add-button'>
                        <AddBoxOutlined color='primary' style={{fontSize: 50}} />
                    </IconButton>
                </Stack>
            </Box>
    
        </Box>
    )
}

export default ListTask
