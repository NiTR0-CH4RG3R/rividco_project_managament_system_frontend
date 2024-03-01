import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTopbarContext } from "../../Contexts/TopbarContext";
import ListPage from "../../Components/ListPage/ListPage";
import { AppRoutes } from "../../Data/AppRoutes";
import * as vendorItemService from "../../services/vendorItemService";
import Vendoritem from "./Vendoritem";

const columns = [
  { id: "productName", label: "Item Name", align: "left" },
  { id: "vendorId", label: "Vendor", align: "left" },
  { id: "address", label: "Vendor Address", align: "left" },
  { id: "price", label: "Price", align: "right" },
  { id: "capacity", label: "Capacity", align: "right" },
  { id: "warrantyDuration", label: "Warrenty Duration", align: "right" },
];

export default function VendorList() {
  const { setTitle, setSubtitle } = useTopbarContext();
  setTitle("List Vendor Items");
  setSubtitle("You can view and manage all the vendorId items here.");

  const [rows, setRows] = useState([
    {
      id: 0,
      productName: "Converter",
      vendorId: "NC Enterprices",
      address: "No. 380, Walawwaththa, Dadalla, Galle",
      price: 800.0,
      capacity: 180.0,
      warrantyDuration: 360,
    },
  ]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    setPage(0);
    setRowsPerPage(5);
  }, []);

  useEffect(() => {
    vendorItemService
      .listVendorItems(page + 1, rowsPerPage)
      .then((Vendoritems) => {
        setRows(Vendoritems);
      })

      .catch((error) => {
        console.log(error);
      });
  }, [page, rowsPerPage]);

  const navigate = useNavigate();

  return (
    <ListPage
      tiptitle={"Add New Vendor Item"}
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
        navigate(AppRoutes.vendor_item_view.path.replace(":id", id));
      }}
      onAddButtonClick={(e) => {
        navigate(AppRoutes.vendor_item_add.path);
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
    />
  );
}
