import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TopBarAvatar({ name, avatarSrc }) {
  return (
    <Box display="flex" alignItems="center">
      <Avatar alt={name} src={avatarSrc} />
      <Typography variant="body1" sx={{ ml: 1 }}>
        {name}
      </Typography>
    </Box>
  );
}

export default TopBarAvatar;
