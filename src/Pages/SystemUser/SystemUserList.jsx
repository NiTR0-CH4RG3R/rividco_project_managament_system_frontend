import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTopbarContext } from '../../Contexts/TopbarContext';
import ListPage from '../../Components/ListPage/ListPage';
import { AppRoutes } from '../../Data/AppRoutes';
import * as systemUserService from '../../services/systemUserService'

const columns = [
    { id: 'firstName', label: 'First Name', align: 'left' },
    { id: 'lastName', label: 'Last Name', align: 'left' },
    { id: 'role', label: 'Role', align: 'center' },
    { id: 'status', label: 'Address', align: 'center' },
    { id: 'contact', label: 'Contact Number' },
];


export default function SystemUserList() {
    const { setTitle, setSubtitle } = useTopbarContext();
    setTitle("List System Users");
    setSubtitle("You can view and manage all the system users here.");

    const [rows, setRows] = useState([
        { id: 0, firstName: 'John', lastName: 'Doe', role: 'ADMIN', status: 'ACTIVE', contact: '1234567890', }
    ]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        systemUserService.listSystemUsers(page + 1, rowsPerPage)
            .then(
                customers => {
                    setRows(customers);
                }
            )
            .catch(
                error => {
                    console.log(error);
                }
            )
    }, [page, rowsPerPage]);

    const navigate = useNavigate();

    return (
        <ListPage
            columns={columns}
            rows={rows}
            searchBarProps={{
                searchBy: 'name',
                onSearchChange: (e) => { console.log(e.target.value); },
                onSearchClick: (e) => { },
            }}
            onRowClick={(e, id) => {
                console.log(id);
            }}
            onAddButtonClick={(e) => {
                navigate(AppRoutes.system_user_add.path)
            }}
            tablePaginationProps={{
                rowsPerPageOptions: [5, 10, 25, 100],
                component: "div",
                rowsPerPage: rowsPerPage,
                page: page,
                count: -1,
                onPageChange: (e, page) => { setPage(page); },
                onRowsPerPageChange: (e) => { setRowsPerPage(e.target.value); }
            }}
        />
    );
}