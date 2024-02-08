import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTopbarContext } from '../../Contexts/TopbarContext';
import ListPage from '../../Components/ListPage/ListPage';
import { AppRoutes } from '../../Data/AppRoutes';
import { Checkbox, FormGroup, FormControlLabel } from '@mui/material';

const columns = [
    { id: 'id', label: 'Id', align: 'left' },
    { id: 'category', label: 'Category', align: 'left' },
    { id: 'requestedBy', label: 'Requested By', align: 'left' },
    { id: 'callback', label: 'Callback No.', align: 'left' },
    { id: 'status', label: 'Status', align: 'center' },
    { id: 'assignedTo', label: 'Assigned To', align: 'left' },
];

export default function TaskList() {
    const { setTitle, setSubtitle } = useTopbarContext();
    setTitle("CIA Task Projects");
    setSubtitle("You can view and manage all the projects here.");

    const [rows, setRows] = useState([
        { id: 0, category: 'Complaint', requestedBy: 'Jane Doe', callback: '091 2222222', assignedTo: 'Jone Doe', status: 'ACTIVE', },
    ]);

    const navigate = useNavigate();

    function UpperBar() {
        return (
            <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                <FormControlLabel control={<Checkbox defaultChecked />} label="My Items" />
                <FormControlLabel control={<Checkbox />} label="Active" />
                <FormControlLabel control={<Checkbox />} label="On Hold" />
                <FormControlLabel control={<Checkbox />} label="Done" />
            </FormGroup>
        );
    }

    return (
        <ListPage
            columns={columns}
            rows={rows}
            searchBarProps={{
                searchBy: 'location',
                onSearchChange: (e) => { console.log(e.target.value); },
                onSearchClick: (e) => { },
            }}
            onRowClick={(e, id) => {
                console.log(id);
            }}
            onAddButtonClick={(e) => {
                navigate(AppRoutes.cia_add.path)
            }}
            tablePaginationProps={{
                rowsPerPageOptions: [5, 10, 25, 100],
                component: "div",
                rowsPerPage: 5,
                page: 0,
                count: 100,
                onPageChange: (e, page) => { console.log(page); },
                onRowsPerPageChange: (e) => { console.log(e.target.value); }
            }}
            disableSearchBar
            customUpperBar={<UpperBar />}
        />
    );
}