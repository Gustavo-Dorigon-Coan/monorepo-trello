import {BackgroundIten, Light} from "../../constants/Color";
import styled from "styled-components";
import {TextField, ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";

const Input = styled(TextField)`
  color: ${Light};
  background: ${BackgroundIten};
  width: 100%;
  padding: 6px;
  border-radius: 6px;

  .css-ume8vi-MuiInputBase-input-MuiInput-input {
    padding-left: 8px;
  }

  .css-hdmxl0-MuiFormLabel-root-MuiInputLabel-root, .css-hdmxl0-MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
    color: rgba(255, 255, 255, 0.7);
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    background-color: ${BackgroundIten};
    left: -6px;
    padding: 4px 8px;
    border: none;
    border-radius: 2px;
  }
`;


const InputStyled = ({label, ...props}) => {
  return <Input label={label} {...props}></Input>
}

export {InputStyled};