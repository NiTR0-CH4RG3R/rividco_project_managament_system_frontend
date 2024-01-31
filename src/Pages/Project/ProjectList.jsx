import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTopbarContext } from '../../Contexts/TopbarContext';
import ListPage from '../../Components/ListPage/ListPage';
import { AppRoutes } from '../../Data/AppRoutes';

const columns = [
    { id: 'identificationNo', label: 'First Name', align: 'left' },
    { id: 'customer', label: 'Customer', align: 'left' },
    { id: 'location', label: 'Location', align: 'left' },
    { id: 'salesPerson', label: 'Sales Person', align: 'left' },
    { id: 'status', label: 'Status', align: 'center' },
];

export default function ProjectList() {
    const { setTitle, setSubtitle } = useTopbarContext();
    setTitle("List Projects");
    setSubtitle("You can view and manage all the projects here.");

    const [rows, setRows] = useState([
        { id: 0, identificationNo: 'P001', customer: 'Jane Doe', location: 'No. 380, Walawwaththa, Dadalla, Galle', salesPerson: 'Jone Doe', status: 'ACTIVE', },
    ]);

    const navigate = useNavigate();

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
                navigate(AppRoutes.project_add.path)
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
        />
    );
}