import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTopbarContext } from "../../Contexts/TopbarContext";
import ListPage from "../../Components/ListPage/ListPage";
import { AppRoutes } from "../../Data/AppRoutes";
import * as vendorService from "../../services/vendorService";

const columns = [
  {
    id: "vendorRegistrationNumber",
    label: "Vendor Registration No",
    align: "left",
  },
  { id: "name", label: "Name", align: "left" },
  { id: "address", label: "Address", align: "left" },
  { id: "email", label: "Email", align: "left" },
  { id: "phone01", label: "Contact Number", align: "right" },
];

export default function VendorList() {
  const { setTitle, setSubtitle } = useTopbarContext();
  setTitle("List Vendors");
  setSubtitle("You can view and manage all the vendors here.");

  const [rows, setRows] = useState([
    {
      id: 0,
      vendorRegistrationNumber: "Loading...",
      name: "Loading...",
      address: "Loading...",
      email: "Loading...",
      phone01: "Loading...",
    },
  ]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    setPage(0);
    setRowsPerPage(5);
  }, []);

  useEffect(() => {
    vendorService
      .listVendors(page + 1, rowsPerPage)
      .then((vendors) => {
        setRows(vendors);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page, rowsPerPage]);

  const navigate = useNavigate();

  return (
    <ListPage
      tiptitle={"Add New Vendor"}
      columns={columns}
      rows={rows}
      searchBarProps={{
        searchBy: "name",
        onSearchChange: (e) => {
          console.log(e.target.value);
        },
        onSearchClick: (e) => {},
      }}
      onRowClick={(e, id) => {
        navigate(AppRoutes.vendor_view.path.replace(":id", id));
      }}
      onAddButtonClick={(e) => {
        navigate(AppRoutes.vendor_add.path);
      }}
      tablePaginationProps={{
        rowsPerPageOptions: [5, 10, 25, 100],
        component: "div",
        rowsPerPage: 5,
        page: 0,
        count: 100,
        onPageChange: (e, page) => {
          setPage(page);
        },
        onRowsPerPageChange: (e) => {
          setRowsPerPage(e.target.value);
        },
      }}
    />
  );
}
