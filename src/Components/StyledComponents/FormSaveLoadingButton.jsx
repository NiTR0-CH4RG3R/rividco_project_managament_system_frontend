import { Button } from "@mui/material";
import styled from "styled-components";

// const FormClearButton = styled(Button)(({ theme }) => ({
//   //add styles here
// }));
// export default FormClearButton;

const FormClearButton = styled.button`
  border: 2px solid rgb(175, 76, 175);
  background-color: rgb(175, 76, 175);
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  transition: 0.5s all ease-out;
`;

export default FormClearButton;
