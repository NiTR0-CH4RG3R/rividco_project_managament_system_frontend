import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

const FormSaveLodingButton = styled(Button)(({ theme }) => ({
  boxShadow: "-moz-initial",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#0D9488",
  borderColor: "#0FB0A2",

  "&:hover": {
    backgroundColor: "#0FB0A2",
    borderColor: "#0FB0A2",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#085E57",
    borderColor: "#085E57",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
}));
export default FormSaveLodingButton;
