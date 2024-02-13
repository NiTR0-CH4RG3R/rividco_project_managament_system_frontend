import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTopbarContext } from "../../Contexts/TopbarContext";
import ListPage from "../../Components/ListPage/ListPage";
import { AppRoutes } from "../../Data/AppRoutes";
import CommisionReportModal from "./CommisionReportModal";

const columns = [
  { id: "fileName", label: "File Name", align: "left" },
  { id: "addedDate", label: "Added Date", align: "left" },
];

export default function CommisionReport() {
  const { setTitle, setSubtitle } = useTopbarContext();
  setTitle("Project Commision Reports");
  setSubtitle("You can add and view  all the project commision report here.");

  const [rows, setRows] = useState([{ fileName: "report", addedDate: "2024" }]);
  const[openCommisionReport,setOpenCommisionReport]=useState(false);

  return (
    <>
    <ListPage
      columns={columns}
      rows={rows}

      onAddButtonClick={(e)=>{setOpenCommisionReport(true)}}
      tablePaginationProps=
      {{
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
    />
    <CommisionReportModal
        openCommisionReport={openCommisionReport}
        setOpenCommisionReport={setOpenCommisionReport}
    />

</>
  );
}
