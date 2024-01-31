import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTopbarContext } from '../../Contexts/TopbarContext';
import ListPage from '../../Components/ListPage/ListPage';
import { AppRoutes } from '../../Data/AppRoutes';

const columns = [
    { id: 'registration', label: 'Vendor Registration No.', align: 'left' },
    { id: 'name', label: 'Name', align: 'left' },
    { id: 'address', label: 'Address', align: 'left' },
    { id: 'email', label: 'Email', align: 'left' },
    { id: 'contact', label: 'Contact Number', align: 'right' },
];

export default function VendorList() {
    const { setTitle, setSubtitle } = useTopbarContext();
    setTitle("List Vendors");
    setSubtitle("You can view and manage all the vendors here.");

    const [rows, setRows] = useState([
        { id: 0, registration: 'V001', name: 'NC Enterprices', address: 'No. 380, Walawwaththa, Dadalla, Galle', email: 'idontknow@gmail.com', contact: '1234567890', }
    ]);

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
                navigate(AppRoutes.vendor_add.path)
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