import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SideNavigationPanelMenu from "./SideNavigationPanelMenu";

export default function SideNavigationPanel({
  SideNavigationPanelMenuItems = [],
  drawerWidth = 254,
}) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        flexShrink: 0,
        width: `${drawerWidth}px`,
        height: "100vh",
      }}
      PaperProps={{
        /* NOTE : Giving this elevation property higher values makes the color of the paper apear brighter. I do not know what's causing this. I never found any documentation about this, but I suspect that's material ui's doin. */
        /*        This effect is present in the AppBar component as well. It also cause the shadow effect to apear.*/
        elevation: 4,
        sx: {
          width: `${drawerWidth}px`,
          boxSizing: "border-box",
        },
      }}
      anchor="left"
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {SideNavigationPanelMenuItems.map((item) => (
            <SideNavigationPanelMenu
              key={item.name}
              name={item.name}
              icon={item.icon}
              subMenu={item.subMenu}
            />
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
