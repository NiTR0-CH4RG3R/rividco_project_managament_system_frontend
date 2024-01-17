
import { PersonOutline, Person2Outlined, Shop2Outlined, WorkOutline, HelpCenterOutlined } from "@mui/icons-material";

import Customer from "../Pages/Customer/Customer";
import Vendor from "../Pages/Vendor/Vendor";

export const menus = [
    {
        name: "Customer",
        icon: <PersonOutline />,
        subMenu: [
            {
                name: "List Customers",
                path : "/customer/list",
                component: ( <></> )
            },
            {
                name: "Add Customer",
                path : "/customer/add",
                component: <Customer type="add" />
            }
        ]
    },
    {
        name: "Vendor",
        icon: <Shop2Outlined />,
        subMenu: [
            {
                name: "List Vendors",
                path : "/vendor/list",
            },
            {
                name: "Add Vendor",
                path : "/vendor/add",
                component: <Vendor type="add" />
            },
            {
                name: "List Vendor Items",
                path : "/vendor/item/list",
            },
            {
                name: "Add Vendor Item",
                path : "/vendor/item/add",
            }
        ]
    },
    {
        name: "Project",
        icon: <WorkOutline />,
        subMenu: [
            {
                name: "List Projects",
                path : "/project/list",
            },
            {
                name: "Add Project",
                path : "/project/add",
            },
            {
                name: "List Pendnig Services",
                path : "/project/service/list",
            }
        ]
    },

    {
        name: "CIA",
        icon: <HelpCenterOutlined />,
        subMenu: [
            {
                name: "List Tasks",
                path : "/cia/list",
            },
            {
                name: "Add Task",
                path : "/cia/add",
            }
        ]
    },
    
    {
        name: "System User",
        icon: <Person2Outlined />,
        subMenu: [
            {
                name: "List Users",
                path : "/user/list",
            },
            {
                name: "Add User",
                path : "/user/add",
            }
        ]
    },
]