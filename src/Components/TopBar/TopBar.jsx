import { useState } from "react";
import { Box, IconButton, AppBar, Typography } from "@mui/material";
import { ColorModeContext } from "../../theme";
import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowBack,
  Brightness4,
  AccountCircle,
  Logout,
} from "@mui/icons-material";
import { useTopbarContext } from "../../Contexts/TopbarContext";
import { useEffect } from "react";
import { AppRoutes } from "../../Data/AppRoutes";
import Tooltip from "@mui/material/Tooltip";

export default function TopBar({ drawerWidth = 254, topbarHeight = 64 }) {
  const colorMode = useContext(ColorModeContext);

  const { title, subtitle } = useTopbarContext();

  const navigate = useNavigate();

  const location = useLocation();

  const [backButtonVisible, setBackButtonVisible] = useState(false);
  const [logoutButtonVisible, setLogoutButtonVisible] = useState(false);

  useEffect(() => {
    const isHomePage = location.pathname === "/home";
    setBackButtonVisible(!isHomePage);
    setLogoutButtonVisible(isHomePage);
  }, [location.pathname]);

  const handleAccountButtonClick = () => {
    navigate(AppRoutes.system_user_view.path);
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };
  //add the function
  const handleLogoutButtonClick = () => {
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        height: `${topbarHeight}px`,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        backgroundColor:"#808080"
      }}
    >
      {/* Back Button */}
      <Box display="flex" flexDirection="row" justifyContent="flex-start">
        <div className="backBtn">
          <Tooltip title="Back">
            <IconButton
              type="button"
              sx={{
                color: "grey.50",
                p: 1,
                display: backButtonVisible ? "block" : "none",
              }}
              onClick={handleBackButtonClick}
            >
              <ArrowBack />
            </IconButton>
          </Tooltip>
        </div>

        <div className="text">
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>

          <Typography variant="subtitle2">{subtitle}</Typography>
        </div>
      </Box>

      {/* Right side icons */}
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <Tooltip title="Change Theme">
          <IconButton
            type="button"
            sx={{ color: "grey.50", p: 1 }}
            onClick={colorMode.toggleColorMode}
          >
            <Brightness4 />
          </IconButton>
        </Tooltip>

        <Tooltip title="Account">
          <IconButton
            aria-label="Account"
            type="button"
            sx={{ color: "grey.50", p: 1 }}
            onClick={handleAccountButtonClick}
          >
            <AccountCircle />
          </IconButton>
        </Tooltip>

        <Tooltip title="LogOut">
          <IconButton
            type="button"
            sx={{
              color: "grey.50",
              p: 1,
              //display: logoutButtonVisible ? "block" : "none",
            }}
            onClick={handleLogoutButtonClick}
          >
            <Logout />
          </IconButton>
        </Tooltip>
      </Box>
    </AppBar>
  );
}
