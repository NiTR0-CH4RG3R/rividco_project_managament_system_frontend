import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTopbarContext } from "../../Contexts/TopbarContext";
import ListPage from "../../Components/ListPage/ListPage";
import { AppRoutes } from "../../Data/AppRoutes";
import * as taskService from "../../services/taskService";
import * as taskStatusService from "../../services/taskStatusService";

const columns = [
  { id: "id", label: "Id", align: "left" },
  { id: "category", label: "Category", align: "left" },
  { id: "requestedBy", label: "Requested By", align: "left" },
  { id: "callBackNumber", label: "Callback No.", align: "left" },
  { id: "status", label: "Status", align: "center" },
  { id: "assignedTo", label: "Assigned To", align: "left" },
];

export default function TaskList() {
  const { setTitle, setSubtitle } = useTopbarContext();
  setTitle("CIA Task List");
  setSubtitle("You can view and manage all the CIA tasks here.");

  const [rows, setRows] = useState([
    {
      id: 0,
      category: "Complaint",
      requestedBy: "Jane Doe",
      callback: "091 2222222",
      assignedTo: "Jone Doe",
      status: "ACTIVE",
    },
  ]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    setPage(0);
    setRowsPerPage(5);
  }, []);

  useEffect(() => {
    taskService
      .listTasks(page + 1, rowsPerPage)
      .then((task) => {
        setRows(task);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page, rowsPerPage]);

  const navigate = useNavigate();

  return (
    <ListPage
      tiptitle={"Add New Task"}
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
        navigate(AppRoutes.cia_view.path.replace(":id", id));
      }}
      onAddButtonClick={(e) => {
        navigate(AppRoutes.cia_add.path);
      }}
      tablePaginationProps={{
        rowsPerPageOptions: [5, 10, 25, 100],
        component: "div",
        rowsPerPage: rowsPerPage,
        page: page,
        count: -1,
        onPageChange: (e, page) => {
          setPage(page);
        },
        onRowsPerPageChange: (e) => {
          setRowsPerPage(e.target.value);
        },
      }}
      disableSearchBar
      // customUpperBar={<UpperBar />}
    />
  );
}
