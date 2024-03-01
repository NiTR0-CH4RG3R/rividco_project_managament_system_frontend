import React, { useState } from "react";
import { useTopbarContext } from "../../../Contexts/TopbarContext";
import ListPage from "../../../Components/ListPage/ListPage";
import { useNavigate } from "react-router-dom";
import ProjectResourcesPopup from "../ProjectResources/ProjectResourcesPopup";

const columns = [
  { id: "resourceName", label: "Resource Name", align: "left" },
  { id: "addedBy", label: "Added By", align: "left" },
  { id: "addedDate", label: "Added Date", align: "left" },
  { id: "comment", label: "Comment", align: "center" },
];

export default function ProjectResources() {
  const { setTitle, setSubtitle } = useTopbarContext();
  setTitle("Project Resources");
  setSubtitle("You can view and manage all the project resources here.");

  const [openPopUp, setOpenPopup] = useState(false);
  const [modeType, setModeType] = useState();

  const [rows, setRows] = useState([
    {
      resourceName: "Resourece 1",
      addedBy: "User 1",
      addedDate: "02/01/2024",
      comment: "comment 1",
    },
  ]);

  const navigate = useNavigate();

  return (
    <>
      <ListPage
        tiptitle={"Add New Project Resource"}
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
      <ProjectResourcesPopup
        openPopUp={openPopUp}
        setOpenPopup={setOpenPopup}
        type={modeType}
      />
    </>
  );
}
