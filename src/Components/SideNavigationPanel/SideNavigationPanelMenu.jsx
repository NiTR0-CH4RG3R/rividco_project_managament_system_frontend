import { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate, useLocation } from "react-router-dom";
import NavMenuitemListitemButton from "../../Components/StyledComponents/NavMenuItemListitemButton";
import NavSubItemListItemButton from "../../Components/StyledComponents/NavSubItemListItemButton";

export default function SideNavigationPanelMenu({ name, icon, subMenu }) {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <NavMenuitemListitemButton onClick={handleClick} selected={open}>
        <ListItemIcon sx={{ color: "#FFFFFF" }}>{icon}</ListItemIcon>
        <ListItemText primary={name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </NavMenuitemListitemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {subMenu.map((subItem) => (
            <NavSubItemListItemButton
              key={subItem.name}
              onClick={() => navigate(subItem.path)}
              selected={location.pathname === subItem.path}
              sx={{
                "&:hover": {
                  backgroundColor: "#302355 !important",
                  borderRadius: "8px",
                  margin:"2px"
                },
                "&:focus": {
                  backgroundColor: "#302355 ",
                  borderRadius: "8px",
                  margin:"2px"
                },
                
                
              }}
            >
              <ListItemText
                primaryTypographyProps={{
                  variant: "body2",
                  sx: {
                    display: "flex",
                    justifyContent: "flex-end",
                  },
                }}
                secondaryTypographyProps={{
                  sx: {
                    display: "flex",
                    justifyContent: "flex-end",
                  },
                }}
                primary={subItem.name}
              />
            </NavSubItemListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
}
