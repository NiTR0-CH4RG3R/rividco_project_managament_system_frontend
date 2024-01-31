import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTopbarContext } from '../../Contexts/TopbarContext';
import ListPage from '../../Components/ListPage/ListPage';
import { AppRoutes } from '../../Data/AppRoutes';

const columns = [
    { id: 'itemName', label: 'Item Name', align: 'left' },
    { id: 'vendor', label: 'Vendor', align: 'left' },
    { id: 'address', label: 'Vendor Address', align: 'left' },
    { id: 'price', label: 'Price', align: 'right' },
    { id: 'capacity', label: 'Capacity', align: 'right' },
    { id: 'warrenty', label: 'Warrenty Duration', align: 'right' },
];

export default function VendorList() {
    const { setTitle, setSubtitle } = useTopbarContext();
    setTitle("List Vendor Items");
    setSubtitle("You can view and manage all the vendor items here.");

    const [rows, setRows] = useState([
        { id: 0, itemName: 'Converter', vendor: 'NC Enterprices', address: 'No. 380, Walawwaththa, Dadalla, Galle', price: 800.0, capacity: 180.0, warrenty: 360, }
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
                navigate(AppRoutes.vendor_item_add.path)
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