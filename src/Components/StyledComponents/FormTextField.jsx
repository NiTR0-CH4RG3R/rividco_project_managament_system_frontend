import { styled, alpha } from "@mui/system";
import { TextField } from "@mui/material";

const FormTextField = styled(TextField)(({ theme }) => ({
    boxShadow: '2px 2px 5px 0 rgb(0, 0, 0, 0.2)',
    backgroundColor: theme.palette.grey[10],
    color: 'green',

    //add styles here
}));
export default FormTextField;
