import React, { useState, useEffect } from "react";
import { useTopbarContext } from "../../../Contexts/TopbarContext";
import ListPage from "../../../Components/ListPage/ListPage";
import { useNavigate, useParams } from "react-router-dom";
import * as projectTestService from "../../../services/projectTestService";
import ProjectTestPopup from "../ProjectTest/ProjectTestPopup";

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
  const [modeType, setModeType] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { id } = useParams();

  const [rows, setRows] = useState([
    {
      testName: "test 1",
      result: "pass",
      conductedBy: "user 1",
      conductedDate: "02/01/2024",
      comment: "comment",
    },
  ]);

  useEffect(() => {
    setPage(0);
    setRowsPerPage(5);
  }, []);

  useEffect(() => {
    projectTestService
      .listTests(id, page + 1, rowsPerPage)
      .then((test) => {
        setRows(
          test.map((test) => ({
            id: test.id,
            testName: test.name,
            result: test.passed,
            conductedBy: test.conductedBy,
            conductedDate: test.conductedDate,
            comment: test.comments,
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, page, rowsPerPage]);

  const navigate = useNavigate();

  return (
    <>
      <ListPage
        tiptitle={"Add New Project Test"}
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
      <ProjectTestPopup
        openPopUp={openPopUp}
        setOpenPopup={setOpenPopup}
        testId={testId}
        type={modeType}
      />
    </>
  );
}
