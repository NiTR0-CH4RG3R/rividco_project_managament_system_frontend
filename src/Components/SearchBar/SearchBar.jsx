import { Box, InputBase, IconButton, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar(
    {
        searchBy = '',
        onSearchChange = (e) => { },
        onSearchClick = (e) => { }
    }
) {
    return (
        <Box
            component={Paper}
            display="flex"
            borderRadius="8px"
            p={0.5}
            width="80%"
        >
            <InputBase sx={{ ml: 2, flex: 1 }} onChange={onSearchChange} placeholder={`Search by ${searchBy}`} />
            <IconButton type="button" onClick={onSearchClick} sx={{ p: 1 }}>
                <SearchIcon />
            </IconButton>
        </Box>
    )
}