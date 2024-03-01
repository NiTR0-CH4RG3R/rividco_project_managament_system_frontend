import { Button } from "@mui/material";
import styled from "@mui/material/styles/styled";

const FormClearButton = styled(Button)(({ theme }) => ({
  boxShadow: "-moz-initial",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  //backgroundColor: "#0063cc",
  borderColor: "#c70000",
  color:"#c70000",
  borderRadius:"8px",

  "&:hover": {
    backgroundColor: "#c70000",
    borderColor: "#c70000",
    boxShadow: "none",
    color:"white",
    transform: "scale(1.1)",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#c70000",
    borderColor: "##c70000",
  },
  "&:focus": {
    //boxShadow: "0 0 0 0.2rem rgba(255, 0, 0, 0.5)",
  },
}));
export default FormClearButton;
