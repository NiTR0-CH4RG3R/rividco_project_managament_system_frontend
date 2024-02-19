
import React, { useState } from "react";
import { useTopbarContext } from "../../../Contexts/TopbarContext";
import ListPage from "../../../Components/ListPage/ListPage";
import { useNavigate } from "react-router-dom";
import ProjectTestPopup from '../ProjectTest/ProjectTestPopup'

const columns = [
    { id: "testName", label: "Test Name", align: "left" },
    { id: "result", label: "Result", align: "left" },
    { id: "conductedBy", label: "Conducted By ", align: "left" },
    { id: "conductedDate", label: "Conducted Date", align: "center" },
    { id: "comment", label: "Comment", align: "center" },

];

export default function ProjectTest() {
    const { setTitle, setSubtitle } = useTopbarContext();
    setTitle("Project Tests");
    setSubtitle("You can view and manage all the project tests here.");

    const [openPopUp, setOpenPopup] = useState(false);
    const [testId, setTestId] = useState(null);
    const[modeType,setModeType]=useState();

    const [rows, setRows] = useState([
        {
            testName: "test 1",
            result: "pass",
            conductedBy: "user 1",
            conductedDate: "02/01/2024",
            comment: "comment",
        },
    ]);

    const navigate = useNavigate();

    return (
        <>
            <ListPage
                columns={columns}
                rows={rows}
                searchBarProps={{
                    searchBy: "location",
                    onSearchChange: (e) => {
                        console.log(e.target.value);
                    },
                    onSearchClick: (e) => { },
                }}
                onRowClick={(e, id) => {
                    setModeType("view");
                    setTestId(id);
                    setOpenPopup(true);
                }}
                onAddButtonClick={(e) => {
                    setModeType("add");
                    setOpenPopup(true);
                }}
                tablePaginationProps={{
                    rowsPerPageOptions: [5, 10, 25, 100],
                    component: "div",
                    rowsPerPage: 5,
                    page: 0,
                    count: 100,
                    onPageChange: (e, page) => {
                        console.log(page);
                    },
                    onRowsPerPageChange: (e) => {
                        console.log(e.target.value);
                    },
                }}
                disableSearchBar
            // customUpperBar={<UpperBar />}
            />
            <ProjectTestPopup openPopUp={openPopUp} setOpenPopup={setOpenPopup} testId={testId} type={modeType} />
        </>
    );
}

