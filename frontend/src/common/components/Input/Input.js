import { COLORS } from "../../constants/Color";
import styled from "styled-components";
import {TextField} from "@mui/material";

const Input = styled(TextField)`
  color: ${COLORS.Light};
  background: ${COLORS.BackgroundIten};
  width: 100%;
  padding: 6px;
  border-radius: 6px;

  .css-ume8vi-MuiInputBase-input-MuiInput-input {
    padding-left: 8px;
  }

  .css-hdmxl0-MuiFormLabel-root-MuiInputLabel-root, .css-hdmxl0-MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
    color: rgba(255, 255, 255, 0.7);
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    background-color: ${COLORS.BackgroundIten};
    left: -6px;
    padding: 4px 8px;
    border: none;
    border-radius: 2px;
  }
`;


const InputStyled = ({label, ...props}) => {
  return <Input label={label} {...props}/>
}

export {InputStyled};