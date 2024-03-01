import React, { useState } from "react";
import { useTopbarContext } from "../../Contexts/TopbarContext";
import ListPage from "../../Components/ListPage/ListPage";
import { useNavigate } from "react-router-dom";
import ProjectServicesPopup from "../Project/ProjectServices/ProjectServicesPopup";

const columns = [
  { id: "description", label: "Description", align: "left" },
  { id: "status", label: "status", align: "left" },
  { id: "conductedBy", label: "Conducted By ", align: "left" },
  { id: "conductedDate", label: "Conducted Date", align: "center" },
  { id: "dueDate", label: "Due Date", align: "center" },
];

export default function PendingServices() {
  const { setTitle, setSubtitle } = useTopbarContext();
  setTitle("Pending services");
  setSubtitle("You can view and manage all the pending services here.");

  const [openPopUp, setOpenPopup] = useState(false);
  const [modeType, setModeType] = useState();

  const [rows, setRows] = useState([
    {
      description: "description 1",
      status: "pending",
      conductedBy: "user 1",
      conductedDate: "02/01/2024",
      dueDate: "02/01/2024",
    },
  ]);

  const navigate = useNavigate();

  return (
    <>
      <ListPage
        tiptitle={"Add New Pending Service"}
        columns={columns}
        rows={rows}
        searchBarProps={{
          searchBy: "location",
          onSearchChange: (e) => {
            console.log(e.target.value);
          },
          onSearchClick: (e) => {},
        }}
        onRowClick={(e, id) => {
          setModeType("view");
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
      <ProjectServicesPopup
        openPopUp={openPopUp}
        setOpenPopup={setOpenPopup}
        type={modeType}
      />
    </>
  );
}
