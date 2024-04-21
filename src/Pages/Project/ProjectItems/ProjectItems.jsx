import React, { useState, useEffect } from "react";
import { useTopbarContext } from "../../../Contexts/TopbarContext";
import ProjectItemsPopup from "../ProjectItems/ProjectItemsPopup";
import ListPage from "../../../Components/ListPage/ListPage";
import { useNavigate, useParams } from "react-router-dom";
import * as projectItemServices from "../../../services/projectItemServices";
import * as vendorItemService from "../../../services/vendorItemService";


const columns = [
  { id: "vendorItem", label: "Vendor Item", align: "left" },
  { id: "serialNumber", label: "Serial Number", align: "left" },
  { id: "warrantyPeriod", label: "Warranty Period", align: "left" },
  { id: "comment", label: "Comment", align: "center" },
];

export default function ProjectItems() {
  const { setTitle, setSubtitle } = useTopbarContext();
  setTitle("Project items");
  setSubtitle("You can view and manage all the project items here.");

  const [openPopUp, setOpenPopup] = useState(false);
  const [itemsId, setItemsId] = useState(null);
  const [modeType, setModeType] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { id } = useParams();
  

  const [rows, setRows] = useState([
    {
      vendorItem: "item 1",
      serialNumber: "111QWERT",
      warrantyPeriod: "2 Months",
      conductedDate: "09/09/2023",
      comment: "comment 1",
    },
  ]);

  useEffect(() => {
    setPage(0);
    setRowsPerPage(5);
  }, []);

  useEffect(() => {
    projectItemServices
      .listItems(id, page + 1, rowsPerPage)
      .then((items) => {
        setRows([]);
        

        items.forEach((item) => {
          vendorItemService.getVendorItem(item.vendorItemId).then((vendorItem) => {
            setRows(prev => [...prev,
            {
              id:item.id,
              vendorItem: vendorItem.productName,
              serialNumber: item.serialNo,
              warrantyPeriod: item.warrantyDuration,
              comment: item.comments
            }]);
          });
        });

      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, page, rowsPerPage]);


  const navigate = useNavigate();

  return (
    <>
      <ListPage
        tiptitle={"Add New Project Item"}
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
          setOpenPopup(true);
          setItemsId(id);
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
      <ProjectItemsPopup
        openPopUp={openPopUp}
        setOpenPopup={setOpenPopup}
        type={modeType}
        itemsId={itemsId}
      />
    </>
  );
}
