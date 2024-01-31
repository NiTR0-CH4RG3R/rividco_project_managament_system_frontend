
import { PersonOutline, Person2Outlined, Shop2Outlined, WorkOutline, HelpCenterOutlined } from "@mui/icons-material";

import { AppRoutes as Routes } from "./AppRoutes";

export const SideNavigationPanelData =
{
    width: 240,
    toolbarHeight: 80,
    items: [
        {
            name: "Customer",
            icon: <PersonOutline />,
            subMenu: [
                { name: "List Customers", path: Routes.customer_list.path, component: Routes.customer_list.component },
                { name: "Add Customer", path: Routes.customer_add.path, component: Routes.customer_add.component }
            ]
        },
        {
            name: "Vendor",
            icon: <Shop2Outlined />,
            subMenu: [
                { name: "List Vendors", path: Routes.vendor_list.path, component: Routes.vendor_list.component },
                { name: "Add Vendor", path: Routes.vendor_add.path, component: Routes.vendor_add.component },
                { name: "List Vendor Items", path: Routes.vendor_item_list.path, component: Routes.vendor_item_list.component },
                { name: "Add Vendor Item", path: Routes.vendor_item_add.path, component: Routes.vendor_item_add.component },
            ]
        },
        {
            name: "Project",
            icon: <WorkOutline />,
            subMenu: [
                { name: "List Projects", path: Routes.project_list.path, component: Routes.project_list.component },
                { name: "Add Project", path: Routes.project_add.path, component: Routes.project_add.component },
                { name: "List Services", path: Routes.project_services_list.path, component: Routes.project_services_list.component }
            ]
        },

        {
            name: "CIA",
            icon: <HelpCenterOutlined />,
            subMenu: [
                { name: "List Tasks", path: Routes.cia_list.path, component: Routes.cia_list.component },
                { name: "Add Task", path: Routes.cia_add.path, component: Routes.cia_add.component }
            ]
        },

        {
            name: "System User",
            icon: <Person2Outlined />,
            subMenu: [
                { name: "List Users", path: Routes.system_user_list.path, component: Routes.system_user_list.component },
                { name: "Add User", path: Routes.system_user_add.path, component: Routes.system_user_add.component }
            ]
        },
    ]
}