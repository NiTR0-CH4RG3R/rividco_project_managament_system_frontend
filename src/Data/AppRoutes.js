import Customer from '../Pages/Customer/Customer'
import CustomerList from '../Pages/Customer/CustomerList'
import Vendor from '../Pages/Vendor/Vendor'
import SystemUser from '../Pages/SystemUser/SystemUser'
import VendorItemList from '../Pages/Vendoritem/VendorItemList'
import Task from '../Pages/CIA/Task'
import AddTaskResources from '../Pages/CIA/AddTaskResources'
import Vendoritem from '../Pages/Vendoritem/Vendoritem'
import SystemUserList from '../Pages/SystemUser/SystemUserList'
import TaskStatus from '../Pages/CIA/TaskStatus/TaskStatus'
import Project from '../Pages/Project/Project'
import VendorList from '../Pages/Vendor/VendorList'
import ProjectList from '../Pages/Project/ProjectList'
import TaskList from '../Pages/CIA/TaskList'
import ProjectTest from '../Pages/Project/ProjectTest/ProjectTest'
import ProjectItems from '../Pages/Project/ProjectItems/ProjectItems'
import ProjectResources from '../Pages/Project/ProjectResources/ProjectResources'
import ProjectServices from '../Pages/Project/ProjectServices/ProjectServices'
import PendingServices from '../Pages/Project/PendingServices'
import Home from '../Pages/Home/Home'
import Test from '../Pages/Test/Test'
import CommisionReport from '../Pages/Project/CommisionReport'
import TaskResourceList from '../Pages/CIA/TaskResourceList'
import TaskResources from '../Pages/CIA/TaskResources'

export const AppRoutes = {
  home: { path: '/', component: <Home /> },

  test: { path: '/test', component: <Test /> },

  /* Customer related routes */
  customer_list: { path: '/customer/list', component: <CustomerList /> },
  customer_add: { path: '/customer/add', component: <Customer type="add" /> },
  customer_view: {
    subtitle: '',
    path: '/customer/view/:id',
    component: <Customer type="view" />,
  },
  customer_edit: {
    subtitle: '',
    path: '/customer/edit/:id',
    component: <Customer type="edit" />,
  },

  /* Vendor related routes */
  vendor_list: { path: '/vendor/list', component: <VendorList /> },
  vendor_add: { path: '/vendor/add', component: <Vendor type="add" /> },
  vendor_view: { path: '/vendor/view/:id', component: <Vendor type="view" /> },
  vendor_edit: { path: '/vendor/edit/:id', component: <Vendor type="edit" /> },

  /* Vendor Items related routes */
  vendor_item_list: {
    path: '/vendor/item/list',
    component: <VendorItemList />,
  },
  vendor_item_add: {
    path: '/vendor/item/add',
    component: <Vendoritem type="add" />,
  },
  vendor_item_view: {
    path: '/vendor/item/view/:id',
    component: <Vendoritem type="view" />,
  },
  vendor_item_edit: {
    path: '/vendor/item/edit/:id',
    component: <Vendoritem type="edit" />,
  },

  /* Project related routes */
  project_list: { path: '/project/list', component: <ProjectList /> },
  project_add: { path: '/project/add', component: <Project type="add" /> },
  project_view: {
    path: '/project/view/:id',
    component: <Project type="view" />,
  },
  project_edit: {
    path: '/project/edit/:id',
    component: <Project type="edit" />,
  },
  project_test_list: {
    path: '/project/view/:id/test',
    component: <ProjectTest />,
  },
  project_items_list: { path: '/project/:id/items', component: <ProjectItems /> },
  project_services_list: {
    path: '/project/service',
    component: <ProjectServices />,
  },
  project_resources_list: {
    path: '/project/resources',
    component: <ProjectResources />,
  },
  project_commsion_report: {
    path: '/project/report/:id',
    component: <CommisionReport />,
  },
  project_pending_services: {
    path: '/project/pendingservices',
    component: <PendingServices />,
  },

  /* CIA related routes */
  cia_list: { path: '/cia/list', component: <TaskList /> },
  cia_add: { path: '/cia/add', component: <Task type="add" /> },
  cia_view: { path: '/cia/view/:id', component: <Task type="view" /> },
  cia_edit: { path: '/cia/edit/:id', component: <Task type="edit" /> },
  cia_resources_add: {
    path: '/cia/resource/add/:id',
    component: <TaskResourceList />,
  },
  cia_resources_view: {
    path: '/cia/resource/view/:id',
    component: <TaskResourceList />,
  },
  cia_status: { path: '/cia/view/:id/status', component: <TaskStatus /> },

  /* System User related routes */
  system_user_list: { path: '/user/list', component: <SystemUserList /> },
  system_user_add: { path: '/user/add', component: <SystemUser type="add" /> },
  system_user_view: {
    path: '/user/view/:id',
    component: <SystemUser type="view" />,
  },
  system_user_edit: {
    path: '/user/edit/:id',
    component: <SystemUser type="edit" />,
  },
}
