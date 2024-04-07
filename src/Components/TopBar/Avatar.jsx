import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TopBarAvatar({ name,userRole, avtarImageLink ,click}) {
  return (
    <Box display="flex" alignItems="center">
      <Avatar alt={name} src={avtarImageLink} onClick={click} sx={{ color: "#071024", p: 1 }}/>
      <Box sx={{ ml: 1 }}>
        <Typography variant="body1">{name}</Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>{userRole}</Typography>
      </Box>
    </Box>
  );
}

export default TopBarAvatar;
