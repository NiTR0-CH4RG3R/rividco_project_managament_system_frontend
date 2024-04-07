import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function TopBarAvatar({ name, userRole, avtarImageLink, click }) {
  return (
    <Box display="flex" alignItems="center" sx={{ height: 40 }}>
      <Avatar
        alt={name}
        src={avtarImageLink}
        onClick={click}
        sx={{
          color: "#071024",
          p: 1,
          width: 32,
          height: 32,
          "&:hover": {
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
            borderRadius: "50%",
          },
        }}
      />
      <Box sx={{ ml: 1, mr: 1 }}>
        <Typography variant="body1">{name}</Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {userRole}
        </Typography>
      </Box>
    </Box>
  );
}

export default TopBarAvatar;
