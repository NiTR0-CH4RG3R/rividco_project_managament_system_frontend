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
  Home,
} from "@mui/icons-material";
import { useTopbarContext } from "../../Contexts/TopbarContext";
import { useEffect } from "react";
import { AppRoutes } from "../../Data/AppRoutes";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "./Avatar";
import SystemUser from "../../Pages/SystemUser/SystemUser";
import { AuthContext } from "../../auth/AuthContextProvider";
import { getSystemUser } from "../../services/systemUserService";

export default function TopBar({ drawerWidth = 254, topbarHeight = 64 }) {
  const colorMode = useContext(ColorModeContext);

  const { title, subtitle } = useTopbarContext();

  const navigate = useNavigate();

  const location = useLocation();

  const { auth } = useContext(AuthContext);
  const userId = auth.userId;

  const [systemUserFirstName, setSystemUserFirstName] = useState("");
  const [systemUserRole, setSystemUserRole] = useState("");
  const [systemUserImageLink, setSystemUserImageLink] = useState("");

  useEffect(() => {
    const fetchSystemUserData = async () => {
      try {
        const systemUser = await getSystemUser(userId);
        setSystemUserFirstName(systemUser.firstName);
        setSystemUserImageLink(systemUser.profilePicture);
        setSystemUserRole(systemUser.role);
      } catch (error) {
        console.error("Error fetching system user data:", error);
      }
    };

    fetchSystemUserData();
  }, [userId]);

  const [backButtonVisible, setBackButtonVisible] = useState(false);
  const [logoutButtonVisible, setLogoutButtonVisible] = useState(false);
  const [homebuttonVisible, setHomeButtonVisible] = useState(false);

  useEffect(() => {
    const isHomePage = location.pathname === "/home";
    setBackButtonVisible(!isHomePage);
    setLogoutButtonVisible(isHomePage);
    setHomeButtonVisible(!isHomePage);
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

  const handleHomeButtonClick = () => {
    navigate("/");
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
        backgroundColor: "#e3e3e3",
        color: "#071024",
      }}
    >
      {/* Back Button */}
      <Box display="flex" flexDirection="row" justifyContent="flex-start">
        <div className="backBtn">
          <Tooltip title="Back">
            <IconButton
              type="button"
              sx={{
                color: "#071024",
                p: 1,
                mr: 2,
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
          {/* <IconButton
            type="button"
            sx={{ color: "#071024", p: 1 }}
            onClick={colorMode.toggleColorMode}
          >
            
          </IconButton> */}
        </Tooltip>

        <Tooltip title="Account">
          <Avatar
            name={systemUserFirstName}
            userRole={systemUserRole}
            avtarImageLink={systemUserImageLink}
            click={handleAccountButtonClick}
          />
        </Tooltip>

        <Tooltip title="Home">
          <IconButton
            type="button"
            sx={{
              color: "#071024",
              p: 1,
              display: homebuttonVisible ? "" : "none",
            }}
            onClick={handleHomeButtonClick}
          >
            <Home />
          </IconButton>
        </Tooltip>

        {/* <Tooltip title="Account">
          <IconButton
            aria-label="Account"
            type="button"
            sx={{ color: "#071024", p: 1 }}
            onClick={handleAccountButtonClick}
          >
            <AccountCircle />
          </IconButton>
        </Tooltip> */}

        <Tooltip title="LogOut">
          <IconButton
            type="button"
            sx={{
              color: "#071024",
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
