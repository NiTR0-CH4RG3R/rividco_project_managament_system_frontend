import { Button } from "@mui/material";
import { styled, alpha } from "@mui/system";


const FormButton = styled(Button)(({ theme }) => ({
  boxShadow: "-moz-initial",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#071024",
  borderColor: "#02226A",
  borderRadius:"8px",
  

  "&:hover": {
    backgroundColor: "#0a538f",
    borderColor: "#2e9af2",
    boxShadow: "none",
    color:"white",
    transform: "scale(1.1)",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0a538f",
    borderColor: "#2e9af2",
  },
  "&:focus": {
    //boxShadow: "0 0 0 0.2rem rgba(255, 0, 0, 0.5)",
  },
}));
export default FormButton;