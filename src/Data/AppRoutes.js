import Customer from "../Pages/Customer/Customer";
import Vendor from "../Pages/Vendor/Vendor";
import SystemUser from "../Pages/SystemUser/SystemUser";
import ListTask from "../Pages/CIA/ListTask";
import Task from "../Pages/CIA/Task";
import AddTaskResources from "../Pages/CIA/AddTaskResources";
import Vendoritem from "../Pages/Vendoritem/Vendoritem";
import SystemUserList from "../Pages/SystemUser/SystemUserList";

export const AppRoutes = {
  /* Customer related routes */
  customer_list: { path: "/customer/list", component: <></> },
  customer_add: { path: "/customer/add", component: <Customer type="add" /> },
  customer_view: {
    path: "/customer/view/id",
    component: <Customer type="view" />,
  },
  customer_edit: {
    path: "/customer/edit/id",
    component: <Customer type="edit" />,
  },

  /* Vendor related routes */
  vendor_list: { path: "/vendor/list", component: <></> },
  vendor_add: { path: "/vendor/add", component: <Vendor type="add" /> },
  vendor_view: { path: "/vendor/view/id", component: <Vendor type="view" /> },
  vendor_edit: { path: "/vendor/edit/id", component: <Vendor type="edit" /> },

  /* Vendor Items related routes */
  vendor_item_list: { path: "/vendor/item/list", component: <></> },
  vendor_item_add: {
    path: "/vendor/item/add",
    component: <Vendoritem type="add" />,
  },
  vendor_item_view: { path: "/vendor/item/view/id", component: <></> },
  vendor_item_edit: { path: "/vendor/item/edit/id", component: <></> },

  /* Project related routes */
  project_list: { path: "/project/list", component: <></> },
  project_add: { path: "/project/add", component: <></> },
  project_view: { path: "/project/view/id", component: <></> },
  project_edit: { path: "/project/edit/id", component: <></> },
  project_services_list: { path: "/project/services/list", component: <></> },

  /* CIA related routes */
  cia_list: { path: "/cia/list", component: <ListTask /> },
  cia_add: { path: "/cia/add", component: <Task /> },
  cia_view: { path: "/cia/view/id", component: <></> },
  cia_edit: { path: "/cia/edit/id", component: <></> },
  cia_resources: { path: "/cia/resource", component: <AddTaskResources /> },

  /* System User related routes */
  system_user_list: { path: "/user/list", component: <SystemUserList/> },
  system_user_add: { path: "/user/add", component: <SystemUser /> },
  system_user_view: { path: "/user/view/id", component: <></> },
  system_user_edit: { path: "/user/edit/id", component: <></> },
};
