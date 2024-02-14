import React, { useState } from 'react'
import { useTopbarContext } from '../../../Contexts/TopbarContext'
import ProjectItemsPopup from '../ProjectItems/ProjectItemsPopup'
import ListPage from '../../../Components/ListPage/ListPage';
import { useNavigate } from 'react-router-dom';

const columns = [
    { id: 'vendorItem', label: 'Vendor Item', align: 'left' },
    { id: 'serialNumber', label: 'Serial Number', align: 'left' },
    { id: 'warrantyPeriod', label: 'Warranty Period', align: 'left' },
    { id: 'conductedDate', label: 'Conducted Date', align: 'left' },
    { id: 'comment', label: 'Comment', align: 'center' },
];

export default function ProjectItems() {
    const { setTitle, setSubtitle } = useTopbarContext();
    setTitle("Project items");
    setSubtitle("You can view and manage all the project items here.");

    const [rows, setRows] = useState([
        { vendorItem: 'item 1', serialNumber: '111QWERT', warrantyPeriod: '2 Months', conductedDate: '09/09/2023', comment: 'comment 1', },
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
           <ProjectItemsPopup/>
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
        // customUpperBar={<UpperBar />}
    />
);
}


